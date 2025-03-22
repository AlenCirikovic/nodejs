const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    industry: String
});

module.exports = mongoose.model('Customer',customerSchema); // module exports stands for what we want to export to be used in seperate files over the project. 