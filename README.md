# Notes

# Description

This is a React Typescript application where you can store your thoughts, or ideas, information. I made this app because the journey of a developer is hard and full of new information, and I wanted an app where I can store everything I learn. 
So this application is basically helping me collect the useful information on my path to become a better developer, and I also wanted to practice typescript. 

## Stack
- TypeScript
- React
- Axios
- Vite
- Asp.Net Core
- MS SQL 

## Features
- Note creation
- Tag creation
- Managing tags
- Updating notes,tags
- Everything is persisted

## Production build

This is a version without api and database, but works the same. Just for presentational purposes. Later I want to deploy the complete application.
[Deployed to Azure.](https://jolly-cliff-05f03e503.2.azurestaticapps.net/)

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

- Deploy the complete app to Azure
- User registration/log in
- Testing back end

