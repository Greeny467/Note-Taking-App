//Tools
const express = require('express');
const path = require('path');
const api = require('./routes');

const PORT = 3001;

const app = express();

//middleware

//parsing and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//serve static assets from public folder
app.use(express.static('public'));

//routing for the /api route, leading to the routes folder. 
app.use('/api', api);

//Server setup

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.listen(PORT, () => 
    console.log(`App now listening at http://localhost:${PORT}`)
)