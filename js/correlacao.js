function handleFiles(files) {
    if (window.FileReader) {
        getAsText(files[0])
    } else {
        alert('Função de importação de dados não suportada pelo navegador!')
    }
}
function getAsText(fileToRead) {
    var reader = new FileReader()    
    reader.readAsText(fileToRead)
    reader.onload = loadHandler
    reader.onerror = errorHandler
}

function loadHandler(event) {
    var csv = event.target.result
    processData(csv)
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/)
    var lines = []

    for (let i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';')
            var tarr = []
            for (var j=0; j<data.length; j++) {
                tarr.push(data[j])
            }
            lines.push(tarr)
    }

    var dados = ""
    var dadosX = []
    var dadosXCSV = ""
    var dadosY = []
    var dadosYCSV = ""
    for (let i2 = 0; i2 < lines.length; i2++) {
        if ((i2+1) < lines.length){
        var iString = (i2+1).toString()
        dados = lines[iString][0]
        var dadosLine = dados.split(",")
        dadosX[i2] = dadosLine[0]
        dadosY[i2] = dadosLine[1]
        if (i2 < (lines.length - 2)) {
            dadosXCSV += (dadosX[i2])+";"
            dadosYCSV += (dadosY[i2])+";"
        } else {
            dadosXCSV += (dadosX[i2])
            dadosYCSV += (dadosY[i2])
          }
        }
    }

    document.getElementById("dadosX").value = dadosXCSV
    document.getElementById("dadosY").value = dadosYCSV
}

function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function correlacao() {
    const dadosX = document.getElementById("dadosX").value
    const dadosY = document.getElementById("dadosY").value
    var dadosXArray = dadosX.split(";")
    var dadosYArray = dadosY.split(";")
    var somatoriaX = 0
    var somatoriaY = 0
    var somatoriaXY = 0
    var somatoriaX2 = 0
    var somatoriaY2 = 0

    if (dadosXArray.length !== dadosYArray.length) {
        alert('A quantidade de X e Y precisam ser iguais')
    }
    else {
        for (let i = 0; i < dadosXArray.length; i++) {
            somatoriaX += Number(dadosXArray[i])
            somatoriaY += Number(dadosYArray[i])
            somatoriaXY += (Number(dadosXArray[i])*Number(dadosYArray[i]))
            somatoriaX2 += Math.pow(Number(dadosXArray[i]),2)
            somatoriaY2 += Math.pow(Number(dadosYArray[i]),2)
        }
    }
    console.log(somatoriaX)
    console.log(somatoriaY)
    console.log(somatoriaXY)
    console.log(somatoriaX2)
    console.log(somatoriaY2)
    var r1 = (dadosXArray.length * somatoriaXY) - (somatoriaX * somatoriaY)
    var r2 = Math.sqrt((dadosXArray.length * somatoriaX2) - Math.pow(somatoriaX,2))
    var r3 = Math.sqrt((dadosXArray.length * somatoriaY2) - Math.pow(somatoriaY,2))
    var r = ((r1 / (r2*r3))*100).toFixed(2)
    console.log(r1)
    console.log(r2)
    console.log(r3)
    console.log(r)

    var a = r1 / Math.pow(r2,2)
    var x = somatoriaX / dadosXArray.length
    var y = somatoriaY / dadosXArray.length
    var b = y - (a*x)
    var equacao = "Y = "+(a).toFixed(2)+" . X "+"+ "+(b).toFixed(2)
    console.log(a)
    console.log(b)
    console.log(x)
    console.log(y)
    console.log(equacao)

    if (r >= 90 || r <= -90) {
        var nivel = "Muito Forte"
    }
    else if (r >= 70 || r <= -70) {
        var nivel = "Forte"
    }
    else if (r >= 50 || r <= -50) {
        var nivel = "Moderada"
    }
    else if (r >= 30 || r <= -30) {
        var nivel = "Fraca"
    }
    else if (r < 30 || r > -30) {
        var nivel = "Desprezível"
    }
    console.log(nivel)



    document.getElementById("tabela-correlacao").innerHTML = `<table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Correlação</th>
            <th scope="col">Nível</th>
            <th scope="col">Equação</th>
        </tr>
        </thead>
        <tbody id="tabelaCorrelacao"></tbody>
        </table>`

    document.getElementById("tabelaCorrelacao").innerHTML = `<td>${r}%</td><td>${nivel}</td><td>${equacao}</td>`

    document.getElementById("projecao").innerHTML =`<select id="opRegressao">
        <option value="0">Escolha</option>
        <option value="x">X</option>
        <option value="y">Y</option>
    </select>
    <input id="valor" type="text" placeholder="Digite um valor" size="10">
    <button type="button" class="btn btn-dark" onclick="regressao()">Calcular Regressão</button><br><br>
    <h3 id="resRegressao"></h3>`

    
    var chart = document.getElementsByClassName("chart")

    var grafico = new Chart(chart, {
        type:'line',
        data:{
            labels: dadosXArray,
            datasets: [
                {
                    label: "Y",
                    data: dadosYArray,
                    borderColor: "#3e95cd",
                    fill: false
                }
                ]
        },
        options:{ 
            scales:{
                yAxes: [
                    {
                        ticks:{
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    })
      
}

function regressao(){
        var opRegressao = document.getElementById("opRegressao").value
        var valor = Number(document.getElementById("valor").value)
        const dadosX = document.getElementById("dadosX").value
        const dadosY = document.getElementById("dadosY").value
        var dadosXArray = dadosX.split(";")
        var dadosYArray = dadosY.split(";")
        var somatoriaX = 0
        var somatoriaY = 0
        var somatoriaXY = 0
        var somatoriaX2 = 0
        var somatoriaY2 = 0

        for (let i = 0; i < dadosXArray.length; i++) {
            somatoriaX += Number(dadosXArray[i])
            somatoriaY += Number(dadosYArray[i])
            somatoriaXY += (Number(dadosXArray[i])*Number(dadosYArray[i]))
            somatoriaX2 += Math.pow(Number(dadosXArray[i]),2)
            somatoriaY2 += Math.pow(Number(dadosYArray[i]),2)
        }

        var r1 = (dadosXArray.length * somatoriaXY) - (somatoriaX * somatoriaY)
        var r2 = Math.sqrt((dadosXArray.length * somatoriaX2) - Math.pow(somatoriaX,2))

        var a = r1 / Math.pow(r2,2)
        var x = somatoriaX / dadosXArray.length
        var y = somatoriaY / dadosXArray.length
        var b = y - (a*x)

        if (opRegressao == "0") {
            alert('Escolha uma Opção (X ou Y) para continuar a projeção')
        }
        else if (opRegressao == "x") {
            var y2 = ((a * valor) + b).toFixed(2)
            document.getElementById("resRegressao").innerHTML = `Y = ${y2}`
        }
        else if (opRegressao == "y") {
            var x2 = ((valor - b) / a).toFixed(2)
            document.getElementById("resRegressao").innerHTML = `X = ${x2}`
        }
}
