const carrusel = document.querySelector('.carrusel')
const url = "https://fakestoreapi.com/products"
const tarjetas = document.querySelector('.tarjetas')
const ventanaModal = document.querySelector('.ventana_modal')

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

    function cerrarModal(){
        ventanaModal.style.display='none'
    }
    let elementos=null
    let seleccionado=null
    const respuesta = await fetch(url)
    const datos=await respuesta.json()
    elementos=Array.from(datos)
    console.log(datos)

    datos.forEach(element => {
        tarjetas.innerHTML+=`
        <div class="target">
            <div class="titulo_target"><h3>${element.title}</h3> </div>
            <div class="imagen">
                <img src="${element.image}" class="imagen_target">
            </div>
            <div class="descripcion"> <p>${element.description}</p> </div>
            <div class="precio"> <p>$${element.price}</p> </div>
            <div class="comprar"> <button class="btn btn_comprar" id="btn${element.id}">COMPRAR</button> <div>
        </div>`
    });

    tarjetas.addEventListener('click', (evento)=>{
        if(evento.target.classList.contains('btn')){
            seleccionado = elementos.filter(tarjeta => tarjeta.title==evento.target.parentElement.parentElement.querySelector('h3').textContent)
            console.log(seleccionado);
            ventanaModal.style.display='flex'
            const modalBody=document.querySelector('.modal_body')
            modalBody.innerHTML=`
            <div class="target">
                <div class="titulo_target"><h3>${seleccionado[0].title}</h3> </div>
                <div class="imagen">
                    <img src="${seleccionado[0].image}" class="imagen_target">
                </div>
                <div class="descripcion"> <p>${seleccionado[0].description}</p> </div>
                <div class="precio"> <p>$${seleccionado[0].price}</p> </div>
                <div class="comprar"> 
                <button class="btn btn_comprar compra" id="btn${seleccionado[0].id}">COMPRAR</button>
                <button class="btn btn_cancelar">CANCELAR</button><div>
            </div>`
        }
    })

    document.querySelector('.modal_close').addEventListener('click', () =>{
        cerrarModal()
    })

    ventanaModal.addEventListener('click', (evento) =>{
        if(evento.target.classList.contains('btn_cancelar')){
            cerrarModal();
        }else if(evento.target.classList.contains('btn_comprar')){
           
            if (confirm(`Seguro que desea comprar ${seleccionado[0].title}`)==true){
            localStorage.setItem('producto',JSON.stringify(seleccionado))
            }
        }
    })
}

traer()