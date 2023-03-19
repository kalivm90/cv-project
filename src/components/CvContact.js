import { Component } from "react";
import ContactItem from "./ContactItem";
import "../assets/styles/CvContact.css"

class Contact extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        const {phone, email, website, address} = this.props.values
        return (
            <div className="Left-Contact">
                <ContactItem title="Phone" value={phone}/>
                <ContactItem title="Email" value={email}/>
                <ContactItem title="Webiste" value={website}/>
                <ContactItem title="Address" value={address}/>
            </div>
        )
    }
}

export default Contact