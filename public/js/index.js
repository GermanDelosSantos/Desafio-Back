

const socketClient = io();


const form = document.getElementById('form')
const inputName = document.getElementById('name')
const inputPrice = document.getElementById('price')
const products = document.getElementById('products')
const addedProducts = document.getElementById('productsAdded');
const deleteForm = document.getElementById('deleteProductForm');
const deleteProductIdInput = document.getElementById('productId');


form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const product = {
        name,
        price
    };
    socketClient.emit('newProduct', product);
}

socketClient.on('products', (arrayProducts) => {
    let infoProducts = '';
    arrayProducts.forEach((prod) => {
        infoProducts += `${prod.id}: ${prod.name} - $${prod.price} <br>`;
    });
    products.innerHTML = infoProducts;
});

socketClient.on('productExist', (prod) => { 
    if( prod.length === 0 ){
        addedProducts.innerHTML = `No existe ningun producto`
    }else{
        addedProducts.innerHTML = `Productos existentes: ${prod}`
    }
})

deleteForm.onsubmit = (e) => {
    e.preventDefault();
    const productId = deleteProductIdInput.value;
    socketClient.emit('deleteProduct', productId);
};