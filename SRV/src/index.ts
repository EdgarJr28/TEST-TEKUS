import express from 'express'
import cors from "cors";
import fileUpload from 'express';
import path from 'path'
import morgan from 'morgan';
import Server from './config/serverSockets';
import bodyParser from 'body-parser';
import { APP, SERVER_PORT } from './config/server';

// ROUTES
import indexRout from './routes/index.routes'
import coinsRout from './routes/coins.routes'


// sockets
const server = Server.instance;


// middlewares
APP.use(express.json());
APP.use(express.urlencoded({ extended: false }));
APP.use(cors());
APP.use(fileUpload());
APP.use('/uploads', express.static(path.resolve()));
APP.use(morgan('dev'));

// Routes
APP.use(indexRout);
APP.use(coinsRout);

server.start(() => {
    console.log(`Servidor socket en el puerto ${SERVER_PORT}`);
});

