
const seneca1 = require('seneca')();

function handler(err, msg) {
  console.log(err, msg);
}

seneca1.client({host: 'servicethree'});

seneca1.act({
  role: 'math',
  cmd: 'sum',
  first: 1,
  second: 2
}, handler);
