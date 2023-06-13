
let aguapuntos = 100;
let fertilizantepuntos = 100;
let puntossuciedad = 0;
let seleccion = "";
let exp = 0;
let suciedadtiempo = 200;

var handlerSuciedad;
var handlerTiempo;
function tiempos()
{
    handlerTiempo = setInterval(corretiempo, 200); // Cada segundo, si quieres cada medio segundo entonces ponle 500
    handlerSuciedad = setInterval(suciedadtimer, suciedadtiempo);
}

function terminarjuego()
{
    clearInterval(handlerTiempo);
    clearInterval(handlerSuciedad);
}

window.addEventListener("load",function() {

    var suciedad = document.getElementById("suciedad");
    var agua = document.getElementById("agua");
    var fertilizante = document.getElementById("fertilizante");

    suciedad.style.color = "white";
    suciedad.style.backgroundColor = "green";
    suciedad.innerHTML = puntossuciedad+'%'
    
    agua.style.color = "white";
    agua.style.backgroundColor = "blue";
    agua.innerHTML = aguapuntos+'%'

    fertilizante.style.color = "white";
    fertilizante.style.backgroundColor = "brown";
    fertilizante.innerHTML = fertilizantepuntos+'%'

    // Esta función es la responsable de que la imagen de la herramienta siga el mouse
    document.getElementById("flor").addEventListener("mousemove", function(mouse) {
       document.getElementById('flotante').style.top=  (mouse.clientY - 105) + "px"; // vertical movment
       document.getElementById('flotante').style.left= (mouse.clientX - 105) + "px";//horizontal move
    });

    // Cando se utiliza la herramienta con un click desaparece
    // Esta complicado mantener la imagen sin que empiece a parpadear
    document.getElementById("flotante").addEventListener("click",function() {

        if(seleccion == "regar")
        {
            aguapuntos = aguapuntos + 20;
            if(aguapuntos > 100)
            {
                aguapuntos = 100;
            }
            exp = exp + 3;
        } else if(seleccion == "fertilizar")
        {
            fertilizantepuntos = fertilizantepuntos +30;
            if(fertilizantepuntos > 100)
            {
                fertilizantepuntos = 100;
            }
            exp = exp + 5;
        } else if (seleccion == "limpiar")
        {
            exp = exp + 8;
            puntossuciedad = 0;
            document.getElementById("flor-img").setAttribute("src","img/flor-sana.png");
        }

        document.getElementById("flotante").style.display = "none"
    });

    
    // Selecciona la herramienta necesaria
    document.getElementById("regar").addEventListener("click", function() {
        seleccion = "regar";
        document.getElementById("flotante").style.display = "inline-block"
        document.getElementById("flotante").setAttribute("src","img/agua.png");
    });

    document.getElementById("fertilizar").addEventListener("click", function() {
        seleccion = "fertilizar";
        document.getElementById("flotante").style.display = "inline-block"
        document.getElementById("flotante").setAttribute("src","img/saco-abono.png");
    });

    document.getElementById("limpiar").addEventListener("click", function() {
        seleccion = "limpiar";
        document.getElementById("flotante").style.display = "inline-block"
        document.getElementById("flotante").setAttribute("src","img/insecticida.png");
    });
   tiempos();
});


function suciedadtimer()
{
    if(aguapuntos < 90 && fertilizantepuntos < 90)
    {
        puntossuciedad = puntossuciedad + 1;
        suciedadtiempo = 100;
    } else if (aguapuntos < 60 && fertilizantepuntos < 60)
    {
        suciedadtiempo = 200;
        tiempos();
    }
    else 
    {
        if(puntossuciedad > 50)
        {
            puntossuciedad = puntossuciedad + 1;
        }
    }

    var suciedad = document.getElementById("suciedad");
    suciedad.style.color = "white";
    suciedad.innerHTML = puntossuciedad+'%'
    if(puntossuciedad == 60)
    {
        document.getElementById("flor-img").setAttribute("src","img/flor-venus.png");
        terminarjuego();
    } else if (puntossuciedad == 10)
    {
        document.getElementById("flor-img").setAttribute("src","img/flor-triste.png");
    }
}

function corretiempo()
{
    if(exp >= 100)
    {
        document.getElementById("flor-img").setAttribute("src","img/flor-evolucionada.png");
        terminarjuego();
    }

    if(aguapuntos < 90 && fertilizantepuntos < 90)
    {
        suciedad = suciedad + 1;
    }
    
    aguapuntos = aguapuntos - 1;
    fertilizantepuntos = fertilizantepuntos - 1;

    
    var agua = document.getElementById("agua");
    var fertilizante = document.getElementById("fertilizante");
    
    agua.style.color = "white";
    agua.innerHTML = aguapuntos+'%'

    fertilizante.style.color = "white";
    fertilizante.innerHTML = fertilizantepuntos+'%' 
    document.getElementById("exp").innerText = exp;
}
