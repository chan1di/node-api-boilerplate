/*
File: index.js
App Name: API Demo
Purpose: Routing For API Call
Created By: Chandresh */

const mongoose  = require('mongoose');
const chalk 	= require('chalk');
const dbControls= require('../config/appConfig').db;
const commonUtils = require('../utils/comman');

const control 	= require('../controllers/controller');
const foCtrls 	= require('../controllers/fileOperations');
const cmdCtrls 	= require('../controllers/cmdController');

module.exports=function(app) {
	//Test API
	app.get("/testConnection", function(req,res) {
		res.send({'success':true,'message':'Successfully Connected!'})
	});
	app.post("/login", control.login);
	app.post("/register", control.register);
	app.get("/getUser", control.getUser);
	app.post("/addtodo", control.addtodo);
	app.get("/gettodo", commonUtils.isLoggedIn, control.gettodo);
	app.put("/updatetodo", control.updatetodo);
	app.delete("/deletetodo/:id", control.deletetodo);

	app.get("/generatingFile", foCtrls.generatingFile);

	app.get("/dbBackUp", cmdCtrls.dbBackUp);
	app.get("/compressFolder", cmdCtrls.compressFolder);
};