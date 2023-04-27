const data = document.querySelector('.datos')
const regresar = document.querySelector('#boton')

async function traer(){

    var prueba = localStorage.getItem('producto')
    console.log(prueba);
    let nuevo = JSON.parse(prueba)
    console.log(nuevo);
    data.innerHTML =`
    <div class="titulo_target"><h3 class="titulo_product">${nuevo[0]['title']}</h3> </div>
    <div class="imagen">
        <img src="${nuevo[0]['image']}" class="imagen_target">
    </div>
    <div class="precio"> <p>$${nuevo[0]['price']}</p> </div>`

    regresar.addEventListener('click', () => {
        location.assign("./index2P.html")
    })

}

traer()