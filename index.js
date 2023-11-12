const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


const port=3000;
//Listen to port
app.listen(port, ()=>{ console.log('Listinig... port 3000');});


app.set('view engine','pug');
app.set('views','./views');//default path

//console.log(app.get('tiny'));

/*/Morgon error log 
if (app.get('env')==='development'){
    app.use(morgan('dev'));
    debug ('morgan enabled...');
}
*/


