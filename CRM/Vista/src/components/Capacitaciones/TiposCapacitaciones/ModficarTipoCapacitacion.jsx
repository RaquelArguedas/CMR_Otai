import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../../Clientes/CSSClientes/Clientes.css'
import { AiOutlinePlusCircle } from 'react-icons/ai';
const API = "http://127.0.0.1:5000";

export const ModficarTipoCapacitacion = () => {
    let navigate = useNavigate();
    const gotoTipoCapacitacion = () => { navigate('/tiposCapacitaciones'); }

    const [nombre, setNombre] = useState('');

    const { idTipoCapacitacion } = useParams();
   
    const handleSubmit = async (event) => {
        event.preventDefault();   
       
        Swal.fire({
            title: '¿Está seguro que desea modificar el tipo de capacitación?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              const data = {
                id: idTipoCapacitacion,
                nombre: nombre,  
              };
              
                const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                };
                const res = await fetch(`${API}/updateTipoCapacitacion`, requestOptions);
                Swal.fire('El tipo de capacitación se ha modificado satisfactoriamente')
                gotoTipoCapacitacion();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })
        
    };
    
    const handleSearch = async () => { 
        const res = await fetch(`${API}/readTipoCapacitacion/${idTipoCapacitacion}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)

        setNombre(data[1])
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
  
    return (
        
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                    <h1 className='titulo-h1'>Modificar tipo de capacitación</h1>
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
                                        }} /> Modificar tipo de capacitación
                            </button>
                        
                        </div>
        

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
