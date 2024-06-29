
function Mostrar(){ 

    var listaLIbros = JSON.parse(localStorage.getItem("libros")) || []; 
    var listaHTML = document.getElementById("datos_li");
  
    listaHTML.innerHTML = "";
  
    listaLIbros.forEach(function(libro, index) {
        var btnAgregar= document.createElement("button");
        btnAgregar.style.height = '45px';
        btnAgregar.classList = 'btn btn-primary';
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
        var p2 = document.createElement("p");
        var p = document.createElement("p");
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var img = document.createElement("img");
        p2.textContent =  `Precio: $${libro.Precio}`;
        img.src =  `${libro.Imagen}`;
        h5.textContent = `${libro.Nombre}`;
        div.className = "card";
        img.className = "card-img-top d-block w-100 position: relative";
        img.style.height= "200px";
        div2.className = "card-body";
        h5.className = "card-title";
        p.className = "card-text";
        //style=" margin: 15px; width: 250px; float:left;
        div.style.margin= "15px";
        div.style.width= "250px";
        div.style.float= "left";

        div.appendChild(img);
        div2.appendChild(h5);
        div2.appendChild(p2);
        // div2.appendChild(btnEliminar);
        div2.appendChild(btnAgregar);
        
        div.appendChild(div2);
        listaHTML.appendChild(div);
        console.log(libro)
    });
}

document.addEventListener("DOMContentLoaded", function() {
        Mostrar();

    });
document.getElementById("actu").addEventListener("click", Mostrar);
