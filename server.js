//imports
const express = require('express');
const app = require('express')();
const path = require('path');
const server = require('http').createServer(app);
const options = {
  /* ... */
};
const io = require('socket.io')(server, options);
const url = require('url');
const userSocketIdMap = new Map();

//variables
const PORT = process.env.PORT || 5000;

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log(path.join(__dirname, 'public'));
//tell app which port to use
app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', (socket) => {
  socket.on('genCircle_clicked', (circles) => {
    socket.broadcast.emit('genCircle', circles);
  });
});
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
