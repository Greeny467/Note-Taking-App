const notes = require('express').Router();
const {readFromFile, readAndAppend, findAndDelete } = require('../utility/fileManouvers');
const uuid = require('../utility/idSystem');


// Get route for notes 
notes.get('/', (req, res) =>{
    console.info(`${req.method} request recieved for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

//Post route for notes 
notes.post('/', (req, res) =>{
    console.info(`${req.method} request recieved for notes`);
    
    //set up post body structure
    const {title, text} = req.body;

    if(title && text) {
        //new object for saving
        const newNote = {
            title,
            text,
            id: uuid()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added to database');
    }
    else{
        res.json('Error occured while adding note to database')
    }
});

notes.delete('/:id', (req, res) =>{
    console.info(`${req.method} request recieved for notes`)
    const requestedId = req.params.id.toLowerCase();
    findAndDelete(requestedId, './db/db.json')
});

module.exports = notes;