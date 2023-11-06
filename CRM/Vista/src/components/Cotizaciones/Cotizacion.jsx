
import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { Table, columns, data, Styles } from './TablaCotizacion';
import '../Clientes/CSSClientes/Clientes.css'
import { matchSorter } from 'match-sorter'
const API = "http://127.0.0.1:5000";

const Title = styled.h1`
  font-size: 24px;
  color: #000000;
  margin-bottom: 50px;
  margin-top: 25px;
`;

export function Cotizacion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cotizaciones, setCotizaciones] = useState([[]]);
  let navigate = useNavigate();
  const gotoCrearCotizacion = () => { navigate('/crearCotizacion'); }
  const handleSearch = async () => {
    //Obtener infromacion existente en la base de datos
    const res = await fetch(`${API}/getCotizaciones`);
    const data = await res.json();//resultado de la consulta
    console.log(data)
    console.log(data[7])
    const formattedData = data.map((item) => {
      var estado = '';
      switch (item[7]) {
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
      if (estado !== 'Eliminado'){
        return {
          idCotizacion: item[0],
          nombre: item[1],
          descripcion: item[2],
          idcliente: item[3],
          nombrecliente: item[9],
          total: item[5],
          idservicio: item[6],
          estado: estado,
          fecha: item[8],
          detalle: 'Ver más',
        };
      }
    });
    const filteredData = formattedData.filter(item => item !== undefined);
    setCotizaciones(filteredData);
    };
  React.useEffect(() => {
    handleSearch()
  }, []);

  return (
    <Fragment>
      <div className="container">
        <Navbar />
        <div class="row">
          <div class="col-sm-3" style={{ marginTop: '50px' }}>
            <h1 className='titulo-h1'>Cotizaciones</h1>
          </div>
          <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
            <button className="button3" style={{ marginLeft: '25px', height: '50px', width: '180px' }} onClick={gotoCrearCotizacion}>
              <AiOutlinePlusCircle style={{
                fontSize: '25px',
                color: '#12959E', // Tamaño del icono
                marginRight: '20px',
                marginLeft: '20px',
              }} alt="Crear Cotización" />
              <div style={{ textAlign: 'left'}}>
                Crear<br />Cotización
              </div>
            </button>
          </div>
          <div className="mb-3" style={{ marginTop: '70px', marginLeft: '20px' }}>
            <div style={{ display: 'flex' }}>
              <Styles>
                <Table columns={columns} data={cotizaciones} />
              </Styles>
            </div>
          </div>
        </div>
      </div>
    </Fragment>


  );
}

export default Cotizacion;