const fs = require('fs');
const util = require('util');

//Promise edition of readFile
const readFromFile = util.promisify(fs.readFile);

//function to write data to a JSON file
const writeToFile = (destination, content) =>{
    fs.writeFile(destination, JSON.stringify(content, null, 4),
     (err) => err ? console.log(err) 
     : console.info(`/nData written to ${destination} successfully`))
};

//function to read a file and append to it. 
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) =>{
        if (err) {
            console.error(err);
        }
        else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const findAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) =>{
        if(err){
            console.error(err);
        }
        else{
            const parsedData = JSON.parse(data);
            parsedData.forEach((note, index) => {
                if(note.id === id){
                    parsedData.splice(index, 1);
                    writeToFile(file, parsedData);
                };
            });
        };
    }
)};

module.exports = { readFromFile, writeToFile, readAndAppend, findAndDelete };