src="https://code.jquery.com/jquery-3.7.1.min.js"
integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
crossorigin="anonymous"
src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"
var imgSrc = 'img/libro1.jpg'
    
var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
    
    if (listaLibros.length === 0) {
        var imgSrc = 'img/libro1.jpg'

        var libro = {
        Imagen: imgSrc ,
        Id : 1,
        Nombre : 'Alas De Hierro', 
        Categoria : 'Novela', 
        Desc: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        Precio: 13500
        }

        var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
        listaLibros.push(libro);
        localStorage.setItem("libros", JSON.stringify(listaLibros));

        console.log("Libro guardado:", libro);
        };

    if (listaLibros.length === 1) {
        var imgSrc = 'img/libro2.jpg'
        
        var libro = {
        Imagen: imgSrc ,
        Id : 1,
        Nombre : 'En Agosto Nos Vemos', 
        Categoria : 'Novela', 
        Desc: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        Precio: 15000
        }

        var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
        listaLibros.push(libro);
        localStorage.setItem("libros", JSON.stringify(listaLibros));

        console.log("Libro guardado:", libro);
        };

function Mostrar(){ 
   

        
    var listaLIbros = JSON.parse(localStorage.getItem("libros")) || []; 
    var listaHTML = document.getElementById("datos_li");
  
    listaHTML.innerHTML = "";
  
    listaLIbros.forEach(function(libro, index) {
        var btnAgregar= document.createElement("button");
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

        var btnEliminar = document.createElement("button");
        btnEliminar.style.height = '45px';
        btnEliminar.classList = 'btn btn-secondary';
        btnEliminar.style.float = 'inline-end';
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function() {
            listaLIbros.splice(index, 1); 
            localStorage.setItem("libros", JSON.stringify(listaLIbros));
            Mostrar();
        });
        
        var h5 = document.createElement("h5");
        var p = document.createElement("p");
        var p2 = document.createElement("p");
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var img = document.createElement("img");
        p.textContent =  `${libro.Desc}`;
        p2.textContent =  `Precio: $${libro.Precio}`;
        img.src =  `${libro.Imagen}`;
        h5.textContent = `${libro.Nombre}`;
        // span.textContent= `${auto.Patente} ${auto.Marca} ${auto.Modelo} ${auto.Anio}`;
        div.className = "card";
        img.className = "card-img-top";
        div2.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text";
        //style=" margin: 15px; width: 250px; float:left;
        div.style.margin= "15px";
        div.style.width= "250px";
        div.style.float= "left";

        div.appendChild(img);
        div2.appendChild(h5);
        div2.appendChild(p);
        div2.appendChild(p2);
        // div2.appendChild(btnEliminar);
        div2.appendChild(btnAgregar);
        
        div.appendChild(div2);
        listaHTML.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function() {
        Mostrar();

    });
document.getElementById("actu").addEventListener("click", Mostrar);
