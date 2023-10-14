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

const Styles = styled.div`
  padding: 0.1rem;
  margin-left: 0px;
  margin-right: -340px;
  margin-top: -20px;

  table {
    border-spacing: 0;
    border: 1px solid black;
  

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      {' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Buscar entre ${count} registros...`}
        style={{
          fontSize: '1.1rem',
          border: '1px solid black',
          marginBottom: '1px',
          marginRight: '1px',
          borderRadius: '5px',
          width: '300px'
        }}
      />
    </span>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

function Table({ columns, data }) {
  const [clientesSeleccionados, setClienteArray] = useState([]);
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} style={{ margin: '0' }}>
        <thead>
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.column.id === 'checkbox' ? (
                        <input
                          type="checkbox"
                          style={{ width: '15px', height: '15px', margin: '0' }}
                          onClick={() => {
                            const idCotizacion = row.values['idC'];
                            if (clientesSeleccionados.includes(idCotizacion)) {
                              setClienteArray(clientesSeleccionados.filter((id) => id !== idCotizacion));
                              console.log('Lista de clientes seleccionados:', clientesSeleccionados);
                            } else {
                              setClienteArray([...clientesSeleccionados, idCotizacion]);
                              console.log('Lista de clientes seleccionados:', clientesSeleccionados);
                            }
                          }}
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <ButtonTbl onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </ButtonTbl>{' '}
        <ButtonTbl onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </ButtonTbl>{' '}
        <ButtonTbl onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </ButtonTbl>{' '}
        <ButtonTbl onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </ButtonTbl>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

const columns = [
  {
    Header: 'ID Cliente',
    accessor: 'idC',
  },
  {
    Header: 'Nombre',
    accessor: 'nombre',
  },
  {
    accessor: 'checkbox',
  },
];

const data = [{
  idC: 1,
  nombre: 'Edgar André Araya Vargas',
}]

export function ReporteRendimiento() {
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
          <Title>Reporte de Rendimiento</Title>
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

export default ReporteRendimiento;