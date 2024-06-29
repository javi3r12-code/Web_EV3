 src="https://code.jquery.com/jquery-3.7.1.min.js"
    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
    crossorigin="anonymous"
 src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"

 function Sugerencias(valorBusqueda) {
    var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
    
    return listaLibros.filter(function(libro) {
        return libro.Categoria.toLowerCase().includes(valorBusqueda);
    }).map(function(libro) {
        return libro.Categoria;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var inputBuscar = document.getElementById("categoria");
    
        inputBuscar.addEventListener("input", function() {
        var valorBusqueda = inputBuscar.value.toLowerCase();
     
        var nombreBusqueda = document.getElementById("categoria").value;
        
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
});


 $(document).ready(function(){
    $('#formulario').submit(function(e) {
        e.preventDefault();
        var imagen = document.getElementById("imagen").value;
        var span_i = document.getElementById("s_imagen")
        if (imagen === '')  {
            span_i.style.display= 'block'
            return false;

        } else {
            span_i.style.display= 'none'
            localStorage.setItem("Imagen", imagen);
        }

        var id = document.getElementById("id").value;
        var span_id = document.getElementById("s_id")
        if (id === '')  {
            span_id.style.display= 'block'
            return false;

        } else {
            span_id.style.display= 'none'
            localStorage.setItem("Imagen", imagen);
        }

        var nombre = document.getElementById("nombre").value;
        var span_n = document.getElementById("s_nombre")
        if(nombre === ''){
            span_n.style.display= 'block'
            return false;
        } else {
            span_n.style.display= 'none'
            localStorage.setItem("Nombre", nombre);  
        }

        var categoria = document.getElementById("categoria").value;
        var span_cate = document.getElementById("s_cate")
        if(categoria === ''){
            span_cate.style.display= 'block'
            return false;
        } else {
            span_cate.style.display= 'none'
            localStorage.setItem("Categoria", categoria);  
        }

        var desc = document.getElementById("desc").value
        var span_de = document.getElementById("s_desc");
        if(desc === ''){
            span_de.style.display= 'block'
            return false
        } else {
            span_de.style.display= 'none'
            localStorage.setItem("Desc", desc);
        }

        var precio = document.getElementById("precio").value;
        var span_pre = document.getElementById("s_precio");
        if(precio === ''){                
            span_pre.style.display= 'block'
            return false;
        } else {  
            span_pre.style.display= 'none'
            localStorage.setItem("Precio", precio);
        } 

        var in_imagen = document.getElementById("imagen");
        var in_nombre = document.getElementById("nombre");
        var in_categoria = document.getElementById("categoria");
        var in_desc = document.getElementById("desc");
        var in_precio = document.getElementById("precio");
        var in_id = document.getElementById("id");


        var imagenData = document.getElementById("imagen").files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          var ImagenUrl = e.target.result;
            
          var libro = {
            Imagen: ImagenUrl ,
            Id : in_id.value.trim(),
            Nombre : in_nombre.value.trim(), 
            Categoria : in_categoria.value.trim(), 
            Desc: in_desc.value.trim(),
            Precio: in_precio.value
            }

        var listaLibros = JSON.parse(localStorage.getItem("libros")) || [];
        listaLibros.push(libro);
        localStorage.setItem("libros", JSON.stringify(listaLibros));

        in_imagen.value = "";
        in_nombre.value = "";
        in_categoria.value = "";
        in_desc.value = "";
        in_precio.value = "";
        in_id.value = "";

        console.log("Libro guardado:", libro);

        };
        reader.readAsDataURL(imagenData);

        
    });
});
