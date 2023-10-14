// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled, { keyframes } from 'styled-components';
// import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
// import  { matchSorter } from 'match-sorter'

// export const Styles = styled.div`
//   padding: 0.1rem;
//   margin-left: 0px;
//   margin-right: -340px;
//   margin-top: -20px;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;
  

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
//   .pagination {
//     padding: 0.5rem;
//   }
// `;

// function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
// }) {
//   const count = preGlobalFilteredRows.length
//   const [value, setValue] = React.useState(globalFilter)
//   const onChange = useAsyncDebounce(value => {
//     setGlobalFilter(value || undefined)
//   }, 200)

//   return (
//     <span>
//       {' '}
//       <input
//         value={value || ""}
//         onChange={e => {
//           setValue(e.target.value);
//           onChange(e.target.value);
//         }}
//         placeholder={`Buscar entre ${count} registros...`}
//         style={{
//           fontSize: '1.1rem',
//           border: '1px solid black',
//           marginBottom: '1px',
//           marginRight: '1px',
//           borderRadius: '5px',
//           width: '300px'
//         }}
//       />
//     </span>
//   )
// }

// function fuzzyTextFilterFn(rows, id, filterValue) {
//   return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
// }

// export function Table({ columns, data }) {
//   const [clientesSeleccionados, setClienteArray] = useState([]);
//   const filterTypes = React.useMemo(
//     () => ({
//       fuzzyText: fuzzyTextFilterFn,
//       text: (rows, id, filterValue) => {
//         return rows.filter(row => {
//           const rowValue = row.values[id]
//           return rowValue !== undefined
//             ? String(rowValue)
//               .toLowerCase()
//               .startsWith(String(filterValue).toLowerCase())
//             : true
//         })
//       },
//     }),
//     []
//   )
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     preGlobalFilteredRows,
//     setGlobalFilter,
//     visibleColumns,
//     state,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//       filterTypes
//     },
//     useFilters,
//     useGlobalFilter,
//     usePagination
//   );

//   return (
//     <>
//       <table {...getTableProps()} style={{ margin: '0' }}>
//         <thead>
//           <tr>
//             <th
//               colSpan={visibleColumns.length}
//               style={{
//                 textAlign: 'left',
//               }}
//             >
//               <GlobalFilter
//                 preGlobalFilteredRows={preGlobalFilteredRows}
//                 globalFilter={state.globalFilter}
//                 setGlobalFilter={setGlobalFilter}
//               />
//             </th>
//           </tr>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return (
//                     <td {...cell.getCellProps()}>
//                       {cell.column.id === 'checkbox' ? (
//                         <input
//                           type="checkbox"
//                           style={{ width: '15px', height: '15px', margin: '0' }}
//                           onClick={() => {
//                             const idCotizacion = row.values['idC'];
//                             if (clientesSeleccionados.includes(idCotizacion)) {
//                               setClienteArray(clientesSeleccionados.filter((id) => id !== idCotizacion));
//                               console.log('Lista de clientes seleccionados:', clientesSeleccionados);
//                             } else {
//                               setClienteArray([...clientesSeleccionados, idCotizacion]);
//                               console.log('Lista de clientes seleccionados:', clientesSeleccionados);
//                             }
//                           }}
//                         />
//                       ) : (
//                         cell.render('Cell')
//                       )}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <ButtonTbl onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </ButtonTbl>{' '}
//         <ButtonTbl onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </ButtonTbl>{' '}
//         <ButtonTbl onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </ButtonTbl>{' '}
//         <ButtonTbl onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </ButtonTbl>{' '}
//         <span>
//           Página{' '}
//           <strong>
//             {pageIndex + 1} de {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value));
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Mostrar {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// }

// export const columns = [
//   {
//     Header: 'ID Cliente',
//     accessor: 'idC',
//   },
//   {
//     Header: 'Nombre',
//     accessor: 'nombre',
//   },
//   {
//     accessor: 'checkbox',
//   },
// ];
