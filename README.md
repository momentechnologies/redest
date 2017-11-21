[![npm version](https://badge.fury.io/js/redest.svg)](https://badge.fury.io/js/redest)
[![Build Status](https://travis-ci.org/momentechnologies/redest.svg?branch=master)](https://travis-ci.org/momentechnologies/redest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Redest

How you ever been annoyed by the amount of boilerplate which comes with
communicating to the REST Api from react/redux? well this is what we are trying
to solve here.

This package requires you to have setup an api that follows the REST API
conventions.

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

Where you define all of your reducers, you should import the reducerSetup
module.

```javascript
import { combineReducers } from 'redux';
import { reducerSetup } from 'redest';

export combineReducers({
    redest: ...reducerSetup(options)
});
```

### Options

It is not necessary to pass an options object. Under is all the options you can
pass to it

```javascript
const defaultSettings = {
    internalPropPrefix: '__redest__',
    components: {
        loading: null,
        error: null,
    },
    requests: {
        prefix: '',
        retrieveRequestData: response => response.data,
        retrievePaginationData: response => response._pagination,
        isErrorResponse: (statusCode, response) => statusCode >= 400,
        processError: error => error,
        batch: {
            enabled: false,
            delayTimeMS: 10,
            url: '/batch',
            method: 'POST',
            buildRequestBody: requests => {
                return {
                    batch: requests,
                };
            },
            parseResponse: response =>
                response.map(singleResponse => ({
                    body: singleResponse.body,
                    statusCode: singleResponse.statusCode,
                })),
        },
    },
};
```

#### Component loading

This is the component it should render by default when loading.

#### Component error

This is the component it should render by default when there is an error.

#### Requests prefix

Here you can define a prefix you want all of your requests to have.

#### Requests retrieveRequestData

This method is called before your response is handled. The default here assumes
that the response looks like this:

```json
{
    "data": "some data"
}
```

It is important to return the data formated in the correct way from this
function.

##### multiple entities

Should return an array of entities. It is important that all entities have an id
so that we can normalize the data.

##### single entity

Should return an object of the entity. It is important that all entities have an
id so that we can normalize the data.

##### raw

Should return whatever is going to be stored

#### Requests retrievePaginationData

should return an object containing the pagination info of the request or be null
if there is no request data. the object should look like this:

```json
{
    "total": 1,
    "limit": 5
}
```

Total is total number of entities there is and the limit is how many entities we
should display per page.

#### Requests isErrorResponse

To find out if the request is successful

#### Requests processError

do whatever you need to format the error

#### Requests batch

This is so that if you make multiple request in the delayTimeMS (default 10ms)
they will be sent as one request.

##### buildRequestBody

takes a list of requests as an argument. Each element looks like this:

```json
{
    "method": "GET",
    "url": "/users",
    "body": "some data"
}
```

It should return an object which will be sent as the request body.

##### parseResponse

Takes the response as it's only parameter. this function should return an array
of object containing two elements.

1. `body` should be whatever would have been return if it was a normal request
2. `statusCode` the html status code.

## Setup your component

In order to fetch and use the data you need to wrap your component with `Redest`
and pass your component as the first argument and a function which takes a props
argument as the second argument. This function will from this point on be called
the `selector function`. Under is an example of the Redest wrapper.

```javascript
import { Redest } from 'redest';

...

export default Redest(Component, (props) => ({ users: props.match.params.id }));
```

## The Selector function

this function takes a props argument so that you can decide what data you want
to access. It returns an object where each entries represent data that you want
to retrieve. There are multiple format supported and under are explanations on
all the different types of objects you can return.

### Get all

Let's say you want to retrieve all users.

```json
{
    "users": "all"
}
```

or

```json
{
    "users": {
        "filter": "all"
    }
}
```

This will make a GET request to `/users` endpoint.

### Get all with parameters

For example if you want to get all female users.

```json
{
    "users": {
        "filter": {
            "gender": "female"
        }
    }
}
```

This will make a GET request to `/users?gender=female` endpoint.

### Get single entry

For example if you want to get a single user.

```json
{
    "users": 1
}
```

or

```json
{
    "users": {
        "filter": 1
    }
}
```

This will make a GET request to `/users/1` endpoint.

### Extra parameters

If you need to customize some part of the request made in redest you can do so
here as well. There is three extra parameter you can pass to it. Under is what
they default to internally if you do not pass them. Endpoint and reducer is
calculated from the object key.

```json
{
    "users": {
        "endpoint": "/users",
        "reducer": "users",
        "raw": false
    }
}
```

#### Object Key

The key of the object is used for creating the props name that Redest passes to
the component.

#### Endpoint

Endpoint parameter will be used as url when making the call to your backend

#### Reducer

The name of the reducer we are going to use internally to store the data.

#### Raw

Internally Redest will automatically normalize your data. This is an option to
disable that.

## Accessing the data in your props

Let's says you have setup your selector function to retrieve `users`. This means
you will have a prop in your component called `this.props.users`.

### Select multiple users

If you have decided to retrieve multiple users entities the `this.props.users`
variable will have this structure:

```json
{
    "entities": [],
    "meta": {
        "isLoading": false,
        "loadedAt": 10923874,
        "error": false,
        "ids": []
    }
}
```

### Select single user

If you have decided to retrieve one user the `this.props.users` variable will
have this structure:

```json
{
    "entity": {},
    "meta": {
        "isLoading": false,
        "loadedAt": 10923874,
        "error": false
    }
}
```

### Select raw data

If you have decided to retrieve data with `raw = true` the `this.props.users`
variable will have this structure:

```json
{
    "data": {},
    "meta": {
        "isLoading": false,
        "loadedAt": 10923874,
        "error": false
    }
}
```

### dispatching actions in your component

All the actions will be made available alongside the meta, entity, entities and
data object that we saw above. So let's say that you fetched all users, your
`users` prop will actually look like this:

```javascript
users = {
    entities: [],
    meta: {
        isLoading: false,
        loadedAt: 10923874,
        error: false,
        ids: [],
    },
    actions: {
        create: data => {},
        update: (id, data) => {},
        remove: id => {},
        invalidate: () => {},
    },
};
```

All actions under assumes that we are working with users.

#### Create

It takes one argument which is an object that contains the data you want to send
to the backend. It will automatically make a POST request to `/users` endpoint.

#### Update

It takes two arguments

1. the id of the entity you want to Update
2. the data you want to send to the backend

This endpoint will make a POST request to `/users/:id`. So if the id you want to
update is `10`, it will make a request to `/users/10`

#### Remove

It takes one argument which is the id of the entity you want to remove. It will
make a DELETE request to `/users/:id`

#### Invalidate

This function will invalidate the cache so that we will refetch the next time
the data is accessed.

# Contributing

Please take a look at our
[contribution page](https://github.com/momentechnologies/redest/blob/master/CONTRIBUTING.md)
