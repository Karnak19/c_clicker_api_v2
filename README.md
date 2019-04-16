# Wilder Clicker API Project

## Getting Started

Welcome !  
Clone this repo, then `npm install` to install the dependencies.  
`npm start` to start the Express server, and that's it !

## Environment variables

Create an .env file with theses variables

```
PORT=3000
HOST='localhost'
DB_USER='user'
DB_PW='password'
DB_DATABASE='name_of_your_database'
```

You should probably change the PORT to not get conflict with your React development server :wink:

## Routes

### Get users collection (GET)

`localhost:3000/user/` will return you all the users from your database :

```json
[
   {
      "id": 2,
      "pseudo": "Baz",
      "score": 12,
      "isLogged": 0
   },
   {
      "id": 3,
      "pseudo": "Yacine",
      "score": 0,
      "isLogged": 0
   },
   {
      "id": 4,
      "pseudo": "samy",
      "score": 0,
      "isLogged": 0
   }
]
```

### Get an user (GET)

`localhost:3000/user/{id}` will return you the user who match the id from the request :

```json
[
   {
      "id": 2,
      "pseudo": "Baz",
      "score": 12,
      "isLogged": 0
   }
]
```

### Increment user score (PUT)

`localhost:3000/user/{id}/click` will increment the score of the user who match the id from the request.

### Create a new user (POST)

`localhost:3000/user/subscribe` will create a new user.  
It takes a body :

```json
{
   "pseudo": "the pseudo"
}
```

and that's it.

## Database

The database got a single Tables named Users structured like this :

```
id : INT PRIMARY KEY AUTO_INCREMENT
pseudo : VARCHAR 255
score : INT
isLogged : BOOLEAN
```
