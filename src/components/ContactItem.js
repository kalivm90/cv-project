import { Component } from "react";

class ContactItem extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div className='Contact-Item'>
              <div className='Title-Container'>
                <div></div>
                <p className='Item-Title'>{this.props.title}</p>
              </div>
              <p id="contactPhone">{this.props.value}</p>
            </div>
        )
    }
}

export default ContactItem