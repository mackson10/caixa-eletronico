const MoneyBillStorage = require("./src/MoneyBillStorage");
const Main = require("./src/Main");

// Modifique o primeiro parâmetro passado no construtor para usar cédulas com outros valores
// Modifique o segundo parâmetro do construtor para utilizar estoques de cédulas finitos
// Não é esperado que haja repetição do valor unitário(billValue) neste array
const billStorages = [
  new MoneyBillStorage(100, Infinity),
  new MoneyBillStorage(50, Infinity),
  new MoneyBillStorage(20, Infinity),
  new MoneyBillStorage(10, Infinity),
];

const main = new Main(billStorages);
main.init();
