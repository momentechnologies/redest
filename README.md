[![npm version](https://badge.fury.io/js/redest.svg)](https://badge.fury.io/js/redest)
[![Build Status](https://travis-ci.org/momentechnologies/redest.svg?branch=master)](https://travis-ci.org/momentechnologies/redest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
# Redest
How you ever been annoyed by the amount of boilerplate which comes with communicating to
the REST Api from react/redux? well this is what we are trying to solve here.

This package requires you to have setup an api that follows the REST API conventions.

# Dependencies
In order to use this package you need to have those installed:
1. react
2. react-redux
3. prop-types

# Installation
You start by adding this package to your project
```
npm i redest --save-dev
```
or using yarn
```
yarn add redest
```

# Getting started
## Setup reducer
Where you define all of your reducers, you should import the reducerSetup module.

```javascript
import { combineReducers } from 'redux';
import { reducerSetup } from 'redest';

export combineReducers({
    ...reducerSetup()
});
```

## Setup your component
In order to fetch and use the data you need to wrap your component with `Redest` and pass your component as the first
argument and a function which takes a props argument as the second argument. This function will from this point on be
called the `selector function`. Under is an example of the Redest wrapper.
```javascript
import { Redest } from 'redest';

...

export default Redest(Component, (props) => ({ users: props.match.params.id}));
```

## The Selector function
this function takes a props argument so that you can decide what data you want to access. It returns an object where
each entries represent data that you want to retrieve. There are multiple format supported and under are explanations
on all the different types of objects you can return.

### Get all
Let's say you want to retrieve all users.
```
{
    'users': 'all'
}
```
This will make a GET request to `/users` endpoint.

### Get all with parameters
For example if you want to get all female users.
```
{
    'users': {
        filter: {
            gender: 'female'
        }
    }
}
```
This will make a GET request to `/users?gender=female` endpoint.

### Get single entry
For example if you want to get a single user.
```
{
    'users': 1
}
```
This will make a GET request to `/users/1` endpoint.

### Extra parameters
If you need to customize some part of the request made in redest you can do so here as well. There is three extra
parameter you can pass to it. Under is what they default to internally if you do not pass them. Endpoint and reducer
is calculated from the object key.
```
{
    'users': {
        endpoint: '/users',
        reducer: 'users,
        raw: false
    }
}
```
#### Object Key
The key of the object is used for creating the props name that Redest passes to the component.

#### Endpoint
Endpoint parameter will be used as url when making the call to your backend

#### Reducer
The name of the reducer we are going to use internally to store the data.

#### Raw
Internally Redest will automatically normalize your data. This is an option to disable that.

## Accessing the data in your props
Let's says you have setup your selector function to retrieve `users`. This means you will have a prop in your
component called `this.props.users`.

### Select multiple users
If you have decided to retrieve multiple users entities the `this.props.users` variable will have this structure:
```
{
    entities: [],
    meta: {
        isLoading: false,
        loadedAt: 10923874,
        error: false,
        ids: []
    }
}
```

### Select single user
If you have decided to retrieve one user the `this.props.users` variable will have this structure:
```
{
    entity: {},
    meta: {
        isLoading: false,
        loadedAt: 10923874,
        error: false
    }
}
```

### Select raw data
If you have decided to retrieve data with `raw = true` the `this.props.users` variable will have this structure:
```
{
    data: {},
    meta: {
        isLoading: false,
        loadedAt: 10923874,
        error: false
    }
}
```


# Contributing
All contribution is welcomed. Just create a pull request and we will review it.
