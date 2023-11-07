
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [clientes, setClientes] = useState([]);
    let navigate = useNavigate();

    const gotoMenu = () => { navigate('/', {}); }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(nombre, descripcion, inputValue,tipoEvaluacion, inputValue, fileInputKey,estado,costo,IdCliente)
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
      handleFechaEjecucionChange(new Date())
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
   
    const handleIdClienteChange = ( idCliente) => {
        console.log(idCliente + 'Por aqui en handle')
        setIdCliente(idCliente);
    };
    const handleFechaEjecucionChange = (date) => {
        setFechaEjecucion(date);

        const month = date.getMonth() + 1;
        const day = date.getDate(); 
        const year = date.getFullYear(); 
        // Utilizar padStart para asegurarse de que day tenga dos dígitos
        const formattedDay = day.toString().padStart(2, '0');
        
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
        setInputValue(formattedDate);



        const monthC = fechaCreacion.getMonth() + 1; 
        const dayC = fechaCreacion.getDate(); 
        const yearC = fechaCreacion.getFullYear(); 
        const formattedDayC = dayC.toString().padStart(2, '0');
        
        // Construir la cadena en el formato deseado (aaaa/dd/mm)
        const formattedDateC = `${yearC}-${monthC.toString().padStart(2, '0')}-${formattedDayC}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
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
                                    disabled = {true}
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
                            <ToastContainer />   
                    </form>
            </div>
        </div>
    </Fragment>
     );
};