function binomial() {
    const amostra = Number(document.getElementById("amostra").value)
    const taxaSucesso = Number(document.getElementById("taxaS").value)
    const taxaFracasso = Number(document.getElementById("taxaF").value)
    const eventos = document.getElementById("eventos").value

    let eventosArray = eventos.split(";")
    eventosArray.sort((a, b) => a - b)
            
    let event = eventosArray.filter(function(e, index, self) {
        return index === self.indexOf(e);
    })

    if (event.length === 1) {
        var nFat = 1
        for(let i = 1 ; i <= amostra ; i++){
            nFat *= i
        }
        var nkFat = 1
        for(let i = 1 ; i <= (amostra - Number(event)); i++){
            nkFat *= i
        }
        var kFat = 1
        for(let i = 1 ; i <= Number(event); i++){
            kFat *= i
        }
        const analiseComb = nFat / (nkFat * kFat)
        
        const pk = Math.pow(taxaSucesso, eventos)
        const nk = amostra - eventos
        const qnk = Math.pow(taxaFracasso, nk)
        const res = (analiseComb * pk * qnk)*100
        document.getElementById("resBinomial").innerHTML = `<h3>A Probabilidade é de ${(res).toFixed(2)}%</h3>`
    }
    else {
        const analiseCombVet = []
        var res = 0
        for (let i = 0; i < event.length; i++) {
            const events = Number(event[i])
            var nFat = 1
            for(let i2 = 1 ; i2 <= amostra ; i2++){
                nFat *= i2
            }

            var nkFat = 1
            for(let i2= 1 ; i2 <= (amostra - events); i2++){
                nkFat *= i2
            }

            var kFat = 1
            for(let i2 = 1 ; i2 <= events; i2++){
                kFat *= i2
            }

            analiseCombVet[i] = nFat / (nkFat * kFat)
            const pk = Math.pow(taxaSucesso, events)
            const nk = amostra - events
            const qnk = Math.pow(taxaFracasso, nk)
            res += (analiseCombVet[i] * pk * qnk)
        }
        document.getElementById("resBinomial").innerHTML = `<h3>A Probabilidade é de ${(res*100).toFixed(2)}%</h3>`
    }
    
}

