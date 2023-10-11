
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import './CSSClientes/Clientes.css'
export const Clientes = () => {
    const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    //Esto es para enviarlo a detalles
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const [clientes, setClientes] = useState([[]]);//Meter los datos de los clientes ahi
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
        setClientes([[]]);
    }; 
    return (
       <Fragment>
        <div className="container"> 
        <Navbar />
            <div class="row">
                    <div class="col-sm-3">
                        <Title>Clientes</Title>
                    </div>
            </div>
            <div className="mb-3" style={{ marginTop: '100px'}}>
                <button  className="button3" style={{marginLeft: '-80px'  }} onClick={gotoCrearCliente}>
                    <AiOutlinePlusCircle style={{
                    fontSize: '25px',
                    color: '#12959E', // Tamaño del icono
                    marginRight: '20px',
                    marginLeft: '20px',
                    }} />Crear cliente
                </button>
            </div>
            {/* Aqui ponemos la tabla de los clientes, falta por hacer */}
            
        </div>


       </Fragment>
    );
};