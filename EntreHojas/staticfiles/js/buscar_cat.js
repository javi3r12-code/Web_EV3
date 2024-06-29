function Sugerencias(valorBusqueda) {
    var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
    
    return listaLibros.filter(function(libro) {
        return libro.Nombre.toLowerCase().includes(valorBusqueda);
    }).map(function(libro) {
        return libro.Nombre;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var inputBuscar = document.getElementById("in_buscar");
    
    inputBuscar.addEventListener("input", function() {
        var valorBusqueda = inputBuscar.value.toLowerCase();
        if (valorBusqueda === ' ') {
            var Busqueda = document.getElementById("BUSCADOR"); 
            Busqueda.style.display = 'none';
        }
        
        var nombreBusqueda = document.getElementById("in_buscar").value;
        
        var sugerencias = Sugerencias(valorBusqueda);
        
        var sugerenciasList = document.getElementById("sugerenciasList");
        sugerenciasList.innerHTML = "";
        
        sugerencias.forEach(function(sugerencia) {
            var option = document.createElement("option");
            option.value = sugerencia;
            sugerenciasList.appendChild(option);
        });

        mostrarResultado(nombreBusqueda);
    });
    inputBuscar.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evitar que el formulario se envíe al presionar Enter
            var nombreBusqueda = document.getElementById("in_buscar").value.toLowerCase();
            mostrarResultado(nombreBusqueda);
        }
    });
});

function mostrarResultado(nombreBusqueda) { 
    var Busqueda = document.getElementById("BUSCADOR"); 
    Busqueda.style.display = 'block';

    var listaLibros = JSON.parse(localStorage.getItem("libros")) || []; 

    var listaHTML2 = document.getElementById("datos_re");
    listaHTML2.innerHTML = "";

    var librosEncontrados = listaLibros.filter(function(libro) {
        return libro.Nombre.toLowerCase().includes(nombreBusqueda.toLowerCase());
    });

    if (librosEncontrados.length > 0) {
        librosEncontrados.forEach(function(libroEncontrado) {
            var h5 = document.createElement("h5");
            var p2 = document.createElement("p");
            var div = document.createElement("div");
            var div2 = document.createElement("div");
            var img = document.createElement("img");
            var btnAgregar = document.createElement("button");
            var index = listaLibros.indexOf(libroEncontrado);
            btnAgregar.style.height = '45px';
            btnAgregar.classList = 'btn btn-secondary';
            btnAgregar.style.float = 'inline-end';
            btnAgregar.textContent = "Agregar";
            btnAgregar.id = 'btn_Agregar_' + index;
            btnAgregar.dataset.index = index;
            btnAgregar.addEventListener("click", function(event) {
                var clickedIndex = event.target.dataset.index;
                console.log(clickedIndex);
                agregarAlCarrito(clickedIndex);
            });
            btnAgregar.addEventListener("click", function() {
                Mostrar();
            });

            p2.textContent =  `Precio: $${libroEncontrado.Precio}`;
            img.src =  libroEncontrado.Imagen;
            h5.textContent = libroEncontrado.Nombre;

            div.className = "card";
            img.className = "card-img-top d-block w-100 position: relative";
            img.style.height= "200px";
            div2.className = "card-body";
            h5.className = "card-title";
            p2.className = "card-text";

            div.style.margin= "15px";
            div.style.width= "250px";
            div.style.float= "left";

            div.appendChild(img);
            div2.appendChild(h5);
            div2.appendChild(p2);
            div2.appendChild(btnAgregar);
            div.appendChild(div2);
            listaHTML2.appendChild(div);
        });
    } else {
        var Nohay = document.createElement("h5");
        Nohay.textContent= "No se encontraron resultados para la búsqueda.";
        listaHTML2.appendChild(Nohay);
    }
}

