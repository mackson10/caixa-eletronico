const ClientAccount = require("./ClientAccount");

describe("ClientAccount", function () {
  describe("método getBalance", function () {
    test("deve retornar o valor do saldo da conta", () => {
      const balance = 400;
      let clientAccount1 = new ClientAccount(
        "José da Silva",
        balance
      );
      expect(clientAccount1.getBalance()).toBe(balance);
    });
  });

  describe("método withdraw", function () {
    test("deve lançar uma exceção se o valor a ser retirado for maior que o saldo", () => {
      const balance1 = 5000;
      let clientAccount1 = new ClientAccount(
        "José da Silva",
        balance1
      );
      expect(() => clientAccount1.withdraw(balance1 + 1)).toThrow();

      const balance2 = 0;
      let clientAccount2 = new ClientAccount(
        "Maria da Silva",
        balance2
      );
      expect(() =>
        clientAccount2.withdraw(balance2 + 1000)
      ).toThrow();
    });

    test("deve lançar uma exceção se o valor a ser retirado for negativo", () => {
      let clientAccount1 = new ClientAccount("José da Silva", 2000);
      expect(() => clientAccount1.withdraw(-1000)).toThrow();

      let clientAccount2 = new ClientAccount("Maria da Silva", 5000);
      expect(() => clientAccount2.withdraw(-1)).toThrow();
    });

    test("deve lançar uma exceção se o valor a ser retirado não for um inteiro", () => {
      let clientAccount1 = new ClientAccount("José da Silva", 2600);
      expect(() => clientAccount1.withdraw(Infinity)).toThrow();

      let clientAccount2 = new ClientAccount("Maria da Silva", 7000);
      expect(() => clientAccount2.withdraw(-Infinity)).toThrow();
    });

    test("deve decrementar o valor do saldo", () => {
      let clientAccount1 = new ClientAccount("José da Silva", 3500);
      clientAccount1.withdraw(3000);
      expect(clientAccount1.getBalance()).toBe(500);

      let clientAccount2 = new ClientAccount(
        "José da Silva",
        Infinity
      );
      clientAccount2.withdraw(3000);
      expect(clientAccount2.getBalance()).toBe(Infinity);
    });
  });
});
