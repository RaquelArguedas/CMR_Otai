import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../../Clientes/CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';


const API = "http://127.0.0.1:5000";


export const ModficarTipoEvaluacion = () => {
    let navigate = useNavigate();
    const gotoTipoEvaluacion = () => { navigate('/tiposEvaluaciones'); }

    const [nombre, setNombre] = useState('');
    const [costo, setCosto] = useState('');
    const { idTipoEvaluacion } = useParams(); //Para buscar
    const handleSubmit = async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        Swal.fire({
            title: '¿Está seguro que desea modificar el tipo de evaluación?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {  
              Swal.fire('El tipo de evaluación se ha modificado satisfactoriamente')
              const formData = new FormData();
              formData.append('idTipoEvaluacion', idTipoEvaluacion);
              formData.append('nombre', nombre);
              formData.append('precio', costo);
              console.log(nombre, costo, idTipoEvaluacion);
              const res = fetch(`${API}/updateTipoEvaluacion`, {
                  method: 'POST',
                  body: formData
              });
              gotoTipoEvaluacion();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })
        
    };
    const handleSearch = async () => { 
        const res = await fetch(`${API}/readTipoEvaluacion/${idTipoEvaluacion}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)

        setNombre(data[1])
        setCosto(data[2])
    }
    React.useEffect(() => {
        handleSearch()
    }, []);
   

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
                    <h1 className='titulo-h1'>Modificar tipo de evaluación</h1>
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
                                        }} /> Modificar tipo de evaluación
                            </button>
                        
                        </div>
        

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
