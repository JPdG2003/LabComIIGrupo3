let select = document.getElementById("ciudades");
let consultarClima = document.getElementById("consultarClima");
let aviso = document.getElementById("aviso");
let card = document.getElementById("resultadoClima");

let nombreCiudad = document.getElementById("ciudad");
let icono = document.getElementById("icono");
let temp = document.getElementById("temp");
let sensacionTermica = document.getElementById("sensacionTermica");
let humedad = document.getElementById("humedad");
let velViento = document.getElementById("velViento");
let presion = document.getElementById("presion");

window.onload = () => {
    cargarOpciones();
    card.style.display = "none"
}

function cargarOpciones(){

    ocultarAlerta();

    let cities = getCitiesFromLocalStorage();
    if(!cities.length == 0){
        cities.forEach(ciudad =>{
            var opcion = document.createElement('option');
            opcion.text = ciudad;
            opcion.value = ciudad;
            select.appendChild(opcion);
        })
    } else {
        mostrar(aviso);
    }

}

consultarClima.onclick = function mostrarClima(){
    card.style.display = "none"
    ocultarAlerta();
    let ciudad = select.value;

    consultarAPI(ciudad).then(data => {
        JSON.parse(JSON.stringify(data));
        mostrar(card);
        card.style.flexDirection = "column"
        nombreCiudad.innerHTML = ciudad;
        icono.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icono clima actual">`;
        temp.innerHTML = "Temperatura: " + data.main.temp + " °C";
        sensacionTermica.innerHTML = "Sensación Térmica: " + data.main.feels_like + " °C";
        humedad.innerHTML = "Humedad: " + data.main.humidity + "%";
        velViento.innerHTML = "Velocidad del viento: " + data.wind.speed + " m/s";
        presion.innerHTML =    "Presion: " + data.main.pressure + " hPa"
       
    }). catch (() => { 
        mostrar(alerta)
        alerta.classList.add("danger");
        alerta.innerHTML = "Error al cargar datos";
    }).finally(()=> {
        document.getElementById("spinner").style.display = "none";
    });

}
