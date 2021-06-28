const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.questionPromise = (query) => {
  return new Promise((res) => {
    rl.question(query, function (answer) {
      res(answer);
    });
  });
};

module.exports = rl;
