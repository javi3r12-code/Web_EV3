src="https://code.jquery.com/jquery-3.7.1.min.js"
integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
crossorigin="anonymous";
src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.5/dist/jquery.validate.js"
;
document.addEventListener("DOMContentLoaded", function() {
    $.getJSON('https://mindicador.cl/api', function(data) {
        var dailyIndicators = data;
        //$("<p/>", {
        //    html: 'El valor actual de la UF es $' + dailyIndicators.dolar.valor
        //}).appendTo("body");
        console.log(dailyIndicators.dolar.valor);
    }).fail(function() {
        console.log('Error al consumir la API!');
    });

    $.getJSON('https://mindicador.cl/api', function(data) {
        var dailyIndicators = data;
        //$("<p/>", {
        //    html: 'El valor actual de la UF es $' + dailyIndicators.dolar.valor
        //}).appendTo("body");
        console.log(dailyIndicators.uf.valor);
    }).fail(function() {
        console.log('Error al consumir la API!');
    });

    $.getJSON('https://mindicador.cl/api', function(data) {
        var dailyIndicators = data;
        //$("<p/>", {
        //    html: 'El valor actual de la UF es $' + dailyIndicators.dolar.valor
        //}).appendTo("body");
        console.log(dailyIndicators.euro.valor);
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
});

var totalEnDivisa = 0;
var confirmacionMostrada = false;
var librosSeleccionados = [];
var divisaSeleccionada = "clp"; 

document.addEventListener("DOMContentLoaded", function() {
    cargarDivisa(); 

    $.getJSON('https://mindicador.cl/api', function(data) {
        var dailyIndicators = data;
        console.log("Valores cargados:", dailyIndicators);
        mostrarComprar();
    }).fail(function() {
        console.log('Error al consumir la API!');
    });
});

function cargarDivisa() {
    var divisaGuardada = localStorage.getItem("divisaSeleccionada");
    if (divisaGuardada) {
        divisaSeleccionada = divisaGuardada;
        actualizarDivisa();
        var selectDivisa = document.getElementById("selectDivisa");
        selectDivisa.value = divisaSeleccionada;
    }
}


function actualizarDivisa() {
    var tipoCambio = 1; 
    $.getJSON('https://mindicador.cl/api', function(data) {
        var dailyIndicators = data;

    if (divisaSeleccionada === 'usd') {
        tipoCambio = dailyIndicators.dolar.valor; 
    } else if (divisaSeleccionada === 'eur') {
        tipoCambio = dailyIndicators.euro.valor; 
    } else if (divisaSeleccionada === 'uf') {
        tipoCambio = dailyIndicators.uf.valor;
    }

    totalEnDivisa = Total / tipoCambio;
    var span_Total = document.getElementById("span_total");
    span_Total.textContent = "Total: $" + totalEnDivisa.toFixed(2) + " " + divisaSeleccionada.toUpperCase();
    });
}


function mostrarComprar(){
    var btnComprar = document.getElementById("comprar");
    var span_Total = document.getElementById("span_total");
    
    btnComprar.style.display = 'block';
    span_Total.style.display = 'block';

    btnComprar.addEventListener("click", function() {
        if (!confirmacionMostrada) {
            mostrarConfirmacionC(totalEnDivisa);
            confirmacionMostrada = true;
        }
        ;
    });

    var selectDivisa = document.getElementById("selectDivisa");
    selectDivisa.addEventListener("change", function() {
        divisaSeleccionada = selectDivisa.value; 
        localStorage.setItem("divisaSeleccionada", divisaSeleccionada); 
        actualizarDivisa(); 
    });
}



function mostrarConfirmacionC() {
    if (window.confirm('Desea confirmar la compra por: $'+ totalEnDivisa.toFixed(2) + " " + divisaSeleccionada.toUpperCase() )) {
        alert('¡La compra se ha realizado exitosamente!');
        vaciarCarrito();
    }
}

function vaciarCarrito() {
    librosSeleccionados = []; 
    var listaLibros = document.getElementById("listaLibros");
    listaLibros.innerHTML = "";
    var span_Total = document.getElementById("span_total");
    var btnComprar = document.getElementById("comprar");
    span_Total.style.display = 'none';
    btnComprar.style.display = 'none';
    };
