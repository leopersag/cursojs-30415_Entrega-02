//Definición de variables

const arrPlacas = [];
const arrPantallas = [];

let fechaIn = [];
let sku = [];
let linea = [];
let turno = [];
let imei = [];
let fallaLinea = [];
let fechaOut = [];

let darSalida = [];
let estadoFinal = [];

class elemento{
    constructor (fechaIn, sku, linea, turno, imei, fallaLinea, fechaOut, estado,){
        this.fechaIn = fechaIn;
        this.sku = sku;
        this.linea = linea;
        this.turno = turno;
        this.imei = imei;
        this.fallaLinea = fallaLinea;
        this.fechaOut = fechaOut;
        this.estado = estado;
        this.disponible = true;
    }

    salida(){
        this.fechaOut = new Date();
        this.estado = estadoFinal.value;
        this.disponible = false;
    }
}

class stock{
    constructor (modelo, cantidad){
        this.modelo = modelo;
        this.cantidad = cantidad;
    }
}

let usuario;
let usuarioStorage = localStorage.getItem("usuario");

//Ingreso de usuario
if(usuarioStorage){
  usuario = usuarioStorage.toLowerCase();
  Swal.fire({
    title: 'Bienvenido '+ usuario,
    text: 'Continuar',
    icon: 'success',
    confirmButtonText: 'OK'
  });
 // alert("Bienvenido " + usuario);
}else{
  usuario = prompt("Ingresa tu usuario: \n- Admin\n- Usuario");
  while(usuario===null){
    usuario = prompt("Valor incorrecto \nPor favor ingresa tu usuario: \n- Admin\n- Usuario");
  }
  while(usuario.toLowerCase()!= "admin" && usuario.toLowerCase()!= "usuario"){
    usuario = prompt("Valor incorrecto \nPor favor ingresa tu usuario: \n- Admin\n- Usuario");
  }
  localStorage.setItem("usuario", usuario.toLowerCase());
}

//Para deshabilitar las opciones no deseadas para el usuario "usuario"
if(localStorage.getItem("usuario") === "usuario"){
    let btnPlacaDisable = document.getElementById("btnInPlacas");
    btnPlacaDisable.className = "btn-light";
    let modalPlacaDisable = document.getElementById("modalInPlacas");
    modalPlacaDisable.id = "modalPlacaDisabled";

    let btnPantallaDisable = document.getElementById("btnInPantallas");
    btnPantallaDisable.className = "btn-light";
    let modalPantallaDisable = document.getElementById("modalInPantallas");
    modalPantallaDisable.id = "modalPantallaDisabled";

    let btnOutDisable = document.getElementById("btnOutElementos");
    btnOutDisable.className = "btn-light";
    let modalOutDisable = document.getElementById("modalOutElementos");
    modalOutDisable.id = "modalPantallaDisabled";
}

//Opciones habilitadas para el usuario "admin"
if(localStorage.getItem("usuario")==="admin"){
// Funcionamiento del modal de placas

    //Para que los campos queden vacios al ingresar
    btnInPlacas.addEventListener('click', ()=>{
        modeloPlaca.value = '';
        lineaPlaca.value = '';
        turnoPlaca.value = '';
        imeiPlaca.value = '';
        fallaPlaca.value = '';
    })

    //Funcionalidad del boton guardar en el modal de placas
    btnGuardarPlaca.addEventListener('click', ()=>{

        fechaIn = new Date();
        sku = document.getElementById('modeloPlaca');
        linea = document.getElementById('lineaPlaca');
        turno = document.getElementById('turnoPlaca');
        imei = document.getElementById('imeiPlaca');
        fallaLinea = document.getElementById('fallaPlaca');

        if(sku.value && linea.value && turno.value && imei.value && fallaLinea.value){
            //si el elemento NO existe en el stock actual guarda el valor
            if(!(arrPlacas.filter(e => e.disponible == true).some(e => e.imei === imei.value))){
                arrPlacas.push(new elemento(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));
                lineaPlaca.value = '';
                imeiPlaca.value = '';
                fallaLinea.value = '';
                Swal.fire({
                    position:'bottom-end',
                    icon: 'success',
                    title: 'Guardado correctamente',
                    showConfirmButton: false,
                    timer:1000,
                  });
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: `El IMEI "${imei.value}" se encuentra en la base de datos y aun no se le dió salida`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                lineaPlaca.value = '';
                imeiPlaca.value = '';
                fallaLinea.value = '';
            }
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Falta completar algún campo',
                icon: 'error',
                confirmButtonText: 'OK'
              });
        }
    })

