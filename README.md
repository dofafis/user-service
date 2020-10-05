# User Project

This repository contains a backend (user-api) project and a frontend (user-gui) project.

## Requirements

These are the requirements for you to run this project:
- make
- docker
- docker-compose

## Running the project

If you have all the requirements listed, you just need to run the following commands **INSIDE THE 'setup' FOLDER (```cd setup```)**:

1. Setup your host configuration to access the frontend with https://frontend.user.com.br (alternatively, you can just run the next steps and access the frontend by http://localhost):
```
sudo make setup-hosts  
``` 
OBS: you need to run it with sudo because /etc/hosts is a protected file

2. Run the project, the following command creates the database and runs the backend, frontend and Nginx reverse proxy server:
```
make run
```

## Running Tests

On root directory:
```
cd setup
make tests
```

## Directories:

- user-api: An API made with NestJs framework and PostgreSQL database
    - This API has a Swagger documentation with the routes and request parameters for you to test 
    - You also can run the tests made with jest package to test basic functionalities

- user-gui: A frontend service made with Angular 10

## Configs 

In this case I chose to commit config files to the repository, but the right way is to have a specific storage with controlled access.
