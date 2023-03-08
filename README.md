# CharGen 
CharGen is a tool that helps video game developers (indie or AAA) in the development of their games by leveraging AI-powered character generation. \
Created as a class project for COEN296 at SCU.

## Features
1. Character Trait and Backstory Generation (Character Template)
2. Character Chatbot

## Details
The Character Template allows the creation of the character's basic traits (name, age, etc.), skills, personality, and life information/backstory. More can be added to these sections yourself and the AI can even be queried to generate additional information if you ask it in the textbox. \
The Character Chatbot will use all the previous information that was created or generated to allow the user to talk with the character. The chatbot is pretty accurate at replicating how the character would act in the game world with it being able to reference the character's various traits and backstory.

## Notes
* Each section of CharGen needs to be filled out sequentially due to how the AI model works and some initial information about the game world is required as well.

* Since I did not have time to create an actual website, the only way to run CharGen is to clone the repo and run locally with "npm start."

* You will need to add your own OpenAI API key to get CharGen to run.

## Technologies Used
* React
* OpenAI GPT-3
* Node JS
