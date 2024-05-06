import express from 'express'
import ProductManager from './manager/manager.js'
import cartRouter from './routes/cart.router.js'
import productRouter from './routes/products.router.js'
import { __dirname } from './utils.js'
import { errorHandler } from './midlewares/errorHandler.js'


const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/carts', cartRouter)
app.use('/api/products', productRouter)

app.use(errorHandler);

const PORT = 8080

app.listen(PORT, ()=> console.log((`Puert ok on ${PORT}`)))