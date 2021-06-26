module.exports.MoneyBillStorage = class {
  constructor(billValue, amount) {
    this.billValue = billValue;
    this.amount = amount;
  }

  subtractBills(amountToSubtract) {
    // lança exceção se valor maior que amount
    // decrementa amount
    if (amountToSubtract < 0)
      throw new Error(
        "Não é possível retirar um número negativo de cédulas"
      );
    else if (amountToSubtract > this.amount)
      throw new Error(
        "Tentativa de retirar mais cédulas que o existente"
      );
    else {
      this.amount -= amountToSubtract;
    }
  }

  availableBillsToPay(value) {
    // calcula o máximo de notas que podem ser dadas pelo valor
    // retorna um numero inteiro
    if (value < 0)
      throw new Error(
        "Não é possível calcular cédulas para pagar um valor negativo"
      );
    return Math.min(Math.trunc(value / this.billValue), this.amount);
  }

  getTotalValue() {
    // retorna a multiplicação de amount por billValue
    return this.billValue * this.amount;
  }
};
