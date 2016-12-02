
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
