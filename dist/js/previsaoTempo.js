//Retorna os dados de Blumenau ao carregar
$( document ).ready(function() {
	retornaFavorito();
	recebePrevisao();

});

//Salva o Favorito no Banco Local
function salvaFavorito() {
	var cidadeFav = $('#cidade').val();
	localStorage.setItem("cidadeFavorita", cidadeFav); // save the item
}

//Retorna o Favorito no Banco Local
function retornaFavorito(){
	var texto =localStorage.getItem("cidadeFavorita"); // retrieve
	document.getElementById('cidade').value = texto; // display
       console.log(texto)
}

//Formata Data Timestamp
function formatDate(aux){
       var dataFormatada = aux;
       var timestamp = moment.unix(dataFormatada);
       return timestamp.format("DD/MM/YY");
}

//Verifica se vai dar praia
function vaiDarPraia(aux) {

       var retorno;

       for(x=0; x<7; x++){
              var hoje=new Date(aux.list[x].dt);
              var diaSemana= hoje.getDay();

              if(diaSemana == 6 || diaSemana == 0){

                     retorno = (parseFloat(aux.list[0].temp.max) >= 25) ? "Vai dar praia! :)" : " Não vai dar praia! :(";
              }
       }

       return retorno;

       var semana=new Array(6);
       semana[0]='Domingo';
       semana[1]='Segunda-Feira';
       semana[2]='Terça-Feira';
       semana[3]='Quarta-Feia';
       semana[4]='Quinta-Feira';
       semana[5]='Sexta-Feira';
       semana[6]='Sábado';
}

//Retorna os dados ao enviar o formulário
function recebePrevisao() {

	var api = 'http://api.openweathermap.org/data/2.5/forecast/daily';
	var params = {'q': $("#cidade").val(), 'APPID':  'a9f044768582be9f0ae65aae31aedb63', 'units': 'metric', 'cnt' : '7'};

	$.getJSON( api + "?" + $.param(params), function( data ) {

       //Data Atual
       $("#data1").text(formatDate(data.list[0].dt));
       $("#data1Maxima").text(data.list[0].temp.max+'º');
       $("#data1Minima").text(data.list[0].temp.min+'º');

       //Proximo 2
       $("#data2").text(formatDate(data.list[1].dt));
       $("#data2Maxima").text(data.list[1].temp.max+'º');
       $("#data2Minima").text(data.list[1].temp.min+'º');

       //Proximo 3
       $("#data3").text(formatDate(data.list[2].dt));
       $("#data3Maxima").text(data.list[2].temp.max+'º');
       $("#data3Minima").text(data.list[2].temp.min+'º');

       //Proximo 4
       $("#data4").text(formatDate(data.list[3].dt));
       $("#data4Maxima").text(data.list[3].temp.max+'º');
       $("#data4Minima").text(data.list[3].temp.min+'º');

       //Proximo 5
       $("#data5").text(formatDate(data.list[4].dt));
       $("#data5Maxima").text(data.list[4].temp.max+'º');
       $("#data5Minima").text(data.list[4].temp.min+'º');


       $("#praia").text(vaiDarPraia(data));

       });

}

