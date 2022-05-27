import './App.css';
import React from 'react';
//import logo from './logo.svg';
//import { Route, Routes, Link } from 'react-router-dom';
//import MainPage from './MainPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    /*
    this.worldInfo_state = {
      value: ''
    };
    */
    //TODO: figure out how to name this differently
    this.state = {
      worldinfo: '',
      basictraits: '',
      skills: ''
    };

    this.handleTraitChange = this.handleTraitChange.bind(this);
    this.handleTraitClick = this.handleTraitClick.bind(this);
  }

  async getGPTResponse(button_num) {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      //apiKey: process.env.OPENAI_API_KEY,
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);
    if(button_num === 0) {
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: this.state.basictraits,
        temperature: 0,
        max_tokens: 256,
      });
      //console.log(response.data.choices[0].text);
      this.setState({basictraits: this.state.basictraits + response.data.choices[0].text})
    }
  }

  handleTraitChange(event) {
    //console.log(event.target.value);
    this.setState({basictraits: event.target.value});
    console.log(this.state.basictraits);
  }

  handleTraitClick(event) {
    //TODO: change alert to be less intrusive
    //alert('Test BasicTraits textbox submission: ' + this.state.value);
    event.preventDefault();
    this.getGPTResponse(0);
  }

  handleChange(event) {
    //this does nothing for now
  }

  handleClick(event) {
    //this does nothing for now
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
              <label htmlFor="world_info_textbox" name="WorldInfoTitle">Virtual World Information (REQUIRED)</label>
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
                <b className="SkillsTitle"> Skills </b>
                <button className="SkillsGen" type="button" onClick={this.handleClick}>Generate</button>
              <br />
                <textarea name="skills_textbox" rows="6" cols="100" value={this.state.value} onChange={this.handleChange}
                  placeholder="This will be populated with the character's skills: physical and intellectual.
                  However, you can choose to create these details yourself."> 
                </textarea>
              </p>
            </div>

          </div>

          <div className="Personality">
              <div className="PersonalityHeading">
                <b className="PersonalityTitle"> Personality </b>
                <br />
                <button className="PersonalityGen" type="button" onClick={this.handleClick}>Generate</button>
              </div>

              <div className="PersonalityTextBox">
                <p>
                <br />
                  <textarea name="personality_textbox" rows="6" cols="150" value={this.state.value} onChange={this.handleChange}
                    placeholder="This will be populated with the character's personality traits: interests, behavioral quirks,
                    standard traits, etc. However, you can choose to create these details yourself."> 
                  </textarea>
                </p>
              </div>
          </div>

          <div className="LifeInfo">
              <div className="LifeInfoHeading">
                <b className="LifeInfoTitle"> Life Info </b>
                <br />
                <button className="LifeInfoGen" type="button" onClick={this.handleClick}>Generate</button>
              </div>

              <div className="LifeInfoTextBox">
                <p>
                <br />
                  <textarea name="life_info_textbox" rows="6" cols="150" value={this.state.value} onChange={this.handleChange}
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
      /* Keep this for now as it shows how to add navigation tabs
      <div className="App">
        <div>
          <nav>
            <ul id="navigation">
              <li>
                <Link to="/">Character Template</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
      */
    );
  }
}

export default App;
