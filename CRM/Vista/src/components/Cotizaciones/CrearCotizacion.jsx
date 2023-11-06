// 
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import '../Evaluaciones/CrearEvaluacion.css';
import Swal from 'sweetalert2';
import { Table, columns, data, Styles } from './TablaSelectClientes'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";
export const CrearCotizacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [total, setTotal] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fechaIncio, setfechaIncio] = useState(new Date());
    const [inputValueIncio, setInputValueIncio] = useState('');
    const [fechaFinalizacion, setfechaFinalizacion] = useState(new Date());
    const [inputValueFinalizacion, setInputValueFinalizacion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState(new Date());
    const [inputValueCreacion, setInputValueCreacion] = useState('');
    const [estado, setEstado] = useState("");
    const [fileInputKey, setFileInputKey] = useState('');
    //Esto va parte de la tabla que aun no esta creada
    let navigate = useNavigate();
    const gotoMenu = () => { navigate('/cotizacion', {}); }
    const [servicios, setServicios] = useState([]);
    const [idServicio, setIdServicios] = useState([]);




    const handleSubmit = async (event) => {
        console.log('estado', estado)
        event.preventDefault();
        // Validación del campo "nombre"
        if (nombre.length < 2) {
          toast.error('El nombre debe ser mayor a un caracter.', {
              position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        // Validación del campo "nombre"
        if (descripcion.length < 2) {
          toast.error('La descripción debe ser mayor a un caracter.', {
              position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        if (estado === '') {
          toast.error('Seleccione un estado válido.', {
              position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        if (total === '' || total>10000000) {
          toast.error('Debe ingresar un número menor o igual a 10000000 como total.', {
              position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        if (!Array.isArray(idServicio) || idServicio.length !== 1) {
            toast.error('Debe seleccionar solamente un servicio .', {
              position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
        const data = {
            nombre: nombre,
            descripcion: descripcion,  
            total: total,
            estado: estado,
            idServicio: idServicio  
          };
    
        console.log(data)
    
        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        };
        const res = await fetch(`${API}/createCotizacion`, requestOptions); // Asegúrate de que la ruta sea correcta
        if (res.ok) {
          Swal.fire({
            title: 'Confirmación',
            text: 'La cotización se ha creado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              gotoMenu();
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear la cotización.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      };

    const handleidServicioChange = ( idServicios) => {
        console.log('Array de idServicios:', idServicios);
        setIdServicios(idServicios);
    };
    const handleSearch = async () => {
        const res = await fetch(`${API}/getServicios`);
            const data = await res.json();//resultado de la consulta
            console.log("servicios")
            console.log(data)
             // Realiza la conversión de datos aquí
             const formattedData = data.map((item) => ({
                idServicio: item[1],
                nombre: item[2],
                idCliente: item.length === 18 ? item[16] : item[12],
                nombreCliente: item.length === 18 ? item[17] : item[13],
                
              }));
    
          setServicios(formattedData);
      };
    
    React.useEffect(() => {
        handleSearch()
      }, []);
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
    const handleNameChange = (event) => {
        const inputValue = event.target.value;
        
            if (inputValue.length <= 50) {
                // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
                setNombre(inputValue);
            } else {
                // La entrada supera el límite, muestra un alert
                toast.error('El nombre no debe superar los 50 caracteres.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
      };
      const handleDescripcionChange = (event) => {
        const inputValue = event.target.value;
        
            if (inputValue.length <= 100) {
                // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
                setDescripcion(inputValue);
            } else {
                // La entrada supera el límite, muestra un alert
                toast.error('La descripción no debe superar los 100 caracteres.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
      };
      const handleTotalChange = (event) => {
        const inputValue = event.target.value;
        const validPattern = /^\d*\.?\d*$/;
    
        if (validPattern.test(inputValue)) {
            setTotal(inputValue);
        } else {
            toast.error('Por favor, ingrese un número decimal positivo válido sin "e", comas, guiones ni otros caracteres no deseados.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
      };
    const handleCostoChange = (event) => {
        const inputValue = event.target.value;
        // Expresión regular que valida un número decimal positivo
        const validPattern = /^\d*\.?\d*$/;
    
        if (validPattern.test(inputValue)) {
            // La entrada es válida, puedes actualizar el estado
            setCosto(inputValue);
        } else {
            // La entrada no es válida, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
            // Por ejemplo, mostrar un mensaje de error en la interfaz de usuario
            toast.error('Por favor, ingrese un número decimal positivo válido sin "e", comas, guiones ni otros caracteres no deseados.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
      };
   
    const handlefechaIncioChange = (date) => {
        setfechaIncio(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        const formattedDay = day.toString().padStart(2, '0');
        
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        setInputValueIncio(formattedDate);
        
    };
    const handlefechaFinalizacionChange = (date) => {
        setfechaFinalizacion(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        const formattedDay = day.toString().padStart(2, '0');
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        
        setInputValueFinalizacion(formattedDate);

        const monthC = fechaCreacion.getMonth() + 1; 
        const dayC = fechaCreacion.getDate(); 
        const yearC = fechaCreacion.getFullYear(); 
        const formattedDayC = dayC.toString().padStart(2, '0');
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDateC = `${yearC}-${monthC.toString().padStart(2, '0')}-${formattedDayC}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        setInputValueCreacion(formattedDateC);
        
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
                        <h1 class="titulo-h1">Crear Cotización</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div class="mb-3">
              <label for="nameInput" class="form-label">Nombre:</label>
              <input style={{ marginLeft: '70px' }} type="text" class="form-control custom-margin-right" id="nameInput"
                placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange} />
            </div>
            <div class="mb-3">
              <label style={{ marginRight: '40px' }} for="descripInput" class="form-label">Descripción:</label>
              <input style={{ marginLeft: '66px' }} type="text" class="form-control custom-margin-right" id="descripInput"
                placeholder="Ingrese la descripción de la cotización" value={descripcion} onChange={handleDescripcionChange} />
            </div>
            <div className="mb-3" >
              <label for="totalInput" class="form-label" style={{ marginTop: '2px', marginRight: '10px' }}>Total:</label>
              <input type="text" class="form-control custom-margin-right" id="totalInput" style={{ width: '300px', marginLeft: '157px' }}
                placeholder="Ingrese el total de la cotización" value={total} onChange={handleTotalChange} />
            </div>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Estado:</label>
                        <select style={{ width: '250px', marginLeft: '80px' }} id="mySelect" value={estado} onChange={handleEstadoChange}>
                            <option value="">Seleccione el estado</option>
                            <option value="1">Eliminado</option>
                            <option value="2">En progreso</option>
                            <option value="3">Solicitado</option>
                            <option value="4">En planeación</option>
                            <option value="5">Activo</option>
                            <option value="6">Inactivo</option>
                        </select>
                        </div>
                        <div className="mb-3" 
                            style={{ marginTop:  '40px' }} >
                            <div style={{ display: 'flex' }}>
                            <Styles> 
                            <Table columns={columns} data={servicios} handleidServicioChange={handleidServicioChange}/>
                            </Styles>
                            </div>     
                        </div>
                            
                            <div className="mb-3" 
                                style={{ marginTop:  '50px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear cotizacion
                            </button>
                            
                            </div>
        
                            <ToastContainer />  
                    </form>

            </div>
        </div>

    </Fragment>
     );
};