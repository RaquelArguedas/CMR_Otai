import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiClipboard } from 'react-icons/fi';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../../Clientes/CSSClientes/Clientes.css';
import { Table, columns, data, Styles } from './TablaPerfiles';  // Importa Table, columns y data desde Tabla.jsxy


const API = "http://127.0.0.1:5000";

export const Perfiles = () => {
    let navigate = useNavigate();
    const gotoPerfiles = () => { navigate('/perfiles'); }
    const [id, setIdPerfil] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    const [perfiles, setPerfiles] =  useState([]);;//Meter los datos de los clientes ahi
    const [deletedPerfiles, setDeletedPerfiles] = useState([]); // Almacena perfiles eliminados
    
    const showNotification = async (event, idPerfil) => {
      const res = await fetch(`${API}/isPerfilFK/${idPerfil}`);
      const showError = await res.json();
      if (showError){
        Swal.fire('No se pueden eliminar porque ya ha sido utilizado en funcionarios.');
        return;
      }

      event.preventDefault();
      Swal.fire({
        title: '¿Está seguro que desea eliminar el perfil seleccionado?',
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Cancelar`,
        allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
        allowEscapeKey: false, 
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        
        if (result.isConfirmed) {
          Swal.fire('El perfil se ha eliminado satisfactoriamente')
          const updatedPerfiles = perfiles.filter((perfil) => perfil.idPerfil !== idPerfil);
          console.log(idPerfil)
          setPerfiles(updatedPerfiles);
          const res = fetch(`${API}/deletePerfil/${idPerfil}`); // cambiar por el id
          
        } else if (result.isDenied) {
          Swal.fire('No se guaron los cambios')
        }
      })
      // Elimina el perfil del estado de perfiles
      
    };
    const handleEliminarPerfil= async (event, idPerfil) => {
      event.preventDefault();  
      const res = fetch(`${API}/deletePerfil/${idPerfil}`, {
          method: 'POST'
      });
    };
    const handleModificarPerfil= async (event, idPerfil, nombre) => {
      event.preventDefault();  
      //Es para enviar informacion al backend
      //Lo de abajo es la notificacion de que ya se creo la evalaucion
      //Recordar en el backend poner lo de fecha de ingreso que se hace alla
      Swal.fire({
        title: 'Modificar perfil',
        input: 'text',
        inputLabel: 'Nombre del perfil',
        inputPlaceholder: 'Ingrese el nombre del perfil',
        inputValue: nombre, // Establece el valor inicial del input
        showDenyButton: true,
        confirmButtonText: 'Aceptar',
        denyButtonText: 'Cancelar',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          const nombreNuevo = result.value; // Obtén el valor del input
          
          if (nombreNuevo !== '') {
            if (nombreNuevo !== nombre) {
              const res = fetch(`${API}/updatePerfil/${idPerfil}/${nombreNuevo}`, {
                method: 'POST'
            });
              // Actualiza el nombre en la lista de perfiles en el estado
              // se debe mandar ha actualizar aqui
              const updatedPerfiles = perfiles.map((perfil) =>
                perfil.idPerfil === idPerfil ? { ...perfil, nombre: nombreNuevo } : perfil
              );
              setPerfiles(updatedPerfiles);
              
            }
            Swal.fire('Se actualizó correctamente: ');
          } else {
            Swal.fire('Incorrecto', 'Debe ingresar un nombre válido', 'error');
          }
        } else if (result.isDenied) {
          Swal.fire('No se guardo ningún cambio');
        }
      });
  };
    //Esto es para enviarlo a detalles
    const handleIdPerfilChange = (event) => {
        setIdPerfil(event.target.value);
    };
    const getPerfiles = async () => { 
      const response = await fetch(`${API}/getPerfiles`); // cambiar por el id
      const perfiles = await response.json();//en perfiles se guardan los perfiles que hay hasta el momento
      //console.log('perfiles: ', perfiles)
      return perfiles
    };
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleSearch = async () => { 
      //Obtener infromacion existente en la base de datos
      const res = await  fetch(`${API}/getPerfiles`);
      const data = await res.json();//resultado de la consulta
      console.log(data)
      const formattedData = data.map((item) => ({
        idPerfil: item[0],
        nombre: item[1],
      }));


      setPerfiles(formattedData);
  }; 
  React.useEffect(() => {
      handleSearch()
  }, []);
  const handleCrearPerfil= async (event) => {
      event.preventDefault();  
      //Es para enviar informacion al backend
      //Lo de abajo es la notificacion de que ya se creo la evalaucion
      //Recordar en el backend poner lo de fecha de ingreso que se hace alla
      
      Swal.fire({
          title: 'Crear perfil',
          input: 'text',
          inputLabel: 'Nombre del perfil',
          inputPlaceholder: 'Ingrese el nombre del perfil',
          showDenyButton: true, // Agregar botones de confirmación y cancelación
          confirmButtonText: 'Aceptar', // Cambiar texto del botón de confirmación
          denyButtonText: 'Cancelar', // Cambiar texto del botón de cancelación
          allowOutsideClick: false, // Evitar cierre haciendo clic fuera de la notificación
          allowEscapeKey: false,
        }).then((result) => {
          
          if (result.isConfirmed) {
            const nombre = result.value; // Obtener el valor del input
            if (nombre !== '') {
              //Enviar al backend el nombre del perfil creado
              const res = fetch(`${API}/createPerfil/${nombre}`, {
                  method: 'POST'
              });
              Swal.fire('Se ingresó correctamente: ' + nombre);
              window.location.reload();
            } else {
              Swal.fire('Incorrecto', 'Debe ingresar el nombre', 'error');
            }
          } else if (result.isDenied) {
            Swal.fire('Operación cancelada');
          }
        })
  };

    return (
        <Fragment>
         <div className="container"> 
         <Navbar />
             <div class="row">
                     <div class="col-sm-3">
                     <h1 className='titulo-h1'>Tipos de Perfiles</h1>
                     </div>
             </div>
             
             <div className="mb-3" style={{ marginTop: '100px', display: 'flex'}}>
                 <button  className="button3" style={{marginLeft: '-140px', height: '50px', width: '180px'}} onClick={handleCrearPerfil}>
                     <AiOutlinePlusCircle style={{
                     fontSize: '25px',
                     color: '#12959E', // Tamaño del icono
                     marginRight: '20px',
                     marginLeft: '20px',
                     }} /> 
                     <div style={{ textAlign: 'left' }}>
                        Crear<br />perfil
                    </div>
                 </button>
                 <div className="mb-3" style={{ marginTop: '70px', marginLeft: '-170px'}}>
                <div style={{ display: 'flex' }}>
                <Styles> 
                  <Table columns={columns} data={perfiles} showNotification={showNotification} handleModificarPerfil={handleModificarPerfil}/>
                </Styles>
                </div>
            </div>
             </div>
             {/* Aqui ponemos la tabla de los funcionarios, falta por hacer */}
             
         </div>
 
 
        </Fragment>
     );
};