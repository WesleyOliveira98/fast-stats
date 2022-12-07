function vermelha() {
    document.getElementById("pilula").innerHTML = `<h3>Bem vindo à verdade, tudo que você precisa está aqui</h3>`
    setTimeout(() => {
        window.location.href = "../index.html"
    },3000)
}

function azul() {
    document.getElementById("pilula").innerHTML = `<h3>Tudo foi um sonho! Você já está pronto para acordar</h3>`
    setTimeout(() => {
        document.querySelector("body").classList.add("acordando")
    },3000)
    setTimeout(() => {
        window.location.href = "./acordando.html"
    },4500)
}