var CURSOS = httpGet('./cursos.json');
var MATRIZES = httpGet('./matrizes.json');
//console.log(MATRIZES)

function httpGet(theUrl) {
  var http = new XMLHttpRequest();
  http.open("GET", theUrl, false);
  http.send();
  let response = JSON.parse(http.responseText);
  return sortByKey(response, 'descricao');
}

function sortByKey(array, key) {
	return array.sort(function(a, b) {
	    var x = a[key]; var y = b[key];
	    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}


$.each(MATRIZES, function(result, value) {
  if ($('#selectMatriz option[value='+ value.uuid +']').length == 0) {
    $('#selectMatriz').append($('<option>').text(value.descricao).attr('value', value.uuid));
  }
});

$( "select" )
  .change(function (value) {
    $( "select option:selected" ).each(function() {
    	 let result = CURSOS.filter(x => x.matriz_vingente.uuid === this.value);
    	 if(result && result.length > 0){
    	 	let object = result[0];
    	 	$("#cursoCordenador").html("  " + object.coordenador);
    	 	$("#cursoDescricao").html("  " + object.descricao);
    	 	$("#cursoDiretoria").html("  " + object.diretoria);
    	 	$("#cursoModalidade").html("  " + object.modalidade);
    	 	$("#cursoNaturezaParticipacao").html("  " + object.natureza_participacao);

    	 }
    });
  })



  .change();