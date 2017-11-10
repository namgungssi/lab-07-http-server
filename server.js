'use strict';


require ('dotenv').config ();

const server = require ('./lib/_server.js');

server.start (process.env.PORT, () =>
console.log ('server up on PORT', process.env.PORT);
