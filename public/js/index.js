document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.getElementById('form');
  if (form) {
      const inputName = document.getElementById('name');
      const inputPrice = document.getElementById('price');
      const inputDescription = document.getElementById('description');
      const inputStock = document.getElementById('stock');

      const products = document.getElementById('products');
      const addedProducts = document.getElementById('productsAdded');
      const deleteForm = document.getElementById('deleteProductForm');
      const deleteProductIdInput = document.getElementById('productId');

      form.onsubmit = (e) => {
          e.preventDefault();
          const name = inputName.value;
          const price = inputPrice.value;
          const description = inputDescription.value;
          const stock = inputStock.value
          const product = {
              name,
              price,
              description,
              stock
          };
          socket.emit('newProduct', product);
      };

      socket.on('products', (arrayProducts) => {
        let infoProducts = '';
        arrayProducts.forEach((prod) => {
            infoProducts += `<div>${prod._id}: ${prod.name} - $${prod.price} - ${prod.description} - ${prod.stock}</div>`;
        });
        products.innerHTML = infoProducts;
    });

      socket.on('productExist', (prod) => { 
          if (prod.length === 0) {
              addedProducts.innerHTML = `No existe ningun producto`;
          } else {
              addedProducts.innerHTML = `Productos existentes: ${prod}`;
          }
      });

      if (deleteForm) {
          deleteForm.onsubmit = (e) => {
              e.preventDefault();
              const productId = deleteProductIdInput.value;
              socket.emit('deleteProduct', productId);
          };
      }
  }

  let username = null;
  if (!username) {
      Swal.fire({
          title: "¡Welcome to chat!",
          input: "text",
          inputPlaceholder: "Insert your username:",
          showCancelButton: false,
          inputValidator: (value) => {
              if (!value) {
                  return "Your username is required";
              }
          },
          allowOutsideClick: false
      }).then((input) => {
          username = input.value;
          socket.emit('newUser', username);
      });
  }

  const messageInput = document.getElementById('message');
  const sendButton = document.getElementById('send');
  const chatOutput = document.getElementById('output');
  const typingIndicator = document.getElementById('actions');

  if (sendButton && messageInput) {
      sendButton.addEventListener('click', () => {
          const messageContent = messageInput.value.trim();
          if (messageContent) {
              socket.emit('chat:message', {
                  username,
                  content: messageContent
              });
              messageInput.value = '';
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Message content is required.'
              });
          }
      });

      socket.on('messages', (messages) => {
          chatOutput.innerHTML = '';
          messages.forEach((msg) => {
              const messageElement = document.createElement('p');
              messageElement.innerHTML = `<strong>${msg.username}</strong>: ${msg.content}`;
              chatOutput.appendChild(messageElement);
          });
      });

      messageInput.addEventListener('keypress', () => {
          socket.emit('chat:typing', username);
      });

      socket.on('chat:typing', (username) => {
          typingIndicator.innerHTML = `<p>${username} is writing a message...</p>`;
      });

      socket.on('newUser', (username) => {
          Toastify({
              text: `${username} has joined the chat`,
              duration: 3000,
              gravity: "top",
              position: "right",
              style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)"
              }
          }).showToast();
      });
  }
});