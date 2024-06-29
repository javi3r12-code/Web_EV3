function mostrarLibrosCategoria(categoria) {
    var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
    var listaHTML = document.getElementById("datos_li");
    listaHTML.innerHTML = ""; // Limpiar la lista antes de mostrar los libros filtrados

    var librosFiltrados = listaLibros.filter(function(libro) {
        return libro.Categoria.toLowerCase() === categoria.toLowerCase(); // Filtrar por categoría
    });

    librosFiltrados.forEach(function(libro ) {
        var h5 = document.createElement("h5");
        var p2 = document.createElement("p");
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var img = document.createElement("img");
        var btnAgregar = document.createElement("button");
        var index = listaLibros.indexOf(librosFiltrados);
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

        p2.textContent =  `Precio: $${libro.Precio}`;
        img.src =  libro.Imagen;
        h5.textContent = libro.Nombre;

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
        listaHTML.appendChild(div);    });
}



