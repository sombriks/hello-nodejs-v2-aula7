# Criando serviços do angularjs

- 25 minutos
- serviço $http
- abstração de negócio

## Definição / Aplicação / Exemplo

- podemos usar o angular para consumir os serviços que criamos para esta aula:

```html
<!DOCTYPE html>
<!-- index.html -->
<html ng-app="anguhello">
  <head>
    <title>Hello Angular!</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  </head>
  <body ng-controller="exemplo1 as ctl">
    <h1>Eventos</h1>
    <form ng-submit="ctl.salvaevento()">
      <fieldset>
        <legend>Novo evento</legend>
        <label>Data</label>
        <input type="date" ng-model="ctl.novo.dtevento" required/>
        <br/>
        <label>Descrição do evento</label>
        <input ng-model="ctl.novo.dscevento" required/>
        <br/>
        <input type="submit"/>
      </fieldset>
    </form>
    <ul>
      <li ng-repeat=" ev in ctl.eventos">{{ev.dtevento | date: "yyyy/MM/dd"}} {{ev.dscevento}}</li>
    </ul>
    <script type="text/javascript">
      angular.module("anguhello",[]);
      //
      angular.module("anguhello").controller("exemplo1", function($http){

        this.novo = {};

        this.listar = () => $http.get("eventos").then( (ret) => {
          this.eventos = ret.data;
        });

        // carregar a lista imediatamente após carregar o controlador
        this.listar();

        this.salvaevento = () => {
          $http.post("evento",this.novo).then( (ret) => {
            alert("evento salvo com id "+ret.data.idevento);
            this.listar();
            this.novo = {};
          });
        };
      });
    </script>
  </body>
</html>
```

- observe que embora a funcionalidade tenha aumentado, a complexidade do código também aumentou
- as chamadas ao [$http](https://docs.angularjs.org/api/ng/service/$http) começam a complicar o código
- o angular oferece um meio de reusar estas chamadas através da criação de [services](https://docs.angularjs.org/guide/services)

- vamos começar organizando nosso código angular em arquivos separados:
  - public/index.html
  - public/modulo.js
  - public/controllers.js
  - public/servicos.js

```html
<!DOCTYPE html>
<!-- index.html -->
<html ng-app="anguhello">
  <head>
    <title>Hello Angular!</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
  </head>
  <body ng-controller="eventocontroller as ctl">
    <h1>Eventos</h1>
    <form ng-submit="ctl.salvaevento()">
      <fieldset>
        <legend>Novo evento</legend>
        <label>Data</label>
        <input type="date" ng-model="ctl.novo.dtevento" required/>
        <br/>
        <label>Descrição do evento</label>
        <input ng-model="ctl.novo.dscevento" required/>
        <br/>
        <input type="submit"/>
      </fieldset>
    </form>
    <ul>
      <li ng-repeat=" ev in ctl.eventos">{{ev.dtevento | date: "yyyy/MM/dd"}} {{ev.dscevento}}</li>
    </ul>
    <script type="text/javascript" src="modulo.js"></script>
    <script type="text/javascript" src="controllers.js"></script>
    <script type="text/javascript" src="servicos.js"></script>
  </body>
</html>
```

- modulo.js:

```javascript
angular.module("anguhello",[]);
// isso é tudo, pessoal!
```

- controllers.js:

```javascript
angular.module("anguhello").controller("eventocontroller", function(eventoservice){

  this.novo = {};

  this.listar = () => eventoservice.buscaeventos().then( (ret) => {
    this.eventos = ret.data;
  });

  // carregar a lista imediatamente após carregar o controlador
  this.listar();

  this.salvaevento = () => {
    eventoservice.salvaevento(this.novo).then( (ret) => {
      alert("evento salvo com id "+ret.data.idevento);
      this.listar();
      this.novo = {};
    });
  };
});
```

- servicos.js:

```javascript
angular.module("anguhello").service("eventoservice", function ($http){

  this.buscaeventos = () => $http.get("eventos");

  this.salvaevento = (ev) => $http.post("evento",ev);

});
```

- assim como no *backend*, separar em vários arquivos ajuda a organizar e modularizar o código
- serviços promovem o reuso e aumentam a semântica do aplicativo
  - ```buscaeventos()``` é mais legível que ```$http.get("eventos")```

## Exercício

- crie um arquivo chamado index2.html baseado no index.html
- este arquivo deverá ter o cadastro básico de **participantes**
- crie um serviço para listar e salvar participantes. chame-o de **participanteservice**
- batize o controller de participantes de **participantecontroller**
- coloque a definição do service no arquivo **servicos.js**
- coloque a definição do controller de participantes no arquivo **controllers.js**
