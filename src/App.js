import React, { Component } from 'react';

import Nav from './components/Nav';
import Form from './components/Form';
import CV from './components/Cv';

import "./App.css"

import Avatar from "./assets/images/avatar.svg"

/* ADD IMAGE TO STATE AND MAKE SURE YOU CAN UPLOAD. ALSO, FINISH NAVBAR*/

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        firstName: "",
        lastName: "",
        title: "",
        aboutMe: "",
        phone: "",
        email: "",
        website: "",
        address: "",
        image: Avatar
      },
      experience: {
          
      },
      skills: {

      },
      education: {

      }, 
      reference: {

      },
    }

    this.updateValue = this.updateValue.bind(this);
  }


  updateValue = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  }


  updateState = (data, type) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        [type]: {
          ...prevState[type],
          [Date.now()]: data
        }
      };
      return newState;
    });
  }


  updateImage = (target) => {
    const reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = () => {
      this.setState(prevState => ({
        ...prevState,
        values: {
          ...prevState.values,
          image: reader.result
        }
      }), () => {
        console.log(this.state.values.image)
      })
    }
  };


  deleteState = (id, type) => {
    this.setState(prevState => {
      const updatedExperience = Object.keys(prevState[type]).reduce((acc, key) => {
        if (key !== id) {
          acc[key] = prevState[type][key];
        }
        return acc;
      }, {});
  
      // Return the updated state object
      return {
        ...prevState,
        [type]: updatedExperience
      };
    });
  }


  updateSkill = (data) => { 
    this.setState(prevState => ({
      ...prevState,
      skills: {
        ...prevState.skills,
        [Date.now()] : data
      }
    }))
  }

  render() {

    return (
      <div className='App'>

        <Nav/>

        <div className='App-Main'>
          <Form values={this.state.values} 
                updateValue={this.updateValue} 
                updateState={this.updateState}
                updateImage={this.updateImage}/>
          <CV values={this.state.values} 
              exp={this.state.experience} 
              skills={this.state.skills}
              education={this.state.education}
              reference={this.state.reference}
              deleteState={this.deleteState}/>
        </div>

      </div>
    )
  }
}

export default App;

