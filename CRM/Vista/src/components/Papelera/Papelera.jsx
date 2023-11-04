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
        console.log(1)
        const res = await fetch(`${API}/consultarPapelera`);
        const data = await res.json();//resultado de la consulta
        console.log(data)
      

    const formattedData = data.map((item) => {
        return {
          item: item
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
        <div class="row" style={{marginTop: '10px'  }}>
            <div >
                <h1 className='titulo-h1'>Papelera</h1>
            </div>
            <div>
                <Styles> 
                    <Table columns={columns} data={proyectos} />
                </Styles>
            </div>
        </div>
            
        </div>


       </Fragment>
    );
};