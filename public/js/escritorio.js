// HTML REFS
const lblDesktop = document.querySelector('h1');
const btnGetTicket = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
  window.location = 'index.html';
  throw new Error('Desktop required');
}

const desktop = searchParams.get('desktop');
lblDesktop.innerText = desktop;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
  btnGetTicket.disabled = false;
});

socket.on('last-ticket', (lastTicket) => {
  //   lblNewTicket.innerText = `Ticket nº ${lastTicket}`;
});

socket.on('disconnect', () => {
  btnGetTicket.disabled = true;
});

btnGetTicket.addEventListener('click', () => {
  socket.emit('get-ticket', { desktop }, ({ ok, ticket }) => {
    if (!ok) {
      lblTicket.innerText = `Nadie`;
      return (divAlert.style.display = '');
    } else {
      lblTicket.innerText = `Ticket nº ${ticket.number}`;
    }
  });
});
