import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiClipboard } from 'react-icons/fi';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import '../Clientes/CSSClientes/Clientes.css'
import { Table, columns, data, Styles } from './TablaFuncionarios';  // Importa Table, columns y data desde Tabla.jsxy
const API = "http://127.0.0.1:5000";
export const Funcionarios = () => {
    const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    const [funcionarios, setFuncionarios] = useState([[]]);//Meter los datos de los clientes ahi
    //Esto es para enviarlo a detalles
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    let navigate = useNavigate();
    const gotoCrearFuncionario = () => { navigate('/crearFuncionarios'); }
    const gotoPerfiles = () => { navigate('/perfiles')}
   
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        //A esto me refiero recuperar los datos del cliente
        const res = await fetch(`${API}/getFuncionarios`);
        const data = await res.json();//resultado de la consulta
        console.log(data)
        // Realiza la conversión de datos aquí
        const formattedData = data.map((item) => ({
          cedula: item[4],
          idFuncionario: item[0],
          nombre: item[1] + " " + item[2],
          telefono: item[5],
          correo: item[6],
          detalle: 'Ver más',
        }));

        setFuncionarios(formattedData);

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
                     <h1 className='titulo-h1'>Funcionarios</h1>
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
                        Crear<br />Funcionario
                    </div>
                 </button>
                 <button  className="button3" style={{marginLeft: '140px', height: '50px', width: '180px'}} onClick={gotoPerfiles}>
                     <FiClipboard style={{
                     fontSize: '25px',
                     color: '#12959E', // Tamaño del icono
                     marginRight: '20px',
                     marginLeft: '20px',
                     }} /> 
                     <div style={{ textAlign: 'left' }}>
                        Tipos de<br />Perfiles
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