'use strict';

(() => {
  const socket = io();
  socket.emit('join game', 'test');
  socket.emit('in game', data => {
    console.log('data', data);
  });
  console.log('socket', socket);
})();
