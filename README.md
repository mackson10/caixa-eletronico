# Desafio Caixa Eletrônico

Este projeto é uma solução para o problema descrito em:
<https://dojopuzzles.com/problems/caixa-eletronico/>

O objetivo primário é desenvolver uma solução que retornasse o menor número de cédulas para pagar um determinado valor.
O cenário proposto foi o de um caixa eletrônico, que seleciona a quantidade de notas a serem entregues ao sacar uma quantia.

## Observações importantes

- Foi pedido que o problema fosse resolvido da maneira mais simples possível, e ao mesmo tempo que houvesse uma modelagem de classes e testes automatizados. A solução mais simples seria apenas uma função com poucos parâmetros. Mas como o objetivo é demonstrar as técnicas envolvidas, tomei a liberdade de fazer um pouco mais que o mais simples possivel. Um número maior de funções com menos responsabilidades foi necessário para facilitar os testes automatizados ao mesmo tempo garantir abrangência.
- Outro ponto sobre os testes, alguns testes mais triviais de checagem de tipos não foram incluídos pois em aplicações reais este tipo de checagem costuma ser feita com ferramentas como Typescript.

### As classes da aplicação(e que possuem testes automatizados) são

- `ATM (caixa eletrônico)`
- `ClientAccount (conta)`
- `MoneyBillStorage (Armazenamento de Cédulas)`

A classe `Main` é apenas um executor, intermediando uma interface por linha de comando para a entrada e saida dos dados.

Comandos:

`npm install` | instalar

`npm start` | executar aplicação

`npm test` | executar testes automatizados

Utilização:

Quando a aplicação é iniciada é requisitado o nome do cliente e saldo da conta.

Ambos opcionais, mas pode ser interessante mudar o saldo da conta(o default é infinito, como pedido no desafio) para testes mais amplos.

Após isso o usuário tem três opções:

1 - Realizar o saque e descobrir quais e quantas cédulas receberia.

2 - Mostrar o estoque de cédulas do caixa eletrônico.

3 - Finalizar a aplicação.

Por default a máquina tem estoque infinito das cédulas de 10, 20, 50 e 100 reais (como pedido no desafio).
Mas foi programado e esta pronto para ser utilizada com um estoque finito e não apenas com cédulas destes valores(No desafio, essa era uma das sugestões para tornar a solução mais elaborada).
Para configurar o estoque de cédulas, basta acessar o arquivo index.js e modificar o array defaultBillStorages(o código possui comentários indicando como fazê-lo). Também é possível configurar os defaults de nome e saldo da conta do cliente.
