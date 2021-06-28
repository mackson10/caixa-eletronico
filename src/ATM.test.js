const ATM = require("./ATM");
const MoneyBillStorage = require("./MoneyBillStorage");
const ClientAccount = require("./ClientAccount");

describe("ATM", function () {
  describe("método getStorageBalance", function () {
    test("deve retornar a soma do valor total das cédulas armazenadas", () => {
      // todos os storage tem os mesmos valores de cédula e quantidade armazenada pois
      // o teste será feito na função getStorageBalance, suas dependẽncias serão mockadas
      const billStorage1 = new MoneyBillStorage(1, 0);
      const billStorage2 = new MoneyBillStorage(1, 0);
      const billStorage3 = new MoneyBillStorage(1, 0);

      let ATM1 = new ATM([billStorage1, billStorage2, billStorage3]);

      billStorage1.getTotalValue = jest.fn().mockReturnValue(100);
      billStorage2.getTotalValue = jest.fn().mockReturnValue(15);
      billStorage3.getTotalValue = jest.fn().mockReturnValue(7000);
      expect(ATM1.getStorageBalance()).toBe(7115);

      let ATM2 = new ATM([]);
      expect(ATM2.getStorageBalance()).toBe(0);
    });
  });

  describe("método showBillStorageLevels", function () {
    test("deve invocar a função console.log", () => {
      const billStorage1 = new MoneyBillStorage(10, 80);
      const billStorage2 = new MoneyBillStorage(50, 70);

      let ATM1 = new ATM([billStorage1, billStorage2]);

      const consoleLogMock = jest.spyOn(console, "log");

      ATM1.showBillStorageLevels();

      expect(consoleLogMock).toBeCalled();
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

  describe("método validateWithdraw", function () {
    test("deve lançar uma exceção se não houver usuário ativo no caixa", () => {
      let ATM1 = new ATM([new MoneyBillStorage(10, 10)]);
      ATM1.activeClientAccount = null;
      expect(() => ATM1.validateWithdraw(10)).toThrow();
    });

    test("deve lançar uma exceção se o caixa não tiver fundos suficientes para a retirada", () => {
      let ATM1 = new ATM([
        new MoneyBillStorage(20, 5),
        new MoneyBillStorage(100, 10),
      ]);
      let clientAccount1 = new ClientAccount("Ívo Fernandes", 6300);

      ATM1.setActiveClientAccount(clientAccount1);

      expect(() => ATM1.validateWithdraw(4000)).toThrow();
    });

    test("deve lançar uma exceção se a conta do usuário não possui saldo suficiente para a retirada", () => {
      let ATM1 = new ATM([
        new MoneyBillStorage(20, 5),
        new MoneyBillStorage(100, 10),
      ]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 300);
      ATM1.setActiveClientAccount(clientAccount1);

      expect(() => ATM1.validateWithdraw(4000)).toThrow();
    });
  });

  describe("método computeStorageBillsToPay", function () {
    test("deve retornar um array de arrays em que a primeira posição é o valor da cédula e a segunda é a quantidade de cédulas a serem pagas", () => {
      let ATM1 = new ATM([
        new MoneyBillStorage(50, 3),
        new MoneyBillStorage(100, 4),
        new MoneyBillStorage(20, 5),
        new MoneyBillStorage(10, 3),
      ]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 500);
      ATM1.setActiveClientAccount(clientAccount1);

      expect(ATM1.computeStorageBillsToPay(460)).toStrictEqual([
        [100, 4],
        [50, 1],
        [10, 1],
      ]);
    });

    test("deve lançar uma exceção se o caixa não tem como pagar o valor exato com as cédulas mantidas", () => {
      let ATM1 = new ATM([
        new MoneyBillStorage(50, 10),
        new MoneyBillStorage(100, 5),
      ]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 15);
      ATM1.setActiveClientAccount(clientAccount1);

      expect(() => ATM1.computeStorageBillsToPay(110)).toThrow();
    });
  });

  describe("método releaseMoneyBills", function () {
    test("deve subtrair a quantidade de cédulas de cada storage", () => {
      const moneyBillStorage100 = new MoneyBillStorage(100, 4);
      const moneyBillStorage50 = new MoneyBillStorage(50, 3);
      const moneyBillStorage20 = new MoneyBillStorage(20, 5);
      const moneyBillStorage10 = new MoneyBillStorage(10, 3);

      moneyBillStorage100.subtractBills = jest.fn(
        moneyBillStorage100.subtractBills
      );

      moneyBillStorage50.subtractBills = jest.fn(
        moneyBillStorage50.subtractBills
      );

      moneyBillStorage20.subtractBills = jest.fn(
        moneyBillStorage20.subtractBills
      );

      moneyBillStorage10.subtractBills = jest.fn(
        moneyBillStorage10.subtractBills
      );

      let ATM1 = new ATM([
        moneyBillStorage50,
        moneyBillStorage100,
        moneyBillStorage20,
        moneyBillStorage10,
      ]);

      ATM1.releaseMoneyBills([
        [100, 3],
        [20, 4],
        [10, 2],
      ]);

      expect(moneyBillStorage100.subtractBills).toHaveBeenCalledWith(
        3
      );
      expect(moneyBillStorage50.subtractBills).toHaveBeenCalledTimes(
        0
      );
      expect(moneyBillStorage20.subtractBills).toHaveBeenCalledWith(
        4
      );
      expect(moneyBillStorage10.subtractBills).toHaveBeenCalledWith(
        2
      );
    });
  });

  describe("método issueWithdraw", function () {
    test("deve validar a retirada", () => {
      let ATM1 = new ATM([new MoneyBillStorage(100, 100)]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 1000);
      ATM1.setActiveClientAccount(clientAccount1);

      ATM1.validateWithdraw = jest.fn();

      const value = 1000;

      ATM1.issueWithdraw(value);

      expect(ATM1.validateWithdraw).toHaveBeenCalledWith(value);
    });

    test("deve computar as cédulas para o pagamento", () => {
      let ATM1 = new ATM([new MoneyBillStorage(100, 150)]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 4000);
      ATM1.setActiveClientAccount(clientAccount1);

      const value = 2000;

      ATM1.computeStorageBillsToPay = jest.fn(() => []);

      ATM1.issueWithdraw(value);

      expect(ATM1.computeStorageBillsToPay).toHaveBeenCalledWith(
        value
      );
    });

    test("deve fazer a retirada da conta do cliente ativo", () => {
      let ATM1 = new ATM([new MoneyBillStorage(100, 110)]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 5000);
      ATM1.setActiveClientAccount(clientAccount1);

      clientAccount1.withdraw = jest.fn();

      ATM1.getActiveClientAccount = jest.fn(() => clientAccount1);

      const value = 4000;

      ATM1.issueWithdraw(value);

      expect(ATM1.getActiveClientAccount).toHaveBeenCalled();
      expect(clientAccount1.withdraw).toHaveBeenCalledWith(value);
    });

    test("deve liberar as cédulas como definido pelo método computeStorageBillsToPay", () => {
      let ATM1 = new ATM([new MoneyBillStorage(100, 10)]);

      let clientAccount1 = new ClientAccount("Ívo Fernandes", 5000);
      ATM1.setActiveClientAccount(clientAccount1);

      const mockedMoneyPackage = Symbol("MockedmoneyPackage");

      ATM1.computeStorageBillsToPay = jest.fn(
        () => mockedMoneyPackage
      );

      ATM1.releaseMoneyBills = jest.fn(() => {});

      const value = 1000;

      ATM1.issueWithdraw(value);

      expect(ATM1.releaseMoneyBills).toHaveBeenCalledWith(
        mockedMoneyPackage
      );
    });
  });
});
