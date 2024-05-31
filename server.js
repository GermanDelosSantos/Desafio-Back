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



const app = express();
const products = []

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

const viewsRouter = createViewsRouter(products);

app.use('/', viewsRouter);

app.get('/chatwebsocket', async (req, res) => {
    const messages = await messageService.getAll();
    res.render('chat', { messages });
  });


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

    socket.on('newProduct', (prod) => {
        prod.id = uuidv4();
        products.push(prod);
        socketServer.emit('products', products);
    });

    socket.emit('products', products);
    
    socket.on('productExist', (prod) =>{
        if (prod.length === 0){
            console.log(`No existe ningun producto`)
        }else{
            console.log(`productos existentes ${prod}`);
        }
    })
    socket.on('deleteProduct', (productId) => {
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
            products.splice(index, 1);
            socketServer.emit('products', products);
        } else {
            console.log(`Producto con ID ${productId} no encontrado`);
        }
    });

    socket.on('newMessage', async (msg) => {
        await messageService.create(msg);
        const messages = await messageService.getAll();
        socket.emit('messages', messages);
      });

});

