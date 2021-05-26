const path = require('path');
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');

const mongoAtlas = 'mongodb+srv://cchicas:PVEGxDOKoBKXHdbL@cluster0.ssyn0.mongodb.net/crud-mongo?retryWrites=true&w=majority'
const app = express();

//connecting to BD
mongoose.connect(mongoAtlas, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(db => console.log('DB Connected!'))
    .catch(err => console.log(err));


//importing routes
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server ON port ${app.get('port')}`);
});