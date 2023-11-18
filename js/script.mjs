import persona from "./persona.js";
import profesional from "./profesional.js";
import futbolista from "./futbolista.js";
import { getUsersApi, agregarUsuariosApi,modificarUsuarioApi, eliminarUsuarioApi} from './ajax.mjs';

const tablaDatos = document.getElementById('tabla-datos');
const frmLista = document.getElementById('frm-lista');
const frmAbm = document.getElementById('frm-abm');
const btnAgregarElemento = document.getElementById('agregar-elemento');

//text box form abm
let txtId = document.getElementById('id');
let txtNombre = document.getElementById('nombre');
let txtApellido = document.getElementById('apellido');
let txtEdad = document.getElementById('edad');
let txtEquipo = document.getElementById('equipo');
let txtPosicion = document.getElementById('posicion');
let txtCantidadGoles = document.getElementById('CantidadGoles');
let txtTitulo = document.getElementById('titulo');
let txtFacultad = document.getElementById('facultad');



let txtañoGraduacion = document.getElementById('añoGraduacion');


//dropDown de tipo
let dropDownTipo = document.getElementById('tipo');

//botones Abm
const btnCancelar = document.getElementById('cancelar');
const btnAceptar = document.getElementById('aceptar');
const btnModificar = document.getElementById('modificar');
const btnEliminar = document.getElementById('eliminar');

//spinner and overlay
const spinner = document.getElementsByClassName('overlay');

//titulo con la accion del ABM
const tituloAccion = document.getElementById('accion-frm');

// lista para cargar en memoria
let listaUsuarios;

// aqui se toma la informacion para imprimirlo en la tabla del punto           1 listar
getUsersApi((error, data) => {
    showSpinner();
    if (error) {
        alert('Error no se pudo cargar los datos de la api:', error);
        hideSpinner();
    } else {
        listaUsuarios = data;
        llenarTabla(listaUsuarios);
        hideSpinner();
    }
});

function llenarTabla(data) {
    limpiarTabla();
    data.forEach((dato) => {
        crearFila(dato);
    });
}



