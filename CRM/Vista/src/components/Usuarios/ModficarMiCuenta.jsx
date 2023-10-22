import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Clientes/CSSClientes/Clientes.css';
import Select from 'react-select';
const API = "http://127.0.0.1:5000";
export const ModficarMiCuenta = () => {
    let navigate = useNavigate();
    const gotoMiCuenta= () => { navigate('/detalleMiCuenta'); }

    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [estado, setEstado] = useState('');
    const [contrasenna, setContrasenna] = useState('');
    
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);

    const fechaNacimientoInicial = new Date();
    const [inputValue, setInputValue] = useState('');
    fechaNacimientoInicial.setFullYear(fechaNacimientoInicial.getFullYear() - 10);
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();  

        const res = await fetch(`${API}/readUsuario/${1}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        const miCorreo = data[6]


        //traer todos los correos
        const res2 = await fetch(`${API}/getCorreosUsuarios`); 
        const correos = await res2.json();//resultado de la consulta
        console.log("AAAAAAAAAAAAAAA")
        console.log(correos)

        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        //Para enviar la fecha es inputValue
        Swal.fire({
            title: '¿Está seguro que desea modificar la información?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const correoExiste = correos.some((c) => c == correo);
                console.log("correoExiste: ", correoExiste)
                console.log("miCorreo: ", miCorreo, correo)
                console.log("miCorreo!=correo: ", miCorreo!=correo)
                if (!correoExiste || miCorreo==correo){
                    const formData = new FormData();
                    console.log("stuf")
                    const año = fechaNacimiento.getFullYear();
                    const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
                    const dia = String(fechaNacimiento.getDate()).padStart(2, "0");
                //console.log(idFuncionario, nombre, apellido,fechaNacimiento, cedula, telefono, correo, estado, selectedOption)
                    formData.append('nombre', nombre);
                    formData.append('apellido', apellido);
                    formData.append('fechaNacimiento', `${año}-${mes}-${dia}`);
                    formData.append('cedula', cedula);
                    formData.append('numTelefono', telefono);
                    formData.append('correo', correo);
                    formData.append('contrasenha', contrasenna);
                    const res = fetch(`${API}/updateUsuario/${1}`, {
                        method: 'POST',
                        body: formData
                    });
                    gotoMiCuenta();
                    Swal.fire('Error: Su información se ha modificado satisfactoriamente')
                }else{
                    Swal.fire('Ya el correo se encuentra registrado')
                }
                
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })
        
    }
  
    const handleSearch = async () => {
        //Buscamos la informacion del backend
       
        const res = await fetch(`${API}/readUsuario/${1}`); // cambiar por el id
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
       
    };
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleNameChange = (event) => {
        setNombre(event.target.value);
    };
    const handleApellidoChange = (event) => {
        setApellido(event.target.value);
    };
    const handleCedulaChange = (event) => {
        setCedula(event.target.value);
    };
    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
    };
    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };
    const handleEstadoChange = (event) => {
        setEstado(event.target.value);
    };
    const handleContrasennaChange = (event) => {
        setContrasenna(event.target.value);
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
    React.useEffect(() => {
        handleSearch()
    }, []);
    return (
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                        <h1 class="titulo-h1">Mi información</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label style={{ marginRight: '150px' }} for="nameInput" class="form-label">Nombre:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el nombre" value={nombre} onChange={handleNameChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '149px'  }}for="apellidoInput" class="form-label">Apellido:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el primer apellido" value={apellido} onChange={handleApellidoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label  style={{ marginRight: '161px' }}for="nameInput" class="form-label">Cédula:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese la Cédula Juridica" value={cedula} onChange={handleCedulaChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '45px' }} for="nameInput" class="form-label">Número de teléfono:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el número de teléfono " value={telefono} onChange={handleTelefonoChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '161px' }} for="nameInput" class="form-label">Correo:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese el correo electronico" value={correo} onChange={handleCorreoChange}/>
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '120px' }} for="nameInput" class="form-label">Contraseña:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese la nueva contraseña" value={contrasenna} onChange={handleContrasennaChange}/>
                        </div>
                        <div className="mb-3"style={{ marginBottom:  '50px' }}>
                            <label  for="inputDate" className="form-label" style={{ marginRight:  '100px' }} >
                                Seleccione la fecha de nacimiento:
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
                           
                        
                        </div>    
                        <div className="mb-3" style={{ marginRight: '140px', marginTop: '60px' }}>
                            <button type="submit" className='button1' >
                                <BsFillPencilFill style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> <div style={{ textAlign: 'left' }}>
                                        Modificar<br />Mi Información
                                    </div>
                            </button>
                        
                        </div>

                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
