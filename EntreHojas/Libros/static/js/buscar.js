// Agrega este código en tu archivo 'buscar.js' (o en el script en el mismo HTML)
function buscarLibros() {
    var busqueda = document.getElementById("in_buscar").value.trim(); // Obtener el valor de búsqueda y limpiar espacios
    if (busqueda.length === 0) {
        alert("Por favor, ingresa un término de búsqueda válido.");
        return;
    }

    // Aquí puedes realizar una solicitud AJAX (por ejemplo, usando jQuery)
    $.ajax({
        url: "{% url 'buscar_libros' %}", // Reemplaza con la URL de tu vista de búsqueda
        method: 'GET',
        data: {
            'busqueda': busqueda
        },
        success: function(response) {
            // Manipula la respuesta y muestra los resultados en el DOM
            mostrarResultados(response);
        },
        error: function(error) {
            console.log(error);
            alert("Hubo un error al realizar la búsqueda. Inténtalo de nuevo más tarde.");
        }
    });
}

function mostrarResultados(resultados) {
    var datosRe = document.getElementById("datos_re");
    datosRe.innerHTML = ""; // Limpiar resultados anteriores
    // Construye la estructura de visualización de los resultados (por ejemplo, usando bucles y plantillas HTML)
    // Ejemplo básico:
    resultados.forEach(function(resultado) {
        var html = `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img src="${resultado.imagen}" class="card-img-top" alt="${resultado.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${resultado.nombre}</h5>
                        <p class="card-text">${resultado.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Ver más</button>
                            </div>
                            <small class="text-muted">$${resultado.precio}</small>
                        </div>
                    </div>
                </div>
            </div>`;
        datosRe.innerHTML += html;
    });
}
