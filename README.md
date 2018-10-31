[![Waffle.io - Columns and their card count](https://badge.waffle.io/SoftStackFactory/reboot.svg?columns=all)](https://waffle.io/SoftStackFactory/reboot)

![Travis CI Status](https://travis-ci.org/SoftStackFactory/reboot.svg?branch=master "Travis CI Status")


# Reboot

Reboot is an ionic application that assists verterans reintegrate into civilian life by assisting them and providing information and resources along the way. 

## Getting Started

Reboot is an ionic project using typescript. The backend API uses MongoDB as a data source for a loopback api server. The corresponding backend server can be found at: 

```
https://github.com/SoftStackFactory/reboot-backend
```

### Prerequisites

To begin make sure node and npm are installed. Please make sure latest Node 6 LTS and NPM 3+ are installed. In addition, make sure that you have [Ionic CLI](https://ionicframework.com/docs/cli/) installed locally. This project was uses Ionic 3.x. 

```
npm install -g ionic
```

### Installing

Clone the remote repository

```
git clone https://github.com/SoftStackFactory/reboot
```

From within the `reboot` directory, run `npm install` to install all dependencies.

```
npm install
```

Once that completes, use `ionic serve` to get a local copy running

```
ionic serve
```

This should deploy the an instance of the app running locally at:

```
http://localhost:3000/
```


### Branches

Reboot employs a release branch methodology for maintaining our branches. When working with new branches, create branches off of `dev` only.

`master` - Current release working production branch

`dev` - Next release development branch

Whenever you pick up working on the application, make sure that you fetch the current state of the application. This can be done by using the command:  

```
git pull
```

Then, you'll need to checkout a branch to work from. Most of the time it will be dev:

```
git checkout -b [123-my-branch-name] origin/dev
```

For branch names, please use `[issue number]-[my-branch-name]`. For example, if I was working off of an issue # 4 for a feature to add a menu, I would name my new branch `4-new-menu`.

Try to make sure the branch name is a good description of what you're working on. Avoid nonsensical naming conventions. 

### Committing Changes

When you've completed changes on your branch, you can publish the branch to the repo. Always make sure that your commit messages have a concise title. 

If you need to go into more detail, please use a longer commit message to list out changes.

A good example of commit messages can be found [here](https://github.com/erlang/otp/wiki/writing-good-commit-messages).

```
git commit -m 'A Git commit message'
```

### Pull Requests

Pull request should have some description of the changes and what features/files or issues it address. 

Also list any issues the pull request resolves so that they can be closed out.

Label all finished issues with `done` and the pull request itself with `code review`.

## Deployment

There will be two deployment scenarios: 

#### Master 

This is deployed to Ionic Pro and any changes that get merged into master will be deploy automatically to the view app.

To view the project, download the view application and use the following AppID: `1022DD18`.

This will always reflect `origin/master`. 

#### Dev

This will be a working development branch. The repo admin will have access to this and will deploy it on a regular release schedule.

This will live at the following url: `http://ssf-reboot.herokuapp.com/`

#### Locally

You may also deploy to a heroku instance of your own. Within the `/reboot/` directory, create a `Procfile` with the following: 

```
web: npm run build:dev && npm start
```

Make sure you've logged in:
```
heroku login
```

Also make sure the remote is tied to your heroku app that you set up:
```
heroku git:remote -a my-own-app-name-123
```

Finally, install the following plugin:
```
heroku plugins:install heroku-builds
```

At any point in time, you can push this build up to your own heroku instance without commiting it to git (that way our file system stays intact). 

Deploy it using the following command: 
```
heroku builds:create -a my-own-app-name-123
```


## Built With

* [Ionic](https://ionicframework.com/)
* [Angular](https://angular.io/)
* [MongoDB](https://www.mongodb.com/)
* [Loopback](http://loopback.io/)
* [ChartJs](http://www.chartjs.org/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
