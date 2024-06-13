import EventEmitter from 'events';
EventEmitter.defaultMaxListeners = 20;

import express from 'express'
import { initMongoDB } from './daos/mongodb/connection.js';
import { Server } from 'socket.io'
import { errorHandler } from './midlewares/errorHandler.js'
import { __dirname } from './utils.js'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import createViewsRouter from './routes/view.router.js';
import userRouter from './routes/user.router.js';
import handlebars from 'express-handlebars'
import * as messageService from './service/message.services.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import passport from 'passport';
import './passaport/local-srtategy.js';
import 'dotenv/config'
import './db/database.js';
// import * as productService from './service/product.services.js';
const MONGO_URL = 'mongodb+srv://noiconuf:admin@cluster0.qu7hol7.mongodb.net/coderBack?retryWrites=true&w=majority&appName=Cluster0' 

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        // crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: 'squirrel',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

app.use(cookieParser());
app.use(session(storeConfig))

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/carts', cartRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

const viewsRouter = createViewsRouter();

app.use('/', viewsRouter);




app.use(errorHandler);

const PORT = 8080

initMongoDB();


const httpServer = app.listen(PORT, ()=> console.log((`Puert ok on ${PORT}`)));

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconect', () =>{
        console.log(`Usuario desconectado`)
    })

    // socket.on('newProduct', async (prod) => {
    //     try {
    //         const newProduct = await productService.create(prod);
    //         const products = await productService.getAll();
    //         socketServer.emit('products', products);
    //     } catch (error) {
    //         console.error(`Error al agregar producto: ${error.message}`);
    //         console.log(products);

    //     }
    // });
    //  const products = productService.getAll();
    // socket.broadcast.emit('products',products)
    
    // socket.on('productExist', (prod) =>{
    //     if (prod.length === 0){
    //         console.log(`No existe ningun producto`)
    //     }else{
    //         console.log(`productos existentes ${prod}`);
    //     }
    // })
    // socket.on('deleteProduct', async (productId) => {
    //     try {
    //         await productService.remove(productId);
    //         const products = await productService.getAll();
    //         socketServer.emit('products', products);
    //     } catch (error) {
    //         console.error(`Error al eliminar producto: ${error.message}`);
    //     }
    // });

    socket.on('newUser', (user) => {
        console.log(`> ${user} ha iniciado sesión`);
        socket.broadcast.emit('newUser', user);
    });

    socket.on('chat:message', async (msg) => {
        await messageService.create(msg);
        const messages = await messageService.getAll();
        socketServer.emit('messages', messages);
    });

    socket.on('chat:typing', (username) => {
        socket.broadcast.emit('chat:typing', username);
    });

});

