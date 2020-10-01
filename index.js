require('dotenv').config();
const express = require('express');
const massive = require('massive');
const productCtrl = require('./controllers/product_controllers');
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
}).catch(err => console.log(err));

app.use(express.json());

app.get('/api/products', productCtrl.getAll);
app.get('/api/products/:id', productCtrl.getOne);
app.put('/api/products/:id', productCtrl.update);
app.post('/api/products', productCtrl.create);
app.delete('/api/products/:id', productCtrl.delete);

app.listen(SERVER_PORT, console.log(`Server up on port ${SERVER_PORT}`));