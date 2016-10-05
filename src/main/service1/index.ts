
import {Server} from 'hapi';
import {promisifyAll} from 'bluebird';

async function init() {

  const seneca = require('seneca')();
  const chairo = require('chairo');
  const server:any =  new Server();
  promisifyAll(server);
  promisifyAll(seneca);

  seneca.client({
    host: 'servicethree'
  });

  server.connection({
    port: 3000
  });

  server.decorate('request', 'seneca', seneca);

  server.route({
    method: 'POST',
    path: '/math',
    handler: function(req, rep) {
      console.log(req.payload);
      return req.seneca.actAsync({
        role: 'math',
        cmd: 'sum',
        first: req.payload.first,
        second: req.payload.second
      }).then(rep);
    }
  })

  await server.startAsync();
  return server;
}

init().then((server) => {
  console.log(`starting in ${server.info.uri}`);
})
.catch(console.error);

