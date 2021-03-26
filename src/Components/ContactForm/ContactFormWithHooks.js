import React, {useEffect, useRef, useContext} from 'react'
import {Button, Form} from "react-bootstrap";
import s from "./contactform.module.css";
import Preloader from "../Preloader/Preloader";
import {ContactContext} from "../../Context/ContactContextProvider";

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

    const contactContext = useContext(ContactContext);

    const {
        formData,
        isLoading,
        errorMessage,
        success,
        handleChange,
        handleSubmit
    } = contactContext;


    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

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