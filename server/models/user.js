'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstName:{ type: String, default: '' },
    lastName:{ type: String, default: '' },
    email:{ type: String, default: ''},
    password:{ type: String, default: ''},
    role:{ type: String, default: ''},
    createdDate:{ type: Date, default: Date.now }
});

mongoose.model('User', userSchema);