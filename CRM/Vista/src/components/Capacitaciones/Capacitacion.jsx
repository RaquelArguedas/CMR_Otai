
import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTable, usePagination, useFilters } from 'react-table'
import { matchSorter } from 'match-sorter'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FiClipboard } from 'react-icons/fi';
import { Table, columns, data, Styles } from './TablaCapacitacion';

const Title = styled.h1`
  font-size: 24px;
  color: #000000;
  margin-bottom: 50px;
  margin-top: 25px;
`;

const API = "http://127.0.0.1:5000";
export function Capacitacion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [capacitaciones, setCapacitaciones] = useState([[]]);//Meter los datos de los clientes ahi

  let navigate = useNavigate();
  const gotoCrearCapacitaciones = () => { navigate('/crearCapacitacion'); }
  const gotoTiposCapacitaciones = () => { navigate('/tiposCapacitaciones') }

  const handleSearch = async () => {
    //Obtener infromacion existente en la base de datos
    const res = await fetch(`${API}/getCapacitaciones`);
    const data = await res.json();//resultado de la consulta
    console.log(data)
    const rest = await fetch(`${API}/readCliente/${data[0][15]}`);
    const dato = await rest.json();
    console.log(data[0][5])
    const formattedData = data.map((item) => {
      var estado = '';
      switch (item[9]) {
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
          idCapacitacion: item[1],
          nombre: item[2],
          idcliente: item[15],
          nombreCliente: item[16],
          estado: estado, // Utiliza el valor de 'estado' calculado anteriormente
          fecha: item[5],
          tipoE: item[17],
          detalle: 'Ver más',
        };
      }
    });
    setCapacitaciones(formattedData);
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
            <Title>Capacitaciones</Title>
          </div>
          <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
            <button className="button3" style={{ marginLeft: '25px', height: '50px', width: '180px' }} onClick={gotoCrearCapacitaciones}>
              <AiOutlinePlusCircle style={{
                fontSize: '25px',
                color: '#12959E', // Tamaño del icono
                marginRight: '20px',
                marginLeft: '20px',
              }} />
              <div style={{ textAlign: 'left' }}>
                Crear<br />Capacitaciòn
              </div>
            </button>
            <button className="button3" style={{ marginLeft: '140px', height: '50px', width: '180px' }} onClick={gotoTiposCapacitaciones}>
              <FiClipboard style={{
                fontSize: '25px',
                color: '#12959E', // Tamaño del icono
                marginRight: '20px',
                marginLeft: '20px',
              }} />
              <div style={{ textAlign: 'left' }}>
                Tipos de<br />Capacitaciones
              </div>
            </button>
          </div>
          <div className="mb-3" style={{ marginTop: '70px', marginLeft: '20px' }}>
            <div style={{ display: 'flex' }}>
              <Styles>
                <Table columns={columns} data={capacitaciones} />
              </Styles>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Capacitacion;