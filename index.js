const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apiRouter = require("./routes/index");



const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', apiRouter);

app.set('PORT', 3000);

app.listen(app.get('PORT'),() => {
    console.log('server up');
});

module.exports = app;