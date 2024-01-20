<h1 align="center">Brickable</h1>
<p align="center">A full stack web application built upon the Express js library, allowing users to browse LEGO sets</p>

## Contents

- [Why?](#why)
- [Tech Used/Prerequisites](#tech-used)
- [Database Setup](#database-setup)
- [Installation (to run locally)](#installation-local-run)
- [Want to Contribute?](#contribution)

## Why?

- Educational Purposes
- Passion for LEGO
- To practice skills

## Tech Used

[![My Skills](https://skillicons.dev/icons?i=js,html,css,express,tailwind,mongo,postgresql)](https://skillicons.dev)

## Database Setup
Firstly we will need to setup two databases. We will be using MongoDB to store the users, and PostgreSQL for the types of LEGO sets. You won't have to worry about the creation of the collections/schemas because the project has models for that and they will be created for you.

### MongoDB
1. Create an account at https://www.mongodb.com/
2. Choose a plan
3. Create a cluster
4. Create a database in the cluster you just created, name it whatever you'd like

### PostgreSQL
1. Create an account at https://neon.tech/
2. Create a new project
3. Save the connection string somewhere, we will need it later on


## Installation (Local Run)

1. Clone the repository `git clone https://github.com/arjund3v/Brickable.git`
2. Install all dependancies and packages `npm install`
3. Create a `.env` file in the root of the directory. You will need to add 4 variables:
   - `MONGODB=mongConnectionString`
   - `DB_HOST=neonTechHostName`
   - `DB_PASSWORD=neonTechDBPassword`
   - `DB_DATABASE=neonTechDBName`
   - `DB_USER=neonTechUserName`
5. Start the application `npm run dev`
6. Naviagate to `localhost:3000` to view the webpage

## Contribution

1. Clone the repository `git clone https://github.com/Tango404/Study-me.git`
2. Improve the application by:
   - Adding a feature
   - Resolving an issue
   - Refactoring code
   - Fixing bugs
3. Test the new change locally
5. If all is well, create a pull request with a detailed explanation of the change's
