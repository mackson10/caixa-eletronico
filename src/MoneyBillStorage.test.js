const { MoneyBillStorage } = require("./MoneyBillStorage");

describe("MoneyBillStorage", function () {
  describe("método getTotalValue", function () {
    test("deve retornar o somatório do valor unitário para cada cédula", () => {
      let moneyBillStorage1 = new MoneyBillStorage(5, 15);
      expect(moneyBillStorage1.getTotalValue()).toBe(75);
    });
  });

  describe("método subtractBills", function () {
    test("deve lançar uma exceção quando tenta retirar mais cédulas do que possui", () => {
      let moneyBillStorage1 = new MoneyBillStorage(20, 5);
      expect(() => moneyBillStorage1.subtractBills(6)).toThrow();
    });

    test("deve lançar uma exceção quando tenta retirar um número negativo de cédulas", () => {
      let moneyBillStorage1 = new MoneyBillStorage(1, 13);
      expect(() => moneyBillStorage1.subtractBills(-3)).toThrow();
    });

    test("deve subtrair o número de cédulas retirado do número de cédulas restantes", () => {
      let moneyBillStorage1 = new MoneyBillStorage(10, 5);
      moneyBillStorage1.subtractBills(3);
      expect(moneyBillStorage1.amount).toBe(2);
    });
  });

  describe("método availableBillsToPay", function () {
    test("o retorno deve ser o menor número de cédulas para pagar um valor(sem troco)", () => {
      let moneyBillStorage1 = new MoneyBillStorage(50, 7);
      expect(
        moneyBillStorage1.availableBillsToPay(175)
      ).toBeLessThanOrEqual(3);
    });

    test("o retorno não pode ser maior que o número de cédulas restantes", () => {
      let moneyBillStorage1 = new MoneyBillStorage(2, 32);
      expect(
        moneyBillStorage1.availableBillsToPay(100)
      ).toBeLessThanOrEqual(32);
    });

    test("o retorno não pode ser negativo", () => {
      let moneyBillStorage1 = new MoneyBillStorage(5, 12);
      expect(
        moneyBillStorage1.availableBillsToPay(100)
      ).toBeGreaterThanOrEqual(0);
    });

    test("deve lançar uma exceção se o valor de entrada for negativo", () => {
      let moneyBillStorage1 = new MoneyBillStorage(1, 13);
      expect(() =>
        moneyBillStorage1.availableBillsToPay(-3)
      ).toThrow();
    });
  });
});
