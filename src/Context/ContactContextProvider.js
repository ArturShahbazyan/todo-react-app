import {createContext, useState} from "react";
import {isRequired, maxLength, minLength, validEmail} from "../helpers/validators";
import {beautyErrMsg} from "../helpers/beautyErrMsg";

export const ContactContext = createContext();

const ContactContextProvider = (props) => {

    const [formData, setFormData] = useState(
        {
            name: {
                value: "",
                touched: false,
                valid: false,
                error: null
            },
            email: {
                value: "",
                touched: false,
                valid: false,
                error: null
            },
            message: {
                value: "",
                touched: false,
                valid: false,
                error: null
            }
        }
    );

    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);


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
                touched: !!value,
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

        const {name, email, message} = formData;
        const isTouched = name.touched || email.touched || message.touched;

        if (!isTouched) {
            setErrorMessage("Fields is required");
            return;
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
                setErrorMessage(beautyErrMsg(err.message));
                setSuccess(false);
                console.error("Contact Submit Request Error", err);
            })
            .finally(() => setLoading(false));

    }

    return <ContactContext.Provider
        value={{
            formData,
            isLoading,
            errorMessage,
            success,
            handleChange,
            handleSubmit
        }}
    >
        {props.children}
    </ContactContext.Provider>
}

export default ContactContextProvider;