function uniforme() {
    const pMinimo = Number(document.getElementById("pMinimo").value)
    const pMaximo = Number(document.getElementById("pMaximo").value)
    
    const media = (pMaximo + pMinimo) / 2
    const desvio = Math.sqrt((Math.pow((pMaximo - pMinimo),2))/12)
    const variancia = (desvio / media) * 100

    let opUniforme = document.getElementById("opUniforme").value
    if (opUniforme == "maior") {
        const valor = document.getElementById("valorU").value
        var probabilidade = Math.round((1 / (pMaximo - pMinimo) * (pMaximo - valor))*100)
    }
    else if (opUniforme == "menor") {
        const valor = document.getElementById("valorU").value
        var probabilidade = Math.round((1 / (pMaximo - pMinimo) * (valor - pMinimo))*100)
    }
    else if (opUniforme == "entre"){
        const inicio = document.getElementById("inicioU").value
        const fim = document.getElementById("fimU").value
        var probabilidade = Math.round((1 / (pMaximo - pMinimo) * (fim - inicio))*100)
    }
    document.getElementById("tabela-uniforme").innerHTML = `<table class="table">
        <thead class="thead-dark">
        <tr>
            <th scope="col">Probabilidade</th>
            <th scope="col">Média</th>
            <th scope="col">Desvio Padrão</th>
            <th scope="col">Coeficiente de Variação</th>
        </tr>
        </thead>
        <tbody id="tabelaUniforme"></tbody>
        </table>`

    var table = `<tr><td>${probabilidade}%</td><td>${media}</td><td>${(desvio).toFixed(2)}</td><td>${Math.round(variancia)}%</td></tr>`
    document.getElementById('tabelaUniforme').innerHTML = table
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
    
    const z = {
    '0':   [0.0000,0.0040,0.0080,0.0120,0.0160,0.0199,0.0239,0.0279,0.0319,0.0359],
    '0.1': [0.0398,0.0438,0.0478,0.0517,0.0557,0.0596,0.0636,0.0675,0.0714,0.0753],
    '0.2': [0.0793,0.0832,0.0871,0.0910,0.0948,0.0987,0.1026,0.1064,0.1103,0.1141],
    '0.3': [0.1179,0.1217,0.1255,0.1293,0.1331,0.1368,0.1406,0.1443,0.1480,0.1517],
    '0.4': [0.1554,0.1591,0.1628,0.1664,0.1700,0.1736,0.1772,0.1808,0.1844,0.1879],
    '0.5': [0.1915,0.1950,0.1985,0.2019,0.2054,0.2088,0.2123,0.2157,0.2190,0.2224],
    '0.6': [0.2257,0.2291,0.2324,0.2357,0.2389,0.2422,0.2454,0.2486,0.2517,0.2549],
    '0.7': [0.2580,0.2611,0.2642,0.2673,0.2704,0.2734,0.2764,0.2794,0.2823,0.2852],
    '0.8': [0.2881,0.2910,0.2939,0.2967,0.2995,0.3023,0.3051,0.3078,0.3106,0.3133],
    '0.9': [0.3159,0.3186,0.3212,0.3238,0.3264,0.3289,0.3315,0.3340,0.3365,0.3389],
    '1':   [0.3413,0.3438,0.3461,0.3485,0.3508,0.3531,0.3554,0.3577,0.3599,0.3621],
    '1.1': [0.3643,0.3665,0.3686,0.3708,0.3729,0.3749,0.3770,0.3790,0.3810,0.3830],
    '1.2': [0.3849,0.3869,0.3888,0.3907,0.3925,0.3944,0.3962,0.3980,0.3997,0.4015],
    '1.3': [0.4032,0.4049,0.4066,0.4082,0.4099,0.4115,0.4131,0.4147,0.4162,0.4177],
    '1.4': [0.4192,0.4207,0.4222,0.4236,0.4251,0.4265,0.4279,0.4292,0.4306,0.4319],
    '1.5': [0.4332,0.4345,0.4357,0.4370,0.4382,0.4394,0.4406,0.4418,0.4429,0.4441],
    '1.6': [0.4452,0.4463,0.4474,0.4484,0.4495,0.4505,0.4515,0.4525,0.4535,0.4545],
    '1.7': [0.4554,0.4564,0.4573,0.4582,0.4591,0.4599,0.4608,0.4616,0.4625,0.4633],
    '1.8': [0.4641,0.4649,0.4656,0.4664,0.4671,0.4678,0.4686,0.4693,0.4699,0.4706],
    '1.9': [0.4713,0.4719,0.4726,0.4732,0.4738,0.4744,0.4750,0.4756,0.4761,0.4767],
    '2':   [0.4772,0.4778,0.4783,0.4788,0.4793,0.4798,0.4803,0.4808,0.4812,0.4817],
    '2.1': [0.4821,0.4826,0.4830,0.4834,0.4838,0.4842,0.4846,0.4850,0.4854,0.4857],
    '2.2': [0.4861,0.4864,0.4868,0.4871,0.4875,0.4878,0.4881,0.4884,0.4887,0.4890],
    '2.3': [0.4893,0.4896,0.4898,0.4901,0.4904,0.4906,0.4909,0.4911,0.4913,0.4916],
    '2.4': [0.4918,0.4920,0.4922,0.4925,0.4927,0.4929,0.4931,0.4932,0.4934,0.4936],
    '2.5': [0.4938,0.4940,0.4941,0.4943,0.4945,0.4946,0.4948,0.4949,0.4951,0.4952],
    '2.6': [0.4953,0.4955,0.4956,0.4957,0.4959,0.4960,0.4961,0.4962,0.4963,0.4964],
    '2.7': [0.4965,0.4966,0.4967,0.4968,0.4969,0.4970,0.4971,0.4972,0.4973,0.4974],
    '2.8': [0.4974,0.4975,0.4976,0.4977,0.4977,0.4978,0.4979,0.4979,0.4980,0.4981],
    '2.9': [0.4981,0.4982,0.4982,0.4983,0.4984,0.4984,0.4985,0.4985,0.4986,0.4986],
    '3':   [0.4987,0.4987,0.4987,0.4988,0.4988,0.4989,0.4989,0.4989,0.4990,0.4990],
    '3.1': [0.4990,0.4991,0.4991,0.4991,0.4992,0.4992,0.4992,0.4992,0.4993,0.4993],
    '3.2': [0.4993,0.4993,0.4994,0.4994,0.4994,0.4994,0.4994,0.4995,0.4995,0.4995],
    '3.3': [0.4995,0.4995,0.4995,0.4996,0.4996,0.4996,0.4996,0.4996,0.4996,0.4997],
    '3.4': [0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4998],
    '3.5': [0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998],
    '3.6': [0.4998,0.4998,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999],
    '3.7': [0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999],
    '3.8': [0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999],
    '3.9': [0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000,0.5000],

}

    const media = Number(document.getElementById("media").value)
    const desvio = Number(document.getElementById("desvio").value)
    let opNormal = document.getElementById("opNormal").value
    var valor = 1
    var inicio = 1
    var fim = 1

    if (opNormal == "maior") {
        valor = Number(document.getElementById("valorN").value)
        var scoreZ = ((valor - media) / desvio).toFixed(2)
        if (scoreZ < 0) {
            scoreZ *= (-1)
        }
        else if (scoreZ > 4){
            scoreZ = 0.5
        }
        //console.log(scoreZ)
        if (valor === media){
            alert("O valor não pode ser igual a média")
        }
        else if (valor < media){
            alert("O valor não pode ser menor que a média")
        }
        else {
            var scoreZZ = scoreZ.toString()
            const scoreZArray = scoreZZ.split("")
            const zString = (scoreZArray[0] + "." + scoreZArray[2]).toString()
            //console.log(scoreZArray)
            //console.log(zString)
            const zNumber = Number(scoreZArray[3])
            //console.log(zNumber)
            scoreZ = z[zString][zNumber]
            
            //console.log(scoreZ)
            const prob = (0.5 - Number(scoreZ))*100
            console.log((prob).toFixed(2))
            document.getElementById("resNormal").innerHTML = `<h3>A Probabilidade é de ${(prob).toFixed(2)}%<h3>`
        }
    }

    else if (opNormal == "menor") {
        valor = Number(document.getElementById("valorN").value)
        var scoreZ = ((valor - media) / desvio).toFixed(2)
        if (scoreZ < 0) {
            scoreZ *= (-1)
        }
        else if (scoreZ > 4){
            scoreZ = 0.5
        }
        //console.log(scoreZ)
        if (valor === media){
            alert("O valor não pode ser igual a média")
        }
        else if (valor > media){
            alert("O valor não pode ser maior que a média")
        }
        else {
            var scoreZZ = scoreZ.toString()
            const scoreZArray = scoreZZ.split("")
            const zString = (scoreZArray[0] + "." + scoreZArray[2]).toString()
            //console.log(scoreZArray)
            //console.log(zString)
            const zNumber = Number(scoreZArray[3])
            //console.log(zNumber)
            scoreZ = z[zString][zNumber]
            
            //console.log(scoreZ)
            const prob = (0.5 - Number(scoreZ))*100
            //console.log((prob).toFixed(2))
            document.getElementById("resNormal").innerHTML = `<h3>A Probabilidade é de ${(prob).toFixed(2)}%<h3>`
        }
    }

    else if (opNormal == "entre"){
        inicio = Number(document.getElementById("inicioN").value)
        fim = Number(document.getElementById("fimN").value)

        var scoreZI = ((inicio - media) / desvio).toFixed(2)
        var scoreZF = ((fim - media) / desvio).toFixed(2)
        if (scoreZI < 0) {
            scoreZI *= (-1)
        }
        else if (scoreZI > 4){
            scoreZI = 0.5
        }
        else if (scoreZF < 0) {
            scoreZF *= (-1)
        }
        else if (scoreZF > 4){
            scoreZF = 0.5
        }
        if (inicio === media){
            var scoreZZF = scoreZF.toString()
            const scoreZArray = scoreZZF.split("")
            const zString = (scoreZArray[0] + "." + scoreZArray[2]).toString()
            
            const zNumber = Number(scoreZArray[3])
            scoreZF = z[zString][zNumber]
            
            const prob = scoreZF * 100
            document.getElementById("resNormal").innerHTML = `<h3>A Probabilidade é de ${(prob).toFixed(2)}%<h3>`
        }
        else if (fim === media){
            var scoreZZI = scoreZI.toString()
            const scoreZIArray = scoreZZI.split("")
            const zIString = (scoreZIArray[0] + "." + scoreZIArray[2]).toString()
            
            const zINumber = Number(scoreZIArray[3])
            
            scoreZI = z[zIString][zINumber]
            
            const prob = scoreZI*100
            document.getElementById("resNormal").innerHTML = `<h3>A Probabilidade é de ${(prob).toFixed(2)}%<h3>`
        }
        else if (inicio > media){
            alert("O valor inicial deve ser menor que a média")
        }
        else if (fim < media){
            alert("O valor final deve ser maior que a média")
        }
        else{
            var scoreZZI = scoreZI.toString()
            const scoreZIArray = scoreZZI.split("")
            const zIString = (scoreZIArray[0] + "." + scoreZIArray[2]).toString()
            
            const zINumber = Number(scoreZIArray[3])
            
            scoreZI = z[zIString][zINumber]
            
            
            var scoreZZF = scoreZF.toString()
            const scoreZArray = scoreZZF.split("")
            const zString = (scoreZArray[0] + "." + scoreZArray[2]).toString()
            
            const zNumber = Number(scoreZArray[3])
            scoreZF = z[zString][zNumber]
            
            const prob = (scoreZI + scoreZF)*100
            document.getElementById("resNormal").innerHTML = `<h3>A Probabilidade é de ${(prob).toFixed(2)}%<h3>`
        }
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
