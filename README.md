[![npm version](https://badge.fury.io/js/redest.svg)](https://badge.fury.io/js/redest)
[![Build Status](https://travis-ci.org/maxmoeschinger/redest.svg?branch=master)](https://travis-ci.org/maxmoeschinger/redest)
# redest
How you ever been annoyed by the amount of boilerplate which comes with communicating to 
the REST Api from react/redux? well this is what we are trying to solve here. 

This package requires you to have setup an api that follows the REST API conventions.

# dependencies
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