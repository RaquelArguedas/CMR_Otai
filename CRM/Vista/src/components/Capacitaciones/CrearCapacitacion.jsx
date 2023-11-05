
import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Navbar } from '../Navbar/Navbar';
import './CrearCapacitacion.css';
import { Table, columns, Styles } from './TablaSelectClientes';
import { TableF, columnsF } from './TablaSelectFuncionario';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";

export const CrearCapacitacion = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [horas, setHora] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fechaEjecucion, setFechaEjecucion] = useState(new Date());
  const [fechaCreada, setFechaCreada] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  const [inputValueEjecucion, setInputValueEjecucion] = useState('');
  const [inputValueFinal, setInputValueFinal] = useState('');
  const [inputValueCreacion, setInputValueCreacion] = useState('');
  const [estado, setEstado] = useState('');
  const [tipoCapacitacion, setTipoCapacitacion] = useState('');
  const [tiposCapacitacion, setTiposCapacitacion] = useState([]);
  const [fileInputKey, setFileInputKey] = useState('');
  const [IdCliente, setIdCliente] = useState('');
  const [IdFuncionario, setIdFuncionario] = useState('');
  const [clientes, setClientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  let navigate = useNavigate();

  const gotoMenu = () => { navigate('/capacitacion', {}); }

  const handleSubmit = async (event) => {
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
    if (tipoCapacitacion === '') {
      toast.error('Seleccione un tipo de capacitación válido.', {
          position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (modalidad === '') {
      toast.error('Seleccione una modalidad válida.', {
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
        fechaEjecucion: inputValueEjecucion, 
        documentos: fileInputKey,
        idEstado: estado,
        horasDuracion: horas, 
        fechaFinalizacion: inputValueFinal,
        modalidad: modalidad,
        idFuncionario: IdFuncionario, 
        precio: costo, 
        tipoCapacitacion: tipoCapacitacion, 
        idProyecto: 0, 
        idCliente: IdCliente  
      };

    console.log(data)

    const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    };
    const res = await fetch(`${API}/createCapacitacion`, requestOptions);
    if (res.ok) {
      Swal.fire({
        title: 'Confirmación',
        text: 'La capacitación se ha creado exitosamente',
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
        text: 'Hubo un problema al crear la capacitación.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  //const handleGetEstados = async () => {
    //await fetch('${API}/getEstado')
      //.then(response => response.json())
      //.then(data => {
        //console.log(data);
        //setOpciones(data);
      //})
      //.catch(error => {
        //console.error("Error al obtener estados:", error);
      //});
  //};

  const handleTiposCapacitacion = async () => {
    await fetch(`${API}/getTipoCapacitacion`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTiposCapacitacion(data);
      })
      .catch(error => {
        console.error("Error al obtener tipos de capacitacion:", error);
      });
  };

  const handleSearch = async () => {
    const res = await fetch(`${API}/getClientes`);
    const data = await res.json();//resultado de la consulta
    console.log(data)
    // Realiza la conversión de datos aquí
    const formattedData = data.map((item) => ({
      cedula: item[1],
      idCliente: item[0],
      nombre: item[2],
    }));
    setClientes(formattedData);

    const res2 = await fetch(`${API}/getFuncionarios`);
    const data2 = await res2.json();//resultado de la consulta
    console.log(data2)
    // Realiza la conversión de datos aquí
    const formattedData2 = data2.map((item) => ({
      cedula: item[4],
      idFuncionario: item[0],
      nombre: item[1] + ' ' + item[2],
    }));
    setFuncionarios(formattedData2);
    handleFechaEjecucionChange(new Date())
    handleFechaFinalChange(new Date())
  };

  React.useEffect(() => {
    handleSearch()
    handleTiposCapacitacion()
    //handleGetEstados()
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
  const handleTipoCapacitacionChange = (event) => {
    setTipoCapacitacion(event.target.value);
    console.log()
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
  const handleHoraChange = (event) => {
    const inputValue = event.target.value;
    // Expresión regular que valida un número decimal positivo
    const validPattern = /^\d*\.?\d*$/;

    if (validPattern.test(inputValue)) {
        // La entrada es válida, puedes actualizar el estado
        setHora(inputValue);
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
    const formattedDay = day.toString().padStart(2, '0');
        
    // Construir la cadena en el formato deseado (aaaa/dd/mm)
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
    //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
    setInputValueEjecucion(formattedDate);

  };

  const handleFechaFinalChange = (date) => {
    setFechaFinal(date);

    const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
    const day = date.getDate(); // Obtener el día
    const year = date.getFullYear(); // Obtener el año
    const formattedDay = day.toString().padStart(2, '0');
    // Construir la cadena en el formato deseado (aaaa/dd/mm)
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${formattedDay}`;
    //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
    setInputValueFinal(formattedDate);

    const monthC = fechaCreada.getMonth() + 1; 
    const dayC = fechaCreada.getDate(); 
    const yearC = fechaCreada.getFullYear(); 
    const formattedDayC = dayC.toString().padStart(2, '0');
    // Construir la cadena en el formato deseado (aaaa/dd/mm)
    const formattedDateC = `${yearC}-${monthC.toString().padStart(2, '0')}-${formattedDayC}`;
    //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));
    setInputValueCreacion(formattedDateC);


  };

  const handleInputChange = (e) => {
    setInputValueEjecucion(e.target.value);
  };

  const handleIdClienteChange = (idCliente) => {
    console.log(idCliente + 'Por aqui en handle')
    setIdCliente(idCliente);
  };

  const handleIdFuncionarioChange = (idFuncionario) => {
    setIdFuncionario(idFuncionario);
  };

  const handleModalidadChange = (event) => {
    setModalidad(event.target.value);
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
          <h1 className='titulo-h1'>Crear Capacitaciones</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="nameInput" class="form-label">Nombre:</label>
              <input style={{ marginLeft: '70px' }}type="text" class="form-control custom-margin-right" id="nameInput"
                placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange} />
            </div>
            <div class="mb-3">
              <label style={{ marginRight: '40px' }} for="descripInput" class="form-label">Descripción:</label>
              <input style={{ marginLeft: '66px' }} type="text" class="form-control custom-margin-right" id="descripInput"
                placeholder="Ingrese la descripcion de la capacitación" value={descripcion} onChange={handleDescripcionChange} />
            </div>
            <div className="mb-3" >
              <label for="costInput" class="form-label" style={{ marginTop: '2px', marginRight: '10px' }}>Horas:</label>
              <input  type="text" class="form-control custom-margin-right" id="costInput" style={{ width: '300px', marginLeft: '150px' }}
              placeholder="Ingrese la duración en horas de la capacitación" value={horas} onChange={handleHoraChange} />
            </div>
            <div className="mb-3">
              <label for="costInput" class="form-label" style={{ marginTop: '2px', marginRight: '10px' }}>Costo:</label>
              <input  type="text" class="form-control custom-margin-right" id="costInput" style={{ width: '300px' , marginLeft: '151px' }}
              placeholder="Ingrese el costo de la capacitación" value={costo} onChange={handleCostoChange} />
            </div>
            <div class="mb-3">
              <select style={{  width: '250px'  }}id="mySelect" value={estado} onChange={handleEstadoChange}>
              <option value="">Seleccione el estado</option>
              <option value="1">Eliminado</option>
              <option value="2">En progreso</option>
              <option value="3">Solicitado</option>
              <option value="4">En planeación</option>
              <option value="5">Activo</option>
              <option value="6">Inactivo</option>
              </select>
              <select style={{ marginLeft: '13px', width: '300px'  }} id="mySelect2" value={tipoCapacitacion} onChange={handleTipoCapacitacionChange}>
              <option value="">Seleccione el tipo de capacitación</option>
              {tiposCapacitacion.map(tipo => (
                <option key={tipo[0]} value={tipo[0]}>
                  {tipo[1]}
                </option>
              ))}
              </select>
              <select style={{ marginLeft: '13px', width: '300px'  }} id="mySelect3" value={modalidad} onChange={handleModalidadChange}>
                <option value="">Seleccione la modalidad</option>
                <option value="1">Presencial </option>
                <option value="2">Virtual</option>
                <option value="3">Hibrida</option>
              </select>
            </div>
            
            <div className="mb-3" style={{marginBottom: '50px'}}>
              <label  for="inputDate" className="form-label">
                  Seleccione la fecha de inicio:
              </label>
              <label  for="inputDate" className="form-label">
                  Seleccione la fecha de finalización:
              </label>
              <label  for="inputDate" className="form-label">
                  Seleccione los archivos adjuntos:
              </label>
            </div>
            <div className="mb-3" style={{ display: 'flex',alignItems: 'flex-start'  }}>
                <DatePicker
                     selected={fechaEjecucion}
                     onChange={handleFechaEjecucionChange}     
                    dateFormat="dd/MM/yyyy"
                    inline
                    showYearDropdown
                    showMonthDropdown
                />
                <div style={{ marginLeft: '81px' }}>
                    <DatePicker
                      selected={fechaFinal}
                      onChange={handleFechaFinalChange}         
                      dateFormat="dd/MM/yyyy"
                      inline
                      showYearDropdown
                      showMonthDropdown
                    />
                </div>
                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px'}}>
                    <input
                        style={{ marginLeft: '135px' }}
                        type="file"
                        key={fileInputKey}
                        onChange={handleFileChange}
                        multiple
                    />
                    <ul style={{ marginLeft: '150px', marginTop : '-15px'}}>
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
           
            <div style={{ marginTop: '30px' }}>
              <label class="form-label" style={{ marginBottom: '70px' }}>Cliente</label>
              <label class="form-label" style={{ marginLeft: '480px' }}>Funcionario</label>
              <div style={{ display: 'flex' }}>
                <Styles>
                  <Table columns={columns} data={clientes} handleIdClienteChange={handleIdClienteChange} />
                </Styles>
                <Styles style={{ marginLeft: '60px' }}>
                  <TableF columns={columnsF} data={funcionarios} handleIdFuncionarioChange={handleIdFuncionarioChange} />
                </Styles>
              </div>
            </div>
            <div className="mb-3"
              style={{ marginTop: '100px' }} >
              <button type="submit" className='button1' style={{ marginTop: '-100px' }} >
                <AiOutlinePlusCircle style={{
                  fontSize: '25px', marginRight: '20px', marginLeft: '20px'// Tamaño del icono
                }} /> Crear capacitación
              </button>
            </div>
            <ToastContainer />
          </form>

        </div>
      </div>

    </Fragment>
  );
};

export default CrearCapacitacion