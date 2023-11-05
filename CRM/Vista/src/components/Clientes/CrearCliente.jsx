import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import './CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";
export const CrearCliente = () => {
    let navigate = useNavigate();
    const gotoCliente = () => { navigate('/clientes'); }
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombreCliente] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();  
        // Restablecer errores si la validación pasa
        
        // Validación del campo "nombre"
        if (nombre.length < 2) {
            toast.error('El nombre debe ser mayor a un caracter.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
    
        // Validación del campo "cedula"
        if (cedula.length < 5) {
            toast.error('La cédula debe ser mayor 5 caracteres.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

    
        // Validación del campo "telefono"
        if (telefono.length < 5) {
            toast.error('El número de teléfono debe ser mayor 4 caracteres.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

    
        // Validación del campo "correo"
        if (correo.length < 5) {
            toast.error('El correo electrónico debe tener al menos 5 caracteres.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
    
        // Validación del formato de correo electrónico
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    
        if (!emailPattern.test(correo)) {
            toast.error('Por favor, ingrese un correo electrónico válido.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        console.log(correo,telefono,cedula,nombre);
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        
        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('telefono', telefono);
        formData.append('cedula', cedula);
        formData.append('nombre', nombre);
        const res = await fetch(`${API}/createCliente`, {
            method: 'POST',
            body: formData
        });
        console.log(res.ok)
        if (res.ok) {
        Swal.fire({
            title: 'Confirmación',
            text: 'El cliente se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              gotoCliente();
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear la capacitación.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
           
              
            }
        
    
  

    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleNameChange = (event) => {
        const inputValue = event.target.value;
    
        if (inputValue.length <= 50) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setNombreCliente(inputValue);
        } else {
            // La entrada supera el límite, muestra un alert
            toast.error('El nombre no debe superar los 50 caracteres.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const handleCedulaChange = (event) => {
        const inputValue = event.target.value;
        // Expresión regular que valida un número entero sin 'e', comas, puntos, guiones y otros caracteres no deseados
        const validPattern = /^[0-9]*$/;
    
        if (validPattern.test(inputValue)) {
            // La entrada es válida, puedes actualizar el estado
            setCedula(inputValue);
        } else {
            // La entrada no es válida, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
            // Por ejemplo, mostrar un mensaje de error en la interfaz de usuario
            toast.error('Por favor, ingrese un número entero válido sin "e", comas, puntos, guiones ni otros caracteres no deseados.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const handleTelefonoChange = (event) => {
        const inputValue = event.target.value;
        // Expresión regular que valida un número entero sin 'e', comas, puntos, guiones y otros caracteres no deseados
        const validPattern = /^[0-9]*$/;
    
        if (validPattern.test(inputValue)) {
            // La entrada es válida, puedes actualizar el estado
            setTelefono(inputValue);
        } else {
            // La entrada no es válida, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
            // Por ejemplo, mostrar un mensaje de error en la interfaz de usuario
            toast.error('Por favor, ingrese un número entero válido sin "e", comas, puntos, guiones ni otros caracteres no deseados.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            // alert('Por favor, ingrese un número entero válido sin "e", comas, puntos, guiones ni otros caracteres no deseados.');
        }
    };
    const handleCorreoChange = (event) => {
        const inputValue = event.target.value;
    
        if (inputValue.length <= 100) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setCorreo(inputValue);
        } else {
            // La entrada supera el límite, muestra un alert
            toast.error('El correo no debe superar los 100 caracteres.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                        <h1 class="titulo-h1">
                        Crear Cliente
                        </h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label style={{ marginRight: '150px' }} for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '85px' }}for="cedulaInput" class="form-label">Cédula Jurídica:</label>
                            <input type="text" class="form-control custom-margin-right" id="cedulaInput"
                            placeholder="Ingrese la Cédula Juridica" value={cedula} onChange={handleCedulaChange}
                            aria-describedby="cedulaError"/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '44px' }} for="telefonoInput" class="form-label">Número de teléfono:</label>
                            <input type="text" class="form-control custom-margin-right" id="telefonoInput"
                            placeholder="Ingrese el número de teléfono " value={telefono} onChange={handleTelefonoChange}
                            aria-describedby="telefonoError"/>
                            
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '160px' }} for="correoInput" class="form-label">Correo:</label>
                            <input type="text" class="form-control custom-margin-right" id="correoInput"
                            placeholder="Ingrese el correo electronico" value={correo} onChange={handleCorreoChange}/>
                            
                        </div>
                    
                            
                        <div className="mb-3" style={{ marginRight: '140px' }}>
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear cliente
                            </button>
                        
                        </div>
        
                        <ToastContainer />
                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
