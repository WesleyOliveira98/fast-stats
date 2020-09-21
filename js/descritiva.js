

function descritiva() {
    var nameVar = document.getElementById("nomeVar").value
    var dados = document.getElementById("dados").value

    //Nominal
    if(document.getElementById('tipoVariavel').value == 'nominal') {
            if (isNaN(dados)){
            var dadosArray = dados.split(";")
            dadosArray.sort((a, b) => a - b)
        
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
            document.getElementById("nameVar").innerHTML = nameVar
            document.getElementById("fi").innerHTML = `fi`
    
            for (i in n)
            if (typeof fr === "undefined" || typeof fn === "undefined") {
                var fr = `<tr><td>${n[i]}</td><td>${fn[i]}</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }
            else {
                var fr = fr + `<tr><td>${n[i]}</td><td>${fn[i]}</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }
            }
            else {
                alert('Não é uma string')
            }
    }
    // Ordinal
    else if(document.getElementById('tipoVariavel').value == 'ordinal') {
            var dadosArray = dados.split(";")
            dadosArray.sort((a, b) => a - b)
    
            let o = dadosArray.filter(function(e, index, self) {
                return index === self.indexOf(e);
            })
    
            //Tabela Ordinal
            document.getElementById("nameVar").innerHTML = nameVar
            document.getElementById("fi").innerHTML = `fi`
    
            if (typeof fr === "undefined") {
                var fr = `<tr><td>${o}</td><td>${f}</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }
            else {
                var fr = fr + `<tr><td>${o}</td><td>${f}</td></tr>`
                document.getElementById('tabelaDescritiva').innerHTML = fr
            }
    }
    
    //Discreta
    else if(document.getElementById('tipoVariavel').value == 'discreta'){
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
            document.getElementById("nameVar").innerHTML = nameVar
            document.getElementById("fi").innerHTML = `fi`
    
            for (i in d) {
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${d[i]}</td><td>${f[i]}</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${d[i]}</td><td>${f[i]}</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
            }
    }
    //Continua
    else if(document.getElementById('tipoVariavel').value == 'continua'){
            let dadosArray = dados.split(";")
            dadosArray.sort((a, b) => a - b)
    
            let c = dadosArray.filter(function(e, index, self) {
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
            document.getElementById("nameVar").innerHTML = nameVar
            document.getElementById("fi").innerHTML = `fi`
    
            do{
                var f = 0
                let valor2 = Number(menor) + intervalo
                for (let i = 0; i < dadosArray.length; i++) {
                    if ((dadosArray[i] >= menor) && (dadosArray[i] < valor2)) {
                         f++
                    }
                }
                if (typeof fr === "undefined") {
                    var fr = `<tr><td>${menor} |-- ${valor2}</td><td>${f}</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                else {
                    var fr = fr + `<tr><td>${menor} |-- ${valor2}</td><td>${f}</td></tr>`
                    document.getElementById('tabelaDescritiva').innerHTML = fr
                }
                menor = valor2
            }while(menor <= maior)
        }
    }
    