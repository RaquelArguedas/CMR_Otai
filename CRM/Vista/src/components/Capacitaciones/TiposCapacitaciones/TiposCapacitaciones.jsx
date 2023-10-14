import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import '../../Clientes/CSSClientes/Clientes.css'
export const TiposCapacitaciones = () => {
    const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    //Esto es para enviarlo a detalles
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const [clientes, setClientes] = useState([[]]);//Meter los datos de los clientes ahi
    let navigate = useNavigate();
    const gotoCrearTipo = () => { navigate('/crearTiposCapacitaciones'); }
    const gotoTipoEvaluacion = () => { navigate('/tiposCapacitaciones'); }
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        //A esto me refiero recuperar los datos del cliente
        setClientes([[]]);
    };
    const handleDelete = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar el tipo capacitación seleccionado?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              Swal.fire('El tipo de capacitación se ha eliminado satisfactoriamente')
              gotoTipoEvaluacion();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })


    } 
    return (
       <Fragment>
        <div className="container"> 
        <Navbar />
            <div class="row">
                    <div class="col-sm-3">
                        <Title>Tipos de Capacitaciones</Title>
                    </div>
            </div>
            <div className="mb-3" style={{ marginTop: '100px'}}>
                <button  className="button3" style={{marginLeft: '-220px'  }} onClick={gotoCrearTipo}>
                    <AiOutlinePlusCircle style={{
                    fontSize: '25px',
                    color: '#12959E', // Tamaño del icono
                    marginRight: '20px',
                    marginLeft: '20px',
                    }} />Crear Tipo Capacitación
                </button>
            </div>
            {/* Aqui ponemos la tabla de los clientes, falta por hacer */}
            
        </div>


       </Fragment>
    );
};