# Node.js and Express Basics
One of the things that came from my first mentoring video was that I did not take enough time to explain the Express example server I used in the video. I intend to correct that right now and I'm going to do it in three phases.

## Phase 1: Apache and nginx
You've probably heard of these two servers. They are very commonly used to build websites.

Both are servers all by themselves. They can serve up static files. They can change one incoming URL to another. They can proxy for other servers and can handle HTTPS security and make sure that special pages show up for 404 and 500 errors on the back-end. They have lots and lots of capabilities and they are all about configuration.

And configuring them (I'm generalizing here because I don't have much experience with nginx, only Apache) can run to hundreds of lines:
[html5-boilerplate/.htaccess at master · h5bp/html5-boilerplate · GitHub](https://github.com/h5bp/html5-boilerplate/blob/master/dist/.htaccess)

But they still cannot handle everything. If you need to have a server that gets some of its files out of a bucket on Amazon's S3 service, I don't know that there is an Apache plugin for that. And even if there were, I'm pretty sure there are a lot of other things you might want your server to do that neither Apache nor nginx support. In the past the way anything specific to different websites has been handled is to pair Apache or nginx with another server which used JavaScript, Java, PHP, etc. to handle all of the dynamic work where pages were built using database data or anything else unusual for a given site.

Apache or nginx handled a lot of the load and anything they weren't configured to handle, got handed off to this other server to deal with. So you're configuring out and programming two different servers and trying to connect them and make them work. I'm not saying it's wrong. It's not, but it's different than the way Node does it. So let's talk about that.

Node.js inverts all of this. It says, we're going to give you a toolkit to build a server. It will have nothing at all it can do that you don't tell it to do. You will add to it all the functionality you need and leave off anything you don't. You already had to program a secondary server anyway for most sites, we're just going to make it so you don't have to have Apache or nginx if you don't want it. Let's see an example.

## Node.js
[Node.js](https://nodejs.org/en/)

This is your classic "Hello World" Node.js server example:

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Before we had JS modules, Node.js needed some way to load packages so require() was that method. That first line is loading "http"; a built in module for Node. It's what we use to create a server to receive HTTP requests. This loads that module for us.

The next two lines are regular JS, they just create some constants but the hostname is interesting because, by specifying that you want to use 127.0.0.1, we will only be able to connect to this server from browsers on the same machine. We would need to use 0.0.0.0 as the hostname or not specify one (which would get us 0.0.0.0 by default) in order to connect a browser from anywhere other than the server's machine.

Then we create a server which takes any incoming request and responds with a 200 (success) HTTP response code and responds with a snippet of text that simply says "Hello World!".

The next block after that makes a call to "listen" to actually start the server on the host and port we specified earlier. When it starts up, it logs a message to the console so you know the server is up and you can use it from your browser.

This is a server! You can hook your browser to it and get a response. But with the tools that Node.js provides, building a server would be quite a bit of work. Node mainly provides us with simpler tools. It doesn't include easy parts for lots of stuff we will want to put together.

For example, on this server any URL would return exactly the same thing. You would have to add additional code which looked at the request in order to know what to return. Let's contrast this example with the Express version to see how it differs.

## Express
[Express - Node.js web application framework](http://expressjs.com/)

```javascript
const express = require('express');

const port = 3000;

const app = express();

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

In this example, we're not loading the "http" module directly, instead we're using "express" which wraps the "http" module and others to make it easier to build upon.

The next line is like the server creation from the Node.js example and the port line is just the same.

But here's where we start to diverge.  Express makes it easy for us to connect routes (which can include wildcards and parameters) to the thing we want to happen for that route. So we can just have a list of these functions, each of which specifies a route or set of routes which are matched and responded to.

And finally there's a listen function which is just like what we saw in the Node.js example.

## More Differences
So, after that, it might seem daunting. Do I want to build my own server?

I would argue the answer is, surprisingly, yes. Alan Kay said the following, "Simple things should be simple, complex things should be possible." Node.js actually did a great job of providing that. If you want a server that just does a few things, it's not hard. Express makes it pretty easy, but really Express is just "middleware" and "middleware" is the magic word for Node.

Middleware is a comprehensive term for software that you can plug into your server to do a huge number of things you might want to do but don't know how to or don't want to write yourself. Want to serve static files like HTML, CSS, and JS up? Middleware. Get to the parameters in a URL, query parameters in a URL, or the JSON body of something posted to the server? Middleware. Cookies? Compression? Sessions? Authentication? Database access? HTTPS? Middleware.

Even Express is just more middleware. It's something that sits inside your Node.js server and helps you deal with some of the most basic bits of mapping URLs to actions on the server. And it, is designed to be used with lots and lots of other common middleware.

