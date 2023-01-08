# Notes

# Description

This is a React Typescript application where you can store your thoughts, or ideas, information. I made this app because the journey of a developer is hard and full of new information, and I wanted an app where I can store everything I learn. 
So this application is basically helping me collect the useful information on my path to become a better developer, and I also wanted to practice typescript. 

The front-end and back-end apps are both deployed to azure in separate containers, the application uses an sqlite database, which is deployed with the back-end app. This way I didn't have to rent an sql server. This solution has some disadvantages, but it is only for presentational purpose.

A CI-CD pipeline is implemented, every time there is a push, or a pull request is made on the development branch, the deployed app is updated.

I develop the application to be fully responsive.

## Stack
- TypeScript
- React
- Axios
- Vite
- Asp.Net Core
- Sqlite database

## Features
- Note creation
- Tag creation
- Managing tags
- Updating notes,tags
- Everything is persisted
- Day/Night theme
- Responsive page and side navigation bar

## Production build

[Deployed to Azure.](https://jolly-cliff-05f03e503.2.azurestaticapps.net)

## Run Locally
##### Prerequisites

- Microsoft Visual Studio to run ASP .NET backend
- Node.js to run React frontend

Clone the project and navigate to the project folder

```bash
  git clone https://github.com/vmarcell96/react-ts-notes
  cd .\MarkdownNotesApp
```

Starting frontend:
Go back to the root directory of the repository and navigate to:

```bash
  cd .\MarkdownNotesApp\ClientApp\react-ts-notes
```

Install packages

```bash
  npm i
```

Start the application 

```bash
  npm run dev
```
Client should be available at `localhost:5173`

Starting the backend:

Open MarkdownNotesApp.sln in Microsoft Visual studio
Run IIS Express server

## Roadmap

- User registration/log in
- Authentication/Authorization
- Testing back end

