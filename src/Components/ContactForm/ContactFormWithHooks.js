import React, {useEffect, useRef} from 'react'
import {Button, Form} from "react-bootstrap";
import s from "./contactform.module.css";
import {connect} from "react-redux";
import actionTypes from "../../redux/actionTypes";
import {submitFormDataThunk} from "../../redux/actions";

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

const ContactFormWithHooks = (props) => {

    const inputRef = useRef(null);
    const {
        formData,
        success,
        error,
        setChanges,
        submitFormData
    } = props;


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
                    onChange={(e) => setChanges(e)}
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
                    {success ? "Data send Successfully" : error}
                </h5>
                {inputs}
                <Button
                    variant="info"
                    className={s.btn}
                    onClick={() => submitFormData(formData)}
                    disabled={!isValid}
                >
                    Submit
                </Button>
            </Form>
        </>
    )
}

const mapStateToProps = (state) => {

    const {
        loading,
        formData,
        setSuccess,
        setError,
        setFormData,
        setFormDataEmpty,
        setChanges,
        success,
        error
    } = state.contactState;


    return {
        success,
        error,
        loading,
        formData,
        setSuccess,
        setError,
        setFormData,
        setFormDataEmpty,
        setChanges
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        setChanges: (data) => dispatch({type: actionTypes.SET_CHANGES, data}),
        submitFormData: (formData) => dispatch(submitFormDataThunk(formData))
    }
}

const ContactFormWithHooksProvider = connect(mapStateToProps, mapDispatchToProps)(ContactFormWithHooks)

export default ContactFormWithHooksProvider;