const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit('last-ticket', ticketControl.last);

  socket.on('next-ticket', (payload, callback) => {
    const next = ticketControl.nextTicket();
    callback(next);
    // TODO: NOTIFICAR QUE HAY UN NUEVO TICKET SIN ASIGNAR
  });

  socket.on('get-ticket', ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: 'Desktop Required',
      });
    }

    const ticket = ticketControl.getTicket(desktop);

    // TODO: NOTIFICAR CAMBIO EN LOS ÚLTIMOS 4

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
