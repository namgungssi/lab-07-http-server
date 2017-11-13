'use strict';


let bodyParser = module.exports = {};
let text = ' ';

bodyParser.execute = (req) => {
  return new Promise ((resolve, reject) => {
    let text = ' ';

    req.on ('data', () => {
      text += data.toString ();
    });
    req.on ('end', () => {
      try {
        req.body = JSON.parse (text);
        resolve (req);
      }
      catch (err) {
        reject (err);
      }
    })
  })
};
