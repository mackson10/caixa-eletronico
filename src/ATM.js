module.exports = class ATM {
  constructor(moneyBillStorages = []) {
    this.moneyBillStorages = moneyBillStorages;
    this.activeClientAccount = null;
  }

  getStorageBalance() {
    // soma todos valores totais dos moneyBillStorages
    // retorna o valor em dinheiro que este caixa possui
    let storageBalance = 0;
    for (let billStorage of this.moneyBillStorages) {
      storageBalance += billStorage.getTotalValue();
    }

    return storageBalance;
  }

  setActiveClientAccount(clientAccount) {
    // troca de conta logada
    if (clientAccount === undefined)
      throw new Error("É preciso passar uma conta de cliente");
    else this.activeClientAccount = clientAccount;
  }

  getActiveClientAccount() {
    // retorna de conta logada
    return this.activeClientAccount;
  }

  validateWithdraw(value) {
    if (!Number.isInteger(value))
      throw new Error("Valor de retirada deve ser um número inteiro");
    else if (value < 1)
      throw new Error(
        "Valor de retirada deve ser um número maior que ou igual a 1 (unidade monetária)"
      );
    if (this.getActiveClientAccount() === null)
      throw new Error(
        "Tentativa de retirada sem conta ativa nesta máquina"
      );
    else if (this.getActiveClientAccount().getBalance() < value) {
      throw new Error(
        "A conta não possui saldo suficiente para a retirada"
      );
    } else if (this.getStorageBalance() < value) {
      throw new Error(
        "Esta máquina não possui fundos suficientes para a retirada"
      );
    }
    // lança uma excessão se não houver usuário logado
    // verifica se o caixa eletrônico possui o valor em dinheiro
    // verifica se o cliente tem o saldo em sua conta
  }

  computeStorageBillsToPay(value) {
    // calcula a menor quantidade de cada nota disponiveis para pagar o valor
    let leftValue = value;

    const moneyPackage = [];

    this.moneyBillStorages
      .sort(
        (billStorage1, billStorage2) =>
          billStorage2.billValue - billStorage1.billValue
      )
      .forEach((billStorage) => {
        const billsToPay = billStorage.availableBillsToPay(leftValue);

        if (billsToPay > 0) {
          moneyPackage.push([billStorage.billValue, billsToPay]);
          leftValue -= billsToPay * billStorage.billValue;
        }
      });

    if (leftValue > 0)
      throw new Error(
        `Não foi possível pagar o valor exato com as cédulas no caixa, 
        O valor mais próximo disponível para saque é: R$${
          value - leftValue
        }.
        Tente novamente`
      );
    else return moneyPackage;
  }

  releaseMoneyBills(moneyPackage) {
    console.log("** A máquina abre seu compartimento de cédulas **");
    console.log("São liberadas: ");
    for (let [billValue, billAmount] of moneyPackage) {
      this.moneyBillStorages
        .find((billStorage) => billStorage.billValue === billValue)
        .subtractBills(billAmount);

      console.log(` ${billAmount} cédulas de ${billValue} reais,`);
    }
    console.log("** O compartimento de cédulas é fechado **");
  }

  issueWithdraw(value) {
    this.validateWithdraw(value);
    const moneyPackage = this.computeStorageBillsToPay(value);
    this.getActiveClientAccount().withdraw(value);
    this.releaseMoneyBills(moneyPackage);
  }

  showBillStorageLevels() {
    console.log(
      "\n\n Valor total nesta máquina: " +
        this.getStorageBalance() +
        "\n",
      "Cédula | Em estoque \n",
      ...this.moneyBillStorages.map((billStorage) => {
        return (
          "\n R$" +
          billStorage.billValue +
          " | " +
          billStorage.amount +
          " unidades"
        );
      })
    );
  }
};
