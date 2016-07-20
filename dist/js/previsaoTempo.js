//Retorna os dados da cidade favorita, previsão e gera o gráfico ao carregar
$(document).ready(function () {

    recebePrevisao();
    retornaFavorito();
});

//Salva o Favorito no Banco Local
function salvaFavorito() {
    var cidadeFav = $('#cidades').val();
    localStorage.setItem("cidadeFavorita", cidadeFav); // save the item
}

//Retorna o Favorito no Banco Local
function retornaFavorito() {
    setTimeout(function () {

        var texto = localStorage.getItem("cidadeFavorita"); // retrieve

        if (texto != null) {
            
            $("#cidades option").each(function (key, val) {
                $(val).attr("selected", false);
                if ($(val).val() == texto) {
                    $(val).attr("selected", true);
                    $("#select2-cidades-container").attr("title", texto).text(texto);
                }
            });
        }

    }, 500);
}

//Formata Data Timestamp
function formatDate(aux) {
    var dataFormatada = aux;
    var timestamp = moment.unix(dataFormatada);
    return timestamp.format("DD/MM/YY");
}

//Verifica se vai dar praia
function vaiDarPraia(aux) {

    var retorno;

    for (x = 0; x < 7; x++) {
        var hoje = new Date(aux.list[x].dt);
        var diaSemana = hoje.getDay();

        if (diaSemana == 6 || diaSemana == 0) {

            retorno = (parseFloat(aux.list[x].temp.max) >= 25 ) ? "Vai dar praia! :)" : " Não vai dar praia! :(";
        }
    }

    return retorno;

    var semana = new Array(6);
    semana[0] = 'Domingo';
    semana[1] = 'Segunda-Feira';
    semana[2] = 'Terça-Feira';
    semana[3] = 'Quarta-Feira';
    semana[4] = 'Quinta-Feira';
    semana[5] = 'Sexta-Feira';
    semana[6] = 'Sábado';
}

//Gera o Gráfico com a Média de Temperaturas da Semana
function geraGrafico(aux) {

    var barData = {
        labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        datasets: [
            {
                label: 'Temperatura Mínima',
                fillColor: '#fafafa',
                data: [aux.list[0].temp.min, aux.list[1].temp.min, aux.list[2].temp.min, aux.list[3].temp.min, aux.list[4].temp.min, aux.list[5].temp.min, aux.list[6].temp.min]
            },
            {
                label: 'Temperatura Máxima',
                fillColor: '#f39c12',
                data: [aux.list[0].temp.max, aux.list[1].temp.max, aux.list[2].temp.max, aux.list[3].temp.max, aux.list[4].temp.max, aux.list[5].temp.max, aux.list[6].temp.max]
            }
        ]
    };

    var context = document.getElementById('grafico').getContext('2d');
    var clientsChart = new Chart(context).Bar(barData);

// console.log(aux.list[0])

}

//Pegar a Média Mínina e Máxima
function temperaturaMedia(temp1, temp2) {
    return ((parseFloat(temp1) + parseFloat(temp2)) / 2).toFixed(2);
}

function temperaturaMediaSemanal(aux) {
    var min = parseFloat(aux.list[0].temp.min);
    var max = parseFloat(aux.list[0].temp.max);
    var diaMin = formatDate(aux.list[0].dt);
    var diaMax = formatDate(aux.list[0].dt);

    for (x = 0; x < 7; x++) {
        if (parseFloat(aux.list[x].temp.min) < min) {
            min = parseFloat(aux.list[x].temp.min);
            diaMin = formatDate(aux.list[x].dt);
        }

        if (parseFloat(aux.list[x].temp.max) > max) {
            max = parseFloat(aux.list[x].temp.max);
            diaMax = formatDate(aux.list[x].dt);
        }
    }

    $("#dia-min").text(diaMin);
    $("#temp-min").text(min);

    $("#dia-max").text(diaMax);
    $("#temp-max").text(max);
}

//Retorna os dados ao enviar o formulário
function recebePrevisao() {

    var api = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    var params = {'q': $("#cidade").val(), 'APPID': 'aaabfc752ccf98f371b0da8ee53aa7bb', 'units': 'metric', 'cnt': '7'};

    $.getJSON(api + "?" + $.param(params), function (data) {

        console.log(api + "?" + $.param(params)); 
        //aqui funciona, vai q o plugin identifica q ta sendu usado em outro lugar, aqui não tem mais a tua chave, eu tirei, mas gera outra aí pra vc ver


        //Segunda-feira
        $("#segunda").text(formatDate(data.list[0].dt));
        $("#segundaMedia").text(temperaturaMedia(data.list[0].temp.max, data.list[0].temp.min) + 'º');
        $("#segundaMaxima").text(data.list[0].temp.max + 'º');
        $("#segundaMinima").text(data.list[0].temp.min + 'º');

        //Terça-Feira
        $("#terca").text(formatDate(data.list[1].dt));
        $("#tercaMedia").text(temperaturaMedia(data.list[1].temp.max, data.list[1].temp.min) + 'º');
        $("#tercaMaxima").text(data.list[1].temp.max + 'º');
        $("#tercaMinima").text(data.list[1].temp.min + 'º');

        //Quarta-Feira
        $("#quarta").text(formatDate(data.list[2].dt));
        $("#quartaMedia").text(temperaturaMedia(data.list[2].temp.max, data.list[2].temp.min) + 'º');
        $("#quartaMaxima").text(data.list[2].temp.max + 'º');
        $("#quartaMinima").text(data.list[2].temp.min + 'º');

        //Quinta-Feira
        $("#quinta").text(formatDate(data.list[3].dt));
        $("#quintaMedia").text(temperaturaMedia(data.list[3].temp.max, data.list[3].temp.min) + 'º');
        $("#quintaMaxima").text(data.list[3].temp.max + 'º');
        $("#quintaMinima").text(data.list[3].temp.min + 'º');

        //Sexta-Feira
        $("#sexta").text(formatDate(data.list[4].dt));
        $("#sextaMedia").text(temperaturaMedia(data.list[4].temp.max, data.list[4].temp.min) + 'º');
        $("#sextaMaxima").text(data.list[4].temp.max + 'º');
        $("#sextaMinima").text(data.list[4].temp.min + 'º');

        //Sábado
        $("#sabado").text(formatDate(data.list[5].dt));
        $("#sabadoMedia").text(temperaturaMedia(data.list[5].temp.max, data.list[5].temp.min) + 'º');
        $("#sabadoMaxima").text(data.list[5].temp.max + 'º');
        $("#sabadoMinima").text(data.list[5].temp.min + 'º');

        //Domingo
        $("#domingo").text(formatDate(data.list[6].dt));
        $("#domingoMedia").text(temperaturaMedia(data.list[6].temp.max, data.list[6].temp.min) + 'º');
        $("#domingoMaxima").text(data.list[6].temp.max + 'º');
        $("#domingoMinima").text(data.list[6].temp.min + 'º');

        //Vai Dar Praia?
        $("#praia").text(vaiDarPraia(data));

        geraGrafico(data);
        temperaturaMediaSemanal(data);
    });
}