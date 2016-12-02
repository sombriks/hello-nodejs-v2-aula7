
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
