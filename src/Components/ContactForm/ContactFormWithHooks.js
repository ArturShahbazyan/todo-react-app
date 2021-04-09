import React, {useEffect, useRef} from 'react'
import {Button, Form} from "react-bootstrap";
import s from "./contactform.module.css";
import Preloader from "../Preloader/Preloader";
import {beautyErrMsg} from "../../helpers/beautyErrMsg";
import {connect} from "react-redux";
import actionTypes from "../../redux/actionTypes";

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

    const handleSubmit = () => {

        const {
            formData,
            setErrorMessage,
            setSuccess,
            setFormDataEmpty,
            loading
        } = props;

        const sendingFormData = {...formData};

        for (let key in sendingFormData) {
            if (sendingFormData.hasOwnProperty(key)) {
                sendingFormData[key] = sendingFormData[key].value;
            }
        }

        const {name, email, message} = formData;
        const isTouched = name.touched || email.touched || message.touched;

        if (!isTouched) {
            setErrorMessage("Fields is required");
            return;
        }

        loading(true);

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
                setFormDataEmpty({
                    ...formData,
                    name: {value: ""},
                    email: {value: ""},
                    message: {value: ""}
                });
            })
            .catch(err => {
                setErrorMessage(beautyErrMsg(err.message));
                setSuccess(false);
                console.error("Contact Submit Request Error", err);
            })
            .finally(() => loading(false));

    }

    const inputRef = useRef(null);
    const {formData, isLoad, success, errorMessage, setChanges} = props;
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
                isLoad && <Preloader/>
            }
        </>
    )
}

const mapStateToProps = (state) => {

    const {
        success,
        loading,
        errorMessage,
        formData,
        setSuccess,
        setErrorMessage,
        setFormData,
        setFormDataEmpty,
        setChanges
    } = state.contactState;

    const {isLoad} = state;

    return {
        isLoad,
        success,
        loading,
        errorMessage,
        formData,
        setSuccess,
        setErrorMessage,
        setFormData,
        setFormDataEmpty,
        setChanges
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        loading: (isLoad) => dispatch({type: actionTypes.LOADING, isLoad}),
        setSuccess: (success) => dispatch({type: actionTypes.SET_SUCCESS, success}),
        setErrorMessage: (errorMessage) => dispatch({type: actionTypes.SET_ERROR_MESSAGE, errorMessage}),
        setChanges: (data) => dispatch({type: actionTypes.SET_CHANGES, data}),
        setFormDataEmpty: (emptyData) => dispatch({type: actionTypes.SET_FORM_DATA_EMPTY, emptyData}),
    }
}

const ContactFormWithHooksProvider = connect(mapStateToProps, mapDispatchToProps)(ContactFormWithHooks)

export default ContactFormWithHooksProvider;