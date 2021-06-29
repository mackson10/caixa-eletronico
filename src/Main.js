const ATM = require("./ATM");
const ClientAccount = require("./ClientAccount");
const rl = require("./lib/readline");

module.exports = class Main {
  constructor({
    defaultBillStorages,
    defaultAccountClientName,
    defaultAccountClientBalance,
  }) {
    this.myATM = new ATM(defaultBillStorages);
    this.defaultAccountClientName = defaultAccountClientName;
    this.defaultAccountClientBalance = defaultAccountClientBalance;
  }

  async init() {
    this.running = true;
    await this.greetClient();
    while (this.running) await this.loop();
    this.sayGoodbye();
    this.myATM.setActiveClientAccount(null);
    process.exit(0);
  }

  async loop() {
    try {
      const activeClient = this.myATM.getActiveClientAccount();
      const clientName = activeClient.clientName;
      const clientBalance = activeClient.getBalance();

      const formattedClientBalance =
        clientBalance !== Infinity
          ? `R$${clientBalance.toFixed(2)}`
          : "Infinito";

      const chosenOperation = await rl.questionPromise(
        `\n Cliente: ${clientName} -- Saldo: ${formattedClientBalance} \n\n` +
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

  async greetClient() {
    const clientName = await rl.questionPromise(
      `######################################\n\n` +
        `Bem vindo ao Caixa eletrônico do Banco Sósaque™ \n\n` +
        `######################################\n\n` +
        `Seu nome(default: ${this.defaultAccountClientName}): `
    );
    const clientBalance = await rl.questionPromise(
      `Seu saldo(default: ${this.defaultAccountClientBalance}): `
    );

    this.myATM.setActiveClientAccount(
      new ClientAccount(
        clientName || this.defaultAccountClientName,
        +clientBalance || this.defaultAccountClientBalance
      )
    );
  }

  sayGoodbye() {
    console.log(
      "\nAté mais " +
        this.myATM.getActiveClientAccount().clientName +
        "! \n\n Banco Sósaque™, não aceitamos depósitos!"
    );
  }
};
