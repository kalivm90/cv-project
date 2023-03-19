import React, { Component } from 'react';
import "../assets/styles/Cv.css"
import X from "../assets/images/x.svg"
import Contact from './CvContact';




class CV extends Component {
  constructor(props) {
    super(props)
  }

  deleteField = (id, type) => {
    this.props.deleteState(id, type)
  }

  getSkills = () => {
    const values = this.props.skills
    const fields = Object.keys(values).map(i => {
      const item = values[i]
      return <div className='Skill-Item'>
                <label htmlFor={i}>{item.techName}</label>
                <img className="svg" src={X} onClick={() => this.deleteField(i, "skills")}></img>
                <progress id={i} value={item.slider} max="100">{item.slider}</progress>
             </div>
    })

    return fields
  }


  getExperience = () => {
    const values = this.props.exp
    const fields = Object.keys(values).map((i) => {
      const data = values[i]    
      return <div className='Exp' id={i}>
                <h2 className='date'>{data.date}</h2>
                <h2 className='position'>{data.position}</h2>
                <h2 className='company'>{data.company}</h2>
                <p className='jobDesc'>{data.jobDesc}</p> 
                <div className='delete-container'>
                  <button className='delete' onClick={() => this.deleteField(i, "experience")}>Delete</button>
                </div>
            </div>
    })
  
    return fields
  }  


  getEdRefFields = (type) => {
    const values = this.props[type]
    const fields = Object.keys(values).map((i) => { 
      const data = values[i]    
      return <div className='Item' id={i}>
                {type === "education" ? (
                  <>
                    <p id="major" className='Item-Title'>{data.major}</p>
                    <p id="school">{data.school}</p>
                    <p id="schoolYear">{data.schoolYear}</p>
                  </>
                ) : (
                  <>
                    <p id="refFullName" className='Item-Title'>{data.refFullName}</p>
                    <p id="refTitle">{data.refTitle}</p>
                    <p id="refPhone">{data.refPhone}</p>
                  </>
                )}
                <button onClick={() => this.deleteField(i, type)}>Remove</button>
            </div>
    })
    return fields
  }


  render() {
    return (
      <div className='Main-Cv'>



        <div className='Cv-Left'>

          <div className='Left-Image' style={{
              backgroundImage: `url(${this.props.values.image})`,
              backgroundRepeat: "no-repeat"
            }}>  
          </div>

          <div className='Left-Ed-Ref'>
            <div className='Education Left-Container'>
                <h1>EDUCATION</h1>
                {this.getEdRefFields("education")}
            </div>

            <div className='Reference Left-Container'>
                <h1>REFERENCE</h1>
                {this.getEdRefFields("reference")}
            </div>
          </div>


          <Contact values={this.props.values}/>


        </div>



        <div className='Cv-Right'>

          <div className='Right-Banner'>
            <div className='Banner'>
              <div>
                <div className='Banner-Name'>
                  <p className='first'>{this.props.values.firstName}</p><span className='last'>{this.props.values.lastName}</span>
                </div>
                <p className='title'>{this.props.values.title}</p>
              </div>
            </div>
          </div>

          <div className='Right-Content'>

            <div className='Content-About'>

              <h1 className='Content-Title'>About Me</h1>
              <div className='About'>
                <p>{this.props.values.aboutMe}</p>
              </div>

            </div>

            <div className='Content-Experience'>
              <h1 className='Content-Title'>Work Experience</h1>
              {this.getExperience()}
            </div>

            <div className='Content-Skill'>
              <h1 className='Content-Title'>Software Skills</h1>
              <div className='Skill-Container'>
                {this.getSkills()}
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default CV

