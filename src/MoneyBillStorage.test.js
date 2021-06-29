const MoneyBillStorage = require("./MoneyBillStorage");

describe("MoneyBillStorage", function () {
  describe("método getTotalValue", function () {
    test("deve retornar o somatório do valor unitário para cada cédula", () => {
      let moneyBillStorage1 = new MoneyBillStorage(5, 15);
      expect(moneyBillStorage1.getTotalValue()).toBe(75);

      let moneyBillStorage2 = new MoneyBillStorage(10, 0);
      expect(moneyBillStorage2.getTotalValue()).toBe(0);

      let moneyBillStorage3 = new MoneyBillStorage(10, Infinity);
      expect(moneyBillStorage3.getTotalValue()).toBe(Infinity);
    });
  });

  describe("método subtractBills", function () {
    test("deve lançar uma exceção quando tenta retirar mais cédulas do que possui", () => {
      let moneyBillStorage1 = new MoneyBillStorage(20, 5);
      expect(() => moneyBillStorage1.subtractBills(6)).toThrow();

      let moneyBillStorage2 = new MoneyBillStorage(100, 0);
      expect(() => moneyBillStorage2.subtractBills(1)).toThrow();
    });

    test("deve lançar uma exceção quando tenta retirar um número negativo de cédulas", () => {
      let moneyBillStorage1 = new MoneyBillStorage(1, 13);
      expect(() => moneyBillStorage1.subtractBills(-3)).toThrow();

      let moneyBillStorage2 = new MoneyBillStorage(100, 3);
      expect(() => moneyBillStorage2.subtractBills(-100)).toThrow();
    });

    test("deve lançar uma exceção quando não recebe um número finito de cédulas como parâmetro", () => {
      let moneyBillStorage1 = new MoneyBillStorage(50, 100);
      expect(() =>
        moneyBillStorage1.subtractBills(Infinity)
      ).toThrow();

      let moneyBillStorage2 = new MoneyBillStorage(20, 100);
      expect(() =>
        moneyBillStorage2.subtractBills(-Infinity)
      ).toThrow();
    });

    test("deve subtrair o número de cédulas retirado do número de cédulas restantes", () => {
      let moneyBillStorage1 = new MoneyBillStorage(10, 5);
      moneyBillStorage1.subtractBills(3);
      expect(moneyBillStorage1.amount).toBe(2);

      let moneyBillStorage2 = new MoneyBillStorage(100, 5);
      moneyBillStorage2.subtractBills(0);
      expect(moneyBillStorage2.amount).toBe(5);

      let moneyBillStorage3 = new MoneyBillStorage(100, Infinity);
      moneyBillStorage3.subtractBills(1000);
      expect(moneyBillStorage3.amount).toBe(Infinity);
    });
  });

  describe("método availableBillsToPay", function () {
    test("o retorno deve ser o menor número de cédulas para pagar um valor(sem troco)", () => {
      let moneyBillStorage1 = new MoneyBillStorage(50, 7);
      expect(moneyBillStorage1.availableBillsToPay(175)).toBe(3);

      let moneyBillStorage2 = new MoneyBillStorage(5, 5);
      expect(moneyBillStorage2.availableBillsToPay(3)).toBe(0);
    });

    test("o retorno não pode ser maior que o número de cédulas restantes", () => {
      let moneyBillStorage1 = new MoneyBillStorage(2, 32);
      expect(
        moneyBillStorage1.availableBillsToPay(100)
      ).toBeLessThanOrEqual(32);

      let moneyBillStorage2 = new MoneyBillStorage(50, 2);
      expect(
        moneyBillStorage2.availableBillsToPay(150)
      ).toBeLessThanOrEqual(2);
    });

    test("o retorno não pode ser negativo", () => {
      let moneyBillStorage1 = new MoneyBillStorage(5, 12);
      expect(
        moneyBillStorage1.availableBillsToPay(100)
      ).toBeGreaterThanOrEqual(0);

      let moneyBillStorage2 = new MoneyBillStorage(1, 0);
      expect(
        moneyBillStorage2.availableBillsToPay(10)
      ).toBeGreaterThanOrEqual(0);
    });

    test("deve lançar uma exceção se o valor for negativo", () => {
      let moneyBillStorage1 = new MoneyBillStorage(1, 13);
      expect(() =>
        moneyBillStorage1.availableBillsToPay(-3)
      ).toThrow();

      expect(() =>
        moneyBillStorage1.availableBillsToPay(-1000)
      ).toThrow();
    });

    test("deve lançar uma exceção se o valor não for um inteiro", () => {
      let moneyBillStorage1 = new MoneyBillStorage(100, 16);
      expect(() =>
        moneyBillStorage1.availableBillsToPay(Infinity)
      ).toThrow();

      expect(() =>
        moneyBillStorage1.availableBillsToPay(-Infinity)
      ).toThrow();
    });
  });
});
