
import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar } from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { matchSorter } from 'match-sorter'

const Title = styled.h1`
  font-size: 24px;
  color: #000000;
  margin-bottom: 50px;
  margin-top: 25px;
`;

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

const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  align-items: center; 
  border-radius: 5px;
  padding: 10px 20px;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
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
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <SearchInput
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar`}
    />
  )
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <FilterSelect
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">Todos</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </FilterSelect>
  )
}

export function dateBetweenFilterFn(rows, id, filterValues) {
  const sd = filterValues[0] ? new Date(filterValues[0]) : undefined;
  const ed = filterValues[1] ? new Date(filterValues[1]) : undefined;
  if (ed || sd) {
    return rows.filter((r) => {
      // format data
      var dateAndHour = r.values[id].split(" ");
      var [year, month, day] = dateAndHour[0].split("-");
      var date = [month, day, year].join("/");
      var hour = dateAndHour[1];
      var formattedData = date + " " + hour;

      const cellDate = new Date(formattedData);

      if (ed && sd) {
        return cellDate >= sd && cellDate <= ed;
      } else if (sd) {
        return cellDate >= sd;
      } else {
        return cellDate <= ed;
      }
    });
  } else {
    return rows;
  }
}

export function DateRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);
    let max = preFilteredRows.length
      ? new Date(preFilteredRows[0].values[id])
      : new Date(0);

    preFilteredRows.forEach((row) => {
      const rowDate = new Date(row.values[id]);

      min = rowDate <= min ? rowDate : min;
      max = rowDate >= max ? rowDate : max;
    });

    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div>
      <SearchInput
        //min={min.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? val : undefined, old[1]]);
        }}
        type="date"
        value={filterValue[0] || ""}
      />
      {" a "}
      <SearchInput
        //max={max.toISOString().slice(0, 10)}
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? val.concat("T23:59:59.999Z") : undefined
          ]);
        }}
        type="date"
        value={filterValue[1]?.slice(0, 10) || ""}
      />
    </div>
  );
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = val => !val

const Table = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, overridC the default text filter to use
      // "startWith"
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
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    usePagination
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} >{column.render('Header')} <div>{column.canFilter ? column.render('Filter') : null}</div></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
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
        <span style={{ marginLeft: '10px' }}>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>{' '}
        <select
          style={{ marginLeft: '10px', borderRadius: '5px' }}
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
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
  )
}


const columns = [
  {
    Header: 'ID Cotización',
    accessor: 'idC',
    filter: 'fuzzyText',
  },
  {
    Header: 'Nombre',
    accessor: 'nombre',
    filter: 'fuzzyText',
  },
  {
    Header: 'Cliente',
    accessor: 'cliente',
    filter: 'fuzzyText',
  },
  {
    Header: 'Total',
    accessor: 'total',
  },
  {
    Header: 'Detalle',
    accessor: 'detalle',
    disableFilters: true,
    Cell: ({ row }) => (
      <Link to="/DetalleCotizacion">
        Ver más
      </Link>
    )
  },
];

const data = [
  {
    idC: 1,
    nombre: 'Cotización A',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoC: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 2,
    nombre: 'Cotización B',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 3,
    nombre: 'Cotización C',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 4,
    nombre: 'Cotización D',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 3',
    detalle: 'Ver más',
  },
  {
    idC: 5,
    nombre: 'Cotización E',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 6,
    nombre: 'Cotización A',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 7,
    nombre: 'Cotización B',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 8,
    nombre: 'Cotización C',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 9,
    nombre: 'Cotización D',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 3',
    detalle: 'Ver más',
  },
  {
    idC: 10,
    nombre: 'Cotización E',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 11,
    nombre: 'Cotización A',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 12,
    nombre: 'Cotización B',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 13,
    nombre: 'Cotización C',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 14,
    nombre: 'Cotización D',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 3',
    detalle: 'Ver más',
  },
  {
    idC: 15,
    nombre: 'Cotización E',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 16,
    nombre: 'Cotización A',
    estado: 'Activa',
    fecha: '23/11/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 17,
    nombre: 'Cotización B',
    estado: 'Inactiva',
    fecha: '23/11/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 18,
    nombre: 'Cotización C',
    estado: 'Activa',
    fecha: '13/10/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 19,
    nombre: 'Cotización D',
    estado: 'Inactiva',
    fecha: '13/10/2022',
    tipoE: 'Tipo 3',
    detalle: 'Ver más',
  },
  {
    idC: 20,
    nombre: 'Cotización E',
    estado: 'Activa',
    fecha: '13/10/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 21,
    nombre: 'Cotización A',
    estado: 'Activa',
    fecha: '13/10/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 22,
    nombre: 'Cotización B',
    estado: 'Inactiva',
    fecha: '13/10/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
  {
    idC: 23,
    nombre: 'Cotización C',
    estado: 'Activa',
    fecha: '13/10/2022',
    tipoE: 'Tipo 1',
    detalle: 'Ver más',
  },
  {
    idC: 24,
    nombre: 'Cotización D',
    estado: 'Inactiva',
    fecha: '13/10/2022',
    tipoE: 'Tipo 3',
    detalle: 'Ver más',
  },
  {
    idC: 25,
    nombre: 'Cotización E',
    estado: 'Activa',
    fecha: '13/10/2022',
    tipoE: 'Tipo 2',
    detalle: 'Ver más',
  },
];

export function Cotizacion() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Fragment>
      <div className='container'>
        <Navbar />
        <div>
          <Title>Cotizaciones</Title>
          <div>
            <Button style={{ marginRight: '40px' }}>Crear Cotización</Button>
          </div>
          <div style={{ display: 'flex' }}>
            <Styles>
              <Table columns={columns} data={data} />
            </Styles>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cotizacion;