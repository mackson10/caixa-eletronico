# Desafio Caixa Eletrônico

Este projeto é uma solução para o problema descrito em:
https://dojopuzzles.com/problems/caixa-eletronico/

O objetivo primário era desenvolver uma solução que retornasse o menor número de cédulas para pagar um determinado valor.
O cenário proposto foi o de um caixa eletrônico, que seleciona a quatidade de notas a serem entregues ao sacar uma quantia.

Observações importantes:
Foi pedido que o problema fosse resolvido da maneira mais simples possível, e ao mesmo tempo que houvesse uma modelagem de classe e testes automatizados.
A solução mais simples seria apenas uma função com poucos parâmetros.
Mas como o objetivo é demonstrar as técnicas envolvidas, tomei a liberdade de fazer um pouco mais que o mais simples possivel.
Um maior número número de funções com menos responsabilidades foi necessário para facilitar os testes automatizados ao mesmo tempo garantir abrangência.

As classes da aplicação(e que possuem testes automatizados) são:

ATM (caixa eletrônico)

ClientAccount (conta)

MoneyBillStorage (Armazenamento de Cédulas)

Comandos:

npm install | instalar

npm start | executar aplicação

npm test | executar testes automatizados

Utilização:

Quando a aplicação é iniciada é requisitado o nome do cliente e saldo da conta.

Ambos opcionais, mas pode ser interessante mudar o saldo conta para testes mais amplos.

Após isso o usuário tem duas opções():

1 - Realizar o saque e descobrir quais e quantas cédulas receberia.

2 - Mostrar o estoque de cédulas do caixa eletrônico.

Por default a máquina tem estoque infinito das cédulas de 10, 20, 50 e 100 reais (como pedido no desafio).
Mas foi programado e esta pronto para ser utilizada com um estoque finito e não apenas com cédulas destes valores.
Para configurar o estoque de cédulas, basta acessar o arquivo index.js e modificar o array billStorages
