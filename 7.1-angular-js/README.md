# Introdução ao angularjs

- 20 minutos
- Por que usar angular
- Módulo e bootstrap no documento html
- O que é um controller

## Definição

- Usar formulários HTML pra coletar dados de modo declarativo foi o começo
- Usar javascript para criar interfaces ricas de estado persistente foi um avanço
- O Angular.js (*The Super-Heroic Javascript Framework*) é o avanço seguinte
  - estado persistente + definição declarativa
  - modularização dos complexos scripts de interface de usuário

## Aplicação

- Aplicativos ricos de internet
- Simplificar a criação de soluções complexas para a web
- Sentir-se um super-herói das *internetz*

## Exemplo / Exercício

- antes do exercício propriamente dito, precisaremos de um backend funcional

### Especificação do backend funcional

- crie um projeto node com express e knex. chame de **helloangular**
- não esquecer do **body-parser**
- na **pasta raíz do projeto**, inicialize o **knex**
- crie uma pasta para ser a pasta de conteúdo estático / *client-side*
- crie um **index.html vazio dentro da pasta de assets estáticos**
- adicione o suporte a arquivos estáticos no express
- crie uma migração inicial para criarmos nossas tabelas
- precisaremos de uma tabela de **evento** e uma tabela de **participante**
- do evento queremos saber o nome e a data em que ele ocorrerá
- do participante queremos saber o nome dele
- precisaremos de uma tabela para **relacionar que participantes participararão de quais eventos**
- nosso serviço express deverá ter **rotas para listarmos usando GET:**
  - participantes
  - eventos
  - eventos que um participante estará presente
  - participantes de um determinado evento
- precisaremos de **três rotas usando POST:**
  - criar eventos
  - criar participantes
  - salvar o relacionamento entre eventos e participantes

- caso precise, consulte as aulas anteriores ou o [gabarito](../7.3-ng-route-e-spas/README.md) da especificação

### Ao angular propriamente dito

- entre no **index.html** criado e comece com o seguinte documento

```html
<!DOCTYPE html>
<!-- index.html -->
<html>
<head>
  <title>Hello Angular!</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
</head>
<body ng-app>
<h1>Olar {{nome}}!</h1>
<input ng-model="nome"/>
</body>
</html>
```

- zero script
- *de onde veio a variável nome? [Do além](https://pt.wikipedia.org/wiki/Poltergeist)*.
- ligação didirecional (2-way-binding)
- filosofia *[Mode-View-View-Model](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)*
- o ```<body ng-app>``` é a indicação  do **bootstrap** do angular
  - indicação de que o conteúdo desta tag deverá ser magicamente modificada pelo angular
  - você pode dar *ignição* no seu aplicativo angular *programaticamente* também

```html
<!DOCTYPE html>
<!-- index.html -->
<html>
<head>
  <title>Hello Angular!</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
</head>
<body>
<h1>Olar {{nome}}!</h1>
<input ng-model="nome"/>
<script type="text/javascript">
  // um módulo
  angular.module("anguhello",[]);
  // bootstrap
  angular.bootstrap(document,["anguhello"]);
</script>
</body>
</html>
```

- módulos são a base para a parte mais bacana  do angular
- Podemos usar ```<body ng-app="anguhello">``` no lugar de ```angular.bootstrap(document,["anguhello"]);```
- com um módulo podemos definir um ou mais controllers

```html
<!DOCTYPE html>
<!-- index.html -->
<html ng-app="anguhello">
<head>
  <title>Hello Angular!</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
</head>
<body ng-controller="exemplo1 as ctl">
<!-- vamos colocar a variável nome no escopo do controller -->
<h1>Olar {{ctl.nome}}!</h1>
<input ng-model="ctl.nome"/><br/>
<button ng-click="ctl.invert()">Inverter nome</button>
<script type="text/javascript">
  // um módulo
  angular.module("anguhello",[]);

  // um controller
  angular.module("anguhello").controller("exemplo1", function(){

    this.invert = () => {
      if(this.nome)
        this.nome = this.nome.split("").reverse().join("");
    };
  });
</script>
</body>
</html>
```

- código 100% declarativo é bom, *mas*
- nem tudo pode ser declarativo
- nas situações em que precisemos de uma ação mais elaborada do que pegar o valor de um lugar e mostrar em outro, usamos [controllers](https://docs.angularjs.org/guide/controller).

- hora de comitar tudo

[Voltar](../README.md)
