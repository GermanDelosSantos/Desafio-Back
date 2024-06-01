import EventEmitter from 'events';
EventEmitter.defaultMaxListeners = 20;

import { initMongoDB } from './daos/mongodb/connection.js';
import express from 'express'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import createViewsRouter from './routes/view.router.js';
import { __dirname } from './utils.js'
import { errorHandler } from './midlewares/errorHandler.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import morgan from 'morgan';
import 'dotenv/config'
import { v4 as uuidv4} from 'uuid'
import './db/database.js';
import * as messageService from './service/message.services.js';
import * as productService from './service/product.services.js';



const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

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

    socket.on('newProduct', async (prod) => {
        try {
            const newProduct = await productService.create(prod);
            const products = await productService.getAll();
            socketServer.emit('products', products);
        } catch (error) {
            console.error(`Error al agregar producto: ${error.message}`);
            console.log(products);

        }
    });
     const products = productService.getAll();
    socket.broadcast.emit('products',products)
    
    socket.on('productExist', (prod) =>{
        if (prod.length === 0){
            console.log(`No existe ningun producto`)
        }else{
            console.log(`productos existentes ${prod}`);
        }
    })
    socket.on('deleteProduct', async (productId) => {
        try {
            await productService.remove(productId);
            const products = await productService.getAll();
            socketServer.emit('products', products);
        } catch (error) {
            console.error(`Error al eliminar producto: ${error.message}`);
        }
    });

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

