const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/concord';
mongoose.connect(mongoURI, {
})


const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected succesfully");
});

module.exports = db;