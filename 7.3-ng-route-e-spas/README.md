# O angular route (ng-route) e as Single Page Applications (SPA)

- 40 minutos
- ponto de montagem da SPA
- fragmentos de documento
- parâmetros da rota

## Definição / Aplicação

- vimos que usando angular fica mais simples fazer coisas complexas
  - mesmo assim as coisas não deixam se ser complexas
- duplicamos um documento inteiro pra termos acesso a outra funcionalidade
- as partes semelhantes são muitas
- entra agora a definição de SPA
  - **[Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application)** facilitam a criação de sistemas bem maiores
  - conceito similar ao das rotas do express
- SPA's precisam de um **ponto de montagem**

## Exemplo / Exercício

- vamos criar os arquivos eventos.html e participantes.html
- vamos colocar um ```<div ng-view></div>``` no index.html
- vamos fazer o roteamento dos nossos controladores
- vamos adicionar no index.html a dependência do angular-route
- criar os mapeamentos de rotas de controladores

```html
<!DOCTYPE html>
<!-- index.html -->
<html ng-app="anguhello">
  <head>
    <title>Hello Angular!</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-route.min.js"></script>
  </head>
  <body>
    <a href="#/eventos">Eventos</a> | <a href="#/participantes">Participantes</a><br/>
    <div ng-view></div>
    <script type="text/javascript" src="modulo.js"></script>
    <script type="text/javascript" src="controllers.js"></script>
    <script type="text/javascript" src="servicos.js"></script>
  </body>
</html>
```

- eventos.html:

```html
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
```

- participantes.html:

```html
<h1>Participantes</h1>
<form ng-submit="ctl.salvaparticipante()">
  <fieldset>
    <legend>Novo participante</legend>
    <label>Nome do participante</label>
    <input ng-model="ctl.novo.nomeparticipante" required/>
    <br/>
    <input type="submit"/>
  </fieldset>
</form>
<ul>
  <li ng-repeat=" ev in ctl.participantes">{{ev.nomeparticipante}}</li>
</ul>
```

- modulo.js:
- adicionada a dependência do angular route:

```javascript
angular.module("anguhello",[
  "ngRoute"
]);
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

angular.module("anguhello").controller("participantescontroller", function(participanteservice){

  this.novo = {};

  this.listar = () => participanteservice.buscaparticipante().then( (ret) => {
    this.participantes = ret.data;
  });

  // carregar a lista imediatamente após carregar o controlador
  this.listar();

  this.salvaparticipante = () => {
    participanteservice.salvaparticipante(this.novo).then( (ret) => {
      alert("participante salvo com id "+ret.data.idparticipante);
      this.listar();
      this.novo = {};
    });
  };
});

// roteamento
angular.module("anguhello").config(($routeProvider) => {

  $routeProvider.when("/eventos", {
    controllerAs:"eventocontroller as ctl",
    templateUrl:"eventos.html"
  });

  $routeProvider.when("/participantescontroller", {
    controllerAs:"participantescontroller as ctl",
    templateUrl:"participantes.html"
  });

  $routeProvider.otherwise("/eventos");

})

```

- services.js:

```javascript
angular.module("anguhello").service("eventoservice", function ($http){

  this.buscaeventos = () => $http.get("eventos");

  this.salvaevento = (ev) => $http.post("evento",ev);

});

angular.module("anguhello").service("participanteservice", function ($http){

  this.buscaparticipantes = () => $http.get("participantes");

  this.salvaparticipante = (ev) => $http.post("participante",ev);

});

```

- a vantagem é que fica mais fácil adicionar outras telas agora
- não esquecer de comitar este exercício

## Gabarito do backend

### Especificação do backend do probjeto **helloangular**

```bash
mkdir helloangular
cd helloangular
npm init -y
npm install express body-parser knex sqlite3 --save
knex init
mkdir public
touch public/index.html
touch index.js
touch db.js
knex migrate:make esquema_do_banco
```

- por comodidade, adicione o nosso velho conhecido **db.js** ao projeto

```javascript
// db.js
const knexfile = require("./knexfile.js");
const env = process.env.NODE_ENV || "development";
const knex = require("knex")(knexfile[env]);
module.exports = knex;
```

- o migrate tem parte do nome dinâmico
- a modelagem deve refletir sua visão
- abaixo é apenas *uma* proposta

```javascript
// migrations/20161201195512_esquema_do_banco.js
exports.up = function(knex, Promise) {
  return knex.schema.createTable("evento" (table) => {
    table.increments("idevento");
    table.string("dscevento").notNullable();
    table.date("dtevento").notNullable();
  }).createTable("participante" (table) => {
    table.increments("idparticipante");
    table.string("nomeparticipante").notNullable();
  }).createTable("evento_participante" (table) => {
    table.integer("idevento").notNullable().references("evento.idevento");
    table.integer("idparticipante").notNullable().references("participante.idparticipante");
    table.primary(["idevento","idparticipante"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema//
    .dropTable("evento_participante")// última criada, primeira removida
    .dropTable("participante")//
    .dropTable("evento");
};
```

- o **index.js** fica mais ou menos assim:

```javascript
// index.js
const express    = require("express");
const bodyParser = require("body-parser");
const knex       = require("./db");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/eventos", (req,res) => {
  knex("evento").select().then((ret) => res.send(ret));
});

app.get("/participantes", (req,res) => {
  knex("participante").select().then((ret) => res.send(ret));
});

app.get("/evento/:idevento/participantes", (req,res) => {
  var subquery = knex("evento_participante").select("idparticipante").where({
    idevento:req.params.idevento
  });
  knex("participante").select()//
  .whereIn("idparticipante", subquery).then((ret) => res.send(ret));
});

app.get("/participante/:idparticipante/eventos", (req,res) => {
  var subquery = knex("evento_participante").select("idevento").where({
    idparticipante:req.params.idparticipante
  });
  knex("evento").select()//
  .whereIn("idevento", subquery).then((ret) => res.send(ret));
});

app.post("/evento", (req,res) => {
  var novo = req.body;
  knex("evento").insert(novo,"idevento").then((ret) => {
    novo.idevento=ret[0];
    res.send(novo);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.post("/participante", (req,res) => {
  var novo = req.body;
  knex("participante").insert(novo,"idparticipante").then((ret) => {
    novo.idparticipante=ret[0];
    res.send(novo);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.post("/participaevento", (req,res) => {
  var rel = req.body;
  // .inser(rel) também funciona
  knex("evento_participante").insert({
    idparticipante:rel.idparticipante,
    idevento:rel.idevento
  }).then((ret) => {
    res.send("OK");
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// conveniência
knex.migrate.latest().then( () => {
  app.listen(3000);
  console.log("app online");
});

```
