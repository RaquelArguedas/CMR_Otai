
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';

import './CSSClientes/Clientes.css'
import { Table, columns, data, Styles } from './TablaClientes';  // Importa Table, columns y data desde Tabla.jsxy
const API = "http://127.0.0.1:5000";
export const Clientes = () => {
    const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    //Esto es para enviarlo a detalles
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const [clientes, setClientes] = useState([]);//Meter los datos de los clientes ahi
    let navigate = useNavigate();
    const gotoCrearCliente = () => { navigate('/crearClientes'); }
    
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        //A esto me refiero recuperar los datos del cliente
        console.log(1)
        const res = await fetch(`${API}/getClientes`);
        const data = await res.json();//resultado de la consulta
        console.log(data)
         // Realiza la conversión de datos aquí
      const formattedData = data.map((item) => ({
        cedula: item[1],
        idCliente: item[0],
        nombre: item[2],
        telefono: item[3],
        correo: item[4],
        detalle: 'Ver más',
      }));

      setClientes(formattedData);
    
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
                        <h1 className='titulo-h1'>Clientes</h1>
                    </div>
                     <div className="mb-3" style={{ marginTop: '0px'}}>
                        <button  className="button3" style={{marginLeft: '20px', marginTop: '-20px'  }} onClick={gotoCrearCliente}>
                            <AiOutlinePlusCircle style={{
                            fontSize: '25px',
                            color: '#12959E', // Tamaño del icono
                            marginRight: '20px',
                            marginLeft: '20px',
                            }} />Crear cliente
                        </button>
                    </div>
            <div className="mb-3" style={{ marginTop: '70px', marginLeft: '20px'}}>
                <div style={{ display: 'flex' }}>
                <Styles> 
                    <Table columns={columns} data={clientes} />
                </Styles>
                </div>
            </div>
            </div>
           
            {/* Aqui ponemos la tabla de los clientes, falta por hacer */}
            
        </div>


       </Fragment>
    );
};