// Funcionamiento del modal de pantallas

    //Para que los campos queden vacios al ingresar
    btnInPantallas.addEventListener('click', ()=>{
        modeloPantalla.value = '';
        lineaPantalla.value = '';
        turnoPantalla.value = '';
        imeiPantalla.value = '';
        fallaPantalla.value = '';
    })

    //Funcionalidad del boton guardar en el modal de pantallas
    btnGuardarPantalla.addEventListener('click', ()=>{

        fechaIn = new Date();
        sku = document.getElementById('modeloPantalla');
        linea = document.getElementById('lineaPantalla');
        turno = document.getElementById('turnoPantalla');
        imei = document.getElementById('imeiPantalla');
        fallaLinea = document.getElementById('fallaPantalla');

        if(sku.value && linea.value && turno.value && imei.value && fallaLinea.value){
            if(!(arrPantallas.filter(e => e.disponible == true).some(e => e.imei === imei.value))){
                arrPantallas.push(new elemento(fechaIn, sku.value, linea.value, turno.value, imei.value, fallaLinea.value,));
                lineaPantalla.value = '';
                imeiPantalla.value = '';
                fallaLinea.value = '';
                Swal.fire({
                    position:'bottom-end',
                    icon: 'success',
                    title: 'Guardado correctamente',
                    showConfirmButton: false,
                    timer:1000,
                  });
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: `El SN "${imei.value}" se encuentra en la base de datos y aun no se le dió salida`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                lineaPantalla.value = '';
                imeiPantalla.value = '';
                fallaLinea.value = '';
            }
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Falta completar algún campo',
                icon: 'error',
                confirmButtonText: 'OK'
              });
        }
    })

// Funcionamiento del modal de egreso de elementos

    //Para que los campos queden vacios al ingresar
    btnOutElementos.addEventListener('click', ()=>{
        elementId.value = '';
        elementEstado.value = '';
    })

    //Funcionalidad del boton guardar en el modal egreso de elementos
    btnEgreso.addEventListener('click', ()=>{
        
        darSalida = document.getElementById('elementId');
        estadoFinal = document.getElementById('elementEstado');
        //Para que el estado siempre quede en mayúsculas
        estadoFinal.value = estadoFinal.value.toUpperCase();
               
        let existePlaca = arrPlacas.filter(e => e.disponible == true).some(e => e.imei === darSalida.value);
        let existePantalla = arrPantallas.filter(e => e.disponible == true).some(e => e.imei === darSalida.value);
        
        if(darSalida.value && estadoFinal.value){
            if(!(existePlaca || existePantalla)){
                Swal.fire({
                    title: 'Error!',
                    text: 'IMEI/SN no encontrado, por favor ingrese otro valor',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                darSalida.value = '';
                estadoFinal.value = '';
            }else{
                 if(estadoFinal.value === "OK" || estadoFinal.value === "SCP" || estadoFinal.value === "RMA" ){
                    if(existePlaca){
                        for (const placa of arrPlacas.filter(e => e.disponible == true)){
                            if (placa.imei === darSalida.value){
                                placa.salida();
                            }
                        }
                    }if(existePantalla){
                            for (const pantalla of arrPantallas.filter(e => e.disponible == true)){
                                if (pantalla.imei === darSalida.value){
                                    pantalla.salida();
                                }
                            }
                    }
                    darSalida.value = '';
                    estadoFinal.value = '';
                    Swal.fire({
                        position:'bottom-end',
                        icon: 'success',
                        title: 'Guardado correctamente',
                        showConfirmButton: false,
                        timer:1000,
                      });
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: 'Estado de salida incorrecto',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      });
                        estadoFinal.value = '';
                    }
                }
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Falta completar algún campo',
                icon: 'error',
                confirmButtonText: 'OK'
              });
        }
    })
}

