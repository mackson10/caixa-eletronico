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
      const balance = 5000;
      let clientAccount1 = new ClientAccount(
        "José da Silva",
        balance
      );
      expect(() => clientAccount1.withdraw(balance + 1)).toThrow();
    });

    test("deve lançar uma exceção se o valor a ser retirado for negativo", () => {
      let clientAccount1 = new ClientAccount("José da Silva", 2000);
      expect(() => clientAccount1.withdraw(-1000)).toThrow();
    });

    test("deve decrementar o valor do saldo", () => {
      let clientAccount1 = new ClientAccount("José da Silva", 3500);
      clientAccount1.withdraw(3000);
      expect(clientAccount1.getBalance()).toBe(500);
    });
  });
});
