import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../../Clientes/CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
export const CrearTipoCapacitacion = () => {
    let navigate = useNavigate();
    const gotoTipoCapacitacion = () => { navigate('/tiposCapacitaciones'); }

    const [nombre, setNombre] = useState('');
    const [costo, setCosto] = useState('');
   
    const handleSubmit = async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
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
          });
        
    };
    

    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleNameChange = (event) => {
        setNombre(event.target.value);
    };
    const handleCostoChange = (event) => {
        setCosto(event.target.value);
    };
  
    return (
        
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                        <Title>Crear tipo de capacitación</Title>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label style={{ marginRight: '150px' }} for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '170px'  }}for="apellidoInput" class="form-label">Costo:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el costo del tipo" value={costo} onChange={handleCostoChange}/>
                            
                        </div>
                    
                                                                    
                        <div className="mb-3" style={{ marginRight: '140px', marginTop:  '100px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear tipo de capacitación
                            </button>
                        
                        </div>
        

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
