
import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import './CrearEvaluacion.css';
import Swal from 'sweetalert2';
import { Table, columns, data, Styles } from './TablaSelectClientes';  // Importa Table, columns y data desde Tabla.jsxy
const API = "http://127.0.0.1:5000";

export  const CrearEvaluacion = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fechaEjecucion, setFechaEjecucion] = useState(new Date());
    const [fechaCreacion, setFechaCreacion] = useState(new Date());
    const [inputValue, setInputValue] = useState('');
    const [inputValueCreacion, setInputValueCreacion] = useState('');
    const [estado, setEstado] = useState("");
    const [tipoEvaluacion, setTipoEvaluacion] = useState("");
    const [tiposEvaluacion, setTiposEvaluacion] = useState([]);
    const [fileInputKey, setFileInputKey] = useState('');
    const [IdCliente, setIdCliente] = useState(''); 
    const [nombreCliente, setNombreCliente] = useState('');
    const [clientes, setClientes] = useState([]);
    let navigate = useNavigate();

    const gotoMenu = () => { navigate('/', {}); }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            nombre: nombre,
            descripcion: descripcion, 
            fechaCreacion: inputValueCreacion,
            tipoEvaluacion: tipoEvaluacion, 
            fechaEjecucion: inputValue, 
            documentos: fileInputKey,
            idEstado: estado,
            precio: costo, 
            idProyecto: 0, 
            idCliente: IdCliente  
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        const res = await fetch(`${API}/createEvaluacion`, requestOptions);
        if (res.ok) {
            Swal.fire({
                title: 'Confirmación',
                text: 'La evaluación se ha creado exitosamente',
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
              text: 'Hubo un problema al crear la evaluación.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
        }        
    }

    const handleTiposEvaluacion = async () => {
        await fetch(`${API}/getTipoEvaluaciones`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setTiposEvaluacion(data);
          })
          .catch(error => {
            console.error("Error al obtener tipos de evaluación:", error);
          });
      };

    const handleSearch = async () => { 
        console.log(1)
        const res = await fetch(`${API}/getClientes`);
        const data = await res.json();
        console.log(data)
        const formattedData = data.map((item) => ({
            cedula: item[1],
            idCliente: item[0],
            nombre: item[2],
        }));
      setClientes(formattedData);
    }; 
    React.useEffect(() => {
      handleSearch()
      handleTiposEvaluacion()
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
    const handleClienteNombreChange = (event) => {
        setNombreCliente(event.target.value);
    };
    const handleIdClienteChange = ( idCliente) => {
        console.log(idCliente + 'Por aqui en handle')
        setIdCliente(idCliente);
    };
    const handleFechaEjecucionChange = (date) => {
        setFechaEjecucion(date);

        const month = date.getMonth() + 1;
        const day = date.getDate(); 
        const year = date.getFullYear(); 
        const formattedDate = `${month}/${day}/${year}`;
        setInputValue(formattedDate);

        const monthC = fechaCreacion.getMonth() + 1; 
        const dayC = fechaCreacion.getDate(); 
        const yearC = fechaCreacion.getFullYear(); 
        const formattedDateC = `${yearC}/${monthC}/${dayC}`;
        setInputValueCreacion(formattedDateC);
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
                    <h1 className='titulo-h1'>Crear Evaluaciones</h1>
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
                        <select style={{ marginLeft: '30px' }} id="mySelect2" value={tipoEvaluacion} onChange={handleTipoEvaluacionChange}>
                        <option  value="">Seleccione el tipo evaluación</option>
                        {tiposEvaluacion.map(tipo => (
                            <option key={tipo[0]} value={tipo[0]}>
                            {tipo[1]}
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
                            <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginBottom: '1px' }}>
                                <input
                                    style={{ marginLeft: '120px' }}
                                    type="file"
                                    key={fileInputKey}
                                    onChange={handleFileChange}
                                    multiple
                                    
                                />
                                <ul style={{ marginLeft: '150px'}}>
                                {selectedFiles.map((file, index) => (
                                    <li key={index}>
                                        {file.name}
                                        <button style={{ marginLeft: '10px', backgroundColor: '#ffffff', border: '0 transparent'} } onClick={() => handleRemoveFile(index)}>
                                            <MdOutlineDeleteForever style={{
                                            fontSize: '25px', // Tamaño del icono
                                        }}/></button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mb-3" 
                                style={{ marginTop:  '50px' }} >
                                <div style={{ display: 'flex' }}>
                                <Styles> 
                                <Table columns={columns} data={clientes} handleIdClienteChange={handleIdClienteChange}/>
                                </Styles>
                                </div>     
                            </div>
                            <div className="mb-3" 
                                style={{ marginTop:  '100px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear evaluación
                            </button>
                            </div>
                            
                    </form>
            </div>
        </div>
    </Fragment>
     );
};