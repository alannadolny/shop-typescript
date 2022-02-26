# SHOP

## Table of Contents

- [General Info](#general-information)
- [Technologies \ Libraries Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Project Status](#project-status)

## General Information

The main purpose of this project was to build a shop system using typescript and jwt. I wrote backend and frontend for this purpose. I undertook this project because of willing to learn some new technologies on my own.

## Technologies \ Libraries Used

Backend:
-typescript
-cookie-parser
-cors
-dayjs
-express
-jsonwebtoken
-mongoose
-nodemailer
Frontend:
-React (17.0.2)
-react-redux
-react-router-dom
-redux-api-middleware
-redux-logger
-redux-thunk
-typescript
-yup
-material UI

As a database I used MongoDB

## Features

- Creating accounts and signing up on already existing accounts
- Each email must be confirmed after the first login
- Each user has insight into his shopping cart and his shopping history
- Each user can sell his product
- Each user has the option to manage their listings and has a view to already sold items
- There are 3 subpages: ("Search" with the option to find the specified item by their name, "Categories" with products split by categories, "Novelties" presenting 3 the latest listings)
- All signed up are secured by jwt and httpOnly Cookies with expiring time
- Each product has a master-detail view
- There is a special form with yup validation to add new products by users

## Setup

The first thing is to have running up MongoDB. Later if u want to run this project u need to provide this information in the .env file:

```
HOST = '...' fe. (127.0.01)
DATABASE_PORT = ... fe. (27017)
API_PORT = ... fe. (5432)
DATABASE = '...' fe. (auction_service)
SECRET_TOKEN = 'there should be a long string with random characters for jwt'
MAIL_LOGIN = 'there should be a login for mail bot if u want it can be login ending with @gmail.com, but u need to enable option such as access for low secure application'
MAIL_PASSWORD = 'there should be a password for this account'
SECURE = '...' fe. (false)

```

Later you have to write

```
npm i
```

in the backend directory to install all dependencies.
If you have already installed it, you need to write

```
tsc
```

in first console and

```
node ./src/index.js
```

in the second console.
If you see 'connected to MongoDB...' it is running properly.

To run the client-side application you need to write

```
yarn install
```

in frontend directory and then you should be able to write

```
yarn start
```

In a few seconds, all should be running properly.

## Project Status

Project is completed (26.02.2022)
