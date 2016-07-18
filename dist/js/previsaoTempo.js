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

//Retorna os dados ao enviar o formulário
function recebePrevisao() {

	var api = 'http://api.openweathermap.org/data/2.5/forecast/daily';
	var params = {'q': $("#cidade").val(), 'APPID':  'a9f044768582be9f0ae65aae31aedb63', 'units': 'metric', 'cnt' : '5'};

	$.getJSON( api + "?" + $.param(params), function( data ) {


       //proximo 1
       //var newData = new Date(data.list[0].dt);
       //var dia = newData.getDay();
       //var mes = newData.getMonth();
       //var ano = newData.getFullYear();
       //newData.setFullYear(ano, mes, dia);
       // console.log(dia + '/' + mes + '/' + ano);
       //console.log(newData);

       // var dataFormatada = data.list[0].dt;
       // var timestamp = moment.unix(dataFormatada);
       // console.log( timestamp.format("DD/MM/YY") );

       $("#data1").text(formatDate(data.list[0].dt));
       $("#data1Maxima").text(data.list[0].temp.max+'º');
       $("#data1Minima").text(data.list[0].temp.min+'º');

       //proximo 2
       $("#data2").text(formatDate(data.list[1].dt));
       $("#data2Maxima").text(data.list[1].temp.max+'º');
       $("#data2Minima").text(data.list[1].temp.min+'º');

       //proximo 3
       $("#data3").text(formatDate(data.list[2].dt));
       $("#data3Maxima").text(data.list[2].temp.max+'º');
       $("#data3Minima").text(data.list[2].temp.min+'º');

       //proximo 4
       $("#data4").text(formatDate(data.list[3].dt));
       $("#data4Maxima").text(data.list[3].temp.max+'º');
       $("#data4Minima").text(data.list[3].temp.min+'º');

       //proximo 5
       $("#data5").text(formatDate(data.list[4].dt));
       $("#data5Maxima").text(data.list[4].temp.max+'º');
       $("#data5Minima").text(data.list[4].temp.min+'º');

       // //proximo 5
       // $("#data6").text(data.list[5].dt_txt);
       // $("#data6Maxima").text(data.list[5].main.temp_max+'º');
       // $("#data6Minima").text(data.list[5].main.temp_min+'º');



        

        });

}

function formatDate(aux){
       var dataFormatada = aux;
       var timestamp = moment.unix(dataFormatada);
       return timestamp.format("DD/MM/YY");
}