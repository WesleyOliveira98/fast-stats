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
                <td>${FacN = FacN + Number(fn[i])}</td><td>${FacPCN = FacPCN + Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }
            else {
                var fr = fr + `<tr><td>${n[i]}</td><td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                <td>${FacN = FacN + Number(fn[i])}</td><td>${FacPCN = FacPCN + Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td></tr>`
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
            if (i == 0) {
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${o[i]}<button type="button" class="btn btn-outline-primary" onclick="ordinalDesceUm()">🔽</button></td>
                    <td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${o[i]}<button type="button" class="btn btn-outline-primary" onclick="ordinalDesceUm()">🔽</button>></td>
                    <td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
            else if (i == (o.length - 1)) {
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${o[i]}<button type="button" class="btn btn-outline-primary" onclick="ordinalSobeUm()">🔼</button></td>
                    <td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${o[i]}<button type="button" class="btn btn-outline-primary" onclick="ordinalSobeUm()">🔼</button></td>
                    <td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
            else {
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${o[i]}<button type="button" class="btn btn-outline-primary" onclick="ordinalSobeUm()">🔼</button><button type="button" class="btn btn-outline-primary" onclick="ordinalDesceUm()">🔽</button></td>
                    <td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${o[i]}<button type="button" class="btn btn-outline-primary" onclick="ordinalSobeUm()">🔼</button><button type="button" class="btn btn-outline-primary" onclick="ordinalDesceUm()">🔽</button></td>
                    <td>${fn[i]}</td><td>${Number(((fn[i]*100)/dadosArray.length).toFixed(1))}%</td>
                    <td>${FacO = FacO + Number(fn[i])}</td><td>${Math.round(FacPCO = FacPCO + Number((fn[i]*100)/dadosArray.length))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
            console.log(o[i])
            console.log(i)
                //Ordenação do modelo Ordinal
                function ordinalSobeUm(){
                        
                }
                function ordinalDesceUm(){
                    
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
                    <td>${FacD = FacD + f[i]}</td><td>${FacPCD = FacPCD + Number(((f[i]*100)/dadosArray.length).toFixed(1))}%</td></tr>`
                    
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${d[i]}</td><td>${f[i]}</td><td>${((f[i]*100)/dadosArray.length).toFixed(1)}%</td>
                    <td>${FacD = FacD + f[i]}</td><td>${FacPCD = FacPCD + Number(((f[i]*100)/dadosArray.length).toFixed(1))}%</td></tr>`
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
                    var intervalo = amplitude / k1
                }
                else if ((amplitude % k) == 0) {
                    var intervalo = amplitude / k
                }
                else if ((amplitude % k2) == 0) {
                    var intervalo = amplitude / k2
                }
                else {
                    amplitude++
                }
            }
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

            let FacC = 0
            let FacPCC = 0
            
            //let fi = []
            //var grupo = []
            //for(var i =0;i < grupo.length;i++){
            //    f[i] = 0
            //    for(var i2 = 0;i2 < dadosArray.length;i2++){
            //        if(d[i] === dadosArray[i2]){
            //            f[i]++
            //        }
            //    }
            //}

            do{
                var f = 0
                let valor2 = Number(menor) + intervalo
                
                
                    for (let i2 = 0; i2 < dadosArray.length; i2++) {
                        //if (i2 = 0) {
                        //    fi[i2]=0
                        //}
                        if ((dadosArray[i2] >= menor) && (dadosArray[i2] < valor2)) {
                            f++
                            //fi[i2]++
                            //grupo[i2] = Number(menor) + " |-- " + valor2
                        }
                    }
                
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${menor} |-- ${valor2}</td><td>${f}</td><td>${((f*100)/dadosArray.length).toFixed(1)}%</td>
                    <td>${FacC = FacC + f}</td><td>${FacPCC = FacPCC + Number(((f*100)/dadosArray.length).toFixed(1))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${menor} |-- ${valor2}</td><td>${f}</td><td>${((f*100)/dadosArray.length).toFixed(1)}%</td>
                    <td>${FacC = FacC + f}</td><td>${FacPCC = FacPCC + Number(((f*100)/dadosArray.length).toFixed(1))}%</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                menor = valor2
                
            }while(menor <= maior)

            

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

            var mediaC
            var modaC
            var medianaC 
            
            var m = `<tr><td>${mediaC}</td><td>${modaC}</td><td>${medianaC}</td></tr>`
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
            for (i in c) {
                var x = c[i]
                somaDesvio = somaDesvio + Math.pow(x - mediaC,2) * f[i]
            }
            desvioPadrao = Math.sqrt(somaDesvio/dadosArray.length)
            coeficienteVar = (desvioPadrao/mediaC) * 100
            }
            else if (ap[1].checked){
                for (i in c) {
                    var x = c[i]
                    somaDesvio = somaDesvio + Math.pow(x - mediaC,2) * f[i]
                }
                desvioPadrao = Math.sqrt(somaDesvio /(dadosArray.length - 1))
                coeficienteVar = (desvioPadrao/mediaC) * 100
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

             // Gráficos Continua
             var ctx = document.getElementsByClassName("chart")

             var grafico = new Chart(ctx, {
                 type:'bar',
                 data:{
                     labels: c,
                     datasets: [
                         {
                             label: "Dados",
                             data: c,
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
