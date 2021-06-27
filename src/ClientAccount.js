module.exports = class ClientAccount {
  constructor(clientName, balance = Infinity) {
    this.clientName = clientName;
    this.balance = balance;
  }

  getBalance() {
    return this.balance;
  }

  withdraw(value) {
    //lança exceção se valor for maior que balance
    //decrementa o valor retirado
    if (value > this.getBalance())
      throw new Error("Saldo da conta insuficiente");
    else if (value < 0)
      throw new Error("Tentativa de retirada de valor negativo");
    else {
      this.balance -= value;
    }
  }
};
