function binominal() {
    const amostra = document.getElementById("amostra").value
    const taxaSucesso = document.getElementById("taxaS").value
    const taxaFracasso = document.getElementById("taxaF").value
    const eventos = document.getElementById("eventos").value
}

function uniforme() {
    const pMinimo = document.getElementById("pMinimo").value
    const pMaximo = document.getElementById("pMaximo").value
    let opUniforme = document.getElementById("opUniforme").value
    if (opUniforme == "maior") {
        const valor = document.getElementById("valorU").value
    }
    else if (opUniforme == "menor") {
        const valor = document.getElementById("valorU").value
    }
    else if (opUniforme == "entre"){
        const inicio = document.getElementById("inicioU").value
        const fim = document.getElementById("fimU").value
    }
}

function opUniforme() {
    let opUniforme = document.getElementById("opUniforme").value

    if (opUniforme == "maior" || opUniforme == "menor") {
        document.getElementById("inputUniforme").innerHTML = `<input id="valorU" placeholder="Digite o valor" size="30"></input>`
    }
    else if (opUniforme == "entre"){
        document.getElementById("inputUniforme").innerHTML = `<input id="inicioU" placeholder="Início"></input>
        <input id="fimU" placeholder="Fim"></input>`
    }
}

function normal() {
    const media = document.getElementById("media").value
    const desvio = document.getElementById("desvio").value
    let opNormal = document.getElementById("opNormal").value
    if (opNormal == "maior") {
        const valor = document.getElementById("valorN").value
    }
    else if (opNormal == "menor") {
        const valor = document.getElementById("valorN").value
    }
    else if (opNormal == "entre"){
        const inicio = document.getElementById("inicioN").value
        const fim = document.getElementById("fimN").value
    }
}

function opNormal() {
    let opNormal = document.getElementById("opNormal").value

    if (opNormal == "maior" || opNormal == "menor") {
        document.getElementById("inputNormal").innerHTML = `<input id="valorN" placeholder="Digite o valor" size="30"></input>`
    }
    else if (opNormal == "entre"){
        document.getElementById("inputNormal").innerHTML = `<input id="inicioN" placeholder="Início"></input>
        <input id="fimN" placeholder="Fim"></input>`
    }
}