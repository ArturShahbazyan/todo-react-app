import React from 'react'
import {Button, Form} from "react-bootstrap";
import s from "./contactform.module.css";
import Preloader from "../Preloader/Preloader";
import {isRequired, maxLength, minLength, validEmail} from "../../helpers/validators";


const inputList = [
    {
        name: "name",
        labelId: "formBasicName",
        label: "Name",
        type: "text"
    },
    {
        name: "email",
        labelId: "formBasicEmail",
        label: "Email",
        type: "email"
    },
    {
        name: "message",
        labelId: "formBasicTextarea",
        label: "Message",
        as: "textarea",
        rows: 3,
        maxLength: 100,
    },
];

class ContactForm extends React.Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.state = {
            name: {
                value: "",
                valid: false,
                error: null
            },
            email: {
                value: "",
                valid: false,
                error: null
            },
            message: {
                value: "",
                valid: false,
                error: null
            },
            isLoading: false,
            errorMessage:"",
            success:false
        }
    }


    handleChange = (e) => {

        const {name, value} = e.target;

        let error = null;

        const maxLength30 = maxLength(30);
        const minLength3 = minLength(3);

        switch (name) {
            case "name" :
            case "email" :
            case "message" :
                error = isRequired(value)
                    || maxLength30(value)
                    || minLength3(value)
                    || (name === "email" && validEmail(value));
                break;
            default :
        }

        this.setState({
            [name]: {
                value,
                valid: !!!error,
                error
            }
        })

    }

    handleSubmit = () => {

        const formData = {...this.state};
        delete formData.isLoading;
        delete formData.errorMessage;
        delete formData.success;

        for(let key in formData){
            if (formData.hasOwnProperty(key)){
                formData[key] = formData[key].value;
            }
        }

        this.setState({isLoading: true});

        fetch('http://localhost:3001/form', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                this.setState({
                    name: {
                        value:""
                    },
                    email: {
                        value:""
                    },
                    message: {
                        value:""
                    },
                    isLoading: false,
                    success:data.success
                });
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    errorMessage:err.message,
                    success:false
                });
                console.error("Contact Submit Request Error", err);
            });

    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {

        const {name, email, message, errorMessage} = this.state;
        const isValid = name.valid && email.valid && message.valid;

        const {isLoading, success} = this.state;

        const inputs = inputList.map((input, index) => {
            return (
                <Form.Group
                    controlId={input.name}
                    key={index}
                >
                    <Form.Label>
                        {input.label}
                    </Form.Label>
                    <Form.Control
                        name={input.name}
                        type={input.type}
                        placeholder={input.label}
                        as={input.as}
                        rows={input.rows}
                        maxLength={input.maxLength}
                        ref={!index ? this.inputRef : null}
                        onChange={this.handleChange}
                        value={this.state[input.name].value}
                    />
                    <Form.Text className="text-danger">
                        {this.state[input.name].error}
                    </Form.Text>
                </Form.Group>
            )
        })

        return (
            <>
                <Form className={s.contact}>
                    <h5 className={`text-center ${success ? 'text-success' : 'text-danger'}`}>
                        {success ? "Data send Successfully" : errorMessage}
                    </h5>
                    {inputs}
                    <Button
                        variant="info"
                        className={s.btn}
                        onClick={this.handleSubmit}
                        disabled={!isValid}
                    >
                        Submit
                    </Button>
                </Form>
                {
                    isLoading && <Preloader/>
                }
            </>
        )
    }
}

export default ContactForm;