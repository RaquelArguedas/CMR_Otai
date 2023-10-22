import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import  { matchSorter } from 'match-sorter'
import { Table, columns, Styles } from './TablaEvaluacion'

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiClipboard } from 'react-icons/fi';
import '../Clientes/CSSClientes/Clientes.css'

const Title = styled.h1`
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;
`;

const API = "http://127.0.0.1:5000";
export const Evaluacion = () => {
  const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    const [evaluaciones, setEvaluaciones] = useState([[]]);//Meter los datos de los clientes ahi
    //Esto es para enviarlo a detalles
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    let navigate = useNavigate();
    const gotoCrearFuncionario = () => { navigate('/crearEvaluacion'); }
    const gotoTiposEvaluaciones = () => { navigate('/tiposEvaluaciones')}
   
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = async () => { 
    //Obtener infromacion existente en la base de datos
    const res = await fetch(`${API}/getEvaluaciones`);
    const data = await res.json();//resultado de la consulta
    console.log(data)
    const rest = await fetch(`${API}/readCliente/${data[0][5]}`);
    const dato = await rest.json();
    console.log(data[0][5])
    const formattedData = data.map((item) => {
      console.log(item)
      var estado = '';
      switch (item[8]) {
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
        idEvaluacion: item[1],
        nombre: item[2],
        idcliente: item[5],
        nombreCliente: item[12],
        estado: estado, // Utiliza el valor de 'estado' calculado anteriormente
        fecha: item[4],
        tipoE:item[13],
        detalle: 'Ver más',
      };
    });
    setEvaluaciones(formattedData);
  }; 
  React.useEffect(() => {
    handleSearch()
  }, []);
  return (
    <Fragment>
         <div className="container"> 
         <Navbar />
             <div class="row">
                     <div class="col-sm-3" style={{marginTop: '50px'  }}>
                         <h1 className='titulo-h1'>Evaluaciones</h1>
                     </div>
                     <div className="mb-3" style={{ marginTop: '100px', display: 'flex'}}>
                 <button  className="button3" style={{marginLeft: '25px', height: '50px', width: '180px'}} onClick={gotoCrearFuncionario}>
                     <AiOutlinePlusCircle style={{
                     fontSize: '25px',
                     color: '#12959E', // Tamaño del icono
                     marginRight: '20px',
                     marginLeft: '20px',
                     }} /> 
                     <div style={{ textAlign: 'left' }}>
                        Crear<br />Evaluación
                    </div>
                 </button>
                 <button  className="button3" style={{marginLeft: '140px', height: '50px', width: '180px'}} onClick={gotoTiposEvaluaciones}>
                     <FiClipboard style={{
                     fontSize: '25px',
                     color: '#12959E', // Tamaño del icono
                     marginRight: '20px',
                     marginLeft: '20px',
                     }} /> 
                     <div style={{ textAlign: 'left' }}>
                        Tipos de<br />Evaluaciones
                    </div>
                 </button>
             </div>
             <div className="mb-3" style={{ marginTop: '70px', marginLeft: '20px'}}>
                <div style={{ display: 'flex' }}>
                <Styles> 
                    <Table columns={columns} data={evaluaciones} />
                </Styles>
                </div>
            </div>
             </div>
             
            
             {/* Aqui ponemos la tabla de los funcionarios, falta por hacer */}
             
         </div>
 
 
        </Fragment>
     );
};  