
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/StuFleisher/Parsley-Frontend">
    <img src="images/ParsleyLogo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Parsley</h3>

  <p align="center">
    If you've ever lost your place in a recipe while switching between the ingredients and instructions sections, Parsley is the solution for you.  Parsley leverages AI to parse and reformat recipes, putting each ingredient right next to the instructions where it is required.
    <br />
    <a href="https://github.com/StuFleisher/Parsley-Frontend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/StuFleisher/Parsley-Frontend">Front End Repo</a>
    ·
    <a href="https://github.com/StuFleisher/Parsley-Backend">Back End Repo</a>
    <br/>
    <a href="https://parsley.cooking">Live Site</a>
    ·
    <a href="https://github.com/StuFleisher/Parsley-Frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/StuFleisher/Parsley-Frontend/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://parsley.cooking)

Parsley allows users to generate records easily from copy/pasted text.  We leverage the
OpenAI api to parse and format user entries into usable JSON for user-friendly display.

This is the Frontend Repository.  For the Backend Repository, please visit <a href="https://github.com/StuFleisher/Parsley-Backend">Parsley-Backend</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![TypeScript][TypeScript]][TypeScript-url]
* [![React][React.js]][React-url]
* [![Express][Express.js]][Express-url]
* [![MUI][MUI]][MUI-url]
* [![postgresql][postgresql]][postgresql-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/StuFleisher/Parsley-Frontend.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Environment Variables
You'll need to set up the following environment variables in your .env file

* REACT_APP_BASE_URL (your backend server address)
</ul>


### Testing
Due to rapid iteration in the early stages of development, Front End testing is still pending.


<!-- USAGE EXAMPLES -->
## Usage

### User Flow
![User Flow Diagram][user-flow]


Here are a few additional features of the app:<br/>
* Auth controls for user registration and login
* CRUD access for recipes (registered users) and users (admin only)
* Users can store their most commonly used recipes in their cookbook for easy access
* Supports searching and filtering recipe records via query strings
* Handles user images by validating, minifying and resizing images for storage in S3
* DevOps tools for reporting bugs and measuring recipe create request performance

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Improve testing and documentation throughout the codebase
- [ ] Add OCR to enable recipe creation from screenshots and photos
- [ ] Add a tagging system to more easily group/search recipes
- [ ] Fine-tune OpenAi Model to reduce token usage and improve responses
- [ ] Add password recovery
- [ ] Create Save to PDF feature
- [ ] Unit conversion & recipe doubling
- [ ] Checkboxes/accordions for completed recipes


See the [open issues](https://github.com/StuFleisher/Parsley-Frontend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - StuartFleisher([linkedin_url]) - stufleisher@gmail.com

Project Link: [https://github.com/StuFleisher/Parsley-Frontend](https://github.com/StuFleisher/Parsley-Frontend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []() MUI - an excellent library of UI components who cut my development time down significantly
* []() FontAwesome for providing the icons used throughout the site
* []() Joel Burton, Kate Moser and the staff at Rithm School who taught me to code

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/StuFleisher/Parsley-Frontend.svg?style=for-the-badge
[contributors-url]: https://github.com/StuFleisher/Parsley-Frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/StuFleisher/Parsley-Frontend.svg?style=for-the-badge
[forks-url]: https://github.com/StuFleisher/Parsley-Frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/StuFleisher/Parsley-Frontend.svg?style=for-the-badge
[stars-url]: https://github.com/StuFleisher/Parsley-Frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/StuFleisher/Parsley-Frontend.svg?style=for-the-badge
[issues-url]: https://github.com/StuFleisher/Parsley-Frontend/issues
[license-shield]: https://img.shields.io/github/license/StuFleisher/Parsley-Frontend.svg?style=for-the-badge
[license-url]: https://github.com/StuFleisher/Parsley-Frontend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stufleisher
[product-screenshot]: images/screenshot_01.png
[user-flow]: assets/Sitemap.png

[React.js]: https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=61DAFB
[Express-url]: https://expressjs.org/
[postgresql]: https://img.shields.io/badge/postgresql-000000?style=for-the-badge&logo=postgresql&logoColor=61DAFB
[postgresql-url]: https://postgresql.org/
[postgresql]: https://img.shields.io/badge/postgresql-000000?style=for-the-badge&logo=postgresql&logoColor=61DAFB
[postgresql-url]: https://postgresql.org/
[MUI]: https://img.shields.io/badge/mui-000000?style=for-the-badge&logo=mui
[MUI-url]: https://mui.com/material-ui/
[SASS]: https://img.shields.io/badge/sass-000000?style=for-the-badge&logo=sass
[SASS-url]: https://sass-lang.com/
[TypeScript]: https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript
[TypeScript-url]: https://www.typescriptlang.org/