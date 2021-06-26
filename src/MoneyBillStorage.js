
module.exports.MoneyBillStorage = class {
    
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
