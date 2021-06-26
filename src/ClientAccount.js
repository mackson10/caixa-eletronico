
module.exports.ClientAccount = class {

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
