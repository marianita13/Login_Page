const carrusel = document.querySelector('.carrusel')
const url = "https://fakestoreapi.com/products"
const tarjetas = document.querySelector('.tarjetas')

let fotos = [
    "../images/foto1.webp",
    "../images/foto2.webp",
    "../images/foto3.jpg"
]

let indice=0

setInterval(() =>{
    if (indice<fotos.length){
        carrusel.src=fotos[indice]
        indice++
    }else{
        indice=0
    }
},2000)

async function traer() {
    const respuesta = await fetch(url)
    const datos=await respuesta.json()
    console.log(datos)

    datos.forEach(element => {
        tarjetas.innerHTML+=`
        <div class="target">
            <div class="titulo_target"> <h3>${element.title}</h3> </div>
            <div class="imagen">
                <img src="${element.image}" class="imagen_target">
            </div>
            <div class="descripcion"> <p>${element.description}</p> </div>
            <div class="precio"> <p>$${element.price}</p> </div>
            <div class="comprar"> <button id="btn${element.id}">COMPRAR</button> <div>
        </div>`
    });
}

traer()

document.querySelector('.modal_close').addEventListener('click', () =>{
    document.querySelector('.ventana_modal').style.display='none'
})

tarjetas.addEventListener('click', (evento)=>{
    if(evento.target.id=='btn1'){
        document.querySelector('.ventana_modal').style.display='flex'
    }
})