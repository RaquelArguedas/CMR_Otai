import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../../Clientes/CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";

export const CrearTipoCapacitacion = () => {
    let navigate = useNavigate();
    const gotoTipoCapacitacion = () => { navigate('/tiposCapacitaciones'); }

    const [nombre, setNombre] = useState('');
   
    const handleSubmit = async (event) => {
        event.preventDefault();  
        if (nombre.length < 2) {
            toast.error('El nombre debe ser mayor a un caracter.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
        const data = {
            nombre: nombre,  
          };
        console.log(nombre)  
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        };
        const res = await fetch(`${API}/createTipoCapacitacion`, requestOptions); 
        if (res.ok) {
        Swal.fire({
            title: 'Confirmación',
            text: 'El tipo de capacitación se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              // El usuario hizo clic en "OK", entonces llama a la función gotoMenu
              gotoTipoCapacitacion();
            }
          }); } else {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al crear el tipo de capacitación.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        
    };
    

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
                setNombre(inputValue);
            } else {
                // La entrada supera el límite, muestra un alert
                toast.error('El nombre no debe superar los 50 caracteres.', {
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
                        <h1 className='titulo-h1'>Crear tipo de capacitación</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label style={{ marginRight: '150px' }} for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                            
                        </div>                                      
                        <div className="mb-3" style={{ marginRight: '140px', marginTop:  '100px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear tipo de capacitación
                            </button>
                        
                        </div>
        
                        <ToastContainer />
                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
