
class ATM {
    
    moneyBillStorages = [];
    activeClientAccount = null;

    constructor (moneyBillStorages = []) {
        this.moneyBillStorages = moneyBillStorages;
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

class ClientAccount {

    constructor(clientName, balance = Infinity) {
        this.clientName = clientName;
        this.balance = balance;
    }

    getBalance() {
        //
    }

    subtractFromBalance(value){
        //lança exceção se valor for maior que balance
    }
}

class MoneyBillStorage {
    
    constructor(billValue, quantity) {
        this.billValue = billValue;
        this.quantity = quantity;
    }

    subtractBills (amount) {
        // lança exceção se valor maior que quantity
        // decrementa quantity
    }

    valueInMaxAvailableBills(value) {
        // calcula o máximo de notas que podem ser dadas pelo valor
        // retorna um numero inteiro
    }

    getTotalValue() {
        // retorna a multiplicação de quantity por billValue
    }
}