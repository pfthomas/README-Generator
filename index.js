const fs = require("fs");
const inquirer = require("inquirer");
const questions = [{
    type: "input",
    message: "What is your project's name?",
    name: "Title"
}, {
    type: "input",
    message: "Please write a short description of your project",
    name: "Description",
}, {
    type: "list",
    message: "What kind of license should your project have",
    name: "License",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
}, {
    type: "input",
    message: "What command should be run to install dependencies",
    name: "Dependencies",
}, {
    type: "input",
    message: "What command should be run to run tests?",
    name: "Tests",
}, {
    type: "input",
    message: "What does the user need to know about using the repo?",
    name: "Usage"
}, {   
    type: "input", 
    message: 'What is your Github username?',
    name: "Github"    
}, {
    type: "input",
    message: "What does the user need to know about contributions to the repo?",
    name: "Contributions",
}, {
    type: "input",
    message: 'What is your email address?',
    name: 'Email'
},
];

const generateReadMe = (data) => {
    return `
# ${data.Title}
${data.License}
## Description
${data.Description}
# Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Tests](#tests)
* [Questions](#questions)

## Installation
To install necessary dependencies, run the following command:
${data.Dependencies}

## Usage
${data.Usage}

## License 
${data.License}
## Contributions
${data.Contributions}

## Tests
${data.Tests}
## Questions 
Reach out for questions at:
Github: https://github.com/${data.Github}
Email: ${data.Email}`
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        
        console.log(fileName);
        console.log(data);
        if (err) {
            return console.log(err);
        } else {
            console.log("README generated");
        }
    })
}

function init() {
    inquirer.prompt(questions)
        .then(function(data){
            if(data.License == "MIT") {
                data.License = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";  
            }
            if (data.License == "APACHE 2.0"){
                data.License ="[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            }
            if (data.License == "GPL 3.0"){
                data.License = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"; 
            }
            if (data.License == "BSD 3"){
                data.License = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"; 
            }
            if (data.License == "None"){
                data.License = '';
            }
            writeToFile("README.md", generateReadMe(data));
            console.log(data)
        })
}

init();
