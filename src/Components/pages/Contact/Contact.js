import ContactFormWithHooks from "../../ContactForm/ContactFormWithHooks";
import ContactContextProvider from "../../../Context/ContactContextProvider";

const Contact = () => {
    return (
        <ContactContextProvider>
            <div>
                <h2 className="text-center mb-4">Contact Page</h2>
                <ContactFormWithHooks/>
            </div>
        </ContactContextProvider>
    )
}

export default Contact;