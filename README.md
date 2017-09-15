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
    ...storeSetup()
});
```

## Access the data and modify it
```javascript
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

export default Redest(Component, (props) => ({ users: props.match.params.id}));
```

We need to pass a function to the `Redest` wrapper with the data we want it to return. Under is a couple of examples

```javascript
(props) => ({
    users: props.match.params.id
})
```
This will return an object looking like this under `this.props.users`
```javascript
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
```javascript
(props) => ({
    users: {
        active: props.active
    }
})
```
or 
```javascript
(props) => ({
    users: 'all'
})
```
This will return an object looking like this
```javascript
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

# What endpoints are called with different parameters?
1. multiple entities ('all' or object) `/api/{endpoint}` with all parameters in the object as get parameters
2. on entity `/api/{endpoint}/{entity id}`

## Actions passed in props
in addition to the get function we have multiple functions passed to the wrapped component. Here are all of them and what they do:
1. `this.props.{endpoint}_create`: this is a function that takes one parameter and returns a promise. It will make a post request to `/api/{endpoint}` with the data:
```javascript
({
    name: 'Max Moeschinger',
    age: 23
}).then(
    (success) => {},
    (error) => {},
);
```
2. `this.props.{endpoint}_update`: this is a function that takes two parameter, the record id to update and the data, and returns a promise. It will make a post request to `/api/{endpoint}/{id}` with the data:
```javascript
(1, {
    name: 'Max Moeschinger',
    age: 23
}).then(
    (success) => {},
    (error) => {},
);
```


# Contributing
All contribution is welcomed. Just create a pull request and we will review it.
