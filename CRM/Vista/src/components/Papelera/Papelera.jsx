import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import '../Clientes/CSSClientes/Clientes.css'
import { Table, columns, Styles } from './TablaPapelera'; 
const API = "http://127.0.0.1:5000";
export const Papelera = () => {
    const [idProyecto, setIdProyecto] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    //Esto es para enviarlo a detalles
    const handleIdProyectoChange = (event) => {
        setProyectos(event.target.value);
    };
    const [proyectos, setProyectos] = useState([]);//Meter los datos de los clientes ahi
    const [clientes, setClientes] = useState([]);
    let navigate = useNavigate();
    const gotoCrearProyecto = () => { navigate('/crearProyectos'); }
    
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        // console.log(1)
        const res = await fetch(`${API}/getProyectos`);
        const data = await res.json();//resultado de la consulta
        console.log(data)
         // Realiza la conversión de datos aquí
    //     var est = ''
    //     if (data[9] === 1) { est = 'Eliminado' }
    //     if (data[9] === 2) { est = 'En progreso' }
    //     if (data[9] === 3) { est = 'Solicitado' }
    //     if (data[9] === 4) { est = 'En planeacion' }
    //     if (data[9] === 5) { est = 'Activo' }
    //     if (data[9] === 6) { est = 'Inactivo' }
    //     console.log('est: ', est)
    //   const formattedData = data.map((item) => ({
    //     idProyecto: item[1],
    //     nombre: item[2],
    //     idCliente: item[4],
    //     nombreCliente: item[11],
    //     // fecha: 'del proyecto?', //Poner la fecha de inicio
        
    //     estado: est,
    //     fecha: item[6],
    //     detalle: 'Ver más',
    //   }));
      

    const formattedData = data.map((item) => {
        var estado = '';
        switch (item[9]) {
        case 1:
            estado = 'Eliminado';
            break;
        case 2:
            estado = 'En progreso';
            break;
        case 3:
            estado = 'Solicitado';
            break;
        case 4:
            estado = 'En planeacion';
            break;
        case 5:
            estado = 'Activo';
            break;
        case 6:
            estado = 'Inactivo';
            break;
        default:
            estado = 'Estado no reconocido';
        }
        
        return {
          idProyecto: item[1],
          nombre: item[2],
          idCliente: item[4],
          nombreCliente: item[11],
          estado: estado, // Utiliza el valor de 'estado' calculado anteriormente
          fecha: item[6],
          detalle: 'Ver más',
        };
      });
      
      setProyectos(formattedData);
    }; 
    
    React.useEffect(() => {
        handleSearch()
      }, []);
     
    return (
       <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row" style={{marginTop: '30px'  }}>
                    <div class="col-sm-3">
                        <h1 className='titulo-h1'>Proyectos</h1>
                    </div>
                     <div className="mb-3" style={{ marginTop: '0px'}}>
                        <button  className="button3" style={{marginLeft: '20px', marginTop: '-20px'  }} onClick={gotoCrearProyecto}>
                            <AiOutlinePlusCircle style={{
                            fontSize: '25px',
                            color: '#12959E', // Tamaño del icono
                            marginRight: '20px',
                            marginLeft: '20px',
                            }} />Crear Proyecto
                        </button>
                    </div>
            <div className="mb-3" style={{ marginTop: '70px', marginLeft: '20px'}}>
                <div style={{ display: 'flex' }}>
                    <Styles> 
                        <Table columns={columns} data={proyectos} />
                    </Styles>
                </div>
            </div>
        </div>
            
        </div>


       </Fragment>
    );
};