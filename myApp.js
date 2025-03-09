require("dotenv").config();
let express = require("express");
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
app.use("/public", express.static(__dirname + "/public"));

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

module.exports = app;
