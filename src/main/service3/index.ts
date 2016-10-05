
const seneca3 = require('seneca')();

function sum(msg, done) {
  done(null, {result: msg.first + msg.second});
}

seneca3.add({role: 'math', cmd: 'sum'}, sum);

seneca3.listen();
