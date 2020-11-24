//Conversão do arquivo CSV

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

    var nomeVar = lines["0"][0]
    var dadosCsv = []
    var dadosCSV = ""

    for (let i2 = 0; i2 < lines.length; i2++) {
        if ((i2+1) < lines.length){
        var iString = (i2+1).toString()
        dadosCsv[i2] = lines[iString][0]
        if (i2 < (lines.length - 2)) {
            dadosCSV += (dadosCsv[i2])+";"
        } else {
            dadosCSV += (dadosCsv[i2])
          }
        }
    }

    document.getElementById("nomeVar").value = nomeVar
    document.getElementById("dados").value = dadosCSV
}
  
  function errorHandler(evt) {
    if(evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
  }

function descritiva() {
    var nameVar = document.getElementById("nomeVar").value
    var dados = document.getElementById("dados").value

    if(document.getElementById('tipoVariavel').value === 'escolha') {
        alert('Escolha um tipo de Variavel')
    }
    //Nominal
    else if(document.getElementById('tipoVariavel').value === 'nominal') {
            var dadosArray = dados.split(";")
            dadosArray.sort()
            
            let n = dadosArray.filter(function(e, index, self) {
                return index === self.indexOf(e);
            })
            

            let fn = []
            for(var i = 0;i < n.length;i++){
                fn[i] = 0
                for(var i2 = 0;i2 < dadosArray.length;i2++){
                    if(n[i] === dadosArray[i2]){
                        fn[i]++
                    } 
                }
            }
    
            //Tabela Nominal
            
            document.getElementById("tabela-descritiva").innerHTML = `<table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col" id="nome"></th>
                <th scope="col">fi</th>
                <th scope="col">fi%</th>
                <th scope="col">Fac</th>
                <th scope="col">Fac%</th>
            </tr>
            </thead>
            <tbody id="tabelaDescritiva"></tbody>
            </table>`
            document.getElementById("nome").innerHTML = nameVar
            
            let FacN = 0
            let FacPCN = 0
    
            for (i in n)
            if (typeof fr === "undefined" || typeof fn === "undefined") {
                var fr = `<tr><td>${n[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                <td>${FacN = FacN + Number(fn[i])}</td><td>${FacPCN = Math.round(FacPCN + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }
            else {
                var fr = fr + `<tr><td>${n[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                <td>${FacN = FacN + Number(fn[i])}</td><td>${FacPCN = Math.round(FacPCN + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }

            //Segunda Parte da Tabela Nominal
        
            document.getElementById("tabela-descritiva2").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Média</th>
                    <th scope="col" id="">Moda</th>
                    <th scope="col" id="">Mediana</th>
                </tr>
            </thead>
            <tbody id="tabelaDescritiva2"></tbody>
            </table>`

            var modaN = ''
            for(var i = 0;i < n.length;i++){
                var maior = Math.max(...fn)
                if(fn[i] === maior) {
                    modaN = n[i]
                }
            }
            var medianaN = ''
            if ((dadosArray.length % 2) === 0) { 
                if (dadosArray[(dadosArray.length/2)-1] === dadosArray[(dadosArray.length/2)]) {
                    medianaN = dadosArray[(dadosArray.length/2)-1]
                }
                else {
                medianaN = dadosArray[(dadosArray.length/2)-1] + " e " + dadosArray[(dadosArray.length/2)]
                }
            }
            else {
                medianaN = dadosArray[Math.round((dadosArray.length/2)-1)]
            }
            var m = `<tr><td>Não tem</td><td>${modaN}</td><td>${medianaN}</td></tr>`
            document.getElementById('tabelaDescritiva2').innerHTML = m

            //Tabela Medidas Separatrizes

            document.getElementById("tabela-separatriz").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Medidas Separatrizes</th>
                </tr>
            </thead>
            <tbody id="tabelaSeparatriz"></tbody>
            </table>`
            var medidaSeparatriz = ''
            var posicao
            var opcaoSelect = document.getElementById("MedidaSeparatriz").value
            var op = document.getElementById("OpMedidaSeparatriz").value
            if (op === "0") {
                alert('Escolha uma opção de Medida Separatriz')
            }
            else if (op === "4") {
                posicao = Math.round(((dadosArray.length*25)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
                
            }
            else if (op === "5") {
                posicao = Math.round(((dadosArray.length*20)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }    
            else if (op === "10") {
                posicao = Math.round(((dadosArray.length*10)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }
            else if (op === "100") {
                posicao = Math.round(((dadosArray.length*1)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }

            var ms = `<tr><td>${medidaSeparatriz}</td></tr>`
            document.getElementById('tabelaSeparatriz').innerHTML = ms

            // Gráficos Nominal
            var ctx = document.getElementsByClassName("chart")


            var grafico = new Chart(ctx, {
                type:'pie',
                data:{
                    labels: n,
                    datasets: [
                        {
                            label: "%",
                            data: fn,
                            backgroundColor:[

                                '#FF0000',
                                '#0000CD',
                                '#708090',
                                '#008B8B',
                                '#ffffff',
                                '#87CEFA',
                                '#8B4513',
                                '#FFD700',
                                '#000000',
                                '#6A5ACD',
                                '#00FF00',
                                '#FF8C007'
        
                                
                            ],
                            borderWidth: 2
                            }
                        ]
                },
                options:{  
    
                    title:{
                        display: true,
                        fontSize: 20,
                        text: ''
                    },
        
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
    // Ordinal
    else if(document.getElementById('tipoVariavel').value === 'ordinal') {
            var dadosArray = dados.split(";")
            dadosArray.sort()
    
            let o = dadosArray.filter(function(e, index, self) {
                return index === self.indexOf(e);
            })

            inputsOrdinal()
            
            document.getElementById("btnordinal").innerHTML = `<button type="button" class="btn btn-dark" onclick="ordinal()">Definir Posição</button>`
            
            let fn = []
            for(var i =0;i < o.length;i++){
                fn[i] = 0
                for(var i2 = 0;i2 < dadosArray.length;i2++){
                    if(o[i] === dadosArray[i2]){
                        fn[i]++
                    }
                }
            }
            

            //Tabela Ordinal
            document.getElementById("tabela-descritiva").innerHTML = `<table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col" id="nome"></th>
                <th scope="col">fi</th>
                <th scope="col">fi%</th>
                <th scope="col">Fac</th>
                <th scope="col">Fac%</th>
            </tr>
            </thead>
            <tbody id="tabelaDescritiva"></tbody>
            </table>`
            document.getElementById("nome").innerHTML = nameVar
            
            let FacO = 0
            let FacPCO = 0
            
            for (i in o){
            
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${o[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${o[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
            //Segunda Parte da Tabela Ordinal

            document.getElementById("tabela-descritiva2").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Média</th>
                    <th scope="col" id="">Moda</th>
                    <th scope="col" id="">Mediana</th>
                </tr>
            </thead>
            <tbody id="tabelaDescritiva2"></tbody>
            </table>`

            var modaO = ''
            for(var i = 0;i < o.length;i++){
                var maior = Math.max(...fn)
                if(fn[i] === maior) {
                    modaO = o[i]
                }
            }

            var medianaO = ''
            if ((dadosArray.length % 2) === 0) { 
                if (dadosArray[(dadosArray.length/2)-1] === dadosArray[(dadosArray.length/2)]) {
                    medianaO = dadosArray[(dadosArray.length/2)-1]
                }
                else {
                    medianaO = dadosArray[(dadosArray.length/2)-1] + " e " + dadosArray[(dadosArray.length/2)]
                }
            }
            else {
                medianaO = dadosArray[Math.round((dadosArray.length/2)-1)]
            }
            var m = `<tr><td>Não tem</td><td>${modaO}</td><td>${medianaO}</td></tr>`
            document.getElementById('tabelaDescritiva2').innerHTML = m   

            //Tabela Medidas Separatrizes

            document.getElementById("tabela-separatriz").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Medidas Separatrizes</th>
                </tr>
            </thead>
            <tbody id="tabelaSeparatriz"></tbody>
            </table>`
            var medidaSeparatriz = ''
            var posicao
            var opcaoSelect = document.getElementById("MedidaSeparatriz").value
            var op = document.getElementById("OpMedidaSeparatriz").value
            if (op === "0") {
                alert('Escolha uma opção de Medida Separatriz')
            }
            else if (op === "4") {
                posicao = Math.round(((dadosArray.length*25)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
                
            }
            else if (op === "5") {
                posicao = Math.round(((dadosArray.length*20)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }    
            else if (op === "10") {
                posicao = Math.round(((dadosArray.length*10)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }
            else if (op === "100") {
                posicao = Math.round(((dadosArray.length*1)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }

            var ms = `<tr><td>${medidaSeparatriz}</td></tr>`
            document.getElementById('tabelaSeparatriz').innerHTML = ms
            
            // Gráficos Ordinal
            var ctx = document.getElementsByClassName("chart")

            var grafico = new Chart(ctx, {
                type:'pie',
                data:{
                    labels: o,
                    datasets: [
                        {
                            label: "%",
                            data: fn,
                            backgroundColor:[

                                '#FF0000',
                                '#0000CD',
                                '#708090',
                                '#008B8B',
                                '#ffffff',
                                '#87CEFA',
                                '#8B4513',
                                '#FFD700',
                                '#000000',
                                '#6A5ACD',
                                '#00FF00',
                                '#FF8C007'

                                
                            ],
                            borderWidth: 2
                            }
                        ]
                },
                options:{  

                    title:{
                        display: true,
                        fontSize: 20,
                        text: ''
                    },

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
    //Discreta
    else if(document.getElementById('tipoVariavel').value === 'discreta'){
            let dadosArray = dados.split(";")
            dadosArray.sort((a, b) => a - b)
            
            let d = dadosArray.filter(function(e, index, self) {
                return index === self.indexOf(e);
            })
            
            let f = []
            for(var i =0;i < d.length;i++){
                f[i] = 0
                for(var i2 = 0;i2 < dadosArray.length;i2++){
                    if(d[i] === dadosArray[i2]){
                        f[i]++
                    }
                }
            }
    
            //Tabela Discreta
            document.getElementById("tabela-descritiva").innerHTML = `<table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col" id="nome"></th>
                <th scope="col">fi</th>
                <th scope="col">fi%</th>
                <th scope="col">Fac</th>
                <th scope="col">Fac%</th>
            </tr>
            </thead>
            <tbody id="tabelaDescritiva"></tbody>
            </table>`
            document.getElementById("nome").innerHTML = nameVar

            let FacD = 0
            let FacPCD = 0
    
            for (i in d) {
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${d[i]}</td><td>${f[i]}</td><td>${((f[i]*100)/dadosArray.length).toFixed(1)}%</td>
                    <td>${FacD = FacD + f[i]}</td><td>${FacPCD = Math.round(FacPCD + Number((f[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${d[i]}</td><td>${f[i]}</td><td>${((f[i]*100)/dadosArray.length).toFixed(1)}%</td>
                    <td>${FacD = FacD + f[i]}</td><td>${FacPCD = Math.round(FacPCD + Number((f[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
            //Segunda Parte da Tabela Discreta
        
            document.getElementById("tabela-descritiva2").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Média</th>
                    <th scope="col" id="">Moda</th>
                    <th scope="col" id="">Mediana</th>
                </tr>
            </thead>
            <tbody id="tabelaDescritiva2"></tbody>
            </table>`

            var mediaD = 0
            var acmMediaD = 0
            for(i in d) {
                let numero = d[i]
                acmMediaD = acmMediaD + (Number(numero) * f[i])
            }
            mediaD = acmMediaD/FacD

            var modaD = ''
            for(var i = 0;i < d.length;i++){
                var maior = Math.max(...f)
                if(f[i] === maior) {
                    modaD = d[i]
                }
            }

            var medianaD = ''
            if ((dadosArray.length % 2) === 0) { 
                if (dadosArray[(dadosArray.length/2)-1] === dadosArray[(dadosArray.length/2)]) {
                    medianaD = dadosArray[(dadosArray.length/2)-1]
                }
                else {
                    medianaD = dadosArray[(dadosArray.length/2)-1] + " e " + dadosArray[(dadosArray.length/2)]
                }
            }
            else {
                medianaD = dadosArray[Math.round((dadosArray.length/2)-1)]
            }

            var m = `<tr><td>${(mediaD).toFixed(2)}</td><td>${modaD}</td><td>${medianaD}</td></tr>`
            document.getElementById('tabelaDescritiva2').innerHTML = m

            //Terceira Parte da Tabela
        
            document.getElementById("tabela-descritiva3").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Desvio Padrão</th>
                    <th scope="col" id="">Coeficiente de Variação (%)</th>
                </tr>
            </thead>
            <tbody id="tabelaDescritiva3"></tbody>
            </table>`
            var ap = document.getElementsByName('AP')
            var somaDesvio = 0
            var desvioPadrao = 0
            var coeficienteVar = 0
            if (ap[0].checked){
            for (i in d) {
                var x = d[i]
                somaDesvio = somaDesvio + Math.pow(x - mediaD,2) * f[i]
            }
            desvioPadrao = Math.sqrt(somaDesvio/dadosArray.length)
            coeficienteVar = (desvioPadrao/mediaD) * 100
            }
            else if (ap[1].checked){
                for (i in d) {
                    var x = d[i]
                    somaDesvio = somaDesvio + Math.pow(x - mediaD,2) * f[i]
                }
                desvioPadrao = Math.sqrt(somaDesvio /(dadosArray.length - 1))
                coeficienteVar = (desvioPadrao/mediaD) * 100
                }
            document.getElementById("tabelaDescritiva3").innerHTML = `<tr><td>${(desvioPadrao).toFixed(2)}</td><td>${(coeficienteVar).toFixed(2)}%</td></tr>`
            
            //Tabela Medidas Separatrizes

            document.getElementById("tabela-separatriz").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Medidas Separatrizes</th>
                </tr>
            </thead>
            <tbody id="tabelaSeparatriz"></tbody>
            </table>`
            var medidaSeparatriz = 0
            var posicao
            var opcaoSelect = document.getElementById("MedidaSeparatriz").value
            var op = document.getElementById("OpMedidaSeparatriz").value
            if (op === "0") {
                alert('Escolha uma opção de Medida Separatriz')
            }
            else if (op === "4") {
                posicao = Math.round(((dadosArray.length*25)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
                
            }
            else if (op === "5") {
                posicao = Math.round(((dadosArray.length*20)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }    
            else if (op === "10") {
                posicao = Math.round(((dadosArray.length*10)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }
            else if (op === "100") {
                posicao = Math.round(((dadosArray.length*1)/100) * opcaoSelect)
                
                for(let i = 0; i < dadosArray.length; i++){
                    if((posicao - 1) === i){
                        medidaSeparatriz = dadosArray[i]
                    }
                }
            }

            var ms = `<tr><td>${medidaSeparatriz}</td></tr>`
            document.getElementById('tabelaSeparatriz').innerHTML = ms
            
            // Gráficos Discreta
            var ctx = document.getElementsByClassName("chart")

            var grafico = new Chart(ctx, {
                type:'bar',
                data:{
                    labels: d,
                    datasets: [
                        {
                            label: "Dados",
                            data: f,
                            backgroundColor:[

                                '#FF0000',
                                '#0000CD',
                                '#708090',
                                '#008B8B',
                                '#ffffff',
                                '#87CEFA',
                                '#8B4513',
                                '#FFD700',
                                '#000000',
                                '#6A5ACD',
                                '#00FF00',
                                '#FF8C007'
        
                                
                            ],
                            borderWidth: 2
                            }
                        ]
                },
                options:{  
    
                    title:{
                        display: true,
                        fontSize: 20,
                        text: ''
                    },
        
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
    //Continua
    else if(document.getElementById('tipoVariavel').value === 'continua'){
            let dadosArray = dados.split(";")
            dadosArray.sort((a, b) => a - b)
    
            var c = dadosArray.filter(function(e, index, self) {
                return index === self.indexOf(e);
            })
            let maior = dadosArray[dadosArray.length - 1]
            let menor = dadosArray[0]
            let k = Math.round(Math.sqrt(dadosArray.length))
            let k1 = k - 1
            let k2 = k + 1
            let amplitude = (maior - menor) + 1
            for (let i = 0; i < 100; i++) {
                if ((amplitude % k1) == 0) {
                    var ok = k1
                }
                else if ((amplitude % k) == 0) {
                    var ok = k
                }
                else if ((amplitude % k2) == 0) {
                    var ok = k2
                }
                else {
                    amplitude++
                }
            }
            var intervalo = amplitude / ok
            

            //Tabela Continua
            document.getElementById("tabela-descritiva").innerHTML = `<table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col" id="nome"></th>
                <th scope="col">fi</th>
                <th scope="col">fi%</th>
                <th scope="col">Fac</th>
                <th scope="col">Fac%</th>
            </tr>
            </thead>
            <tbody id="tabelaDescritiva"></tbody>
            </table>`
            document.getElementById("nome").innerHTML = nameVar

            const fiGrupoVet = []
            const fiPCVet = []
            const menorVet = []
            const maiorVet = []
            const grupoVet = []
            const valorMedio = []
            
            menorVet[0] = c[0]
            
            for (let i = 0; i < ok; i++) {
                fiGrupoVet[i] = 0
                fiPCVet[i] = 0
                valorMedio [i] = 0
                maiorVet[i] = Number(menorVet[i]) + intervalo
                menorVet[i+1] = Number(maiorVet[i])
                grupoVet[i] = menorVet[i] + " |-- " + maiorVet[i]
                valorMedio[i] = (Number(menorVet[i]) + Number(maiorVet[i]))/2
                for (let i2 = 0; i2 < dadosArray.length; i2++) {
                    if (dadosArray[i2] >= menorVet[i] && dadosArray[i2] < maiorVet[i]) {
                        fiGrupoVet[i]++
                    }
                }
                fiPCVet[i] += (fiGrupoVet[i]*100)/dadosArray.length 
            }

            const FacVet = []
            const FacPCCVet = []
            for (let i = 0; i < ok; i++) {
                if (i === 0) {
                    FacVet[i]=0
                    FacVet[i] += fiGrupoVet[i]
                    FacPCCVet[i] = 0
                    FacPCCVet[i] = Math.round(FacPCCVet[i] + (fiGrupoVet[i]*100)/dadosArray.length)
                }
                else {
                    FacVet[i]=FacVet[i-1]
                    FacVet[i] += fiGrupoVet[i]
                    FacPCCVet[i] = FacPCCVet[i-1]
                    FacPCCVet[i] = Math.round(FacPCCVet[i] + (fiGrupoVet[i]*100)/dadosArray.length) 
                }
            }

            for (let i = 0; i < ok; i++) {
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${grupoVet[i]}</td><td>${fiGrupoVet[i]}</td><td>${(fiPCVet[i]).toFixed(1)}%</td>
                    <td>${FacVet[i]}</td><td>${FacPCCVet[i]}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${grupoVet[i]}</td><td>${fiGrupoVet[i]}</td><td>${(fiPCVet[i]).toFixed(1)}%</td>
                    <td>${FacVet[i]}</td><td>${FacPCCVet[i]}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
            

            //Segunda Parte da Tabela Continua
        
            document.getElementById("tabela-descritiva2").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Média</th>
                    <th scope="col" id="">Moda</th>
                    <th scope="col" id="">Mediana</th>
                </tr>
            </thead>
            <tbody id="tabelaDescritiva2"></tbody>
            </table>`

            
            var somaMedia = 0
            for (let i = 0; i < ok; i++) {
                somaMedia += (valorMedio[i] * fiGrupoVet[i])
            }
            var mediaC = somaMedia / dadosArray.length
            var modaC = 0
            var maiorFi = Math.max.apply(null, fiGrupoVet)
            for (let i = 0; i < ok; i++) {
                if (maiorFi === fiGrupoVet[i]) {
                    modaC = valorMedio[i]
                }
            }
            
            var posicaoMd = Number(dadosArray.length/2)
            var FacAnt = 0
            var menorMd = 0
            var fiMd = 0
            for (let i = 0; i < ok; i++) {
                if (posicaoMd < FacVet[i] && FacAnt === 0 && menorMd === 0 && fiMd === 0) {
                    FacAnt = FacVet[i-1]
                    menorMd = menorVet[i]
                    fiMd = fiGrupoVet[i]
                }
            }
            var medianaC = menorMd + (((posicaoMd-FacAnt)/fiMd)*intervalo)
            var m = `<tr><td>${Math.round(mediaC)}</td><td>${modaC}</td><td>${(medianaC).toFixed(2)}</td></tr>`
            document.getElementById('tabelaDescritiva2').innerHTML = m

            //Terceira Parte da Tabela

            document.getElementById("tabela-descritiva3").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Desvio Padrão</th>
                    <th scope="col" id="">Coeficiente de Variação (%)</th>
                </tr>
            </thead>
            <tbody id="tabelaDescritiva3"></tbody>
            </table>`
            var ap = document.getElementsByName('AP')
            var somaDesvio = 0
            var desvioPadrao = 0
            var coeficienteVar = 0
            if (ap[0].checked){
                for (let i = 0; i < ok;i++) {
                    var x = valorMedio[i]
                    somaDesvio += Math.pow(x - mediaC,2) * fiGrupoVet[i]
                }
                desvioPadrao = Math.sqrt(somaDesvio/dadosArray.length)
                coeficienteVar = (desvioPadrao/mediaC) * 100
            }
            else if (ap[1].checked){
                for (let i = 0; i < ok;i++) {
                    var x = valorMedio[i]
                    somaDesvio += Math.pow(x - mediaC,2) * fiGrupoVet[i]
                }
                desvioPadrao = Math.sqrt(somaDesvio/(dadosArray.length-1))
                coeficienteVar = (desvioPadrao/mediaC) * 100
            }
            
            document.getElementById("tabelaDescritiva3").innerHTML = `<tr><td>${(desvioPadrao).toFixed(2)}</td><td>${Math.round(coeficienteVar)}%</td></tr>`
            
            //Tabela Medidas Separatrizes

            document.getElementById("tabela-separatriz").innerHTML = `<table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col" id="">Medidas Separatrizes</th>
                </tr>
            </thead>
            <tbody id="tabelaSeparatriz"></tbody>
            </table>`
            
            var posicao = 0
            var opcaoSelect = document.getElementById("MedidaSeparatriz").value
            var op = document.getElementById("OpMedidaSeparatriz").value
            if (op === "0") {
                alert('Escolha uma opção de Medida Separatriz')
            }
            else if (op === "4") {
                posicao = Math.round(((dadosArray.length*25)/100) * opcaoSelect)
            }
            else if (op === "5") {
                posicao = Math.round(((dadosArray.length*20)/100) * opcaoSelect)
            }    
            else if (op === "10") {
                posicao = Math.round(((dadosArray.length*10)/100) * opcaoSelect)
            }
            else if (op === "100") {
                posicao = Math.round((dadosArray.length/100) * opcaoSelect)
            }
            if (posicao === 0) {
                posicao = 1
            }
            
            var FacAnt = 0
            var menorMS = 0
            var fiMS = 0
            var x = 0
            for (let i = 0; i < ok; i++) {
                if (posicao < FacVet[i] && x === 0) {
                    FacAnt = FacVet[i-1]
                    menorMS = Number(menorVet[i])
                    fiMS = fiGrupoVet[i]
                }
                x++
            }
            if (FacAnt === undefined) {
                FacAnt = 0 
            }
            var medidaSeparatriz = menorMS + (((posicao - FacAnt)/fiMS)*intervalo)
            var ms = `<tr><td>${Number(medidaSeparatriz).toFixed(2)}</td></tr>`
            document.getElementById('tabelaSeparatriz').innerHTML = ms

             // Gráficos Continua
             var ctx = document.getElementsByClassName("chart")

             var grafico = new Chart(ctx, {
                 type:'bar',
                 data:{
                     labels: grupoVet,
                     datasets: [
                         {
                             label: "Dados (%)",
                             data: fiPCVet,
                             backgroundColor:[
 
                                 '#FF0000',
                                 '#0000CD',
                                 '#708090',
                                 '#008B8B',
                                 '#ffffff',
                                 '#87CEFA',
                                 '#8B4513',
                                 '#FFD700',
                                 '#000000',
                                 '#6A5ACD',
                                 '#00FF00',
                                 '#FF8C007'
         
                                 
                             ],
                             borderWidth: 2
                             }
                         ]
                 },
                 options:{  
     
                     title:{
                         display: true,
                         fontSize: 20,
                         text: ''
                     },
                    
                     scales:{
                         yAxes: [
                             {
                                 ticks:{
                                     beginAtZero: true
                                 }
                                 
                             }
                         ],
                         xAxes: [{
                            categoryPercentage: 1.0,
                            barPercentage: 1.0
                        }]
                     },
                     
                 }
             })
        }
    
    }


//Opção Medidas Separatrizes

function opms(){
    var op = document.getElementById("OpMedidaSeparatriz").value
    let opcoes = document.getElementById("MedidaSeparatriz")
    if (op === "0") {
        alert('Escolha uma opção de Medida Separatriz')
    }
    else if (op === "4") {
        document.getElementById("MedidaSeparatriz").innerHTML = ''
        for(let i = 1;i <= 4; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            opcoes.appendChild(opcao)
        }
    }
    else if (op === "5") {
        document.getElementById("MedidaSeparatriz").innerHTML = ''
        for(let i = 1;i <= 5; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            opcoes.appendChild(opcao)
        }
    }    
    else if (op === "10") {
        document.getElementById("MedidaSeparatriz").innerHTML = ''
        for(let i = 1;i <= 10; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            opcoes.appendChild(opcao)
        }
    }
    else if (op === "100") {
        document.getElementById("MedidaSeparatriz").innerHTML = ''
        for(let i = 1;i <= 100; i++){
            let opcao = document.createElement('option')
            opcao.innerHTML = i
            opcao.value = i
            opcoes.appendChild(opcao)
        }
    }
}

function inputsOrdinal() {
    document.getElementById("ordinal").innerHTML = ''
    var dados = document.getElementById("dados").value
    var dadosArray = dados.split(";")
    dadosArray.sort()
    
    let o = dadosArray.filter(function(e, index, self) {
        return index === self.indexOf(e);
    })
    let inputs = document.getElementById("ordinal")
        for (let i = 0; i < o.length; i++){
            var input = document.createElement("input")
            input.type = "text"
            input.size = "40"
            input.id = "inp"+(i+1)
            input.placeholder = 'Digite a posição do dado "'+o[i]+'"'
            inputs.appendChild(input)
        }
}
function ordinal() {
        var dados = document.getElementById("dados").value
        var nameVar = document.getElementById("nomeVar").value
        var dadosArray = dados.split(";")
        dadosArray.sort()
        
        let o = dadosArray.filter(function(e, index, self) {
            return index === self.indexOf(e);
        })
        //Posições nova ordinal
        var idString = []
        var resInput = []
        for (let i = 0; i < o.length; i++){
            idString[i] = "inp"+(i+1)
            let resInp = document.getElementById(idString[i]).value
            resInput[i] = resInp
        }
        var NovaOrdenada = []
        for (let i = 0; i < o.length; i++){
            for (let i2 = 0; i2 < resInput.length; i2++) {
                if (Number(resInput[i2])-1 === i) {
                    NovaOrdenada[i] = o[i2]
                }
            }
            
        }
        if (o.length === NovaOrdenada.length) {

            var fn = []
            for(var i =0;i < NovaOrdenada.length;i++){
                fn[i] = 0
                for(var i2 = 0;i2 < dadosArray.length;i2++){
                    if(NovaOrdenada[i] === dadosArray[i2]){
                        fn[i]++
                    }
                }
            }
            

            //Tabela Ordinal
            document.getElementById("tabela-descritiva").innerHTML = ``
            document.getElementById("tabela-descritiva").innerHTML = `<table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col" id="nome"></th>
                <th scope="col">fi</th>
                <th scope="col">fi%</th>
                <th scope="col">Fac</th>
                <th scope="col">Fac%</th>
            </tr>
            </thead>
            <tbody id="tabelaDescritiva"></tbody>
            </table>`
            document.getElementById("nome").innerHTML = nameVar

            let FacO = 0
            let FacPCO = 0
            
            document.getElementById('tabelaDescritiva').innerHTML = ``
            
            for (i in NovaOrdenada){
            
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${NovaOrdenada[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${NovaOrdenada[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
        }
        else {
            alert("Digite uma posição válida")
        }

        //Segunda Parte da Tabela Ordinal

        document.getElementById("tabela-descritiva2").innerHTML = `<table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col" id="">Média</th>
                <th scope="col" id="">Moda</th>
                <th scope="col" id="">Mediana</th>
            </tr>
        </thead>
        <tbody id="tabelaDescritiva2"></tbody>
        </table>`

        var modaO = ''
        var maior = Math.max(...fn)
        for(var i = 0;i < NovaOrdenada.length;i++){
            if(fn[i] === maior) {
                modaO = NovaOrdenada[i]
            }
        }

        var medianaO = ''
        if ((NovaOrdenada.length % 2) === 0) { 
            if (NovaOrdenada[(NovaOrdenada.length/2)-1] === NovaOrdenada[(NovaOrdenada.length/2)]) {
                medianaO = NovaOrdenada[(NovaOrdenada.length/2)-1]
            }
            else {
                medianaO = NovaOrdenada[(NovaOrdenada.length/2)-1] + " e " + NovaOrdenada[(NovaOrdenada.length/2)]
            }
        }
        else {
            medianaO = NovaOrdenada[Math.round((NovaOrdenada.length/2)-1)]
        }
        var m = `<tr><td>Não tem</td><td>${modaO}</td><td>${medianaO}</td></tr>`
        document.getElementById('tabelaDescritiva2').innerHTML = m   

        //Tabela Medidas Separatrizes

        document.getElementById("tabela-separatriz").innerHTML = `<table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col" id="">Medidas Separatrizes</th>
            </tr>
        </thead>
        <tbody id="tabelaSeparatriz"></tbody>
        </table>`
        var medidaSeparatriz = ''
        var posicao
        var opcaoSelect = document.getElementById("MedidaSeparatriz").value
        var op = document.getElementById("OpMedidaSeparatriz").value
        if (op === "0") {
            alert('Escolha uma opção de Medida Separatriz')
        }
        else if (op === "4") {
            posicao = Math.round(((NovaOrdenada.length*25)/100) * opcaoSelect)
            
            for(let i = 0; i < NovaOrdenada.length; i++){
                if((posicao - 1) === i){
                    medidaSeparatriz = NovaOrdenada[i]
                }
            }
            
        }
        else if (op === "5") {
            posicao = Math.round(((NovaOrdenada.length*20)/100) * opcaoSelect)
            
            for(let i = 0; i < NovaOrdenada.length; i++){
                if((posicao - 1) === i){
                    medidaSeparatriz = NovaOrdenada[i]
                }
            }
        }    
        else if (op === "10") {
            posicao = Math.round(((NovaOrdenada.length*10)/100) * opcaoSelect)
            
            for(let i = 0; i < NovaOrdenada.length; i++){
                if((posicao - 1) === i){
                    medidaSeparatriz = NovaOrdenada[i]
                }
            }
        }
        else if (op === "100") {
            posicao = Math.round(((NovaOrdenada.length*1)/100) * opcaoSelect)
            
            for(let i = 0; i < NovaOrdenada.length; i++){
                if((posicao - 1) === i){
                    medidaSeparatriz = NovaOrdenada[i]
                }
            }
        }

        var ms = `<tr><td>${medidaSeparatriz}</td></tr>`
        document.getElementById('tabelaSeparatriz').innerHTML = ms
}
