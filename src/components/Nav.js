import React, { Component } from 'react';
import "../assets/styles/Nav.css"
import Logo from "../assets/images/logo1.png"

class Nav extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <div className='App-Nav'>
            <img src={Logo} alt="logo"></img>
            <h1>CV CREATOR</h1>
        </div>
    )
  }
}

export default Nav