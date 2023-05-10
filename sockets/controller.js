const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);
  socket.emit('status', ticketControl.last4);
  socket.emit('tickets-pending', ticketControl.tickets.length);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.nextTicket();
    callback(next);
    socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);
  });

  socket.on('get-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'Desktop Required',
      });
    }

    const ticket = ticketControl.getTicket(desktop);

    socket.broadcast.emit('status', ticketControl.last4);
    socket.emit('tickets-pending', ticketControl.tickets.length);
    socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: 'No Tickets pending',
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
