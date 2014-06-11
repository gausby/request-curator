Express Request Curator
=======================
[![Build Status](https://secure.travis-ci.org/gausby/request-curator.svg?branch=master "Build Status")](http://travis-ci.org/gausby/request-curator)

Request Curator is a middleware for [Express](http://expressjs.com) that makes it possible to GET multiple resources in one go. It should be easy to inject into any existing Express application/api. It is especially useful in single page applications that need to get the response of multiple api endpoints.


## Installation
The project is available on NPM via `npm install request-curator --save`. When it is installed it will be available using `require('request-curator')`.


## Usage
Define an endpoint in your Express application and apply the request curator middleware to it.

The following defines a simple Express application that respond to `/api/foo` and `/api/bar`. There is a curator endpoint, `/api/multi`, that respond with a object literal that contain the result of the requested endpoints.

```javascript
var express = require('express');
var curator = require('request-curator');

var app = express();

app.get('/api/multi', curator(), function(req, res) {
    // For this example we will just return the content
    // of `multi`, but you can do anything to the data
    // before sending it to the user.
    res.json(req.multi);
});

app.get('/api/foo', function(req, res) {
    res.json({ foo: 'bar' });
})

app.get('/api/bar', function(req, res) {
    res.json({ bar: 'baz' });
})

app.listen(3001);
```

Now it is possible to get the result of multiple GET requests like so:

```shellsession
$ curl --request GET 'http://localhost:3001/api/multi?foo=/api/foo&bar=/api/bar'
{"foo":{"foo":"bar"},"bar":{"bar":"baz"}}
```

The curator will respond with an empty object if no parameters has been passed.

```shellsession
$ curl --request GET 'http://localhost:3001/api/multi'
{}
```

### Error Handling
An error object will be returned if one of the requested endpoints does not exist and the return status will be 404. In the following example we will try to get the existing `/api/foo` and the nonexistent `/api/baz` from the application we build in the usage section.

```shellsession
$ curl --request GET 'http://localhost:3001/api/multi?foo=/api/foo&baz=/api/baz'
{"err":["Cannot GET /api/baz\n"]}
```

The `err` object is an array. The array will have an entry of each of the errors that occured.


## Development
Clone the repository and run `npm install` in the project to get the third party modules.

Run the test suit by typing `npm test` or `grunt test` in the project root. A file watcher can be activated using `grunt watch` which will run the unit tests, and other QA tools, on file modification.

Pull requests are welcome, but please provide unit tests for added functionality, or a failing unit test if you file a bug report.


## License
The MIT License (MIT)

Copyright (c) 2014 Martin Gausby

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
