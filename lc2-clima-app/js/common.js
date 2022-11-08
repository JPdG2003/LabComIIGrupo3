// Obtengo las ciudades del localStorage
function getCitiesFromLocalStorage() {
    let cities = localStorage.getItem("CITIES");
    if(cities) {
        cities = JSON.parse(cities);
    } else {
        cities = [];
    }
    return cities;
}

// Muestro la alerta que le paso como parametro
function mostrar(windowAlert){
    windowAlert.style.display = "flex";
}

//Oculto todas las alertas 
function ocultarAlerta(){
    let aviso = document.getElementsByClassName("aviso");
    for(let i = 0; i < aviso.length; i++) {
        aviso[i].style.display = "none";
    }
}

async function consultarAPI(ciudad){
    document.getElementById("spinner").style.display = "block";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ ciudad +"&appid=b64e213924fd1f407f7bea350fa6c191&units=metric&lang=es";
    const respuesta = await fetch(url);
    
    if(respuesta.ok){
        const data = await respuesta.json();
        await accionAsincrona();
        return data;
    }else{
        throw new Error();
    }

}

const accionAsincrona = async () => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 1000);
  });   
}