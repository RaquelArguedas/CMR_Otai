import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Navbar } from '../Navbar/Navbar';
import './CrearEvaluacion.css';
import Swal from 'sweetalert2';
import { Table, columns, data, Styles } from './TablaReSelect';  // Importa Table, columns y data desde Tabla.jsxy
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";

export const ModificarEvaluacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileInputKey, setFileInputKey] = useState('');
    const [fechaEjecucion, setFechaEjecucion] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [estado, setEstado] = useState("");
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]); // Estado para almacenar los tipos de evaluación
    const [tipoEvaluacion, setTipoEvaluacion] = useState(''); // Estado para el tipo de evaluación seleccionado
    const [cedula, setCedula] = useState('');
    const [IdCliente, setIdCliente] = useState(''); //FALTA AGREGAR LA TABLA DE AHI ES DONDE SE RECOGE
    const [inputValueCreacion, setInputValueCreacion] = useState('');
    const [clientes, setClientes] = useState([]);//Meter los datos de los clientes ahi
    const [idProyecto, setidProyecto] = useState('');
    const { idEvaluacion } = useParams();
    let navigate = useNavigate();

    const gotoMenu = () => { navigate('/', {}); }
    
    const handleSubmit = async (event) => {
        event.preventDefault();  
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
          if (tipoEvaluacion === '') {
            toast.error('Seleccione un tipo de capacitación válido.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
          if (costo === '') {
            toast.error('Debe ingresar un número.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
          if (IdCliente === '') {
            toast.error('Debe seleccionar un cliente.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
        //Notificacion de que se realizaron los cambios
        console.log("AAAAAAAAAAAAAAA", idProyecto)
        console.log(nombre, descripcion, inputValueCreacion,inputValue,tipoEvaluacion, inputValue, fileInputKey,estado,costo,IdCliente, idProyecto)
       
        Swal.fire({
            title: '¿Está seguro desea modificar la evaluación?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    idEvaluacion:idEvaluacion,
                    nombre: nombre,
                    descripcion: descripcion, 
                    fechaCreacion: inputValueCreacion,
                    tipoEvaluacion: tipoEvaluacion, 
                    fechaEjecucion: inputValue, 
                    documentos: fileInputKey,
                    idEstado: estado,
                    precio: costo, 
                    idProyecto: idProyecto, 
                    idCliente: IdCliente  
                };
                console.log(idEvaluacion,descripcion,inputValueCreacion,tipoEvaluacion,inputValue
                    ,fileInputKey,estado,costo,idProyecto,IdCliente)
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                };
                const res = await fetch(`${API}/updateEvaluacion`, requestOptions);
                if (res.ok) {
                    Swal.fire({
                        title: 'Confirmación',
                        text: 'La evaluación se ha modificado exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false, 
                        allowEscapeKey: false,    
                    }).then((result) => {
                        if (result.isConfirmed) {
                        gotoMenu();
                        }
                    });
                } else {
                    Swal.fire({
                      title: 'Error',
                      text: 'Hubo un problema al modificar la evaluación.',
                      icon: 'error',
                      confirmButtonText: 'Aceptar',
                    });
                }        
              //gotoMenu();
            } else if (result.isDenied) {
              Swal.fire('No se guardaron los cambios')
            }
          }) 
    }
    const handleSearch = async () => { 
        const resultado = await fetch(`${API}/getTipoEvaluaciones`);
        const datos = await resultado.json();
        const formatted = datos.map((item) => ({
            id: item[0],
            nombre: item[1],
          }))
        setTiposEvaluacion(formatted);
        //Obtener infromacion existente en la base de datos
        console.log(1) // imprime en consola web
        const res = await fetch(`${API}/readEvaluacion/${idEvaluacion}`);
        console.log(2) // imprime en consola web
        const data = await res.json();//resultado de la consulta
        console.log(3) // imprime en consola web
        console.log(data) // imprime en consola web
        console.log("idEvaluacion:", data[0]);
        console.log("idCliente:", data[11]);
        setIdCliente(data[11])
        setNombre(data[2])
        setDescripcion(data[3])
        setInputValueCreacion(data[4])
        //setFechaEjecucion('20/09/2023')
        setTipoEvaluacion(data[5])
        setEstado(data[8])
        setCosto(data[9])
        setidProyecto(data[10])
        
        //La fecha
        // const fechaBaseDatos = "2023-11-08T00:00:00Z"; // Ejemplo
        // Parsear la fecha de la base de datos en un objeto Date
        // Convertir la cadena de fecha en un objeto Date en zona horaria UTC
        //Tiene que se como el de abajo ya que es necesario la zona horaria entoces se agrega lo de T
        setInputValue(data[6])
        const fechaDesdeBaseDatos = new Date(data[6] + "T00:00:00Z");
        
        // const fechaDesdeBaseDatos = new Date(fechaBaseDatos);
        // Sumar un día a la fecha, ya que hay un desface de un dia ejemplo si es 8, pone 7 por eso la suma de uno
        fechaDesdeBaseDatos.setDate(fechaDesdeBaseDatos.getDate() + 1);
        // Luego, establece esa fecha en el estado fechaEjecucion
        setFechaEjecucion(fechaDesdeBaseDatos);

        const res2 = await fetch(`${API}/getDocs/${data[1]}`);
        const data2 = await res2.json();
        const files = Object.keys(data2);
        console.log(files);

        const modifiedData = Object.keys(data2).map(nombre => ({
            nombre: nombre,
            url: data2[nombre]
          }));
          
        
        setSelectedFiles(modifiedData);

        const rest = await fetch(`${API}/getClientes`);
        const dat = await rest.json();//resultado de la consulta
        console.log(dat)
         // Realiza la conversión de datos aquí
      const formattedData = dat.map((item) => ({
        cedula: item[1],
        idCliente: item[0],
        nombre: item[2],
      }))
      setClientes(formattedData);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const newFiles = Array.from(files).map((file) => ({
          nombre: file.name, // Asigna el nombre del archivo
          url: URL.createObjectURL(file), // Genera una URL para el archivo (puedes usar otra lógica aquí)
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

    const handleTipoEvaluacionChange = (event) => {
        setTipoEvaluacion(event.target.value);
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
        
            if (inputValue.length <= 50) {
                // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
                setDescripcion(inputValue);
            } else {
                // La entrada supera el límite, muestra un alert
                toast.error('La descripción no debe superar los 50 caracteres.', {
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
    const handleFechaEjecucionChange = (date) => {
        setFechaEjecucion(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
       // Utilizar padStart para asegurarse de que day tenga dos dígitos
        const formattedDay = day.toString().padStart(2, '0');
        
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        setInputValue(formattedDate);
        
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
      const handleIdClienteChange = ( idCliente) => {
        console.log(idCliente + 'Por aqui en handle')
        setIdCliente(idCliente);
    };
    const handleFileClick = async (e, nombre, url) => {
        e.preventDefault(); // Evita la navegación predeterminada
        // Ahora puedes manejar la descarga del archivo, por ejemplo, mediante una solicitud AJAX
        // Utiliza la URL y otros datos según sea necesario
        //console.log("Hacer algo con el archivo:", nombre, url);
        const res = await fetch(`${API}/blop/${nombre}/${url}`);
        const data = await res.json();
        console.log(data)
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
                    <h1 className='titulo-h1'>Modificar Evaluación</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Nombre:</label>
                        <input type="text" class="form-control custom-margin-right" id="nameInput"
                         placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                        
                    </div>
                    <div class="mb-3">
                        <label  style={{ marginRight: '40px' }} for="descripInput" class="form-label">Descripción:</label>
                        <input type="text" class="form-control custom-margin-right" id="descripInput"
                         placeholder="Ingrese la descripcion de la evaluación" value={descripcion} onChange={handleDescripcionChange}/>
                        
                    </div>
                    
                    <div class="mb-3">
                        <label  style={{ marginRight: '95px' }} for="costInput" class="form-label">Costo:</label>
                        <input type="text" class="form-control custom-margin-right" id="costInput"
                         placeholder="Ingrese el costo de la evaluación" value={costo} onChange={handleCostoChange}/>
                        
                    </div>
                    <div class="mb-3">
                        
                        <select id="mySelect" value={estado} onChange={handleEstadoChange}>
                            <option value="">Seleccione el estado de la evaluación</option>
                            <option value="1">Eliminado</option>
                            <option value="2">En progreso</option>
                            <option value="3">Solicitado</option>
                            <option value="4">En planeación</option>
                            <option value="5">Activo</option>
                            <option value="6">Inactivo</option>
                        </select>
                        {/* <select id="mySelect2" value={tipoEvalaucion} onChange={handleTipoEvaluacionChange}>
                            <option value="">Seleccione el tipo evaluación</option>
                            <option value="1">Automática Aleatoria</option>
                            <option value="2">Automática Específica</option>
                            <option value="2">Manual Específica</option>
                            <option value="2">Completa Aleatoria</option>
                        </select> */}
                          <select style={{ marginLeft: '30px' }} id="mySelect2" value={tipoEvaluacion} onChange={handleTipoEvaluacionChange}>
                            <option value="">Seleccione el tipo evaluación</option>
                            {tiposEvaluacion.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>
                                {tipo.nombre}
                            </option>
                            ))}
                        </select>
                    </div>
                        
                    <div className="mb-3" style={{ marginBottom: '40px' }}>
                        <label  for="inputDate" className="form-label" >
                            Seleccione la fecha de ejecución:
                        </label>
                        
                        </div>
                        <div className="mb-3" style={{ display: 'flex',alignItems: 'flex-start',  }}>
                            <DatePicker
                                selected={fechaEjecucion}
                                onChange={handleFechaEjecucionChange}
                                dateFormat="dd/MM/yyyy"
                                inline
                                showYearDropdown
                                showMonthDropdown
                            />
                            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px' }}>
                                <input
                                    style={{ marginLeft: '120px' }}
                                    type="file"
                                    key={fileInputKey}
                                    onChange={handleFileChange}
                                    multiple
                                />
                                <ul style={{ marginLeft: '150px' }}>
                                    {selectedFiles.map((file) => (
                                        <li key={file.nombre}>
                                        <a href={`${API}/blop/${file.nombre}/${file.url}`} target="_blank" onClick={(e) => handleFileClick(e, file.nombre, file.url)}>
                                            {file.nombre} {/* Muestra el nombre del archivo */}
                                        </a>
                                        <button
                                            style={{
                                                marginLeft: '10px',
                                                backgroundColor: '#ffffff',
                                                border: '0 transparent',
                                            }}
                                            onClick={() => handleRemoveFile(file.url)}
                                            >
                                            <MdOutlineDeleteForever
                                            style={{
                                                fontSize: '25px',
                                            }}
                                            />
                                        </button>
                                        </li>
                                    ))}
                                    </ul>


                            </div>
                        </div>
                        <div className="mb-3" 
                                style={{ marginTop:  '50px' }} >
                                <div style={{ display: 'flex' }}>
                                <Styles> 
                                <Table columns={columns} data={clientes} handleIdClienteChange={handleIdClienteChange} idCliente={IdCliente}/>
                                </Styles>
                                </div>     
                            </div>
                            
                            <div className="mb-3" 
                                style={{ marginTop:  '100px' }} >
                            <button type="submit" className="button1" >
                                <BsFillPencilFill style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Modificar evaluación
                                </button>
                            
                            </div>
                            <ToastContainer /> 

                    </form>

            </div>
        </div>

    </Fragment>
     );
};
