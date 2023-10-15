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


export function Evaluacion() {
  const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    const [funcionarios, setFuncionarios] = useState([[]]);//Meter los datos de los clientes ahi
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
    //A esto me refiero recuperar los datos de los funcionarios
    setFuncionarios( [
        {
          cedula: 12517,
          idFuncionario: 1,
          nombre: 'Evaluación A',
          telefono: 'Activa',
          correo: 'prueba@gmail.com',
          detalle: 'Ver más',
        },
        {cedula: 12517,
          idFuncionario: 2,
          nombre: 'Evaluación B',
          telefono: 'Inactiva',
          correo: 'quePereza@gmail.com',
          detalle: 'Ver más',
        },
        {cedula: 2518,
          idFuncionario: 3,
          nombre: 'Evaluación C',
          telefono: 'Activa',
          correo: 'tel@gmail.com',
          detalle: 'Ver más',
        },
        {cedula: 15745,
          idFuncionario: 4,
          nombre: 'Evaluación D',
          telefono: 'Inactiva',
          correo: 'ahh@gmail.com',
          detalle: 'Ver más',
        },
        {cedula: 214841,
          idFuncionario: 5,
          nombre: 'Evaluación E',
          telefono: 'Activa',
          correo: 'ser@gmail.com',
          detalle: 'Ver más',
        },
        
      ]);
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
                         <Title>Evaluaciones</Title>
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
                    <Table columns={columns} data={funcionarios} />
                </Styles>
                </div>
            </div>
             </div>
             
            
             {/* Aqui ponemos la tabla de los funcionarios, falta por hacer */}
             
         </div>
 
 
        </Fragment>
     );
};  