//Opcion habilitada para ambos usuarios
if(localStorage.getItem("usuario")==="admin" || localStorage.getItem("usuario") === "usuario"){
// Funcionamiento del modal de Reportes

    //Para que los campos queden vacios al ingresar
    btnCerrarReportes.addEventListener('click', ()=>{

        let elementDivPlaca = document.getElementById("divPlacas");
        while (elementDivPlaca.firstChild) {
            elementDivPlaca.removeChild(elementDivPlaca.firstChild);
        }

        let elementTabla = document.getElementById("tabla");
        while (elementTabla.firstChild) {
            elementTabla.removeChild(elementTabla.firstChild);
        }

        let elementDivPantalla = document.getElementById("divPantallas");
        while (elementDivPantalla.firstChild) {
            elementDivPantalla.removeChild(elementDivPantalla.firstChild);
        }

        let elementTablaPantalla = document.getElementById("tablaPantallas");
        while (elementTablaPantalla.firstChild) {
            elementTablaPantalla.removeChild(elementTablaPantalla.firstChild);
        }
    })

    //Funcionalidad del boton para ingresar a "Reportes"
    btnReportes.addEventListener('click', ()=>{

        let arrStockPlacas = [];
        let arrStockPantallas = [];

        // Generación de un array con los modelos (sku) que tienen elementos disponibles
        let uniquePlacas = [...new Set(arrPlacas.filter(e => e.disponible == true).map(e => e.sku))];
        let uniquePantallas = [...new Set(arrPantallas.filter(e => e.disponible == true).map(e => e.sku))];
       
        // Generación de objeto (modelo con elementos disponibles, cantidad de elementos disponibles del modelo)
        for (const mod of uniquePlacas){
            arrStockPlacas.push(new stock(mod, arrPlacas.filter(e => e.sku == mod).filter(e => e.disponible == true).length));
        }

        for (const mod of uniquePantallas){
            arrStockPantallas.push(new stock(mod, arrPantallas.filter(e => e.sku == mod).filter(e => e.disponible == true).length));
        }

        //Generación de título y tabla para las Placas  
        let divPlacas1 = document.getElementById("divPlacas");
        let tituloPlacas = document.createElement("div");

        //Si hay placas entonces mostrar en pantalla el stock actual de placas
        if(arrStockPlacas.length >0){  
            
            tituloPlacas.innerHTML = "<h3>Stock de actual de Placas</h3>";
            divPlacas1.append(tituloPlacas)

            let tabla = document.createElement("table");
            let titulo = document.createElement("thead");
            let primeraFila = document.createElement("tr");
            primeraFila.innerHTML = `
            <th scope="col">Modelo</th>
            <th scope="col">Cantidad</th>`;
            titulo.append(primeraFila);

            let bodyPlaca = document.createElement("tbody");
            for(const placa of arrStockPlacas){
                let item = document.createElement("tr");;
                item.innerHTML = 
                `<td class="text-center">${placa.modelo}</td> 
                <td class="text-center">${placa.cantidad}</td>`;
                bodyPlaca.append(item);
            }

            tabla.innerHTML=`
            <thead> ${titulo.innerHTML} </thead>
            <tbody class="table-group-divider"> ${bodyPlaca.innerHTML} </tbody>
            `;
        
            let tablaStocks = document.getElementById("tabla");
            tablaStocks.append(tabla);
            tabla.className = "tabla_temas";
        
        //Si no hay placas, mostrar en pantallas que no hay placas en stock    
        }else{
            tituloPlacas.innerHTML = "<h3>No hay placas en Stock</h3>";
            divPlacas1.append(tituloPlacas);
        }

        //Generación de título y tabla para las pantallas        
        let divPantallas1 = document.getElementById("divPantallas");
        let tituloPantalla = document.createElement("div");

        //Si hay pantallas entonces mostrar en pantalla el stock actual de pantallas
        if(arrStockPantallas.length >0){

            tituloPantalla.innerHTML = "<h3>Stock de actual de Pantallas</h3>";
            divPantallas1.append(tituloPantalla);

            let tablaPantallas = document.createElement("table");            
            let tituloTablaPantallas = document.createElement("thead");
            let primeraFilaTablaPantallas = document.createElement("tr");
            primeraFilaTablaPantallas.innerHTML = `
            <th scope="col">Modelo</th>
            <th scope="col">Cantidad</th>`;
            tituloTablaPantallas.append(primeraFilaTablaPantallas);

            let bodyTablaPantallas = document.createElement("tbody");
            for(const pantalla of arrStockPantallas){
                let item = document.createElement("tr");
                item.innerHTML = 
                `<td class="text-center">${pantalla.modelo}</td> 
                <td class="text-center">${pantalla.cantidad}</td>`;
                bodyTablaPantallas.append(item);
            }

            console.log(bodyTablaPantallas);

            tablaPantallas.innerHTML=`
            <thead> ${tituloTablaPantallas.innerHTML} </thead>
            <tbody class="table-group-divider"> ${bodyTablaPantallas.innerHTML} </tbody>
            `;
        
            let tablaStocksPantallas = document.getElementById("tablaPantallas");
            tablaStocksPantallas.append(tablaPantallas);
            tablaPantallas.className = "tabla_temas";

        //Si no hay pantallas, mostrar en pantallas que no hay pantallas en stock
        }else{
            tituloPantalla.innerHTML = "<h3>No hay pantallas en Stock</h3>";
            divPantallas1.append(tituloPantalla);

        }
       
    })
}

btnLogOut.addEventListener('click', ()=>{

    localStorage.clear();
    console.log(localStorage);   

})
