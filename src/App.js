import './App.css';
import React from 'react';
import 'status-indicator/styles.css'
//import logo from './logo.svg';
//import { Route, Routes, Link } from 'react-router-dom';
//import MainPage from './MainPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worldinfo: '',
      basictraits: '',
      skills: '',
      personality: '',
      lifeinfo: ''
    };

    this.handleWorldChange = this.handleWorldChange.bind(this);
    this.handleTraitChange = this.handleTraitChange.bind(this);
    this.handleTraitClick = this.handleTraitClick.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleSkillClick = this.handleSkillClick.bind(this);
    this.handlePersonalityChange = this.handlePersonalityChange.bind(this);
    this.handlePersonalityClick = this.handlePersonalityClick.bind(this);
    this.handleLifeInfoChange = this.handleLifeInfoChange.bind(this);
    this.handleLifeInfoClick = this.handleLifeInfoClick.bind(this);
  }

  //TODO: figure out a way to prevent user from generating another character in same textbox when a character already exists
  async getGPTResponse(button_num) {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      //apiKey: process.env.OPENAI_API_KEY,
      apiKey: 'API key goes here',
    });
    const openai = new OpenAIApi(configuration);
    if(this.state.worldinfo === '') {
      alert('ERROR: World Information cannot be blank');
      return;
    }

    if(button_num === 0 && this.state.basictraits === '') { //If basic traits is empty when clicking generate
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: this.state.worldinfo + 'Generate the name, age, gender, and physical appearance of a character in this world:',
        temperature: 0,
        max_tokens: 256,
      });
      this.setState({basictraits: this.state.basictraits + response.data.choices[0].text})
    }

    else if(button_num === 0) { //If basic traits has some info in it already
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: this.state.worldinfo + this.state.basictraits + 'Generate the name, age, gender, and physical appearance of a character in this world if they do not already exist:',
        temperature: 0,
        max_tokens: 256,
      });
      this.setState({basictraits: this.state.basictraits + response.data.choices[0].text})
    }

    if(button_num === 1 && this.state.basictraits === '') { //basic traits cannot be empty when working on Skills
      alert('ERROR: basic traits must be filled in before skills');
      return;
    }

    else if(button_num === 1 && this.state.skills === '') { //If skills are empty when clicking generate
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: this.state.worldinfo + this.state.basictraits + 'Generate the physical and intellectual skills of this character:',
        temperature: 0,
        max_tokens: 256,
      });
      this.setState({skills: this.state.skills + response.data.choices[0].text})
    }

    else if(button_num === 1) { //If skills has some info in it already
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: this.state.worldinfo + this.state.basictraits + this.state.skills + 'Generate the physical and intellectual skills of this character if they do not already exist:',
        temperature: 0,
        max_tokens: 256,
      });
      this.setState({skills: this.state.skills + response.data.choices[0].text})
    }

    //TODO: implement the generation functionality for personality and life info sections
  }

  handleWorldChange(event) {
    //TODO: figure out why this does not work and implement
    var trait_status = document.getElementById("trait_status");
    if(this.state.worldinfo !== '') {
      trait_status.setAttribute("negative", "false");
      trait_status.setAttribute("positive", "true");
    }
    this.setState({worldinfo: event.target.value});
    console.log(this.state.worldinfo);
  }

  handleTraitChange(event) {
    //console.log(event.target.value);
    this.setState({basictraits: event.target.value});
    console.log(this.state.basictraits);
  }

  handleTraitClick(event) {
    //TODO: add processing notification/status
    event.preventDefault();
    this.getGPTResponse(0);
  }

  handleSkillChange(event) {
    this.setState({skills: event.target.value});
    console.log(this.state.skills);
  }

  handleSkillClick(event) {
    //TODO: add processing notification/status
    event.preventDefault();
    this.getGPTResponse(1);
  }

  handlePersonalityChange(event) {
    this.setState({personality: event.target.value});
    console.log(this.state.personality);
  }

  handlePersonalityClick(event) {
    //TODO: add processing notification/status
    event.preventDefault();
    this.getGPTResponse(2);
  }

  handleLifeInfoChange(event) {
    this.setState({lifeinfo: event.target.value});
    console.log(this.state.lifeinfo);
  }

  handleLifeInfoClick(event) {
    //TODO: add processing notification/status
    event.preventDefault();
    this.getGPTResponse(3);
  }

  render () {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="Title">Character Generator Title</h1>
          <ul className="title_btns">
            <li className="title_btn"><button class="header-btn" type="button">Download</button></li>
            <li className="title_btn"><a href="https://github.com/stephentambussi/char-gen"><button class="header-btn" type="button">Github</button></a></li>
          </ul>
        </header>

        <div className="Template">
          <h2 className="TemplateTitle">Character Template</h2>

          <div className="WorldInfo">
            <p>
              <label htmlFor="world_info_textbox" name="WorldInfoTitle">World Information (REQUIRED)</label>
            <br />
              <textarea name="world_info_textbox" rows="6" cols="150" value={this.state.worldinfo} onChange={this.handleWorldChange} 
                placeholder="Enter details here about the virtual game world that you want a character generated for 
                (one or more sentences)"> 
              </textarea>
            </p>
          </div>

          <div className="BasicTraitsAndSkills">
            <div className="BasicTraits">
              <p>
                <status-indicator negative pulse id="trait_status"></status-indicator>
                <b className="BasicTraitsTitle"> Basic Traits </b>
                <button className="BasicTraitsGen" type="button" onClick={this.handleTraitClick}>Generate</button>
              <br />
                <textarea name="basic_traits_textbox" rows="6" cols="100" value={this.state.basictraits} onChange={this.handleTraitChange}
                  placeholder="This will be populated with the character's basic traits: name, age, gender, appearance,
                  race/species, etc. However, you can choose to create these traits yourself."> 
                </textarea>
              </p>
            </div>

            <div className="Skills">
              <p>
                <status-indicator negative pulse id="skill_status"></status-indicator>
                <b className="SkillsTitle"> Skills </b>
                <button className="SkillsGen" type="button" onClick={this.handleSkillClick}>Generate</button>
              <br />
                <textarea name="skills_textbox" rows="6" cols="100" value={this.state.skills} onChange={this.handleSkillChange}
                  placeholder="This will be populated with the character's skills: physical and intellectual.
                  However, you can choose to create these details yourself."> 
                </textarea>
              </p>
            </div>

          </div>

          <div className="Personality">
              <div className="PersonalityHeading">
                <status-indicator negative pulse id="personality_status"></status-indicator>
                <b className="PersonalityTitle"> Personality </b>
                <br />
                <button className="PersonalityGen" type="button" onClick={this.handlePersonalityClick}>Generate</button>
              </div>

              <div className="PersonalityTextBox">
                <p>
                <br />
                  <textarea name="personality_textbox" rows="6" cols="150" value={this.state.personality} onChange={this.handlePersonalityChange}
                    placeholder="This will be populated with the character's personality traits: interests, behavioral quirks,
                    standard traits, etc. However, you can choose to create these details yourself."> 
                  </textarea>
                </p>
              </div>
          </div>

          <div className="LifeInfo">
              <div className="LifeInfoHeading">
                <status-indicator negative pulse id="life_info_status"></status-indicator>
                <b className="LifeInfoTitle"> Life Info </b>
                <br />
                <button className="LifeInfoGen" type="button" onClick={this.handleLifeInfoClick}>Generate</button>
              </div>

              <div className="LifeInfoTextBox">
                <p>
                <br />
                  <textarea name="life_info_textbox" rows="6" cols="150" value={this.state.lifeinfo} onChange={this.handleLifeInfoChange}
                    placeholder="This will be populated with information about the character's life: major events, occupation,
                    family/relationships, etc. You can also choose to create these details yourself."> 
                  </textarea>
                </p>
              </div>
          </div>

        </div>

        <div className="Chat">
          <p>
            Test text for chat
          </p>
        </div>

      </div>
    );
  }
}

export default App;
