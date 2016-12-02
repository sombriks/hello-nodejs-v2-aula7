angular.module("anguhello").service("eventoservice", function ($http){

  this.buscaeventos = () => $http.get("eventos");

  this.salvaevento = (ev) => $http.post("evento",ev);

});
