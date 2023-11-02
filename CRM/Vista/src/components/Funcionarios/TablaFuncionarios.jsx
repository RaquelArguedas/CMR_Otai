import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import  { matchSorter } from 'match-sorter'
import googleFonts from 'google-fonts';
// Define un componente de título estilizado


googleFonts.add({
  'Lato': ['300', '700'],
});
const FilterSelect = styled.select`
  width: 100px;
  height: 35px;
  
  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
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
// Define un componente de botón estilizado
export const Button = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  align-items: center; 
  border-radius: 5px;
  padding: 10px 20px;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  
  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
`;
// Define otro componente de botón estilizado para la tabla
const ButtonTbl = styled.button`
  background-color: #ffffff;
  border: 1px solid #000000;
  align-items: center; 
  border-radius: 5px;
  padding: 5px 10px;
  color: #000000;
  font-size: 12px;
  cursor: pointer;
  
  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
`;
// Define un componente de entrada de búsqueda estilizado
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
  
  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
`;
// Define un contenedor de estilos para la tabla
export const Styles = styled.div`
  padding: 0.1rem;
  margin-left: 0px;
  margin-top: 30px;

  fontFamily: 'Lato, sans-serif';
  fontWeight: 300;
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
// Define un filtro de columna por defecto
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
// Define un filtro de columna para selección
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
// Define una función personalizada para filtrar fechas en un rango
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

// Define un filtro de columna para rango de fechas
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
// Define una función de filtro de texto difuso
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
fuzzyTextFilterFn.autoRemove = val => !val
// Define un componente de tabla
export const Table = ({ columns, data }) => {
    const navigate = useNavigate(); // Usar useNavigate aquí

    const gotoDetalle = (idFuncionario) => {
      navigate(`/detalleFuncionario/${idFuncionario}`); // Reemplaza con tu URL de destino
      // navigate(`/detalleFuncionario/${idFuncionario}`); // Usar el idFuncionario en la URL
    };
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, overridFuncionario the default text filter to use
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
        <table style={{ fontFamily: 'Lato, sans-serif' }}>
          <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{ backgroundColor: '#12959E', color: '#233D4D' }}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
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
                  if (cell.column.id === 'detalle') {
                    // En caso de que sea la columna "Detalle", renderiza un enlace
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{ cursor: 'pointer', color: 'blue' }}
                        // onClick={gotoDetalle} ///Mandar el id de que toco
                        onClick={() => gotoDetalle(row.original.idFuncionario)} // Pasar idFuncionario
                      >
                        Ver más
                      </td>
                    );
                  }
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
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
          <span style={{ marginLeft: '10px' }}>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>{' '}
          <select
            style={{ marginLeft: '10px' , borderRadius: '5px' }} 
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
  

// Define las columnas de la tabla
export const columns = [
    {
    Header: 'Cédula',
    accessor: 'cedula',
    filter: 'fuzzyText',
  },
  {
    Header: 'ID Funcionario',
    accessor: 'idFuncionario',
    filter: 'fuzzyText',
  },
  {
    Header: 'Nombre',
    accessor: 'nombre',
    filter: 'fuzzyText',
  },
  {
    Header: 'Teléfono',
    accessor: 'telefono',
    
    disableFilters: true,
  },
  {
    Header: 'Correo',
    accessor: 'correo',
    filter: 'fuzzyText',
  },
  {
    Header: 'Detalle',
    accessor: 'detalle',
    disableFilters: true,
  },
];

