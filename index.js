// Include into our code, the FS package (builtin)
// const fs = require("fs"); DON'T NEED THIS BECAUSE WE ARE USING MONGOOSE

// Includes into our code, the Mongoose.js package.
const mongoose = require("mongoose");

// To create a server file
// TEMPLATE START
// Includes into our code, the Express.js, provided by NPM.
const express = require("express");
// Includes into our code Body Parser, comes with Express.js
const bodyParser = require("body-parser"); // bodyParser is its own package, bodyParse is needed in order to understand front-end
// Create an Express.js server object.
const app = express(); // to activate the server
// Includes the HTTP package (builtin), and we attach our Express.js server object to the HTTP object.
const http = require("http").Server(app); // to call server to provide http
// We create a variable that will hold the port number we want to use.
const port = 3000;
// We pass the port variable to the listen function for the HTTP server.
http.listen(port); // to tell HTTP which port to listen to

// Signifying the Developer that Express.js is now running.
console.log("Express server running on port " + port);
// TEMPLATE END

// URL to access our MongoDB database.
const dbConnect = "mongodb+srv://commentsProjectUser:Mnap1234@clusterpractice-xz0iz.mongodb.net/commentsproject?retryWrites=true&w=majority";

// Additional options when connecting to MongoDB.
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
// Actually connect to MongoDB Atlas.
mongoose.connect(dbConnect, options, (error) => {
    if(error){
        console.log(error);
    }else{
        console.log("Successfully connected to MongoDB Atlas!");
    }
});
// Link up MongoDB errors with the console, and link up the definition of Promises to Mongoose.
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error"));
mongoose.Promise = global.Promise;

// Building MongoDB Schema.
let Schema = mongoose.Schema;
let commentsSchema = new Schema({
    message: String,
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    timestamp: Date
});
// Create a Model for the comments collections using the comments Schema.
let commentsModel = new mongoose.model("comments", commentsSchema);

// Signifying the Developer that Express.js is now running.
// console.log("Express server running on port " + port);
// Needed to read data sent through POST request.
app.use(bodyParser.json()); // convert to JSON automatically
// Gives Body Parser specific options to run off of.
app.use(bodyParser.urlencoded({extended: false})); // extended: false is an option for bodyParser

// Custom Code for Express.js after this line.

// Variable to make sure the file name is the same every time.
// let filename = "commentHistory.json"; DON'T NEED THIS BECAUSE WE ARE USING MONGOOSE

// Routes
// First Argument is the route name, second argument is directory to load when someone requests the route name.
app.use("/", express.static("client/"));

// ARROW FUNCTION START
// app.post("/name of the root", request, response)
// An HTTP Post Handler called /submitComment.
// First argument is HTTP Post Route name, second argument is the callback function. The callback function will run every time someone requests the /submitComment post handler.
// Callback function parameters: requests hold the object that was sent to us through the Internet, the response holds a reference of where to send the response to (like IP address).
// most of the time you'll see request as req and response as res
app.post("/submitComment", (request, response) => { // Is for responding to any hosting requests

    // Rename the data sent to us (located in request.body) to something simpler like objectFromRequest.
    // create a let variable if you're confused about request.body.message example bellow:
    let objectFromRequest = request.body; // Object from Request is something that came outside.
    
    console.log(objectFromRequest);

    // let text = objectFromRequest.message;
    // console.log("We received a request for/submitComment: " + text);

    // Modify the object received from the front end to meet Schema requirements
    objectFromRequest.age = parseInt(objectFromRequest.age);
    objectFromRequest.timestamp = new Date();

    let newComment = new commentsModel(objectFromRequest);

    newComment.save((error, respond) => {
        if(error){
            console.log(error);
        }else{
            console.log("Saved a new comment to the database!");
        }
    });
;
    // fs.existSync will check if the file exist, if it exist it will turn true and if it doesn't exist it will turn false.
    // If the file exists do...

    /* DON'T NEED THIS BECAUSE WE ARE USING MONGOOSE
    if (fs.existsSync(filename)) {
        // ...read the file and store the contents in the variable comments...
        let comments = fs.readFileSync(filename, "utf8");
        // ...parse the JSON and reuse the same comments variable...
        comments = JSON.parse(comments);
        // ...add the new objectFromRequest object to the array inside of the comments object...
        comments.commentsArray.push(objectFromRequest);
        // ...then convert comments back into a string as JSON...
        comments = JSON.stringify(comments);
        // ...finally save the JSON string to a file.
        fs.writeFileSync(filename, comments, "utf8");
        console.log("New Comment Saved to Hard Drive!");
    } else {
        // If the file doesn't exists...
        // ...We prebuilt the object (which includes the comment we just receive) to save as JSON...
        let comments = {
            commentsArray: [objectFromRequest]
        };
        // ...Convert it actual JSON String...
        comments = JSON.stringify(comments);
        // ...Finally save JSON string to new File.
        fs.writeFileSync(filename, comments, "utf8");
        console.log("Note: No Save File Detected, creating New File. New Comment Saved to Hard Drive!");
    } // DON'T NEED THIS BECAUSE WE ARE USING MONGOOSE
    */

    // Example of the code above {commentsArray: []}

    /*  NOT USING THIS AT THE MOMENT 
        let data = {
        text: "Thank you for your message"
        }
        response.send(data);
    */ 

    // ARROW FUNCTION END

    // respond.sendStatus(200); is the same as return. If you don't want to send data back, use respond.sendStatus

    // If you don't want to send any data back, you can use .sendStatus(). You can only use sendStatus or send once to "fulfill" front-end request.
    
    // response.sendStatus is only used if everything is okay
    response.sendStatus(200); // 200 is a HTTP status, it means it's okay
});

// 200 is the default of everything is okay

// A second HTTP Post Handler called /loadComments
app.post("/loadComments", (request, response) => {

    // Read all the comments from MongoDB Atlas.
    commentsModel.find({}, (error, results) => {
        if(error){
            // If error, tell me about it.
            console.log(error);
        }else{
            // Build an object that the front-end expects...
            let objectToSend = {
                commentsArray: results
            } // ...and send it.
            response.send(objectToSend);
        }
    });

    /* DON'T NEED THIS BECAUSE WE ARE USING MONGOOSE
    // Check if the JSON file exists...
    if (fs.existsSync(filename)) {
        
        // ...If it exists then read it...
        let comments = fs.readFileSync(filename, "utf8");
        // ...and convert to a JavaScript Object...
        comments = JSON.parse(comments);
        // ...finally send it to the requester.
        response.send(comments);
    } else {
        // ...If it doesn't exist, then send an error 500 to the requester.
        response.sendStatus(500); // 500 is Internal server error
    } // DON'T NEED THIS BECAUSE WE ARE USING MONGOOSE
    */

});