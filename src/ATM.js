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

  issueWithdraw(value) {
    // lança uma excessão se não houver usuário logado
    // verifica se o caixa eletrônico possui o valor em dinheiro
    // verifica se o cliente tem o saldo em sua conta
    //
    // subtrai o valor do saldo da conta do cliente
    //
    // calcula a menor quantidade de notas disponiveis para pagar
    // subtrai o dinheiro do inventario do caixa eletronico
    //
    // entrega as notas ao cliente
  }
};
