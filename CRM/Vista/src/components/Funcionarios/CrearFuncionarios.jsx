import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../Clientes/CSSClientes/Clientes.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Select from 'react-select';
const API = "http://127.0.0.1:5000";
export const CrearFuncionarios = () => {
    let navigate = useNavigate();
    const gotoCliente = () => { navigate('/funcionarios'); }


    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const fechaNacimientoInicial = new Date();
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    fechaNacimientoInicial.setFullYear(fechaNacimientoInicial.getFullYear() - 10);

    const [fechaNacimiento, setFechaNacimiento] = useState(fechaNacimientoInicial);

    const handleFechaNacimientoChange = (date) => {
        setFechaNacimiento(date);
    };
    
    const handleCrearPerfil= async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
      	
        Swal.fire({
            title: 'Crear perfil',
            input: 'text',
            inputLabel: 'Nombre del perfil',
            inputPlaceholder: 'Ingrese el nombre del perfil',
            showDenyButton: true, // Agregar botones de confirmación y cancelación
            confirmButtonText: 'Aceptar', // Cambiar texto del botón de confirmación
            confirmButtonColor:'#12959E',
            denyButtonText: 'Cancelar', // Cambiar texto del botón de cancelación
            denyButtonColor: '#FF0000',
            allowOutsideClick: false, // Evitar cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,
            
          }).then(async (result) => {
            if (result.isConfirmed) {
              const nombre = result.value; // Obtener el valor del input
              if (nombre !== '') {
                //Enviar al backend
                const res = await fetch(`${API}/createPerfil/${nombre}`, {
                  method: 'POST'
              });
              const idPerfil = await res.json();
              console.log("REEEES");
                console.log(idPerfil)
                //Recuperar opcion creada
                setOptions((prevOptions) => [
                    ...prevOptions,
                    { value: idPerfil, label: nombre },
                  ]);
                Swal.fire('Se ingresó correctamente: ' + nombre);
              } else {
                Swal.fire('Incorrecto', 'Debe ingresar el nombre', 'error');
              }
            } else if (result.isDenied) {
              Swal.fire('Operación cancelada');
            }
          })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        Swal.fire({
            title: 'Confirmación',
            text: 'El empleado se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              const formData = new FormData();
              console.log("stuf")
            const año = fechaNacimiento.getFullYear();
            const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
            const dia = String(fechaNacimiento.getDate()).padStart(2, "0");
              console.log(nombre, apellido,fechaNacimiento, cedula, telefono, correo, selectedOption)
                formData.append('nombre', nombre);
                formData.append('apellido', apellido);
                formData.append('fechaNacimiento', `${año}-${mes}-${dia}`);
                formData.append('cedula', cedula);
                formData.append('numTelefono', telefono);
                formData.append('correo', correo);
                const opcionesSeleccionadasAnteriormente =selectedOption.map((opcion) => opcion.value);
                console.log(opcionesSeleccionadasAnteriormente, typeof(opcionesSeleccionadasAnteriormente))
                formData.append('perfilesIds', opcionesSeleccionadasAnteriormente);
                const res = fetch(`${API}/createFuncionario`, {
                    method: 'POST',
                    body: formData
                });
              gotoCliente();
            }
          });
        
    };
    
    const handleSearch = async () => {
        const response = await fetch(`${API}/getPerfiles`); // cambiar por el id
        const perfiles = await response.json();//resultado de la consulta
        const opcionesDesdeBackend = perfiles;
        console.log(opcionesDesdeBackend);
            // Mapeamos las opciones desde el backend al formato que utiliza react-select
            const opcionesFormateadas = opcionesDesdeBackend.map((opcion) => ({
                value: opcion[0],
                label: opcion[1],
            }));
        
            setOptions(opcionesFormateadas);
    };
      const handleSelectChange = (selected) => {
        setSelectedOption(selected);
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
    // const customStyles = {
    //       control: (provided) => ({
    //         ...provided,
    //         width: '300px', // Ancho deseado
    //         height: '47px', // Altura deseada
    //       }),
    //     };
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
              <h1 class="titulo-h1">Crear Funcionario</h1>
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
              <div style={{marginLeft: '162px'}}>
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
                <div style={{marginLeft: '150px'}}>
                    <button className='button2' onClick={handleCrearPerfil}>
                        <AiOutlinePlusCircle style={{
                                    fontSize: '25px',  marginRight: '20px',  marginLeft: '20px', color: '#12959E'// Tamaño del icono
                                }} /> Crear perfil
                    </button>
                </div>
              </div>
                                                          
              <div className="mb-3" style={{ marginRight: '140px', marginTop:  '100px' }} >
                <button type="submit" className='button1' >
                    <AiOutlinePlusCircle style={{
                                fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                            }} /> Crear funcionario
                </button>
              </div>

            </form>

          </div>
                     
                     
        </div>

    </Fragment>
    );
};
