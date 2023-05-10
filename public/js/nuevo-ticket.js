// HTML REFS

const lblNewTicket = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
  btnCreate.disabled = false;
});

socket.on('last-ticket', (lastTicket) => {
  lblNewTicket.innerText = `Ticket nº ${lastTicket}`;
});

socket.on('disconnect', () => {
  btnCreate.disabled = true;
});

btnCreate.addEventListener('click', () => {
  socket.emit('next-ticket', null, (ticket) => {
    console.log(ticket);
    lblNewTicket.innerText = `Ticket nº ${ticket.number}`;
  });
});
