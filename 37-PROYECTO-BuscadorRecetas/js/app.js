
let comida;
const select=document.querySelector('#categorias')
const resultadoSelect=document.querySelector('#resultado')



document.addEventListener('DOMContentLoaded',() => {const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            mostrarSelect(datos.categories)
            comida=datos.categories})})

    cargarListeners()











function cargarListeners(){
    select.addEventListener('change',mostrarRecetas)
}




function mostrarRecetas(e){
    anadirCampos(e.target.value)
}



function mostrarSelect(datos){
    datos.forEach(element => {
        anadirSelect(element)
    });
}

function anadirSelect(elemento){
    console.log("entra")
    const {idCategory,strCategory,strCategoryDescription,strCategoryThumb} = elemento
    const opt=document.createElement('option');
    opt.value=strCategory
    opt.setAttribute('idCat',idCategory)
    opt.textContent=strCategory
    opt.classList.add('comida')
    select.appendChild(opt)
}
    


function anadirCampos(dato){
    const url=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${dato}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(dato => mostrarHTML(dato.meals))
}




function mostrarHTML(datos){
    while(resultado.firstChild)
        resultado.firstChild.remove()
    let i=0;
   datos.forEach(dato => {addCard(dato,i);i++})            
}

function addCard(dato,i){
    const url1=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dato.idMeal}`
    fetch(url1)
    .then(resultado => resultado.json())
    .then(resultado => modal(resultado.meals[0],dato,i))
}


function modal(resultado,dato,i){
    console.log(resultado)
    const div=document.createElement('div');
    div.classList.add('card')
    div.style.width='18rem'
    div.style.margin='5px'
    div.innerHTML= `    
        <img src=${dato.strMealThumb} class='card-img-top'>
        <div class="card-body">
            <h5 class="card-title">${dato.strMeal}</h5>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal${i}">
                Ver Receta
            </button>
        </div>

    <div class="modal fade" id="miModal${i}" tabindex="${i-1}" aria-labelledby="miModalLabel${i}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="miModalLabel${i}">Título del Modal</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3>Pasos a seguir</h3>
                    <p>${resultado.strInstructions}<p>
                    <hr>
                    <h3> Video de Youtube para aclaraciones</h3>
                    <a href="${resultado.strYoutube}">Ver receta </a>
               
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Añadir a Favoritos</button>
                </div>
            </div>
        </div>
    </div>
    `
    resultadoSelect.appendChild(div)
/*
    EJEMPLO DE CARD
    <div class="container mt-5">
    <div class="card" style="width: 18rem;">
        <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Título de la Tarjeta</h5>
            <p class="card-text">Esta es una tarjeta de ejemplo en Bootstrap. Puedes usar este espacio para una breve descripción o contenido adicional.</p>
            <a href="#" class="btn btn-primary">Ir a algún lugar</a>
        </div>
    </div>
</div>

*/


}
