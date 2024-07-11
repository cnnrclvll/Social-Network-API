![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)

# Social-Network-API

## Table of Contents
- [Description](#description)
- [Installation/Usage](#installation/usage)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Description

Social Network API allowing users to become friends and share thoughts/reactions. The API uses MongoDB for database management and Express.js for routing.

## Installation/Usage

[Tutorial Video](https://www.loom.com/share/b8d88d314a8e454397beaf0006cb9e60?sid=dbcd34e4-ff52-46ef-84a3-b791408f2e88)

To access the API without front-end configuration, you will need MongoDB Compass, Insomnia, or a similar API development software. In the terminal and from the application directory, run the command `npm install` to install necessary packages and generate a package-lock.json file. Run the command `npm run start` to initiate the API. Begin generating data instances using HTTP requests in your API development software. All routes and models are listed below for ease in generating successful requests.

## Routes
### Users

`/api/users` GET all users POST new user

`/api/users/:userId` GET one user PUT (update) one user DELETE one user

Payload:

```
{
	"username": "",
	"email": ""
} 
```

`/api/users/:userId/friends/:friendId` POST new friend DELETE one friend

### Thoughts

`/api/thoughts` GET all thoughts POST new thought

`/api/thoughts/:thoughtId` GET one thought PUT (update) one thought DELETE one thought

Payload:

```
{
	"thoughtText": "",
	"username": "",
	"userId": ""
}
```

`/api/thoughts/:thoughtId/reactions` POST new reaction

Payload:

```
{
		"reactionBody": "",
		"username": ""
}
```

`/api/thoughts/:thoughtId/reactions/:reactionId` DELETE one reaction

## Contributing

To contribute to the project, visit the GitHub repository and share your thoughts via email (see below).

## License

This project is licensed under the Unlicense. A public domain dedication intended to release software into the public domain, waiving all copyright and related rights.

## Questions

If you have any questions, feel free to reach out:

- GitHub: [cnnrclvll](https://github.com/cnnrclvll)
- Email: <a href="mailto:cnnrclvll@gmail.com">cnnrclvll@gmail.com</a>