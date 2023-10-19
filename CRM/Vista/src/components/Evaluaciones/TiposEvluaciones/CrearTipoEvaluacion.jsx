import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../../Clientes/CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';

const API = "http://127.0.0.1:5000";
export const CrearTipoEvaluacion = () => {
    let navigate = useNavigate();
    const gotoTipoEvaluacion = () => { navigate('/tiposEvaluaciones'); }

    const [nombre, setNombre] = useState('');
    const [costo, setCosto] = useState('');
    
    const data = {
        nombre: nombre,  
        precio: costo,
      };
    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    };
    const res = fetch(`${API}/createTipoEvaluacion`,requestOptions);
   
    const handleSubmit = async (event) => {
        event.preventDefault();  
        Swal.fire({
            title: 'Confirmación',
            text: 'El tipo de evaluación se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, 
            allowEscapeKey: false,    
          }).then((result) => {
            if (result.isConfirmed) {
                
              // El usuario hizo clic en "OK", entonces llama a la función gotoMenu
              gotoTipoEvaluacion();
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
                        <Title>Crear tipo de evaluación</Title>
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
                                        }} /> Crear tipo de evaluación
                            </button>
                        
                        </div>
        

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
