import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import './CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
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
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        Swal.fire({
            title: 'Confirmación',
            text: 'El cliente se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              // El usuario hizo clic en "OK", entonces llama a la función gotoMenu

                const formData = new FormData();
                formData.append('correo', correo);
                formData.append('telefono', telefono);
                formData.append('cedula', cedula);
                formData.append('nombre', nombre);
                const res = fetch(`${API}/createCliente`, {
                    method: 'POST',
                    body: formData
                });
              gotoCliente();
            }
          });
        
    }
  

    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleNameChange = (event) => {
        setNombreCliente(event.target.value);
    };
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    };
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
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
                            <label  style={{ marginRight: '85px' }}for="nameInput" class="form-label">Cédula Jurídica:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese la Cédula Juridica" value={cedula} onChange={handleCedulaChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '44px' }} for="nameInput" class="form-label">Número de teléfono:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el número de teléfono " value={telefono} onChange={handleTelefonoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '160px' }} for="nameInput" class="form-label">Correo:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el correo electronico" value={correo} onChange={handleCorreoChange}/>
                            
                        </div>
                    
                            
                        <div className="mb-3" style={{ marginRight: '140px' }}>
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear cliente
                            </button>
                        
                        </div>
        

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
