
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { matchSorter } from 'match-sorter'
import './CrearCapacitacion.css';
import Swal from 'sweetalert2';

const FilterSelect = styled.select`
  width: 100px;
  height: 35px;
  background-color: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 5px;
  color: #333;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 0px;
  box-shadow: 0 0 1px 0 #000000;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 0px;
  width: 100px;
  height: 15px;
  box-shadow: 0 0 1px 0 #000000;
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

const Styles = styled.div`
  padding: 0.1rem;
  margin-left: 0px;
  margin-top: 30px;

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
`
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

//Uso de librería fuzzy para buscar en columnas
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = val => !val

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
                        <input type="checkbox" style={{ width: '15px', height: '15px', margin: '0' }} />
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

const columnsF = [
  {
    Header: 'Cédula',
    accessor: 'cedula',
  },
  {
    Header: 'ID Funcionario',
    accessor: 'idF',
  },
  {
    Header: 'Nombre',
    accessor: 'nombre',
  },
  {
    accessor: 'checkbox',
  },
];

const dataF = []

const columnsC = [
  {
    Header: 'Cédula Juridica',
    accessor: 'cedula',
  },
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

const dataC = []


export const CrearCapacitacion = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fechaEjecucion, setFechaEjecucion] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [estado, setEstado] = useState("");
  const [tipoCapacitacion, setTipoCapacitacion] = useState("");
  const [fileInputKey, setFileInputKey] = useState('');
  //Esto va parte de la tabla que aun no esta creada
  const [cedula, setCedula] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
  const [nombreCliente, setNombreCliente] = useState('');
  let navigate = useNavigate();

  const gotoMenu = () => { navigate('/', {}); }

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Es para enviar informacion al backend
    //Lo de abajo es la notificacion de que ya se creo la evalaucion
    Swal.fire({
      title: 'Confirmación',
      text: 'La capacitación se ha creado exitosamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
      allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "OK", entonces llama a la función gotoMenu
        gotoMenu();
      }
    });

  }
  const handleSearch = async () => {
    //Obtener infromacion existente en la base de datos
    //A esto me refiero a la tabla de los clientes
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    setFileInputKey(Date.now()); // Para restablecer el input y permitir la selección del mismo archivo nuevamente
  };
  const handleRemoveFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };
  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
  };
  const handleTipoCapacitacionChange = (event) => {
    setTipoCapacitacion(event.target.value);
  };
  const handleNameChange = (event) => {
    setNombre(event.target.value);
  };
  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };
  const handleCostoChange = (event) => {
    setCosto(event.target.value);
  };
  const handleClienteNombreChange = (event) => {
    setNombreCliente(event.target.value);
  };
  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
  };
  const handleFechaEjecucionChange = (date) => {
    setFechaEjecucion(date);

    const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
    const day = date.getDate(); // Obtener el día
    const year = date.getFullYear(); // Obtener el año
    // Construir la cadena en el formato deseado (mm/dd/aaaa)
    const formattedDate = `${month}/${day}/${year}`;
    //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));

    setInputValue(formattedDate);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;

  return (

    <Fragment>
      <div className="container">
        <Navbar />
        <div class="row">
          <div class="col-sm-3">
            <Title>Crear Capacitaciones</Title>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="nameInput" class="form-label">Nombre</label>
              <input type="text" class="form-control custom-margin-right" id="nameInput"
                placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange} />
            </div>
            <div class="mb-3">
              <label style={{ marginRight: '40px' }} for="descripInput" class="form-label">Descripción</label>
              <input type="text" class="form-control custom-margin-right" id="descripInput"
                placeholder="Ingrese la descripcion de la capacitación" value={descripcion} onChange={handleDescripcionChange} />
            </div>
            <div class="mb-3">
              <select id="mySelect" value={estado} onChange={handleEstadoChange}>
                <option value="">Seleccione el estado de la capacitación</option>
              </select>
              <select id="mySelect2" value={tipoCapacitacion} onChange={handleTipoCapacitacionChange}>
                <option value="">Seleccione el tipo capacitación</option>
              </select>
              <select id="mySelect3" value={tipoCapacitacion} onChange={handleTipoCapacitacionChange}>
                <option value="">Seleccione la modalidad</option>
              </select>
            </div>
            <div className="mb-3" >
              <div style={{ display: 'flex'}}>
              <label for="costInput" class="form-label" style={{marginTop: '2px', marginRight: '10px'}}>Costo:</label>
              <input type="text" class="form-control custom-margin-right" id="costInput" style={{width:'300px'}}
                placeholder="Ingrese el costo de la capacitación" value={costo} onChange={handleCostoChange} />
              
              <label for="costInput" class="form-label" style={{marginTop: '2px', marginRight: '10px'}}>Horas:</label>
              <input type="text" class="form-control custom-margin-right" id="costInput" style={{width:'300px'}}
                placeholder="Ingrese la duración en horas de la capacitación" value={costo} onChange={handleCostoChange} />
            </div> 
            </div>
            <label for="inputDate" className="form-label">
                Fecha de inicio:
              </label>
              <label style={{ marginLeft: '40px' }} for="inputDate" className="form-label">
                Fecha de finalización:
              </label>
            <div className="mb-3" style={{ display: 'flex'}}>
              <DatePicker
                selected={fechaEjecucion}
                onChange={handleFechaEjecucionChange}
                dateFormat="dd/MM/yyyy"
                inline
                showYearDropdown
                showMonthDropdown
              />
              <DatePicker
                selected={fechaEjecucion}
                onChange={handleFechaEjecucionChange}
                dateFormat="dd/MM/yyyy"
                inline
                showYearDropdown
                showMonthDropdown
              />
              <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginTop: '-100px' }}>
                <label class="form-label" style={{ marginLeft: '70px' }}>Subir archivos:</label>
                <input
                  style={{ marginLeft: '70px' }}
                  type="file"
                  key={fileInputKey}
                  onChange={handleFileChange}
                  multiple
                />
                <ul style={{ marginLeft: '80px' }}>
                  {selectedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name}
                      <button style={{ marginLeft: '10px', backgroundColor: '#ffffff', border: '0 transparent' }} onClick={() => handleRemoveFile(index)}>
                        <MdOutlineDeleteForever style={{
                          fontSize: '25px', // Tamaño del icono
                        }} /></button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
            <label class="form-label" style={{ marginBottom: '70px' }}>Funcionario</label>
            <label class="form-label" style={{ marginLeft: '230px' }}>Cliente</label>
            <div style={{ display: 'flex' }}>
              <Styles>
                <Table columns={columnsF} data={dataF} />
              </Styles>
              <Styles>
                <Table columns={columnsC} data={dataC} />
              </Styles>
            </div>
            </div>
            <div className="mb-3"
              style={{ marginTop: '100px' }} >
              <button type="submit" className='button1' style={{marginTop:'-100px'}} >
                <AiOutlinePlusCircle style={{
                  fontSize: '25px', marginRight: '20px', marginLeft: '20px'// Tamaño del icono
                }} /> Crear capacitación
              </button>
            </div>
          </form>

        </div>
      </div>

    </Fragment>
  );
};

export default CrearCapacitacion