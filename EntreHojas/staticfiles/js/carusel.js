function Carrusel(){ 

    var listaLIbros = JSON.parse(localStorage.getItem("libros")) || []; 
    var listaHTML = document.getElementById("carrusel_li");
  
    listaHTML.innerHTML = "";
  
    listaLIbros.forEach(function(libro, index) {
       
        
        var h5 = document.createElement("h5");
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var img = document.createElement("img");
        img.src =  `${libro.Imagen}`;
        h5.textContent = `${libro.Nombre}`;
        // span.textContent= `${auto.Patente} ${auto.Marca} ${auto.Modelo} ${auto.Anio}`;
        div.className = "carousel-item"; 
        if (index === 0) { 
            div.classList.add("active", "ms-5");
        }else {
            div.classList.add("ms-5");
        }
            div2.className = "imagentitulo col-4 col-sm-3 col-md-3 col-lg-2";
            img.className = "d-block w-100 rounded";
            img.style.height = "200px";

        div2.appendChild(img);
        div2.appendChild(h5);
        
        div.appendChild(div2);
        listaHTML.appendChild(div);



        
    });
    var items = document.querySelectorAll('.carousel .carousel-item')
      items.forEach((e) => {
        const slide = 4;
        let next = e.nextElementSibling;
        for (var i = 0;i < slide;i++){
          if (!next){
            next = items[0]
          }
          let clonechild = next.cloneNode(true)
          e.appendChild(clonechild.children[0])
          next = next.nextElementSibling
        }
      })
}

document.addEventListener("DOMContentLoaded", function() {
        Carrusel();

    });


    
      
    
      
    