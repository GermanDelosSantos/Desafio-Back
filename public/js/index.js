const socketClient = io();

const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const products = document.getElementById('products')

form.onsumbit = (e) =>{
    e.preventDefault();
    
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price,
    };
    socketClient.emit('newProduct', product);
}

const infoProducts = [];

socketClient.on('products', (myArray) => {
    myArray.forEach((prod) => {
        infoProducts.push(`${prod.name} - $${prod.price}`);
    });
    products.innerHTML = infoProducts.join('<br>');
});