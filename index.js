/**
 * @licstart
 *
 * Cards. Play cards online as you would in real life.
 *
 * Copyright Ⓒ 2020 Patrick Ausderau
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 *
 * This application integrates components from the following projects:
 * Socket.IO v2.3.0 | © 2014-2019 Guillermo Rauch | MIT License
 * dotenv 8.2.0 | © Scott Motte | BSD-2-Clause License
 * express 4.17.1 | © 2009-2013 TJ Holowaychuk, 2013 Roman Shtylman,
 *   2014-2015 Douglas Christopher Wilson | MIT License
 * @licend
 *
 * @source: https://github.com/patrick-ausderau/cards
 */
'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('chat message', msg => {
    console.log('message:', msg);
    io.emit('chat message', msg);
  });

  socket.on('in game', fun => {
    console.log('in game?', socket.rooms);
    fun(socket.rooms);
  });

  socket.on('join game', game => {
    console.log('join game', game);
    socket.join(game);
    io.in(game).clients((err, clients) => {
      console.log('clients in game', clients);
    });
  });
});

http.listen(port, () => {
  console.log('listening on port', port);
});
