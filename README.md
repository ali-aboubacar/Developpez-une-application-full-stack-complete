# P6-Full-Stack-reseau-dev

## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Where to start

As you may have seen if you already started the app, a simple home page containing a logo, a title and a button is available. If you take a look at its code (in the `home.component.html`) you will see that an external UI library is already configured in the project.

This library is `@angular/material`, it's one of the most famous in the angular ecosystem. As you can see on their docs (https://material.angular.io/), it contains a lot of highly customizable components that will help you design your interfaces quickly.

## Instalation base de donner
creer une base de donner au nom de db_mdd_api 
## Run
Cloner le projet depuis le github.

Remplacer dans le fichier apllication.properties les valeurs suivant par vos propre access
* spring.datasource.username=
* spring.datasource.password=

lancer le projet en local ce qui va creer aumatiquement les tables necessaire.
lancer les Query suivant pour peupler les tables roles et themes.
>INSERT INTO roles(name) VALUES('ROLE_USER');
>INSERT INTO roles(name) VALUES('ROLE_MODERATOR');
>INSERT INTO roles(name) VALUES('ROLE_ADMIN');

>INSERT INTO themes(name, description) VALUES('THEME_ONE','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
>INSERT INTO themes(name, description) VALUES('THEME_TWO','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
>INSERT INTO themes(name, description) VALUES('THEME_THREE','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
>INSERT INTO themes(name, description) VALUES('THEME_FOUR','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
