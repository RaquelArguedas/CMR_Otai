import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BsFillPencilFill } from 'react-icons/bs';
import { Navbar } from '../Navbar/Navbar';
import './CrearCotizacion.css';
import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";

export const ModificarCotizacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileInputKey, setFileInputKey] = useState('');
    const [fechaEjecucion, setFechaEjecucion] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [estado, setEstado] = useState("");
    const [tipoCotizacion, setTipoCotizacion] = useState("");
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    let navigate = useNavigate();
    const { idCotizacion } = useParams();
    const gotoMenu = () => { navigate('/', {}); }
    const gotoCotizaciones = () => { navigate('/cotizacion'); }

    const handleSubmit = async (event) => {
        event.preventDefault();  
        Swal.fire({
            title: '¿Está seguro desea modificar la cotización?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire('La cotización se ha modificado satisfactoriamente')
              gotoCotizaciones();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          }) 
    }

    const handleSearch = async () => {
        const res = await fetch(`${API}/readCotizacion/${idCotizacion}`);
        const data = await res.json();
        const rest = await fetch(`${API}/readCliente/${data[3]}`);
        const dato = await rest.json();
        setNombre(data[1])
        setDescripcion(data[2])
        var est = ''
        if (data[7] === 1) { est = 'Eliminado' }
        if (data[7] === 2) { est = 'En progreso' }
        if (data[7] === 3) { est = 'Solicitado' }
        if (data[7] === 4) { est = 'En planeacion' }
        if (data[7] === 5) { est = 'Activo' }
        if (data[7] === 6) { est = 'Inactivo' }
        setEstado(est)
        setCosto(data[5])
        setCedula(dato[1])
        setNombreCliente(dato[2])

        const fechaDesdeBaseDatos = new Date(data[8] + "T00:00:00Z");
        fechaDesdeBaseDatos.setDate(fechaDesdeBaseDatos.getDate() + 1);
        setFechaEjecucion(fechaDesdeBaseDatos);
        
        // Para modificar los archivos
        const res2 = await fetch(`${API}/getDocs/${data[1]}`);
        const data2 = await res2.json();
        const files = Object.keys(data2);
        console.log(files);

        const modifiedData = Object.keys(data2).map(nombre => ({
            nombre: nombre,
            url: data2[nombre]
          }));
          
        
        setSelectedFiles(modifiedData);
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
    const handleTipoCotizacionChange = (event) => {
        setTipoCotizacion(event.target.value);
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
                        <Title>Modificar cotización</Title>
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
                                placeholder="Ingrese la descripcion de la cotización" value={descripcion} onChange={handleDescripcionChange} />

                        </div>
                        <div class="mb-3">

                            <select id="mySelect" value={estado} onChange={handleEstadoChange}>
                                <option value="">Seleccione el estado de la cotización</option>
                                <option value="1">Activo</option>
                                <option value="2">Inactivo</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label for="inputDate" className="form-label">
                                Seleccione la fecha de ejecución:
                            </label>
                            <label style={{ marginRight: '40px' }} for="costInput" class="form-label">Costo:</label>
                            <input type="text" class="form-control custom-margin-right" id="costInput"
                                placeholder="Ingrese el costo de la cotización" value={costo} onChange={handleCostoChange} />

                        </div>
                        <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start', }}>
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
                            style={{ marginTop: '100px' }} >
                            <button type="submit" className="button1" >
                                <BsFillPencilFill style={{
                                    fontSize: '25px', marginRight: '20px', marginLeft: '20px'// Tamaño del icono
                                }} /> Modificar cotización
                            </button>

                        </div>


                    </form>

                </div>
            </div>

        </Fragment>
    );
};
