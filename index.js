const io = require('socket.io')({
    cors: {
      origin: '*',
    },
  });
  
  io.on('connection', (socket) => {
    console.log('user connected');
  
    socket.on('chat', (data) => {
      console.log(`message received: ${data.message}`);
      io.emit('message', {
        username: data.username,
        message: data.message,
      });
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
  const port = 5000;
  io.listen(port);
  console.log(`Server listening on port ${port}`);