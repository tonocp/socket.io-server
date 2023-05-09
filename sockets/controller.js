const socketController = (socket) => {
  socket.on('connect', () => {
    console.log(`Client Online : ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client Offlinez : ${socket.id}`);
  });

  socket.on('send-message', (payload, callback) => {
    callback(socket.id);
    socket.broadcast.emit('send-message', payload);
  });
};

module.exports = {
  socketController,
};
