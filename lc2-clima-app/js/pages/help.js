const btn = document.getElementById('enviar');
const container = document.getElementById('caja')
let input = document.createElement("input")
const formulario = document.getElementById('help-form')


document.getElementById('help-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_y9gefjo';

        if (validarEmail(email) == true) {

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar'; 
                    input.type = "submit"
                    input.className = "boton_verde"
                    input.value = "Email enviado correctamente"
                    container.appendChild(input)
                    setTimeout(() => {
                        input.remove()
                        formulario.reset()
                    }, 3000);
                }, (err) => {
                    btn.value = 'Enviar';
                    alert(JSON.stringify(err));
                });
        } else {
            btn.value = "Enviar"
        }

    });

function validarEmail(email) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
        input.remove()
        return true
    }
}