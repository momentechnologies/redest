[![npm version](https://badge.fury.io/js/redest.svg)](https://badge.fury.io/js/redest)
[![Build Status](https://travis-ci.org/maxmoeschinger/redest.svg?branch=master)](https://travis-ci.org/maxmoeschinger/redest)
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
npm i redest
```
or using yarn
```
yarn add redest
```

# Getting started
## Setup reducer
Where you define all of your reducers, you should import the reducerSetup module and pass it an array of endpoints you want it to handle. The string you passed here will be used throughout the setup.

```JavaScript
import { combineReducers } from 'redux';
import { reducerSetup } from 'redest';

export combineReducers({
    ...storeSetup(['users', 'repos'])
});
```
That's it. you now have a two new stores(users and repos) will all the Rest capabilities.

## Access the data and modify it
```JavaScript
import React from 'react';
import PropTypes from 'prop-types';
import { Redest } from 'redest';

const Component = (props) => {
    return (
        <div 
            onClick={() => {
                props.users_create({ name: 'Max Moeschinger'})
            }}
        >
            test
        </div>
    )
};

Component.propTypes = {
    users: PropTypes.object.isRequired,
    users_create: PropTypes.func.isRequired
};

export default Redest(Component, [{ reducer: 'users' }]);
```

We need to pass an array to the `Redest` wrapper with the data we want it to return.

There is two different type of object you can pass to it. The first one will select a single 
instance in the state. You can see that we are passing a function which takes a `props` parameter.

```JavaScript
{
  reducer: 'users',
  select: (props) => props.match.params.id
}
```
This will return an object looking like this
```JavaScript
{
    entity: Object, 
    meta: {
        error:false,
        ids: [],
        isLoading: false,
        loadedAt: 1499797369337
    }
}
```

and the second type is to select multiple entities in the state.
```JavaScript
{
  reducer: 'users',
  select: (props) => ({
      active: props.active
  })
}
```
This will return an object looking like this
```JavaScript
{
    entities: Array, 
    meta: {
        error:false,
        ids: [],
        isLoading: false,
        loadedAt: 1499797369337
    }
}
```

# Contributing
All contribution is welcomed. Just create a pull request and we will review it.
