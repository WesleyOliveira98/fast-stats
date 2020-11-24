var openedWindow

function openWindow(){
    openedWindow = window.open('./red&blue.html')
}
function closeWindow(){
    window.close('./red&blue.html')
}
function vermelha() {
    document.getElementById("pilula").innerHTML = `<h3>Bem vindo à verdade, tudo que você precisa está 
        <a href="../index.html">aqui</a></h3>`
}
function azul() {
    document.getElementById("pilula").innerHTML = `<h3>Tudo foi um sonho! Você já está pronto para 
        <a onclick="closeWindow()">acordar</a></h3>`
}