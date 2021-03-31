//Loads environment variables from the .env file
require('dotenv').config();

//Importing from discord.js module
const Discord = require('discord.js');
const axios = require('axios');
const express = require('express');
const updateCount = require('./server_pop.js');

const token = process.env.BOT_TOKEN;

var app = express();
var serverCount;

//Create an instance of client
const client = new Discord.Client();

//Keep Bot alive on Heruko
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on port ${ PORT }`);
});
app.get('/',(req,res) => {
    return res.send('Hello');
    });

client.on("ready", () => {
    console.log(`${client.user.tag} logged in.`)
    client.user.setActivity('with babu Dibbles.');
});

function serverCountLoop() {
    setTimeout(async function() {
        await getServerCount();
        await updateCount(client, serverCount);
        serverCountLoop();
    }, 5000);
}

//APIs
async function getServerCount() {
    return await axios.get("https://temp-server-count.herokuapp.com/serv-count/dm")
        .then(function (response){
            serverCount = response.data;
        })
        .catch(function (error) {
            console.log("Error fetching server count: " + error);
        })
        .then(function () {
        })
}

serverCountLoop();

client.login(token);
