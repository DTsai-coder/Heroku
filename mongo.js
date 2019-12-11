// Use the mongoose package so we can talk to MongoDB Atlas.
// Mongoose is the middle man software for JavaScript and MongoDB
const mongoose = require("mongoose");

// The credentials and location to log into the MongoDB account. This should normally be somewhere else that's more secure.
const dbConnect = "mongodb+srv://practiceUser:Mnap1234@clusterpractice-xz0iz.mongodb.net/test?retryWrites=true&w=majority";
// Additional options when connecting to MongoDB.
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};
// Actually connect to the MongoDB database. Attach the login credentials string and the options objects.
mongoose.connect(dbConnect, options, (error) => {
    // When MongoDB server responds, test if an error was received.
    if (error){
        // If there was an error, display it.
        console.log("Something happened connecting to the database! Cannot connect.", error)
    }else{
        // If no error, congrats!
        console.log("Successfully connected to MongoDB!");
    }
});
// Store the object "connection", in a variable called db.
let db = mongoose.connection;
// Hookup any MongoDB errors we receive to the console.
db.on("error", console.error.bind(console, "MongoDB connection error: "));
// Tell mongoose what a Promise is by providing the Class to it.
mongoose.Promise = global.Promise;

// Finished connecting to MongoDB.

// A Schema for our database.

let Schema = mongoose.Schema;

// Customize our Schema and name it practiceSchema
let practiceSchema = new Schema({
    note: String,
    old: Boolean,
    timesUpdated: Number
});

// Create a new Model that has the Schema and the collections name information.
let practiceModel = new mongoose.model("myfirstcollections", practiceSchema);

/* Commenting it out so it doesn't save another entry while creating read Document

// MongoDB Write/Save START

let newEntry = new practiceModel({
    note: "This is my second note on the database",
    old: true,
    timesUpdated: 2
});

newEntry.save((error) => {
    if (error){
        console.log("There was an error at MangoDB Atlas" + error);
    } else {
        console.log("We saved the data!");
    }
    
});
// MongoDB Write/Save END

*/

// MongoDB READ START

/*
// An object with the criteria to search the database with.
// Searching for a SPECIFIC criteria in the property entries
 let searchCriteria = {
    timesUpdated: {$lt: 110} // search for entries timesUpdated less than 110
 };
 */

 // To search for ANY criteria in the property entries
 let searchCriteria = {}; // empty brackets

 // Actually search the database.
 // To read we use the find method
practiceModel.find(searchCriteria, (error, results) => { // the order is error will ALWAYS come FIRST.
    // If error, then
    if(error){
        // ... Tells us about it.
        console.log("Something went wrong!" + error);
    }else{
        // Otherwise console log the entries found.
        console.log(results);
    }
});
// MongoDB READ END

// Create a variable to store the entries you want to update
// Data to update the targeted entry with the right ID.
let dataToUpdate = {
    note: "This is an updated note on the database",
    old: true // 

};

// MongoDB UPDATE START
// 5ddc202a609ae82ff71a3d8d is the ObjectId from mongodb 
// Submit the request to MongoDB with the proper id and data to update.
practiceModel.findByIdAndUpdate("5ddc202a609ae82ff71a3d8d", dataToUpdate, (error, results) => {
    if(error){
        console.log("Something happened!" + error);
    }else{
        console.log(results);
    }
}); 
// MongoDB UPDATE END

// MongoDB DELETE START
// First Argument is the id of the entry to delete, second argument is the callback function that runs when MongoDB with success or failure.
practiceModel.findByIdAndDelete("5ddc22138cb967366198b878", (error, results) => {
    if(error){
        console.log("Something happened!" + error);
    }else{
        console.log(results);
    }
});
// MongoDB DELETE END