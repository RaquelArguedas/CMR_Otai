import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import '../../Clientes/CSSClientes/Clientes.css'
import { Table, columns, data, Styles } from './TablaTiposEvaluaciones'; 

const API = "http://127.0.0.1:5000";
export const TiposEvaluaciones = () => {
    const [idTiposEvaluaciones, setidTiposEvaluaciones] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    //Esto es para enviarlo a detalles
    const handleidTiposEvaluacionesChange = (event) => {
        setidTiposEvaluaciones(event.target.value);
    };
    const [tiposEvaluaciones, setTiposEvaluaciones] = useState([[]]);//Meter los datos de los TiposEvaluaciones ahi
    let navigate = useNavigate();
    const gotoCrearTipo = () => { navigate('/crearTiposEvaluaciones'); }
    const gotoTipoEvaluacion = () => { navigate('/tiposEvaluaciones'); }
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        //A esto me refiero recuperar los datos del cliente
        const resultado = await fetch(`${API}/getTipoEvaluaciones`);
        const datos = await resultado.json();
        const formatted = datos.map((item) => ({
            idTipoEvaluacion: item[0],
            nombre: item[1],
            costo:item[2],
          }))
        setTiposEvaluaciones(formatted);
    };
    React.useEffect(() => {
        handleSearch()
    }, []);
    const handleDelete =async (event, idTipoEvaluacion) =>{
        event.preventDefault();
        Swal.fire({
            title: '¿Está seguro que desea eliminar el tipo evaluación seleccionado?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
                const updatedTipos = tiposEvaluaciones.filter((tiposEvaluaciones) => tiposEvaluaciones.idTipoEvaluacion !== idTipoEvaluacion);
                setTiposEvaluaciones(updatedTipos);
              Swal.fire('El tipo de evaluación se ha eliminado satisfactoriamente')
              //Aqui se debe enviar a eliminar
            //   gotoTipoEvaluacion();
            } else if (result.isDenied) {
              Swal.fire('No se guardaron los cambios')
            }
          })


    } 
    return (
       <Fragment>
        <div className="container"> 
        <Navbar />
            <div class="row">
                    <div class="col-sm-3">
                        <Title>Tipos de Evaluaciones</Title>
                    </div>
            </div>
            <div className="mb-3" style={{ marginTop: '100px'}}>
                <button  className="button3" style={{marginLeft: '-220px'  }} onClick={gotoCrearTipo}>
                    <AiOutlinePlusCircle style={{
                    fontSize: '25px',
                    color: '#12959E', // Tamaño del icono
                    marginRight: '20px',
                    marginLeft: '20px',
                    }} />Crear Tipo Evaluación
                </button>
                <div style={{ display: 'flex' , marginLeft: '-220px' }}>
                <Styles> 
                  <Table columns={columns} data={tiposEvaluaciones} handleDelete={handleDelete}/>
                </Styles>
                </div>
            </div>
        </div>


       </Fragment>
    );
};