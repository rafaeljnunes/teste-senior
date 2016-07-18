//Retorna os dados de Blumenau ao carregar
$( document ).ready(function() {
	retornaFavorito();
	recebePrevisao();

});

function salvaFavorito() {
	var cidadeFav = $('#cidade').value;
	localStorage.setItem("text", cidadeFav); // save the item
}

function retornaFavorito(){
	var texto =localStorage.getItem("text"); // retrieve
	document.getElementById('#cidade').value = text; // display
}

//Retorna os dados ao enviar o formulário
function recebePrevisao() {

	var api = 'http://api.openweathermap.org/data/2.5/forecast';
	var params = {'q': $("#cidade").val(), 'APPID':  'a9f044768582be9f0ae65aae31aedb63', 'units': 'metric', 'cnt' : '5'};

	$.getJSON( api + "?" + $.param(params), function( data ) {

       //console.log(data.main.temp_max)
       // $('#temp-min').text(data.list[0].main.temp_min);
       // $('#temp-max').text(data.list[0].main.temp_max);

       //proximo 1
       $("#data1").text(data.list[0].dt_txt);
       $("#data1Media").text(data.list[0].main.temp+'º');
       $("#data1Maxima").text(data.list[0].main.temp_max+'º');
       $("#data1Minima").text(data.list[0].main.temp_min+'º');

       //proximo 2
       $("#data2").text(data.list[1].dt_txt);
       $("#data2Media").text(data.list[1].main.temp+'º');
       $("#data2Maxima").text(data.list[1].main.temp_max+'º');
       $("#data2Minima").text(data.list[1].main.temp_min+'º');

       //proximo 3
       $("#data3").text(data.list[2].dt_txt);
       $("#data3Media").text(data.list[2].main.temp+'º');
       $("#data3Maxima").text(data.list[2].main.temp_max+'º');
       $("#data3Minima").text(data.list[2].main.temp_min+'º');

       //proximo 4
       $("#data4").text(data.list[3].dt_txt);
       $("#data4Media").text(data.list[3].main.temp+'º');
       $("#data4Maxima").text(data.list[3].main.temp_max+'º');
       $("#data4Minima").text(data.list[3].main.temp_min+'º');

       //proximo 5
       $("#data5").text(data.list[4].dt_txt);
       $("#data5Media").text(data.list[4].main.temp+'º');
       $("#data5Maxima").text(data.list[4].main.temp_max+'º');
       $("#data5Minima").text(data.list[4].main.temp_min+'º');

       // //proximo 5
       // $("#data6").text(data.list[5].dt_txt);
       // $("#data6Maxima").text(data.list[5].main.temp_max+'º');
       // $("#data6Minima").text(data.list[5].main.temp_min+'º');



        

        });

}

