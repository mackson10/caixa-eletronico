const MoneyBillStorage = require("./src/MoneyBillStorage");
const Main = require("./src/Main");

// Cada item do array representa o estoque para um valor de cédula
// O primeiro parâmetro da classe MoneyBillStorage é o valor unitário de cédula (não deve se repetir neste array)
// O segundo parâmetro é a quantidade que o caixa eletrônico possui em unidades de cédula de tal valor
const defaultBillStorages = [
  new MoneyBillStorage(100, Infinity),
  new MoneyBillStorage(50, Infinity),
  new MoneyBillStorage(20, Infinity),
  new MoneyBillStorage(10, Infinity),
];

const config = {
  defaultBillStorages,
  defaultAccountClientName: "João da Silva",
  defaultAccountClientBalance: Infinity,
};

const main = new Main(config);
main.init();
