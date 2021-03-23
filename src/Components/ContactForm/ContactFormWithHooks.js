import React, {useEffect, useRef, useState} from 'react'
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
    }
];

const ContactFormWithHooks = () => {

    const [formData, setFormData] = useState(
        {
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
        }
    );

    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {

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

        setFormData({
            ...formData,
            [name]: {
                value,
                valid: !!!error,
                error
            }
        })
    }

    const handleSubmit = () => {

        const sendingFormData = {...formData};

        for (let key in sendingFormData) {
            if (sendingFormData.hasOwnProperty(key)) {
                sendingFormData[key] = sendingFormData[key].value;
            }
        }

        setLoading(true);

        fetch('http://localhost:3001/form', {
            method: "POST",
            body: JSON.stringify(sendingFormData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                setSuccess(data.success);
                setFormData({
                    ...formData,
                    name: {value: ""},
                    email: {value: ""},
                    message: {value: ""}
                });
            })
            .catch(err => {
                setErrorMessage(err.message);
                setSuccess(false);
                console.error("Contact Submit Request Error", err);
            })
            .finally(() => setLoading(false));

    }

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
                    ref={!index ? inputRef : null}
                    onChange={handleChange}
                    value={formData[input.name].value}
                />
                <Form.Text className="text-danger">
                    {formData[input.name].error}
                </Form.Text>
            </Form.Group>
        )
    })

    const {name, email, message} = formData;
    const isValid = name.valid && email.valid && message.valid;

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
                    onClick={handleSubmit}
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

export default ContactFormWithHooks;