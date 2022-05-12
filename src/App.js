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
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getGPTResponse() {
    //TODO: implement code here so that OpenAI API is called and appends to current text in textarea
    //TODO: figure out why env variable does not work
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      //apiKey: process.env.OPENAI_API_KEY,
      apiKey: 'Put back API key here',
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion("text-davinci-002", {
      prompt: this.state.value,
      temperature: 0,
      max_tokens: 256,
    });
    //console.log(response.data.choices[0].text);
    this.setState({value: this.state.value + response.data.choices[0].text})
  }

  handleChange(event) {
    //console.log(event.target.value);
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  handleClick(event) {
    //TODO: change alert to be less intrusive
    //alert('Test BasicTraits textbox submission: ' + this.state.value);
    event.preventDefault();
    this.getGPTResponse();
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
              <textarea name="world_info_textbox" rows="6" cols="150" placeholder="Enter details here about the virtual game world that you want a character generated for 
                (one or more sentences)"> 
              </textarea>
            </p>
          </div>

          <div className="BasicTraits">
            <p>
              <label htmlFor="basic_traits_textbox" name="BasicTraitsTitle">Basic Traits</label>
              <button className="BasicTraitsGen" type="button" onClick={this.handleClick}>Generate</button>
            <br />
              <textarea name="basic_traits_textbox" rows="6" cols="100" value={this.state.value} onChange={this.handleChange}
                placeholder="This will be populated with the character's basic traits: name, age, gender, appearance,
                race/species, etc. However, you can choose to create these traits yourself."> 
              </textarea>
            </p>
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
