const http = require('http');
const express = require('express');
const morgan = require('morgan');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');


const app = express();
let httpServer = http.createServer(app);
const io = require('socket.io')(httpServer);//socket.io

const mensaje = require('../controllers/mensaje.js');

function initialize() {
    return new Promise((resolve, reject) => {

        app.use(morgan('combined'));
        app.use(express.json({
            reviver: reviveJson
        }));

        app.use('/api', router);

        httpServer.listen(webServerConfig.port)
        .on('listening', () => {
            console.log(`Web server listening on localhost:${webServerConfig.port}`);
    
            resolve();
        })
        .on('error', err => {
            reject(err);
        });
        io.on('connection',(socket)=>{
            socket.on('joinRoom',(id_sala,id_usr)=>{
                console.log("Se unio a sala: "+id_sala+", usuario: "+id_usr);
                socket.join("room"+id_sala);
                let e = async function(id_sala){
                    const result = await mensaje.obtener(id_sala);
                    io.sockets.in("room"+id_sala).emit('mensajes',result)
                }
                e(id_sala)
            })
            socket.on('mensaje',mensaj=>{
                let p =async function(mens){
                    const result = await mensaje.poner(mens);
                };
                let e = async function(id_sala){
                    const result = await mensaje.obtener(id_sala);
                    io.sockets.in("room"+id_sala).emit('mensajes',result)
                }
                let todo=async function(mens){
                    await p(mens)
                    e(mens.ID_CHAT)
                }
                todo(mensaj);
            })
            socket.on('leaveRoom',id_sala=>{
                console.log("unio a sala_" + id_sala);
                socket.join(id_sala);
            })
        })
    });
}
 
module.exports.initialize = initialize;

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }
    
            resolve();
        });
    });
}
   
module.exports.close = close;

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
 
function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}