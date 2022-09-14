const express = require('express');
const path = require ('path');
const app = express();

app.use(express.static('public'));

app.get('slider.js', (req, res) => {
    res.sendFile(__dirname + '/public/slider.js');
})

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto  3000 de reeadni")    
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});


