// HTML REFERENCES

const lblOffline = document.querySelector('#lblOffline');
const lblOnline = document.querySelector('#lblOnline');
const txtMessage = document.querySelector('#txtMessage');
const sendBtn = document.querySelector('#sendBtn');

const socket = io();

socket.on('connect', () => {
  lblOffline.style.display = 'none';
  lblOnline.style.display = '';
});

socket.on('disconnect', () => {
  lblOnline.style.display = 'none';
  lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
  console.log(payload);
});

sendBtn.addEventListener('click', () => {
  const message = txtMessage.value;
  const payload = {
    id: socket.id,
    date: new Date().getTime(),
    message,
  };
  socket.emit('send-message', payload, (id) => {
    console.log(`From server : ${id}`);
  });
});
