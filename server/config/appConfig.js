/*
File: appConfig.js
App Name: API Demo
Purpose: Configuration Part for Server and Database
Created By: Chandresh */

"use strict";
module.exports = {
  auth: {
    secret: "meandemosecret",
    expireTime: "600d",
  },
  db: {
    //Database Configuration
    port: 27017,
    dbName: "meandemo",
    authDb: "admin",
    url: "mongodb://localhost:27017/meandemo",
    host: "localhost",
    user: "mean",
    passkey: "$3cRE@t",
  },
  server: {
    //Server Configuration
    name: "MEAN Boiler Demo",
    port: 4000,
    considerPort: true,
  },
  email: {
    //Server Configuration
    accountName: "MEAN Boiler Demo",
    port: 4000,
    considerPort: true,
  },
};
