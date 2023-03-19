import React, { Component } from 'react';
import "../assets/styles/Form.css"

class Form extends Component {
  constructor(props) {
    super(props)
  }


  noEmptyFields = (fields) => {
    const error = fields[0].parentNode.childNodes[1]

    fields.forEach(i => {
      console.log(i.value)
      if (i.value === "") {
        console.log(i.value, i)
      }
      if (i.value === "" && i.className !== "form-error") {
        i.classList.remove("valid")
        i.classList.add("invalid")
        error.textContent = "Please check that form is filled out correctly"
        setTimeout(() => {
          i.classList.remove("invalid")
          error.textContent = ""
        }, 3000)
        return false 
      } else {
        i.classList.remove("valid")
      }
    })
    return true
  }

  clearFields = (fields) => {
    fields.forEach(i => {
      i.value = ""
    })
  }


  concatObj = (data, newVal, target, char) => {
    const newComp = `${data[newVal]} ${char} ${data[target]}`
    data[newVal] = newComp
    delete data[target]
    return data
  }

  buildElemObj = (fields) => {
    const data = Array.from(fields).reduce((acc, field) => {
      const { name, value } = field;
      acc[name] = value;
      return acc;
    }, {});
    return data
  }


  toTitle = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  createElement = (e, name) => {
    e.preventDefault()
    const fields = document.querySelectorAll(`.Form-${this.toTitle(name)} :not(h1):not(input[type='submit'])`);
    const data = this.buildElemObj(fields)
    
    // Concatenate data if name is "experience" or "reference"
    if (name === "experience" || name === "reference") {
      this.concatObj(data, name === "experience" ? ["company", "location"] : ["refTitle", "refCompany"], name === "experience" ? "/" : "|")
    }
  
    // Update state and clear fields if there are no empty fields
    if (this.noEmptyFields(fields)) {
      this.props.updateState(data, name)
      this.clearFields(fields)
    }
  }
  

  liveValidate = (e) => {
    const ele = e.target
    
    switch (ele.name) {
      case "date":
      case "schoolYear":
        const regex = /^\d+[\/-]\d+[-]?\d+[\/]?\d+$/
        if (regex.test(ele.value)) {
          ele.classList.remove("invalid")
          ele.classList.add("valid")
        } else {
          ele.classList.remove("valid");
          ele.classList.add("invalid")
        }
        break;
      default:
        if (ele.value.length > 1) {
          ele.classList.remove("invalid")
          ele.classList.add("valid")
        } else {
          ele.classList.remove("valid")
          ele.classList.add("invalid")
        }
        break;
    }
  }

  triggerImage = () => {
    const input = document.querySelector("#file-upload")
    input.click()
  }

  uploadImage = (e) => {
    const file = e.target.files[0]
    this.props.updateImage(file);
  }

  render() {
    return (
        <div className='Main-Form'>
            <div className='Form-Personal'>
                <h1>Personal Information</h1>
                <input onChange={this.props.updateValue} type="text" name="firstName" placeholder='First Name'></input>
                <input onChange={this.props.updateValue} type="text" name="lastName" placeholder='Last Name'></input>
                <input onChange={this.props.updateValue} type="text" name="title" placeholder='Title'></input>
                <input onChange={this.props.updateValue} type="text" name="phone" placeholder='Phone Number'></input>
                <input onChange={this.props.updateValue} type="text" name="email" placeholder='Email'></input>
                <input onChange={this.props.updateValue} type="text" name="website" placeholder='Website'></input>
                <input onChange={this.props.updateValue} type="text" name="address" placeholder='Address'></input>
                <textarea onChange={this.props.updateValue} name="aboutMe" rows="4" cols="50" placeholder='Tell me something about yourself...'></textarea>
                <button id="file-upload-btn" onClick={this.triggerImage}>Upload Image</button>
                <input id="file-upload" type="file" hidden accept="image/png, image/jpeg" onChange={this.uploadImage}></input>
            </div>
            <form className='Form-Experience'>
              <h1>Experience <span className='form-error'></span></h1>
              <input type="text" name="position" onChange={this.liveValidate} placeholder='Position' required></input>
              <input  type="text" name="company" onChange={this.liveValidate} placeholder='Company' required></input>
              <input  type="text" name="location" onChange={this.liveValidate} placeholder='Location (California, US)' required></input>
              <input  type="text" name="date" onChange={this.liveValidate} placeholder='Dates (2021-2023 or 12/21-05/23)' required></input>
              <textarea name="jobDesc" rows="4" cols="50" onChange={this.liveValidate} placeholder='Describe Position...' required></textarea>
              <input onClick={(e) => this.createElement(e,"experience")} type="submit" value="Add Experience"></input>
            </form>
            <form className='Form-Skills'>
              <h1>Skills <span className='form-error'></span></h1>
              <input type="text" name="techName" onChange={this.liveValidate} placeholder='Technology Name'></input>
              <input type="range" name="slider" min="1" max="100" readOnly className="slider" id="myRange"></input>
              <input type="submit" value="Add Skill" onClick={(e) => this.createElement(e,"skills")}></input>
            </form>
            <form className='Form-Education'>
              <h1>Education <span className='form-error'></span></h1>
              <input type="text" name="major" onChange={this.liveValidate} placeholder='Major'></input>
              <input type="text" name="school" onChange={this.liveValidate} placeholder='School Name'></input>
              <input type="text" name="schoolYear" onChange={this.liveValidate} placeholder='Years Attended (2021-2023)'></input>
              <input type="submit" value="Add School" onClick={(e) => this.createElement(e,"education")}></input>
            </form>
            <form className='Form-Reference'>
              <h1>Reference <span className='form-error'></span></h1>
              <input type="text" name="refFullName" onChange={this.liveValidate} placeholder='Full Name'></input>
              <input type="text" name="refTitle" onChange={this.liveValidate} placeholder='Title'></input>
              <input type="text" name="refCompany" onChange={this.liveValidate} placeholder='Company'></input>
              <input type="text" name="refPhone" onChange={this.liveValidate} placeholder='Phone Number'></input>
              <input type="submit" value="Add Reference" onClick={(e) => this.createElement(e,"reference")}></input>
            </form>
        </div>
    )
  }
}

export default Form