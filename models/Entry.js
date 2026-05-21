const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({

    title: String,
    currentAge: Number,
    youngerAge: Number,
    emotion: String,
    message: String,
    tags: [String],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports =
    mongoose.model("Entry", EntrySchema);