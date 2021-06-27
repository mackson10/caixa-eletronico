const ATM = require("./ATM");
const MoneyBillStorage = require("./MoneyBillStorage");
const ClientAccount = require("./ClientAccount");

jest.mock("./MoneyBillStorage");
jest.mock("./ClientAccount");

beforeEach(() => {
  MoneyBillStorage.mockClear();
  ClientAccount.mockClear();
});

describe("ATM", function () {
  describe("método getStorageBalance", function () {
    test("deve retornar a soma do valor total das cédulas armazenadas", () => {
      // todos os storage tem os mesmos valores de cédula e quantidade armazenada pois
      // o teste será feito na função getStorageBalance, suas dependẽncias serão mockadas
      const billStorage1 = new MoneyBillStorage(1, 0);
      const billStorage2 = new MoneyBillStorage(1, 0);
      const billStorage3 = new MoneyBillStorage(1, 0);

      let ATM1 = new ATM([billStorage1, billStorage2, billStorage3]);

      MoneyBillStorage.prototype.getTotalValue.mockReturnValue(150);
      expect(ATM1.getStorageBalance()).toBe(450);

      MoneyBillStorage.prototype.getTotalValue.mockReturnValue(100);
      expect(ATM1.getStorageBalance()).toBe(300);

      billStorage1.getTotalValue.mockReturnValue(100);
      billStorage2.getTotalValue.mockReturnValue(15);
      billStorage3.getTotalValue.mockReturnValue(7000);
      expect(ATM1.getStorageBalance()).toBe(7115);

      let ATM2 = new ATM([]);
      expect(ATM2.getStorageBalance()).toBe(0);
    });
  });

  describe("método setActiveClientAccount", function () {
    test("deve trocar o valor de activeClientAccount pelo parâmetro fornecido", () => {
      let ATM1 = new ATM([]);
      let clientAccount1 = new ClientAccount(
        "Maria de Oliveira",
        5000
      );

      ATM1.setActiveClientAccount(clientAccount1);
      expect(ATM1.activeClientAccount).toBe(clientAccount1);

      ATM1.setActiveClientAccount(null);
      expect(ATM1.activeClientAccount).toBe(null);
    });

    test("deve lançar uma exceção caso não receba parâmetro", () => {
      let ATM1 = new ATM([]);

      expect(() => ATM1.setActiveClientAccount()).toThrow();
    });
  });

  describe("método getActiveClientAccount", function () {
    test("deve retornar o valor de activeClientAccount", () => {
      let ATM1 = new ATM([]);
      let clientAccount1 = new ClientAccount("Ronaldo da Silva", 700);
      let clientAccount2 = new ClientAccount("Ívo Fernandes", 6300);

      ATM1.activeClientAccount = clientAccount1;
      expect(ATM1.getActiveClientAccount()).toBe(clientAccount1);

      ATM1.activeClientAccount = clientAccount2;
      expect(ATM1.activeClientAccount).toBe(clientAccount2);

      ATM1.activeClientAccount = null;
      expect(ATM1.activeClientAccount).toBe(null);
    });
  });
});
