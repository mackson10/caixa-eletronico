const ATM = require("./ATM");
const ClientAccount = require("./ClientAccount");
const rl = require("./lib/readline");

module.exports = class Main {
  constructor(billStorages) {
    this.myATM = new ATM(billStorages);
    this.running = true;
  }

  async init() {
    const clientName = await rl.questionPromise(
      `######################################\n\n` +
      `Bem vindo ao Caixa eletrônico do Banco Sósaque™ \n\n` +
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

    this.myATM.setActiveClientAccount(this.clientAccount);

    while (this.running) await this.loop();

    console.log("\nAté mais " + this.clientAccount.clientName + "! \n\n Banco Sósaque™, não aceitamos depósitos!")

    process.exit(0);
  }

  async loop() {
    try {
      const clientBalance =
        this.clientAccount.getBalance() !== Infinity
          ? `R$${this.clientAccount.getBalance().toFixed(2)}`
          : "Infinito";

      const chosenOperation = await rl.questionPromise(
        `\n Cliente: ${this.clientAccount.clientName} -- Saldo: ${clientBalance} \n\n` +
        `Operações disponíveis: \n\n` +
        `1 - Saque \n` +
        `2 - Mostrar níves do estoque de cédulas \n` +
        `3 - Sair \n\n`
      );

      if (chosenOperation == 1) {
        const withdrawValue = await rl.questionPromise(
          "\nValor da retirada: "
        );

        this.myATM.issueWithdraw(+withdrawValue);

      } else if (chosenOperation == 2) {

        this.myATM.showBillStorageLevels();

      } else if (chosenOperation == 3) {

        this.running = false;

      } else {

        console.log(
          "\nOperação não implementada, tente novamente. \n"
        );

      }
    } catch (error) {
      console.error("( !!! ) Houve um erro: " + error.message);
    }
  }
};
