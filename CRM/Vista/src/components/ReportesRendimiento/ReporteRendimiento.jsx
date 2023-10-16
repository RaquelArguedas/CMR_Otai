import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { matchSorter } from 'match-sorter'
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Table, columns, Styles } from './TablaClientesReportes';
const API = "http://127.0.0.1:5000";

const Title = styled.h1`
  font-size: 24px;
  color: #000000;
  margin-bottom: 10px;
  margin-top: 25px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: #000000;
  margin-bottom: 50px;
  margin-top: 25px;
`;

const SubTitleFecha = styled.h2`
  font-size: 20px;
  color: #000000;
  margin-bottom: 20px;
  margin-top: 25px;
  margin-right: 25px;
`;

const RadioButton = styled.label`
  display: flex;
  align-items: left;
  font-size: 16px;
  color: #000000;
  margin-bottom: 0px;
  margin-top: -30px;
  font-weight: normal;
  cursor: pointer;
`;

const RadioInput = styled.input`
  margin-right:-220px;
  margin-left: -225px;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: left;
  font-size: 16px;
  color: #000000;
  margin-bottom: 0px;
  margin-top: -30px;
  font-weight: normal;

  input {
    margin-right:-220px;
    margin-left: -225px;
  }
`;

const Select = styled.select`
  font-size: 16px;
  color: #000000;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width:200px;
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

export function ReporteRendimiento() {
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
  const gotoReportesRendimiento = () => { navigate('/reportesRendimiento'); }

  //Enviar la información al backend.
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(clientes);
    if (servicioCheckboxArray !== null &&
        servicioCheckboxArray.length > 0 &&
        IdCliente !== null &&
        IdCliente !== ''){
          Swal.fire({
            title: 'Confirmación',
            text: 'El reporte se ha creado satisfactoriamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, 
            allowEscapeKey: false,    
          }).then((result) => {
            if (result.isConfirmed) {
              const formData = new FormData();
              //ToDo: Validar en el backend
              formData.append('servicios', servicioCheckboxArray);
              formData.append('cliente', IdCliente);
              formData.append('estado', estadoDropdown);
              formData.append('fechaInicio', fechaInicio);
              formData.append('fechaFinal', fechaFinal); 
              const res = fetch(`${API}/createReporteRendimiento`, {
                  method: 'POST',
                  body: formData
              });
              gotoReportesRendimiento();
            }
          }); 
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, escoge los filtros correctamente (Recuerda: necesitas por lo menos marcar un cliente y un servicio para crear el reporte).',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }  
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
          <Title>Reporte de Rendimiento</Title>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <SubTitle>Servicios:</SubTitle>
                <Checkbox>
                  <input
                    type="checkbox"
                    value="Cotización"
                    checked={servicioCheckboxArray.includes('Cotización')}
                    onChange={handleCheckboxChange}
                  /> Cotización
                </Checkbox>
                <Checkbox>
                  <input
                    type="checkbox"
                    value="Evaluación"
                    checked={servicioCheckboxArray.includes('Evaluación')}
                    onChange={handleCheckboxChange}
                  /> Evaluación
                </Checkbox>
                <Checkbox>
                  <input
                    type="checkbox"
                    value="Proyecto"
                    checked={servicioCheckboxArray.includes('Proyecto')}
                    onChange={handleCheckboxChange}
                  /> Proyecto
                </Checkbox>
                <Checkbox>
                  <input
                    type="checkbox"
                    value="Capacitación"
                    checked={servicioCheckboxArray.includes('Capacitación')}
                    onChange={handleCheckboxChange}
                  /> Capacitación
                </Checkbox>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '300px' }}>
                <SubTitle>Estado:</SubTitle>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={estadoCheckbox}
                    onChange={() => setCheckboxEstado(!estadoCheckbox)}
                  /> Por estado
                </Checkbox>
                <Select
                  value={estadoCheckbox ? estadoDropdown : ''}
                  onChange={(e) => {
                    if (estadoCheckbox) {
                      console.log('Valor estadoDropdown:', e.target.value);
                      setEstado(e.target.value);
                    }
                  }}
                >
                  <option value="-Seleccione Estado-" disabled={estadoDropdown !== '-Seleccione Estado-'}>-Seleccione Estado-</option>
                  <option value="opcion1">En negociación</option>
                  <option value="opcion2">En progreso</option>
                  <option value="opcion3">Finalizado</option>
                  <option value="opcion4">Entregado</option>
                </Select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px', marginLeft: '50px'}}>
              <button type="submit" className='button1' >
                <AiOutlinePlusCircle style={{
                        fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'
                        }} /> Crear reporte
              </button>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <SubTitle>Clientes:</SubTitle>
                <Styles>
                  <Table columns={columns} data={clientes} handleIdClienteChange={handleIdClienteChange}/>
                </Styles>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '100px' }}>
                <SubTitle>Fecha:</SubTitle>
                <Checkbox>
                  <input
                    type="checkbox"
                    checked={fechaCheckbox}
                    onChange={() => setFechaCheckbox(!fechaCheckbox)}
                  />Por rango de fechas
                </Checkbox>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '50px' }}>
                    <SubTitleFecha>Fecha Inicio:</SubTitleFecha>
                    <CustomDatePicker
                      selected={fechaInicio}
                      onChange={handleFechaInicioChange}
                      dateFormat="dd/MM/yyyy"
                      inline
                      showYearDropdown
                      showMonthDropdown
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <SubTitleFecha>Fecha Final:</SubTitleFecha>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default ReporteRendimiento;