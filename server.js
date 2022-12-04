'use strict'

//importando os modulos: http, debug e express

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('node:server');


//definindo a constante express e configurando a porta que deve ser ouvida
const port =normalize(process.env.PORT || '3000');
app.set('port', port);


//criar o servidor
const server  = http.createServer(app);

//servidor escutar a porta
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta '+port);

//normalizando a porta
function normalize(val){
  const port = parseInt(val, 10);

  if(isNaN(port)){
    return val;
  }
  if(port >=0){
    return port;
  }
  return false;
}
//funcao que cuida dos erros/excecoes da porta
function onError(error){
  if (error.syscall != 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ?
    'pipe '+port:
    'port '+port ;
    switch (error.code) {
      case 'EACCES':
          console.error(bind + 'Requires elevated privileges');
          process.exit(1);
        break;
      case 'EADDRINUSE':
          console.error(bind +' is already in use');
          process.exit(1);
          break;

      default:
        throw error;
    }
}

//uso do // DEBUG:
function onListening(){
  const addr = server.address();
  const bind = typeof addr ==='string'
  ? 'pipe '+ addr
  : 'port '+ addr.port;
  debug('listening on '+bind);
}
