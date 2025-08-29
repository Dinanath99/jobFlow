// const DatauriParser = require("datauri/parser");
// const path = require("path");

// const getDataUri = (file) => {
//   const parser = new DatauriParser(); //create a new instanc of DatauriParser
//   const extName = path.extname(file.originalname).toString(); //get the extension of the file
//   return parser.format(extName, file.buffer); //return the formatted data
// };

// module.exports = getDataUri; //export the function

// utils/dataUri.js

const DatauriParser = require("datauri/parser");
const path = require("path"); // importing path module from node package

const getDataUri = (file) => {
  const parser = new DatauriParser(); // Create a new instance of DatauriParser
  const extName = path.extname(file.originalname).toString(); // Get the extension of the file
  return parser.format(extName, file.buffer); // Return the formatted data URI
};

module.exports = getDataUri; // Export the function
