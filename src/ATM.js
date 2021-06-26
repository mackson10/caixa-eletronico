
module.exports.ATM = class {

    constructor (moneyBillStorages = []) {
        this.moneyBillStorages = moneyBillStorages;
        this.activeClientAccount = null;
    }

    setActiveClientAccount(clientAccount) {
        // troca de conta logada
    }

    withdraw (value){
        // lança uma excessão se não houver usuário logado
        // verifica se o caixa eletrônico possui o valor em dinheiro
        // verifica se o cliente tem o saldo em sua conta
        // calcula a menor quantidade de notas disponiveis para pagar
        // subtrai o valor do saldo da conta do cliente
        // subtrai o dinheiro do inventario do caixa eletronico
        // entrega as notas ao cliente
    }

    getBalance() {
        // soma todos valores totais dos moneyBillStorages
        // retorna o valor em dinheiro que este caixa possui
    }

}