function crearFila(dato) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${dato.id}</td> 
        <td>${dato.nombre}</td>
        <td>${dato.apellido}</td>
        <td>${dato.edad}</td>
        <td>${dato.equipo || 'N/A'}</td>
        <td>${dato.posicion || 'N/A'}</td>
        <td>${dato.cantidadGoles || 'N/A'}</td>
        <td>${dato.titulo || 'N/A'}</td>
        <td>${dato.facultad || 'N/A'}</td>
        <td>${dato.añoGraduacion || 'N/A'}</td>
        <td><button class="btn-modificar" ">Modificar</button></td>
        <td><button class="btn-eliminar" ">Eliminar</button></td>
    `;
    
    tablaDatos.querySelector('tbody').appendChild(fila);
}


function limpiarTabla() {
    const tbody = tablaDatos.querySelector('tbody');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}





// oculta y pone los formularios 
function switchForms() {
    if (frmLista.style.display === "none") {
        frmLista.style.display = "block";
        frmAbm.style.display = "none";
    } else {
        frmLista.style.display = "none";
        frmAbm.style.display = "block";
    }
}

// boton de cancelar abm 
btnCancelar.addEventListener("click", () => {
    switchForms();
});

// agregar de los elementos de la fila
btnAgregarElemento.addEventListener("click", () => {
    limpiarFormAbm();
    ocultarBtnEliminarModificar();
    MostrarBtnAceptar();
    tituloAccion.innerText = "Agregar Usuario";
    switchForms();
});


// objeto falso
const userData = {
    id: 1,
    nombre: '',
    apellido: '',
    edad: 1,
    posicion: 1,
    cantidadGoles: 1,
    titulo: 1,
    facultad: 1,
    añoGraduacion: 1
};



btnAceptar.addEventListener("click", () => {
    let tipo = dropDownTipo.value;
    showSpinner();

    // Llama a la función para agregar usuarios
    agregarUsuariosApi(userData)
        .then(newUserId => {
            if (tipo === "Futbolista") {
                if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtEquipo.value === "" || txtPosicion.value === "" || txtCantidadGoles.value === "") {
                    alert("Falto completar alguno de los campos");
                    hideSpinner();
                } else {
                    const newUser = {
                        id: newUserId,
                        nombre: txtNombre.value,
                        apellido: txtApellido.value,
                        dad: txtEdad.value,
                        equipo: txtEquipo.value,
                        posicion: txtPosicion.value,
                        cantidadGoles: txtCantidadGoles.value,
                    };
                    listaUsuarios.push(newUser);
                    llenarTabla(listaUsuarios);
                }
            } else if (tipo === "Profesional") {
                if (txtNombre.value === "" || txtApellido.value === "" || txtEdad.value === "" || txtTitulo.value === "" || txtFacultad.value === "" || txtañoGraduacion.value === "") {
                    alert("Falto completar alguno de los campos");
                    hideSpinner();
                } else {
                    const newUser = {
                        id: newUserId,
                        nombre: txtNombre.value,
                        apellido: txtApellido.value,
                        edad: txtEdad.value,
                        titulo: txtTitulo.value,
                        facultad: txtFacultad.value,
                        añoGraduacion: txtañoGraduacion.value,
                    };
                    listaUsuarios.push(newUser);
                    llenarTabla(listaUsuarios);
                }
            }
            alert("Se añadió el usuario correctamente");
        })
        .catch(error => {
            console.error('Hubo un problema con la operación de fetch:', error);
        })
        .finally(() => {
            hideSpinner();
        });
});


function limpiarFormAbm() {
    txtId.value = "";
    txtNombre.value = "";
    txtApellido.value = "";
    txtEdad.value = "";
    txtEquipo.value = "";
    txtPosicion.value = "";
    txtCantidadGoles.value = "";
    txtTitulo.value = "";
    txtFacultad.value = "";
    txtañoGraduacion.value = "";
}


function ocultarBtnEliminarModificar() {
    btnEliminar.style.visibility = 'hidden';
    btnModificar.style.visibility = 'hidden';
    btnEliminar.disabled = true;
    btnModificar.disabled = true;
}
/*
function mostrarBtnEliminarModificar() {
    btnEliminar.style.visibility = 'visible';
    btnModificar.style.visibility = 'visible';
    btnEliminar.disabled = false;
    btnModificar.disabled = false;
}
*/
function mostrarBtnEliminar() {
    btnEliminar.style.visibility = 'visible';
    btnEliminar.disabled = false;
}

function mostrarBtnModificar() {
    btnModificar.style.visibility = 'visible';
    btnModificar.disabled = false;
}

function ocultarBtnEliminar() {
    btnEliminar.style.visibility = 'hidden';
    btnEliminar.disabled = true;
}

function ocultarBtnModificar() {
    btnModificar.style.visibility = 'hidden';
    btnModificar.disabled = true;
}

function ocultarBtnAceptar() {
    btnAceptar.style.visibility = 'hidden';
    btnAceptar.disabled = true;
}

function MostrarBtnAceptar() {
    btnAceptar.style.visibility = 'visible';
    btnAceptar.disabled = false;
}


// este esta en el abm y es para crear el tipo
dropDownTipo.addEventListener("change", () => {
    let valorSeleccionadoDropDown = dropDownTipo.value;

    switch (valorSeleccionadoDropDown) {
        case 'Profesional':
            desabilitarCamposNoProfesional();
            habilitarCamposProfesional();
            break;
        case 'Futbolista':
            desabilitarCamposNoFutbolista();
            habilitarCamposFutbolista();
            break;
    }
    limpiarFormAbm();
});


function desabilitarCamposNoProfesional() {
    txtEquipo.disabled = true;
    txtCantidadGoles.disabled = true;
    txtPosicion.disabled = true;
}

function habilitarCamposProfesional() {
    if (txtTitulo) {
        txtTitulo.disabled = false;
    }
    if (txtFacultad) {
        txtFacultad.disabled = false;
    }
    if (txtañoGraduacion) {
        txtañoGraduacion.disabled = false;
    }
}


function desabilitarCamposNoFutbolista() {
    txtTitulo.disabled = true;
    txtFacultad.disabled = true;
    txtañoGraduacion.disabled = true;
}

function habilitarCamposFutbolista() {
    txtEquipo.disabled = false;
    txtCantidadGoles.disabled = false;
    txtPosicion.disabled = false;
}


// comparar si tiene algun atributo o el otro

function tieneposicinOrequipo(obj) {
    return obj.hasOwnProperty("posicion") || obj.hasOwnProperty("equipo");
}

// comparar si ha esos atributos
function tieneTituloOrFacultad(obj) {
    return obj.hasOwnProperty("titulo") || obj.hasOwnProperty("facultad");
}

// modifica la lista y evalua si el sevidor le dio el ok
document.addEventListener('DOMContentLoaded', function () {
    tablaDatos.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-modificar')) {
            const clickedRow = event.target.closest('tr');
          //  let index = clickedRow.rowIndex - 1; 

            let id = clickedRow.querySelector('td:nth-child(1)').innerText;
            let nombre = clickedRow.querySelector('td:nth-child(2)').innerText;
            let apellido = clickedRow.querySelector('td:nth-child(3)').innerText;
            let edad = clickedRow.querySelector('td:nth-child(4)').innerText;
            let equipo = clickedRow.querySelector('td:nth-child(5)').innerText;
            let posicion = clickedRow.querySelector('td:nth-child(6)').innerText;
            let cantidadGoles  = clickedRow.querySelector('td:nth-child(7)').innerText;
            let titulo = clickedRow.querySelector('td:nth-child(8)').innerText;
            let facultad = clickedRow.querySelector('td:nth-child(9)').innerText;
            let añoGraduacion = clickedRow.querySelector('td:nth-child(10)').innerText;

            if (equipo != "N/A" && posicion != "N/A") {
                const nuevoFutbolista = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    equipo: equipo,
                    posicion: posicion,
                    cantidadGoles: cantidadGoles
                };
                cargarTxtFrmAbm(nuevoFutbolista);
            }

            if (titulo != "N/A" && facultad != "N/A" && añoGraduacion != "N/A") {
                const nuevoProfesional = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    titulo: titulo,
                    facultad: facultad,
                    añoGraduacion: añoGraduacion
                };
                cargarTxtFrmAbm(nuevoProfesional);
            }

            mostrarBtnModificar();
            ocultarBtnEliminar();
            ocultarBtnAceptar();
            tituloAccion.innerText = "Modificar Usuario";
            switchForms();
        }

        if (event.target.classList.contains('btn-eliminar')) {
            const clickedRow = event.target.closest('tr');

            let id = clickedRow.querySelector('td:nth-child(1)').innerText;
            let nombre = clickedRow.querySelector('td:nth-child(2)').innerText;
            let apellido = clickedRow.querySelector('td:nth-child(3)').innerText;
            let edad = clickedRow.querySelector('td:nth-child(4)').innerText;
            let equipo = clickedRow.querySelector('td:nth-child(5)').innerText;
            let posicion = clickedRow.querySelector('td:nth-child(6)').innerText;
            let cantidadGoles  = clickedRow.querySelector('td:nth-child(7)').innerText;
            let titulo = clickedRow.querySelector('td:nth-child(8)').innerText;
            let facultad = clickedRow.querySelector('td:nth-child(9)').innerText;
            let añoGraduacion = clickedRow.querySelector('td:nth-child(10)').innerText;

            if (equipo != "N/A" && posicion != "N/A") {
                const nuevoFutbolista = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    equipo: equipo,
                    posicion: posicion,
                    cantidadGoles: cantidadGoles
                };
                cargarTxtFrmAbm(nuevoFutbolista);
            }

            

            if (titulo != "N/A" && facultad != "N/A" && titulo != "N/A") {
                const nuevoProfesional = {
                    id: id,
                    nombre: nombre,
                    apellido: apellido,
                    edad: edad,
                    titulo: titulo,
                    facultad: facultad,
                    añoGraduacion: añoGraduacion
                };
                cargarTxtFrmAbm(nuevoProfesional);
            }
            


            mostrarBtnEliminar();
            ocultarBtnModificar();
            ocultarBtnAceptar();
            tituloAccion.innerText = "Eliminar Usuario";
            switchForms();
        }
    });
});

function cargarTxtFrmAbm(usuario) {
    if (tieneposicinOrequipo(usuario) === true) {
        limpiarFormAbm();
        dropDownTipo.value = "Futbolista";
        dropDownTipo.disabled = true;
        txtId.value = usuario.id;
        txtNombre.value = usuario.nombre;
        txtApellido.value = usuario.apellido;
        txtEdad.value = usuario.edad;
        txtEquipo.value = usuario.equipo;
        txtPosicion.value = usuario.posicion;
        txtCantidadGoles.value = usuario.cantidadGoles;
        desabilitarCamposNoFutbolista();
        habilitarCamposFutbolista();
    }

    if(tieneTituloOrFacultad(usuario) === true){
        limpiarFormAbm();
        dropDownTipo.value = "Profesional";
        dropDownTipo.disabled = true;
        txtId.value = usuario.id;
        txtNombre.value = usuario.nombre;
        txtApellido.value = usuario.apellido;
        txtEdad.value = usuario.edad;
        txtTitulo.value = usuario.titulo;
        txtFacultad.value = usuario.facultad;
        txtañoGraduacion.value = usuario.añoGraduacion;
        desabilitarCamposNoProfesional();
        habilitarCamposProfesional();
    }
}
function modificarUsuarioPorId(id, nuevoUsuario) {
    const index = listaUsuarios.findIndex(usuario => usuario.id == id);
    if (index !== -1) {
        listaUsuarios[index] = nuevoUsuario;
    }
}


async function modificarUsuario(id,usuario) {
    showSpinner();
    try {
        await modificarUsuarioApi(id, usuario);
//listaUsuarios.splice(id,1,usuario);
         modificarUsuarioPorId(id, usuario);
        llenarTabla(listaUsuarios);
        alert("El Usuario fue Modificado Correctamente");
        hideSpinner();
    } catch (error) {
        alert('Error Modificando el Usuario:', error.message);
        hideSpinner();
    }
}





btnModificar.addEventListener("click", () => {

    let usuarioModificado = {
        id: txtId.value,
        nombre: txtNombre.value,
        apellido: txtApellido.value,
        edad: txtEdad.value,
        equipo: txtEquipo.value,
        posicion: txtPosicion.value,
        cantidadGoles: txtCantidadGoles.value,
        titulo: txtTitulo.value,
        facultad: txtFacultad.value,
        añoGraduacion: txtañoGraduacion.value, 
    }

    modificarUsuario(txtId.value, usuarioModificado);
});

function eliminarUsuario(id){
    showSpinner();
    eliminarUsuarioApi(id)
    .then(() => {
        eliminarUsuarioPorId(id);
        alert("El Usuario ha sido Eliminado");
        llenarTabla(listaUsuarios);
        hideSpinner();
    })
    .catch(error => {
        alert("Error Eliminando el Usuario", error.message);
        hideSpinner();
    })
}


btnEliminar.addEventListener("click", () => {
    eliminarUsuario(txtId.value);
});


function showSpinner() {
    document.getElementById('overlay').style.display = 'flex';
}


function hideSpinner() {
    document.getElementById('overlay').style.display = 'none';
}


export {showSpinner, hideSpinner};
