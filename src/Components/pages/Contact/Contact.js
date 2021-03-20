import React from 'react';
import ContactForm from '../../ContactForm/ContactForm';

class Contact extends React.Component {

    render() {
        return (
            <div>
                <h2 className="text-center mb-4">Contact Page</h2>
                <ContactForm />
            </div>
        )
    }
}

export default Contact;