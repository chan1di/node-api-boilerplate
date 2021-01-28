/*
File: controller.js
App Name: API Demo
Purpose: Provides Function/Control For API Call
Created By: Chandresh */

'use strict';
const chalk = require('chalk');                           //For Displaying Logs in different Colors
const mongoose = require('mongoose');             //For Mongodb Schema
const Todo = mongoose.model('Todo');
const User = mongoose.model('User');
const commonUtils = require('../utils/comman');

//1. For Testing Connection
async function todo(req,res){
  try{
    res.send({'success':true, 'msg':'Test API Responded!'});
  } catch(error){
    res.status(500).send({'success':false, 'msg':'Error!', 'error': error});
  }
}

//2. Fetching/Listing ToDo
async function gettodo(req,res){
  try{
    let savedTodo = await Todo.find({});
    res.send({'success':true,'msg':'Listed ToDo!','data':savedTodo});
  } catch(error){
    res.status(500).send({'success':false, 'msg':'Error! Getting ToDo List', 'error': error});
  }
}

//3. Adding ToDo
async function addtodo(req,res){
  try{
    let todo = req.body;
    const newTodo = new Todo(todo);
    let savedTodo = await newTodo.save();
    res.send({'success':true,'msg':'Added ToDo!','data':savedTodo});
  } catch(error){
    res.status(500).send({'success':false, 'msg':'Error! Adding ToDo', 'error': error});
  }
}

//4. Updating ToDo
async function updatetodo(req,res){
  try{
    let todo = req.body || req.params;
    let updatedTodo = await Todo.findOneAndUpdate({_id:todo._id},{$set:todo},{new: true});
    res.send({'success':true,'msg':'Updated ToDo!','data':updatedTodo});
  } catch(error){
    res.status(500).send({'success':false, 'msg':'Error! Updating ToDo', 'error': error});
  }
}

//5. Deleting ToDo
async function deletetodo(req,res){
  try{
    let todo = req.params;
    console.log("delete todo",todo);
    let deletedTodo = await Todo.deleteOne({_id:todo.id});
    console.log("delete todo",deletedTodo);
    res.send({'success':true,'msg':'Deleted ToDo!','data':deletedTodo});
  } catch(error){
    res.status(500).send({'success':false, 'msg':'Error! Deleting ToDo!', 'error': error});
  }
}

async function register(req, res){
  try {
    const newEmpObj = new User(req.body);
    const employeeExist = await User.findOne({
      email: req.body.email
    });
    if (employeeExist) {
      console.log(chalk.yellow('Employee already registered'));
      res.json({
        success: false,
        message: 'Already Registered'
      });
    }else{
      const newEmployee = await newEmpObj.save();
      const tokenInfo = {
        id: newEmployee._id,
        email: newEmployee.email,
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName
      };
      const newData = {
        success: true,
        email: newEmployee.email,
        name: `${newEmployee.firstName} ${newEmployee.lastName}`,
        message: 'Emplyee created Successfully'
      };
      const token = await commonUtils.signToken(tokenInfo);
      newData.token = token;
      res.json(newData);
    }
  } catch (error) {
    console.log(chalk.red('`error: '+error+'`'));
    res.json({
      status: false,
      error: error
    });
  }
}

module.exports = {
    todo,       //1
    gettodo,    //2
    addtodo,    //3
    updatetodo, //4
    deletetodo,  //5,
    register     //6
};