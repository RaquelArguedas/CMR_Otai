import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Navbar } from '../Navbar/Navbar';
import './CrearEvaluacion.css';
import Swal from 'sweetalert2';

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
    const [tipoEvalaucion, setTipoEvaluacion] = useState("");
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    let navigate = useNavigate();

    const gotoMenu = () => { navigate('/', {}); }
    
    const handleSubmit = async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        
        //Para enviar los datos de la fecha es inputValue
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
  
        //Notificacion de que se realizaron los cambios
        Swal.fire({
            title: '¿Está seguro desea modificar la evaluación?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              Swal.fire('La evaluación se ha modificado satisfactoriamente')
              gotoMenu();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })
        
    }
    const handleSearch = async () => { 
        //Obtener infromacion existente en la base de datos
        console.log(1) // imprime en consola web
        const res = await fetch(`${API}/readEvaluacion/${'EVAL001'}`);
        console.log(2) // imprime en consola web
        const data = await res.json();//resultado de la consulta
        console.log(3) // imprime en consola web
        console.log(data) // imprime en consola web
        console.log("idEvaluacion:", data[0]);
        setNombre('Evaluacion para el Ministerio de salud')
        setDescripcion('Evaluacion de accesibilidad')
        //setFechaEjecucion('20/09/2023')
        setTipoEvaluacion(1)
        
        setEstado(1)
        setCosto(230000)
        setCedula('123129131')
        setNombreCliente('Ministerio de hacienda')
        
        //La fecha
        const fechaBaseDatos = "2023-11-08T00:00:00Z"; // Ejemplo
        // Parsear la fecha de la base de datos en un objeto Date
        // Convertir la cadena de fecha en un objeto Date en zona horaria UTC
        //Tiene que se como el de abajo ya que es necesario la zona horaria entoces se agrega lo de T
        // const fechaDesdeBaseDatos = new Date(fechaSoloFecha + "T00:00:00Z");
        const fechaDesdeBaseDatos = new Date(fechaBaseDatos);
        // Sumar un día a la fecha, ya que hay un desface de un dia ejemplo si es 8, pone 7 por eso la suma de uno
        fechaDesdeBaseDatos.setDate(fechaDesdeBaseDatos.getDate() + 1);
        // Luego, establece esa fecha en el estado fechaEjecucion
        setFechaEjecucion(fechaDesdeBaseDatos);

        // Para modificar los archivos
        setSelectedFiles([
            {
              nombre: 'Carnet e Informe de matrícula.pdf',
              url: 'CRMFrontend/public/Carnet e Informe de matrícula.pdf'
            },
            {
              nombre: 'logo192.png',
              url: 'CRMFrontend/public/logo192.png'
            }
          ]);
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
        setNombre(event.target.value);
    };
    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };
    const handleCostoChange = (event) => {
        setCosto(event.target.value);
    };
    const handleFechaEjecucionChange = (date) => {
        setFechaEjecucion(date);

        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month}-${day}`;
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
    
    React.useEffect(() => {
        handleSearch()
    }, []);
   
    return (
       
        <Fragment>
        <div className="container"> 
        <Navbar />
            <div class="row">
                    <div class="col-sm-3">
                        <Title>Modificar Evaluación</Title>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="nameInput" class="form-label">Nombre</label>
                        <input type="text" class="form-control custom-margin-right" id="nameInput"
                         placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                        
                    </div>
                    <div class="mb-3">
                        <label  style={{ marginRight: '40px' }} for="descripInput" class="form-label">Descripción</label>
                        <input type="text" class="form-control custom-margin-right" id="descripInput"
                         placeholder="Ingrese la descripcion de la evaluación" value={descripcion} onChange={handleDescripcionChange}/>
                        
                    </div>
                    <div class="mb-3">
                        
                        <select id="mySelect" value={estado} onChange={handleEstadoChange}>
                            <option value="">Seleccione el estado de la evaluación</option>
                            <option value="1">Activo</option>
                            <option value="2">Inactivo</option>
                        </select>
                        <select id="mySelect2" value={tipoEvalaucion} onChange={handleTipoEvaluacionChange}>
                            <option value="">Seleccione el tipo evaluación</option>
                            <option value="1">Automática Aleatoria</option>
                            <option value="2">Automática Específica</option>
                            <option value="2">Manual Específica</option>
                            <option value="2">Completa Aleatoria</option>
                        </select>
                    </div>
                        
                    <div className="mb-3">
                        <label  for="inputDate" className="form-label">
                            Seleccione la fecha de ejecución:
                        </label>
                        <label  style={{ marginRight: '40px' }} for="costInput" class="form-label">Costo:</label>
                        <input type="text" class="form-control custom-margin-right" id="costInput"
                         placeholder="Ingrese el costo de la evaluación" value={costo} onChange={handleCostoChange}/>
                        
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
                                    style={{ marginLeft: '70px' }}
                                    type="file"
                                    key={fileInputKey}
                                    onChange={handleFileChange}
                                    multiple
                                />
                                <ul style={{ marginLeft: '80px' }}>
                                    {selectedFiles.map((file) => (
                                        <li key={file.nombre}> {/* Cambia key a file.url si es único */}
                                        {file.nombre} {/* Muestra el nombre del archivo */}
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
                                style={{ marginTop:  '100px' }} >
                            <button type="submit" className="button1" >
                                <BsFillPencilFill style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Modificar evaluación
                                </button>
                            
                            </div>
        

                    </form>

            </div>
        </div>

    </Fragment>
     );
};
