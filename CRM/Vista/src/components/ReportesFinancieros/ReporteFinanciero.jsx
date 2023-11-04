import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Table, columns, Styles } from './TablaClientesReportes';
import googleFonts from 'google-fonts';
// Define un componente de título estilizado


import '../Clientes/CSSClientes/Clientes.css'
const API = "http://127.0.0.1:5000";


googleFonts.add({
  'Lato': ['300', '700'],
});



const Checkbox = styled.label`
  display: flex;
  align-items: top;
  font-size: 16px;
  color: #000000;
  margin-bottom: 0px;
  margin-top: -30px;
  font-weight: normal;
  margin-left: -225px;
  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
  input {
    margin-right:-220px;
  }
`;

const Select = styled.select`
  font-size: 16px;
  color: #000000;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width:200px;
  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
`;

const CustomDatePicker = styled(DatePicker)`
  font-size: 16px;
  color: #000000;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 100px;
  margin-left: 100px;
`;

export function ReporteFinanciero() {
  const [servicioCheckboxArray, setServicioArray] = useState([]);
  const [estadoCheckbox, setCheckboxEstado] = useState(false);
  const [estadoDropdown, setEstado] = useState('');
  const [fechaCheckbox, setFechaCheckbox] = useState(false);
  const [fechaI, setFechaI] = useState('');
  const [fechaF, setFechaF] = useState('');
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  const [clientes, setClientes] = useState([]);
  const [IdCliente, setIdCliente] = useState('');

  let navigate = useNavigate();
  const gotoReportesFinancieros = () => { navigate('/reportesFinancieros'); }

  //Enviar la información al backend.
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(clientes);
    Swal.fire({
      title: 'Fuera del alcance',
      text: 'La generacion de reportes no está contemplada en el desarrollo de este proyecto.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    });
    gotoReportesFinancieros();
    // if (servicioCheckboxArray !== null &&
    //     servicioCheckboxArray.length > 0 &&
    //     IdCliente !== null &&
    //     IdCliente !== ''){
    //       Swal.fire({
    //         title: 'Confirmación',
    //         text: 'La generacion de reportes no está contemplada en el desarrollo de este proyecto.',
    //         icon: 'success',
    //         confirmButtonText: 'Aceptar',
    //         allowOutsideClick: false, 
    //         allowEscapeKey: false,    
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           // const formData = new FormData();
    //           // formData.append('servicios', servicioCheckboxArray);
    //           // formData.append('cliente', IdCliente);
    //           // formData.append('estado', estadoDropdown);
    //           // formData.append('fechaInicio', fechaInicio);
    //           // formData.append('fechaFinal', fechaFinal); 
    //           // const res = fetch(`${API}/createReporteFinanciero`, {
    //           //     method: 'POST',
    //           //     body: formData
    //           // });
    //           gotoReportesFinancieros();
    //         }
    //       }); 
    // } else {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Por favor, escoge los filtros correctamente (Recuerda: necesitas por lo menos marcar un cliente y un servicio para crear el reporte).',
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar',
    //   });
    // }  
  }

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
    }));
    setClientes(formattedData);
    }
    React.useEffect(() => {
      handleSearch()
    }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      // Si se marca el checkbox, añadir el valor al array
      const updatedArray = [...servicioCheckboxArray, value];
      setServicioArray(updatedArray);
      console.log('Lista actualizada:', updatedArray);
    } else {
      // Si se desmarca el checkbox, eliminar el valor del array
      const updatedArray = servicioCheckboxArray.filter(item => item !== value);
      setServicioArray(updatedArray);
      console.log('Lista actualizada:', updatedArray);
    }
  }

  const handleFechaInicioChange = (date) => {
    if (fechaCheckbox) {
      const month = date.getMonth() + 1; 
      const day = date.getDate(); 
      const year = date.getFullYear(); 
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate)
      setFechaI(formattedDate);
    }
  };

  const handleFechaFinalChange = (date) => {
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    console.log("FECHA FORMATEADA:" + formattedDate); 
    if (fechaCheckbox) {
      setFechaF(formattedDate);
    }
  };

  const handleIdClienteChange = ( idCliente) => {
    console.log(idCliente + 'Handle')
    setIdCliente(idCliente);
  };

  return (
    <Fragment>
      <div className='container'>
        <Navbar />
        <div>
          <h1 class="titulo-h1">Reporte Financiero</h1>
          <form onSubmit={handleSubmit}>
          <div class="row">
              <h2 class="titulo-h2" >Servicios:</h2>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0px', marginTop:'30px' }}>
                  <input
                    style={{ marginLeft: '10px', width: '30px',height: '30px',  marginRight: '0px', marginBottom:'15px'}}
                    type="checkbox"
                  /> 
                  <label style={{ display:'flex', fontSize: '16px', height:'30px', fontFamily: 'Lato, sans-serif', fontWeight: 300, marginLeft:'10px', marginRight:'0px', marginTop:'0px', marginBottom:'0px'}}>
                    Cotización
                  </label>
                </div>
                <div  className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', marginTop:'5px' }}>
                  <input
                    style={{ marginLeft: '10px', width: '30px',height: '30px',  marginRight: '0px', marginBottom:'10px'}}
                    type="checkbox"
                  /> 
                  <label style={{ display:'flex', fontSize: '16px', height:'30px', fontFamily: 'Lato, sans-serif', fontWeight: 300, marginLeft:'10px', marginRight:'0px', marginTop:'0px', marginBottom:'0px'}}>
                  Evaluación
                  </label>
                  
              </div>
              <div  className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px', marginTop:'5px'   }}>
                  <input
                    style={{ marginLeft: '10px', width: '30px',height: '30px',  marginRight: '0px', marginBottom:'10px'}}
                    type="checkbox"
                  /> 
                  <label style={{ display:'flex', fontSize: '16px', height:'30px', fontFamily: 'Lato, sans-serif', fontWeight: 300, marginLeft:'10px', marginRight:'0px', marginTop:'0px', marginBottom:'0px'}}>
                  Proyecto
                  </label>
                </div>
              <div  className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '50px', marginTop:'5px' }}>
                  <input
                    style={{ marginLeft: '10px', width: '30px',height: '30px',  marginRight: '0px', marginBottom:'10px'}}
                    type="checkbox"
                  /> 
                  <label style={{ display:'flex', fontSize: '16px', height:'30px', fontFamily: 'Lato, sans-serif', fontWeight: 300, marginLeft:'10px', marginRight:'0px', marginTop:'0px', marginBottom:'0px'}}>
                  Capacitación
                  </label> 
              </div>  
              <h2 class="titulo-h2" >Estado:</h2>
          <div  className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '5px', marginTop:'20px' }}>
              <input
                style={{ marginLeft: '10px', width: '30px',height: '30px',  marginRight: '0px', marginBottom:'15px'}}
                type="checkbox"
              /> 
              <label style={{ display:'flex', fontSize: '16px', height:'30px', fontFamily: 'Lato, sans-serif', fontWeight: 300, marginLeft:'10px', marginRight:'0px', marginTop:'0px', marginBottom:'0px'}}>
              Por estado
              </label>
          </div>
          <div  style={{marginBottom: '5px', marginTop:'15px', marginLeft:'-40px' }}>
            <Select
              value={estadoCheckbox ? estadoDropdown : ''}
              onChange={(e) => {
                if (estadoCheckbox) {
                  console.log('Valor estadoDropdown:', e.target.value);
                  setEstado(e.target.value);
                }
              }}
              style={{  marginTop:  '-25px', marginLeft:'50px'   }}
            >
              <option value="-Seleccione Estado-" disabled={estadoDropdown !== '-Seleccione Estado-'}>-Seleccione Estado-</option>
              <option value="opcion1">En negociación</option>
              <option value="opcion2">En progreso</option>
              <option value="opcion3">Finalizado</option>
              <option value="opcion4">Entregado</option>
            </Select>
          </div>

              <h2 class="titulo-h2" >Fecha:</h2>
              <div  className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', marginTop:  '20px', marginBottom:'40px'   }}>
                <input
                  style={{ marginLeft: '10px', width: '30px',height: '30px',  marginRight: '0px', marginBottom:'15px'}}
                  type="checkbox"
                /> 
                <label style={{ display:'flex', fontSize: '16px', height:'30px', fontFamily: 'Lato, sans-serif', fontWeight: 300, marginLeft:'10px', marginRight:'0px', marginTop:'0px', marginBottom:'0px'}}>
                Por rango de fechas
                </label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', marginTop:'-30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
                      <h2 class="titulo-h2" style={{marginBottom:'30px', marginTop:'15px' }}>Fecha Inicio:</h2>
                      <CustomDatePicker
                        selected={fechaInicio}
                        onChange={handleFechaInicioChange}
                        dateFormat="dd/MM/yyyy"
                        inline
                        showYearDropdown
                        showMonthDropdown
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom:'50px' }}>
                    <h2 class="titulo-h2" style={{marginBottom:'30px', marginTop:'15px' }}>Fecha Final:</h2>
                      <CustomDatePicker
                        selected={fechaFinal}
                        onChange={handleFechaFinalChange}
                        dateFormat="dd/MM/yyyy"
                        inline
                        showYearDropdown
                        showMonthDropdown
                      />
                    </div>
                    
              </div>
            <h2 class="titulo-h2" >Clientes:</h2>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop:'10px'  }}>
              <Styles>
                <Table columns={columns} data={clientes} handleIdClienteChange={handleIdClienteChange} />
              </Styles>
            </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px'}}>
              <button type="submit" className='button1' >
                <AiOutlinePlusCircle style={{
                fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'
                }} /> Crear reporte
              </button>
            </div>

          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default ReporteFinanciero;