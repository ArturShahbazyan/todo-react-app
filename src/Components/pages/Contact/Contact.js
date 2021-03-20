import React from 'react';
import ContactForm from '../../ContactForm/ContactForm';

class Contact extends React.Component {

    state = {
        success:false
    }

    handleSuccess = (success) => {
        this.setState({
            success
        })
    }

    render() {
        return (
            <div>
                <h2 className="text-center  mb-4">Contact Page</h2>
                <h6 className="text-center text-success">
                    {this.state.success && "Data send Successfully"}
                </h6>
                <ContactForm onSuccess={this.handleSuccess}/>
            </div>
        )
    }
}

export default Contact;