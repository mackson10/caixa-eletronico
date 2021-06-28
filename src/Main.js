const ATM = require("./src/ATM");
const ClientAccount = require("./src/ClientAccount");
const rl = require("./lib/readline");

module.exports = class Main {
  constructor(billStorages) {
    this.myATM = new ATM(billStorages);
  }

  async init() {
    const clientName = await rl.questionPromise(
      `######################################\n\n` +
        `Bem vindo ao Caixa eletrônico Sósaque \n\n` +
        `######################################\n\n` +
        `Seu nome(default: João): `
    );
    const clientBalance = await rl.questionPromise(
      `Seu saldo(default: Infinito): `
    );

    this.clientAccount = new ClientAccount(
      clientName || "João da Silva",
      +clientBalance || Infinity
    );

    this.myATM.setActiveClientAccount(clientAccount);

    while (true) this.loop();
  }

  async loop() {
    try {
      const clientBalance =
        this.clientAccount.getBalance() !== Infinity
          ? `R$${clientAccount.getBalance().toFixed(2)}`
          : "Infinito";

      const chosenOperation = await rl.questionPromise(
        `\nCliente: ${clientAccount.clientName} -- Saldo: ${clientBalance} \n\n` +
          `Operações disponíveis: \n\n` +
          `1 - Saque \n` +
          `2 - ... \n` +
          `3 - ... \n\n`
      );

      if (chosenOperation == 1) {
        const withdrawValue = await rl.questionPromise(
          "\nValor da retirada: "
        );

        this.myATM.issueWithdraw(withdrawValue);
      } else {
        console.log(
          "\nOperação não implementada, tente novamente. \n"
        );
      }
    } catch (error) {
      console.error("( !!! ) Houve um erro :" + error.message);
    }
  }
};
