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


export const ModficarTipoEvaluacion = () => {
    let navigate = useNavigate();
    const gotoTipoEvaluacion = () => { navigate('/tiposEvaluaciones'); }

    const [nombre, setNombre] = useState('');
    const [costo, setCosto] = useState('');
    const { idTipoEvaluacion } = useParams(); //Para buscar
    const handleSubmit = async (event) => {
        event.preventDefault();  
        if (nombre.length < 2) {
            toast.error('El nombre debe ser mayor a un caracter.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (costo === '') {
            toast.error('Debe ingresar un número.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        Swal.fire({
            title: '¿Está seguro que desea modificar el tipo de evaluación?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            confirmButtonColor: "#4CAF50",
            denyButtonColor: "#d33",
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
      const handleCostoChange = (event) => {
        const inputValue = event.target.value;
        // Expresión regular que valida un número decimal positivo
        const validPattern = /^\d*\.?\d*$/;
    
        if (validPattern.test(inputValue)) {
            // La entrada es válida, puedes actualizar el estado
            setCosto(inputValue);
        } else {
            // La entrada no es válida, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
            // Por ejemplo, mostrar un mensaje de error en la interfaz de usuario
            toast.error('Por favor, ingrese un número decimal positivo válido sin "e", comas, guiones ni otros caracteres no deseados.', {
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
