require("dotenv").config();
let express = require("express");
let bodyParser = require("body-parser");
let app = express();

// The app.get method is defining a route handler for GET requests to the root URL ("/").
// When a GET request is made to the root URL, the server responds with the text "Hello Express".
// The first argument to app.get is the URL path, and the second argument is a callback function that tells the server what to do when the path is matched.
// The callback function takes two arguments, req and res, which represent the request and response objects, respectively.
// The req object represents the HTTP request and contains information about it, such as the URL, headers, and parameters.
// The res object represents the HTTP response that the Express server sends when it receives a request.
// The send method of the res object is used to send a response back to the client.

// app.get("/", (req, res) => {
//   res.send("Hello Express");
// });

// The sendFile method of the res object is used to send a file back to the client.
// The __dirname variable is a global variable in Node.js that represents the current directory of the file it is used in.

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// app.use is used to mount middleware functions at a specified path. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. Middleware functions can perform tasks such as parsing the request body, logging information, and handling errors.
// The express.static middleware function is used to serve static files, such as images, CSS files, and JavaScript files, from a specified directory. The first argument to express.static is the path to the directory containing the static files. In this case, the public directory is specified as the directory containing the static files.
// app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// res.json is used to send a JSON response back to the client. The argument to res.json is an object that will be converted to JSON format and sent as the response.
app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  } else {
    message = message;
  }

  res.json({
    message: message,
  });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({
      time: req.time,
    });
  }
);

// The route parameter is specified in the URL path using a colon followed by the parameter name. In this case, the parameter name is word.
// The value of the route parameter can be accessed in the request object using req.params. The req.params object is an object containing properties mapped to the named route parameters.
// The value of the word parameter is accessed using req.params.word.
app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word,
  });
});

// The query parameters are specified in the URL after a question mark (?), with each parameter separated by an ampersand (&). Each parameter consists of a key-value pair, with the key and value separated by an equal sign (=).
// The value of the query parameters can be accessed in the request object using req.query. The req.query object is an object containing properties mapped to the query parameters.
// The value of the search query parameter is accessed using req.query.q.
app.get("/name", (req, res) => {
  let { first: firstName, last: lastName } = req.query;

  res.json({
    name: `${firstName} ${lastName}`,
  });
});

// The body-parser middleware is used to parse the request body and make it available in the req.body object. The body-parser middleware is added to the Express application using the app.use method.
// The bodyParser.urlencoded middleware function is used to parse URL-encoded form data. The extended option is set to false to use the querystring library instead of the qs library for parsing the form data.
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;
