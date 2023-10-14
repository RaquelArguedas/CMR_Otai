import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { useTable, useFilters, useGlobalFilter, usePagination, useAsyncDebounce } from 'react-table'
import { matchSorter } from 'match-sorter'
import { format } from 'date-fns';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Table, columns, Styles } from './TablaClientesReportes';

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

const ButtonTbl = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  align-items: center; 
  border-radius: 5px;
  padding: 5px 10px;
  color: #000000;
  font-size: 12px;
  cursor: pointer;
`;

const ReportButton = styled.button`
  background-color: #ffffff; 
  color: #007bff; 
  padding: 10px 20px;
  border: 0 transparent; 
  margin-left: 10px; 
  cursor: pointer;
  border-radius: 4px;
`;

const data = [{
  idC: 1,
  nombre: 'Edgar André Araya Vargas',
}]

export function ReporteFinanciero() {
  const [servicioCheckboxArray, setServicioArray] = useState('');
  const [estadoCheckbox, setCheckboxEstado] = useState(false);
  const [estadoDropdown, setEstado] = useState('');
  const [fechaCheckbox, setFechaCheckbox] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());


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
      const formattedDate = format(date, 'yyyy-MM-dd');
      setFechaInicio(formattedDate);
      console.log('fechaInicio:', formattedDate);
    }
  };

  const handleFechaFinalChange = (date) => {
    if (fechaCheckbox) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setFechaFinal(formattedDate);
      console.log('fechaFinal:', formattedDate);
    }
  };

  return (
    <Fragment>
      <div className='container'>
        <Navbar />
        <div>
          <Title>Reporte Financiero</Title>
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
                <Table columns={columns} data={data} />
              </Styles>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '440px' }}>
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
          <div style={{ display: 'flex' }}>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ReporteFinanciero;