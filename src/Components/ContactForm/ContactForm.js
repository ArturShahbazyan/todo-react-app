import React from 'react'
import {Button, Form} from "react-bootstrap";
import s from "./contactform.module.css";
import Preloader from "../Preloader/Preloader";


const contactsList = [
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
            name: "",
            email: "",
            message: "",
            isLoading: false,
        }
    }

    handleChange = (e) => {

        const {name, value} = e.target;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = () => {

        this.setState({isLoading: true});

        const {name, email, message} = this.state;
        const {onSuccess} = this.props;

        fetch('http://localhost:3001/form', {
            method: "POST",
            body: JSON.stringify({name, email, message}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                this.setState({
                    name: "",
                    email: "",
                    message: "",
                    isLoading: false
                });
                onSuccess(data.success);
            })
            .catch(err => {
                this.setState({isLoading: false});
                console.error("Contact Submit Request Error", err);
            });

    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {

        const {isLoading} = this.state;

        const contact = contactsList.map((contact, index) => {
            return (
                <Form.Group
                    controlId={contact.name}
                    key={index}
                >
                    <Form.Label>
                        {contact.label}
                    </Form.Label>
                    <Form.Control
                        name={contact.name}
                        type={contact.type}
                        placeholder={contact.label}
                        as={contact.as}
                        rows={contact.rows}
                        maxLength={contact.maxLength}
                        ref={!index ? this.inputRef : null}
                        onChange={this.handleChange}
                        value={this.state[contact.name]}
                    />
                </Form.Group>
            )
        })

        return (
            <>
                <Form className={s.contact}>
                    {contact}
                    <Button variant="info" className={s.btn} onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form>
                {
                    isLoading && <Preloader />
                }
            </>
        )
    }
}

export default ContactForm;