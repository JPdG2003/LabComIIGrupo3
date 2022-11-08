

let nuevaCiudad = document.getElementById("ciudad"); //input agregar ciudad
let agregarCiudad = document.getElementById("Agregar"); //botón agregar ciudad
let eliminarCiudades = document.getElementById("eliminarCiudades"); //botón para limpiar localStorage
let success = document.getElementById("Success"); // alerta ciudad agregada con exito
let error = document.getElementById("Error"); // alerta error al cargar la ciudad
let warning = document.getElementById("Warning"); // alerta la ciudad ya se encuentra almacenada


agregarCiudad.onclick = () => {

    ocultarAlerta(); //oculto las alertas

    let newCity = nuevaCiudad.value;
    
    //valido que se haya completado el campo 
    if (newCity != ""){
    
        newCity = formatearString(newCity); 

        //Verifico si la ciudad se encuentra almacenada
        if(validarCiudadEnLocalStorage(newCity)){ 
            
            // llamo a la API para verificar que la ciudad ingresada retorna una respuesta
            consultarAPI(newCity).then(() => {
                try{
                    addNewCityToLocalStorage(newCity); //agrego la ciudad al localStorage
                    mostrar(success); //muestro alerta: ciudad almacenada con exito
                } catch {
                    mostrar(error); //muestro alerta: error al cargar la ciudad
                    error.innerHTML = " Error: La ciudad ingresada no se pudo ser almacenada"
                }  
            }).catch(() => {
                mostrar(error); 
            }).finally(()=> {
                document.getElementById("spinner").style.display = "none";
            });

        } else {
            mostrar(warning); //muestro alerta: la ciudad ya se encuentra almacenada
        }
    } else {
        mostrar(warning); 
        warning.innerHTML = "Debe ingresar una ciudad para poder agregarla";
    }
}

eliminarCiudades.onclick = function (e) {
    limpiarLocalStorage();
}



// Agrego la nueva ciudad al localStorage
function addNewCityToLocalStorage(newCity) {    

    let cities = getCitiesFromLocalStorage();
    cities.push(newCity);
    localStorage.setItem('CITIES', JSON.stringify(cities));
    console.log(cities);
}


// Devuelvo la ciudad ingresada con la primera letra en mayuscula y el resto en minuscula
function formatearString(newCity){
    return newCity.charAt(0).toUpperCase() + newCity.slice(1);
}

//Retorno true si la ciudad ya se encuentra almacenada, de lo contrario false.
function validarCiudadEnLocalStorage(newCity){
    let cities = getCitiesFromLocalStorage();
    if(cities.includes(newCity)){
        return false;
    }
    return true;
}

function limpiarLocalStorage(){
    localStorage.clear();
}

