[Voltar](../README.md)

Arquivos-resposta-gabarito até [7.2-servicos-angular-js](../7.2-servicos-angular-js/README.md)

Antes de mais nada..

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
