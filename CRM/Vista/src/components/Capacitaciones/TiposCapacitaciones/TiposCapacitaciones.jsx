import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import '../../Clientes/CSSClientes/Clientes.css'
import { Table, columns, Styles } from './TablaTiposCapacitaciones'; 

const API = "http://127.0.0.1:5000";

export const TiposCapacitaciones = () => {
    const [idTiposCapacitaciones, setidTiposCapacitaciones] = useState('');
    const [tiposCapacitaciones, setTiposCapacitaciones] = useState([[]]);
    //Esto es para enviarlo a detalles
    const handleidTiposCapacitacionesChange = (event) => {
        setidTiposCapacitaciones(event.target.value);
    };
    
    let navigate = useNavigate();
    const gotoCrearTipo = () => { navigate('/crearTipoCapacitacion'); }
    const gotoTipoCapacitacion = () => { navigate('/tiposCapacitaciones'); }

    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;

    const handleSearch = async () => {
        const resultado = await fetch(`${API}/getTipoCapacitacion`);
        const datos = await resultado.json();
        console.log(datos);
        const formatted = datos.map((item) => ({
            idTipoCapacitacion: item[0],
            nombre: item[1],
          }))
        setTiposCapacitaciones(formatted);
    };

    React.useEffect(() => {
        handleSearch()
    }, []);
    
    const handleDelete = async (event, idTipoCapacitacion) =>{
      const res = await fetch(`${API}/isTipoCapacitacionFK/${idTipoCapacitacion}`);
        const showError = await res.json();
        if (showError){
          Swal.fire('No se pueden eliminar porque ya ha sido utilizado en evaluaciones.');
          return;
        }
      event.preventDefault();  
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
              const updatedTipos = tiposCapacitaciones.filter((tiposCapacitaciones) => tiposCapacitaciones.idTipoCapacitacion !== idTipoCapacitacion);
              setTiposCapacitaciones(updatedTipos);
              Swal.fire('El tipo de capacitación se ha eliminado satisfactoriamente')
              const res = fetch(`${API}/deleteTipoCapacitacion/${idTipoCapacitacion}`, {
                method: 'POST'
            });
              gotoTipoCapacitacion();
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
                      <h1 className='titulo-h1'>Tipos de Capacitaciones</h1>
                    </div>
            </div>
            <div className="mb-3" style={{ marginTop: '100px'}}>
                <button  className="button3" style={{marginLeft: '-220px'  }} onClick={gotoCrearTipo}>
                    <AiOutlinePlusCircle style={{
                    fontSize: '25px',
                    color: '#12959E', // Tamaño del icono
                    marginRight: '20px',
                    marginLeft: '20px',
                    }} />
                    <div style={{ textAlign: 'left' }}>
                    Crear Tipo Capacitación
                      </div>
                </button>
            <div style={{ display: 'flex' , marginLeft: '-220px' }}>
                <Styles> 
                  <Table columns={columns} data={tiposCapacitaciones} handleDelete={handleDelete}/>
                </Styles>
                </div>
        </div>
        </div>
       </Fragment>
    );
};