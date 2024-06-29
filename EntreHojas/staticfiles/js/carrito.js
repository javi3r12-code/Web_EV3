var Total = 0;
function agregarAlCarrito(index) {
    var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
    var libro = listaLibros[index];
    var libroExistente = librosSeleccionados.find(function(lib) {
        return lib.Nombre === libro.Nombre && lib.Imagen === libro.Imagen;
    });

    if (libroExistente) {
      // Si el libro ya está en el carrito, aumentar su cantidad en 1
      libroExistente.Cantidad++;
  } else {
      // Si el libro no está en el carrito, agregarlo con cantidad 1
      libro.Cantidad = 1;
      librosSeleccionados.push(libro);
  }

    mostrarLibrosEnCarrito();
}

    var librosSeleccionados = [];
    function mostrarComprar(){
      var btnComprar = document.getElementById("comprar");
      var span_Total = document.getElementById("span_total");
      btnComprar.style.display = 'block';
      span_Total.style.display = 'block';
      btnComprar.removeEventListener("click", mostrarConfirmacionC);

      btnComprar.addEventListener("click", function() {
        mostrarConfirmacionC();

    });
    }

    

function mostrarLibrosEnCarrito() {
    
    var listaLibros = document.getElementById("listaLibros");
    listaLibros.innerHTML = "";
    Total = 0; 
    librosSeleccionados.forEach(function(libro, index) {
        var li = document.createElement("li");
        var div = document.createElement("div");
        div.style.display = "flex"; 
        var img = document.createElement("img");
        img.src = libro.Imagen;
        img.alt = libro.Nombre;
        img.style.width = "80px";
        img.style.height = "100px";
        var span = document.createElement("span");
        var in_cant = document.createElement("input");
        var span_Total = document.getElementById("span_total");
        in_cant.type = "number";
        in_cant.min = 0;
        in_cant.max = 10;
        in_cant.value = libro.Cantidad;
        in_cant.placeholder = "Cantidad"
        in_cant.style.width = "88px"
        in_cant.style.height = "50px"
        in_cant.addEventListener("input", function() {
            var cantidad = parseInt(in_cant.value);
            if (cantidad > 0 && cantidad <= 10 ) {
              libro.Cantidad = cantidad;          
              console.log(libro.Cantidad);    
              mostrarLibrosEnCarrito(); 
            } else if(!cantidad || cantidad <= 0 ){
              eliminarDelCarrito(index);
              span_Total.style.display = "none";
            } else {
              in_cant.value = libro.Cantidad;
            }


        });
        
        span.textContent = `${libro.Nombre} $${libro.Precio}`;
        span.style.margin = '10px';
        var btnEliminar = document.createElement("button");
        btnEliminar.style.height = '45px';
        btnEliminar.classList = 'btn btn-secondary';
        btnEliminar.style.float = 'inline-end';
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function() {
          eliminarDelCarrito(index);});
        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(in_cant)
        div.appendChild(btnEliminar);
        li.appendChild(div);
        listaLibros.appendChild(li);
        Total += libro.Precio * libro.Cantidad;
        actualizarDivisa(Total);
        //mostrarComprar();
        

      });

      var span_Total = document.getElementById("span_total");
      span_Total.textContent = "Total: $" + Total;
      span_Total.style.display = librosSeleccionados.length > 0 ? 'block' : 'none';
      mostrarComprar();

      var btnComprar = document.getElementById("comprar");
      if (librosSeleccionados.length === 0) {
        btnComprar.style.display = "none";
      } else {
        btnComprar.style.display = "block";
      }

      var span = document.getElementById("notiCompra");
      if (librosSeleccionados.length === 0) {
        span.style.display = "none";
      } else {
        span.style.display = "block";
      }

    }
    function eliminarDelCarrito(index) {
        librosSeleccionados.splice(index, 1); 
        mostrarLibrosEnCarrito(); 
    }

    function guardarLS() {
        localStorage.setItem("carrito", JSON.stringify(librosSeleccionados));
    }
    
    function cargarLS() {
        var carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            librosSeleccionados = JSON.parse(carritoGuardado);
            mostrarLibrosEnCarrito(); 
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        cargarLS();
    });
    
    window.addEventListener("beforeunload", function() {
        guardarLS();
    });
