'use strict';



const server = require ('./lib/_server.js');
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
  console.log ('server is running on port', PORT);
});
