import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Navbar } from '../Navbar/Navbar';
import '../Evaluaciones/CrearEvaluacion.css';
import Swal from 'sweetalert2';
import { Table, columns, data, Styles } from './TablaReSelect'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";
export const ModificarCotizacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileInputKey, setFileInputKey] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [outValue, setOutValue] = useState('');
    const [estado, setEstado] = useState("");
    const [idCliente, setIdCliente] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    
    const [servicios, setServicios] = useState([]); ///Esto son todos los servicios
    const [idServicio, setIdServicios] = useState([]); //Estos son los servicios seleccionados anteriormente

    let navigate = useNavigate();

    const { idCotizacion } = useParams();
    const gotoCotizacion = () => { navigate('/cotizacion'); }
    const handleidServicioChange = ( idServicios) => {
        console.log('Array de idServicios:', idServicios);
        setIdServicios(idServicios);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
         //const data = await res.json();
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
          if (costo === '' || costo>100000000) {
            toast.error('Debe ingresar un número menor o igual a 100000000.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }

          console.log(!Array.isArray(idServicio) || idServicio.length !== 1)
          if (!Array.isArray(idServicio) || idServicio.length !== 1) {
            toast.error('Debe seleccionar solamente un servicio .', {
              position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
          
        //Notificacion de que se realizaron los cambios
        Swal.fire({
            title: '¿Está seguro que desea modificar el cotizacion?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            confirmButtonColor: "#4CAF50",
            denyButtonColor: "#d33",
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
                console.log("CONFIRMADOOOOOOO")
                console.log('servicios', idServicio)
                const data = {
                    idCotizacion: idCotizacion,
                    nombre: nombre,
                    descripcion: descripcion,  
                    total: costo,
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
                const res = await fetch(`${API}/updateCotizacion`, requestOptions);
                if (res.ok) {
                    Swal.fire({
                        title: 'Confirmación',
                        text: 'El cotizacion se ha creado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false, 
                        allowEscapeKey: false,    
                    }).then((result) => {
                        if (result.isConfirmed) {
                    gotoCotizacion();
                    }});    
                } else {
                    Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al crear el cotizacion.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    });
                }
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })
        
    }
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        // const res = await fetch(`${API}/getProfesorCodigo/${codigoRef.current.value}`);
        // const data = await res.json();//resultado de la consulta
        // console.log(data) // imprime en consola web
        console.log("HOLAAAAAAAAAAAA")
        console.log(idCotizacion)
        const res1 = await fetch(`${API}/readCotizacion/${idCotizacion}`); // cambiar por el id
        const data1 = await res1.json();//resultado de la consulta
        console.log(data1)
        setNombre(data1[1])
        setDescripcion(data1[2])
        setCosto(data1[5])
        setEstado(data1[7])

        console.log(1)
        //Se supoene que ahi abajo mandamos a llamar a todos los servicios
        const res = await fetch(`${API}/getServicios`);
        const data = await res.json();//resultado de la consulta
        console.log(data)
        // Realiza la conversión de datos aquí
        

        const formattedData = data.map((item) => ({
        idServicio: item[1],
        nombre: item[2],
        idCliente: item.length === 18 ? item[16] : item[12],
        nombreCliente: item.length === 18 ? item[17] : item[13],
        }));

        
        console.log("data1[0]",data1[0]);//id cotizacion
        const response = await fetch(`${API}/getServiciosCotizacion/${data1[0]}`);
        const serviciosCorrespondientes = await response.json();//resultado de la consulta
        console.log('soy los servicios')
        console.log(serviciosCorrespondientes)
        const firstItem = serviciosCorrespondientes[0];
        const tempID =firstItem.length === 16 ? firstItem[15] : firstItem[11];
        setIdCliente( tempID);
        
        const slicedData = serviciosCorrespondientes; // Obtiene los dos primeros elementos
        console.log(firstItem, idCliente, tempID,firstItem.length === 16 ? firstItem[15] : firstItem[11],slicedData)
        // Extraer solo los IDs de los elementos
        const slicedIds = serviciosCorrespondientes.map((item) => item[1]);

        // setIdServicios(slicedData); // Esto mantendría los objetos originales con nombre e ID
        setIdServicios(slicedIds); // Esto establecerá solo los IDs en idServicio
        setServicios(formattedData);
           
    };
    // const handleFileChange = (e) => {
    //     const files = e.target.files;
    //     setSelectedFiles([...selectedFiles, ...Array.from(files)]);
    //     setFileInputKey(Date.now()); // Para restablecer el input y permitir la selección del mismo archivo nuevamente
    //   };
    //   const handleRemoveFile = (index) => {
    //     const newSelectedFiles = [...selectedFiles];
    //     newSelectedFiles.splice(index, 1);
    //     setSelectedFiles(newSelectedFiles);
    //   };
    const handleFileChange = (e) => {
        const files = e.target.files;
        const newFiles = Array.from(files).map((file) => ({
          nombre: file.name, // Asigna el nombre del archivo
          url: file, // Genera una URL para el archivo (puedes usar otra lógica aquí)
        }));
      
        // Concatena los nuevos archivos con los archivos existentes
        setSelectedFiles([...selectedFiles, ...newFiles]);
        setFileInputKey(Date.now()); // Para restablecer el input y permitir la selección del mismo archivo nuevamente
    };
    
    const handleRemoveFile = (urlToRemove) => {
        const updatedFiles = selectedFiles.filter((file) => file.url !== urlToRemove);
        setSelectedFiles(updatedFiles);
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
   
    const handleIncioChange = (date) => {

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        const formattedDay = day.toString().padStart(2, '0');
        
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        setInputValue(formattedDate);
        
    };
    const handleFinalizacionChange = (date) => {

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        const formattedDay = day.toString().padStart(2, '0');
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        
        setOutValue(formattedDate);
        
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
    
    React.useEffect(() => {
        handleSearch()
    }, []);
   
    return (
       
        <Fragment>
        <div className="container"> 
        <Navbar />
            <div class="row">
                    <div class="col-sm-3">
                        <h1 class="titulo-h1">Modificar cotizacion</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '37px' }} for="descripInput" class="form-label">Descripción:</label>
                            <input type="text" class="form-control custom-margin-right" id="descripInput"
                            placeholder="Ingrese la descripcion de la evaluación" value={descripcion} onChange={handleDescripcionChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '100px'}} for="costInput" class="form-label">Total:</label>
                            <input type="text" class="form-control custom-margin-right" id="costInput"
                            placeholder="Ingrese el costo del cotizacion" value={costo} onChange={handleCostoChange}/>
                        </div>
                        <div class="mb-3">
                        <label for="nameInput" class="form-label">Estado:</label>
                            <select id="mySelect" value={estado} onChange={handleEstadoChange} style={{ marginRight: '95px', marginLeft: '15px'}} >
                                <option value="">Seleccione el estado del cotizacion</option>
                                <option value="1">Eliminado</option>
                                <option value="2">En progreso</option>
                                <option value="3">Solicitado</option>
                                <option value="4">En planeación</option>
                                <option value="5">Activo</option>
                                <option value="6">Inactivo</option>
                            </select>
                        </div>
                            <div className="mb-3"  style={{ display: 'flex', marginTop:  '40px' }}>
                                <Styles> 
                                    <Table columns={columns} data={servicios} handleidServicioChange={handleidServicioChange} idServicio={idServicio} idCliente={idCliente}/>
                                </Styles> 
                            </div>
                            <div className="mb-3" 
                                style={{ marginTop:  '50px' }} >
                                <button type="submit" className="button1" >
                                <BsFillPencilFill style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Modificar cotizacion
                                </button>
                            </div>
                            <ToastContainer />  

                    </form>

            </div>
        </div>

    </Fragment>
     );
};
