import React, { useState, Fragment } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Clientes/CSSClientes/Clientes.css';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";
export const ModificarFuncionario = () => {
    let navigate = useNavigate();
    const gotoFuncionario = () => { navigate('/funcionarios'); }
    const { idFuncionario } = useParams();

    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [estado, setEstado] = useState('');
    
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);


    const fechaNacimientoInicial = new Date();
    const [inputValue, setInputValue] = useState('');
    fechaNacimientoInicial.setFullYear(fechaNacimientoInicial.getFullYear() - 10);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();  
        if (nombre.length < 2) {
            toast.error('El nombre debe ser mayor a un caracter.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
          if (apellido.length < 2) {
            toast.error('El apellido debe ser mayor a un caracter.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
          }
    
          // Validación del campo "cedula"
          if (cedula.length < 5) {
              toast.error('La cédula debe ser mayor 5 caracteres.', {
                  position: toast.POSITION.TOP_RIGHT,
              });
              return;
          }
    
          // Validación del campo "telefono"
          if (telefono.length < 5) {
              toast.error('El número de teléfono debe ser mayor 4 caracteres.', {
                  position: toast.POSITION.TOP_RIGHT,
              });
              return;
          }
    
          // Validación del campo "correo"
          if (correo.length < 5) {
              toast.error('El correo electrónico debe tener al menos 5 caracteres.', {
                  position: toast.POSITION.TOP_RIGHT,
              });
              return;
          }
          // Validación del formato de correo electrónico
          const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    
          if (!emailPattern.test(correo)) {
              toast.error('Por favor, ingrese un correo electrónico válido.', {
                  position: toast.POSITION.TOP_RIGHT,
              });
              return;
          }
        Swal.fire({
            title: '¿Está seguro que desea modificar el funcionario?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
                const formData = new FormData();
                console.log("stuf")
                const año = fechaNacimiento.getFullYear();
                const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
                const dia = String(fechaNacimiento.getDate()).padStart(2, "0");
                console.log(idFuncionario, nombre, apellido,fechaNacimiento, cedula, telefono, correo, estado, selectedOption)
                formData.append('nombre', nombre);
                formData.append('apellido', apellido);
                formData.append('fechaNacimiento', `${año}-${mes}-${dia}`);
                formData.append('cedula', cedula);
                formData.append('numTelefono', telefono);
                formData.append('correo', correo);
                formData.append('estado', estado);
                const opcionesSeleccionadasAnteriormente =selectedOption.map((opcion) => opcion.value);
                console.log(opcionesSeleccionadasAnteriormente, typeof(opcionesSeleccionadasAnteriormente))
                formData.append('perfilesIds', opcionesSeleccionadasAnteriormente);
                const res = await fetch(`${API}/updateFuncionario/${idFuncionario}`, {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) {
                    Swal.fire({
                        title: 'Confirmación',
                        text: 'El funcionario se ha modificado satisfactoriamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
                        allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
                        }).then((result) => {
                            if (result.isConfirmed) {
                            gotoFuncionario();}
                        });
                    } 
                    else {
                        Swal.fire({
                          title: 'Error',
                          text: 'Hubo un problema al modificar al funcionario.',
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
        //Buscamos la informacion del backend
        console.log(idFuncionario)
        const res = await fetch(`${API}/readFuncionario/${idFuncionario}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)

        setNombre(data[1])
        setApellido(data[2])
        setCedula(data[4])
        setTelefono(data[5])
        setCorreo(data[6])

        // ELIMINADO = 1
        // EN_PROGRESO = 2
        // SOLICITADO = 3
        // EN_PLANEACION = 4
        // ACTIVO = 5
        // INACTIVO = 6
        setEstado(data[7])
        //setFechaNacimiento(data[3])
        const fechaDesdeBackend = data[3];
        console.log(fechaDesdeBackend)
        //La fecha
        // const fechaBaseDatos = "2023-11-08T00:00:00Z"; // Ejemplo
        // Parsear la fecha de la base de datos en un objeto Date
        // Convertir la cadena de fecha en un objeto Date en zona horaria UTC
        //Tiene que se como el de abajo ya que es necesario la zona horaria entoces se agrega lo de T
        // const fechaDesdeBaseDatos = new Date(fechaSoloFecha + "T00:00:00Z");
        const fechaDesdeBaseDatos = new Date(fechaDesdeBackend);
        // Sumar un día a la fecha, ya que hay un desface de un dia ejemplo si es 8, pone 7 por eso la suma de uno
        fechaDesdeBaseDatos.setDate(fechaDesdeBaseDatos.getDate() + 1);
        // Luego, establece esa fecha en el estado fechaEjecucion
        setFechaNacimiento(fechaDesdeBaseDatos);

        // data[9] = [[1, 'programador'],[2, 'disenhador']]
        const response = await fetch(`${API}/getPerfiles`); // cambiar por el id
        const perfiles = await response.json();//resultado de la consulta
        console.log(perfiles)
       
        const opcionesDesdeBackend = perfiles;
            // Mapeamos las opciones desde el backend al formato que utiliza react-select
            const opcionesFormateadas = opcionesDesdeBackend.map((opcion) => ({
                value: opcion[0],
                label: opcion[1],
            }));
        
            setOptions(opcionesFormateadas);
          // Supongamos que las opciones seleccionadas anteriormente están en un array de IDs
            // data[9]
            // const opcionesSeleccionadasAnteriormente = [1, 2,3]; // IDs de opciones seleccionadas

            const opcionesSeleccionadasAnteriormente = data[9].map((opcion) => opcion[0]);

            // Mapeamos las IDs a objetos de opciones seleccionadas
            const opcionesSeleccionadas = opcionesSeleccionadasAnteriormente.map((value) =>
                opcionesFormateadas.find((opcion) => opcion.value === value)
            );

            // Establecer las opciones seleccionadas
            setSelectedOption(opcionesSeleccionadas);
    };
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleNameChange = (event) => {
        const inputValue = event.target.value;
        
        if (inputValue.length <= 50) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setNombre(event.target.value);
        } 
        else {
            // La entrada supera el límite, muestra un alert
            toast.error('El nombre no debe superar los 50 caracteres.', {
            position: toast.POSITION.TOP_RIGHT,
            });
        }
            
        };
    const handleApellidoChange = (event) => {
        const inputValue = event.target.value;
        
        if (inputValue.length <= 50) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setApellido(event.target.value);
        } 
        else {
            // La entrada supera el límite, muestra un alert
            toast.error('El apellido no debe superar los 50 caracteres.', {
            position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const handleCedulaChange = (event) => {
        const inputValue = event.target.value;
        // Expresión regular que valida un número entero sin 'e', comas, puntos, guiones y otros caracteres no deseados
        const validPattern = /^[0-9]*$/;

        if (validPattern.test(inputValue)) {
            // La entrada es válida, puedes actualizar el estado
            setCedula(inputValue);
        } else {
            // La entrada no es válida, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
            // Por ejemplo, mostrar un mensaje de error en la interfaz de usuario
            toast.error('Por favor, ingrese un número entero válido sin "e", comas, puntos, guiones ni otros caracteres no deseados.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const handleTelefonoChange = (event) => {
        const inputValue = event.target.value;
        // Expresión regular que valida un número entero sin 'e', comas, puntos, guiones y otros caracteres no deseados
        const validPattern = /^[0-9]*$/;

        if (validPattern.test(inputValue)) {
            // La entrada es válida, puedes actualizar el estado
            setTelefono(inputValue);
        } else {
            // La entrada no es válida, puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
            // Por ejemplo, mostrar un mensaje de error en la interfaz de usuario
            toast.error('Por favor, ingrese un número entero válido sin "e", comas, puntos, guiones ni otros caracteres no deseados.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            // alert('Por favor, ingrese un número entero válido sin "e", comas, puntos, guiones ni otros caracteres no deseados.');
        }
    };
    const handleCorreoChange = (event) => {
        const inputValue = event.target.value;
        
        if (inputValue.length <= 100) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setCorreo(inputValue);
        } else {
            // La entrada supera el límite, muestra un alert
            toast.error('El correo no debe superar los 100 caracteres.', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };
    const handleFechaNacimientoChange = (date) => {
        setFechaNacimiento(date);
        
        const month = date.getMonth() + 1; // Obtener el mes (se suma 1 ya que los meses se indexan desde 0)
        const day = date.getDate(); // Obtener el día
        const year = date.getFullYear(); // Obtener el año
        // Construir la cadena en el formato deseado (mm/dd/aaaa)
        
        const formattedDate = `${year}-${month}-${day}`;
        //console.log("Fecha formateada:", formattedDate, typeof(formattedDate));

        setInputValue(formattedDate);
        
    };
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: '300px', // Establece el ancho deseado
          minHeight: '47px', // Establece la altura deseada
          fontFamily: 'Lato, sans-serif',
        }),
        menu: (provided) => ({
          ...provided,
          overflowX: 'auto', // Habilita el desplazamiento horizontal
          fontFamily: 'Lato, sans-serif',
        }),
      };
    React.useEffect(() => {
        handleSearch()
    }, []);
    return (
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                    <h1 class="titulo-h1">Modificar Funcionario</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label style={{ marginRight: '150px' }} for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '148px'  }}for="apellidoInput" class="form-label">Apellido:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el primer apellido" value={apellido} onChange={handleApellidoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '160px' }}for="nameInput" class="form-label">Cédula:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese la Cédula Juridica" value={cedula} onChange={handleCedulaChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '43px' }} for="nameInput" class="form-label">Número de teléfono:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el número de teléfono " value={telefono} onChange={handleTelefonoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '160px' }} for="nameInput" class="form-label">Correo:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el correo electronico" value={correo} onChange={handleCorreoChange}/>
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '160px' }} for="nameInput" class="form-label">Estado:</label>
                            <select id="mySelect" value={estado} onChange={handleEstadoChange}>
                                <option value="">Seleccione el estado del cliente</option>
                                <option value="5">Activo</option>
                                <option value="6">Inactivo</option>
                            </select>
                        </div>
                        <div className="mb-3"style={{ marginBottom:  '50px' }}>
                            <label  for="inputDate" className="form-label" style={{ marginRight:  '100px' }} >
                                Seleccione la fecha de nacimiento:
                            </label>
                            <label  for="inputDate" className="form-label" >
                                Seleccione el o los tipo(s) de perfil(es)
                            </label>
                        </div>
                        <div className="mb-3" style={{ display: 'flex', alignItems: 'flex-start'  }}>
                            <DatePicker
                                selected={fechaNacimiento}
                                onChange={handleFechaNacimientoChange}
                                dateFormat="dd/MM/yyyy"
                                inline
                                showYearDropdown
                                showMonthDropdown
                                maxDate={fechaNacimientoInicial}
                            />
                            <div style={{marginLeft: '150px'}}>
                                <Select
                                    options={options}
                                    isMulti
                                    name="colors"
                                    classNamePrefix="select"
                                    className="basic-multi-select"
                                    value={selectedOption}
                                    onChange={setSelectedOption}
                                    styles={customStyles}
                                />
                            </div>
                        
                        </div>    
                        <div className="mb-3" style={{ marginRight: '140px', marginTop: '60px' }}>
                            <button type="submit" className='button1' >
                                <BsFillPencilFill style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> <div style={{ textAlign: 'left' }}>
                                        Modificar<br />Funcionario
                                    </div>
                            </button>
                        
                        </div>

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
