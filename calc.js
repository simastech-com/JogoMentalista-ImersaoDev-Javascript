var botoes = document.getElementsByTagName("button");

for (var i = 0; i < botoes.length; botoes++) {
    botoes[i].addEventListener('click', (e) => {
        e.preventDefault();
    });
}


document.getElementById("form").addEventListener('click', (e) => {
    e.preventDefault();
});

var numeroSorteado;
var tentativas = [];

function comecarJogo() {
    do {
        numeroSorteado = Math.floor(Math.random() * 1001);
    } while (numeroSorteado == 0);

    document.getElementById("nome").disabled = false;
    document.getElementById("palpite").disabled = false;
    document.getElementById("btnEnviar").disabled = false;
    document.getElementById("btnComecar").disabled = true;
    document.getElementById("resultado").innerHTML = "10 tentativas restantes!";
}

function enviarPalpite() {
    var nome = document.getElementById("nome").value;
    var palpite = document.getElementById("palpite").value;

    if (nome == "") {
        alert("Informe seu nome!");
    }
    else if (palpite == "") {
        alert("Informe seu palpite!");
    }
    else if (isNaN(Number(palpite))) {
        alert("O palpite deve ser um número!");
    }
    else if (!Number.isInteger(Number(palpite))) {
        alert("O palpite deve ser um número inteiro!");
    }
    else if (Number(palpite) < 1 || Number(palpite) > 1000) {
        alert("Informe um número entre 1 e 1000!");
    }
    else {
        var acertou = false;
        var p = [nome, Number(palpite)];
        var listaNomes = [];
        tentativas.push(p);

        document.getElementById("nome").value = "";
        document.getElementById("palpite").value = "";

        var textoResultado = "";
        for (var i = 0; i < tentativas.length; i++) {
            textoResultado += "Palpite " + (i + 1) + ": " + tentativas[i][0] + " sugeriu " + tentativas[i][1];
            textoResultado += " => ";
            if (tentativas[i][1] > numeroSorteado) {
                textoResultado += tentativas[i][1] + " é maior que o número sorteado!";
            }
            else if (tentativas[i][1] < numeroSorteado) {
                textoResultado += tentativas[i][1] + " é menor que o número sorteado!";
            }
            else {
                textoResultado += " Parabéns! Você acertou!";
                acertou = true;
            }
            textoResultado += "<br/>";

            if (!listaNomes.includes(tentativas[i][0])) {
                listaNomes.push(tentativas[i][0]);
            }
        }

        if (!acertou && tentativas.length >= 10) {
            textoResultado = "A brincadeira acabou! O número era " + numeroSorteado + "<br/><br/>" + textoResultado;
        }
        else {
            textoResultado = (10 - tentativas.length) + " tentativas restantes!<br/><br/>" + textoResultado;
        }

        document.getElementById("resultado").innerHTML = textoResultado;

        var textoListaNomes = "";
        for (var i = 0; i < listaNomes.length; i++) {
            textoListaNomes += '<option value="' + listaNomes[i] + '">';
        }
        document.getElementById("listaNomes").innerHTML = textoListaNomes;

        if (acertou || tentativas.length >= 10) {
            document.getElementById("nome").disabled = true;
            document.getElementById("palpite").disabled = true;
            document.getElementById("btnEnviar").disabled = true;
            document.getElementById("btnComecar").disabled = false;
        }
    }

}
