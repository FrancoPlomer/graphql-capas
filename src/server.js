import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import productosApiRouter from "./routers/products.js";
import cartsApiRouter from "./routers/carts.js";
import usersApiRouter from "./routers/users.js";
import parseArgs from 'minimist';
import { exec } from 'child_process';
import cors from 'cors';
import * as os from 'os';
import logger from "./logger.js";
import { testAxios } from "../axiosClientTest.js";

//Para chequear la ip asi trabajamos desde multiples dispositivos
let interfaces = os.networkInterfaces();
let addresses = [];
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

const puerto = parseArgs(process.argv.slice(2));

const app = express();

const uri = config.mongoRemote.cnxStr;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use('/api/products', productosApiRouter);
app.use('/api/carts', cartsApiRouter);
app.use('/api/users', usersApiRouter);

//Cliente de prueba con axios
if(puerto._.includes('test')){
    const productToTest = {
        title: "coca cola",
        description: "gaseosa de cola",
        code: 1001,
        photoUrl: "https://http2.mlstatic.com/D_NQ_NP_961625-MLA46350451480_062021-O.webp",
        price: 200,
        timestamp: Date.now(),
        stock: 10
    }

    const test = new testAxios();
    test.allProducts();
    console.log(test.allProducts())
    test.productForId(1);
    test.newProduct( productToTest.title, productToTest.description, productToTest.code, productToTest.photoUrl, productToTest.price, productToTest.timestamp, productToTest.stock );
    test.updateForId( 1,productToTest );
    test.deleteProductForId( 2 );
    test.deleteAllProduct();    
}

if(puerto._[0] === "cluster")
{
    exec('pm2 start src/server.js -i 4', async (error, stdout, stderr) => {
        if (error) {
            logger.error(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            logger.warn(`stderr: ${stderr}`);
            return;
        }
        logger.info(`ejecutando servidor con cluster: ${stdout}`);
    });
}

const connectedServer = app.listen(config.PORT, () => {
    logger.info(`Servidor escuchando en el puerto ${connectedServer.address().port}`)
})

mongoose.connect(uri, config.mongoRemote.client)

connectedServer.on('error', error => logger.error(`Error en el servidor ${error}`))