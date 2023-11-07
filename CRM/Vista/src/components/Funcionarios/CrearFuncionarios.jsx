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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API = "http://127.0.0.1:5000";
export const CrearFuncionarios = () => {
    let navigate = useNavigate();
    const gotoFuncionario = () => { navigate('/funcionarios'); }


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
            denyButtonText: 'Cancelar', // Cambiar texto del botón de cancelación
            confirmButtonColor: "#4CAF50",
            denyButtonColor: "#d33",
            allowOutsideClick: false, // Evitar cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,
            inputValidator: (value) => {
              if (value.length > 50) {
                return 'El nombre del perfil no debe superar los 50 caracteres.';
              }
            }
            
          }).then(async (result) => {
            const confirmButton = Swal.getConfirmButton();
            if (result.value.length > 50) {
              return 'El nombre del perfil no debe superar los 50 caracteres.';
            }
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
      // Validación del campo "nombre"
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
      const res = await fetch(`${API}/createFuncionario`, {
          method: 'POST',
          body: formData
      });
      if (res.ok) {
        Swal.fire({
            title: 'Confirmación',
            text: 'El funcionario se ha creado satisfactoriamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          }).then((result) => {
            if (result.isConfirmed) {
              gotoFuncionario();}
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al crear al funcionario.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        
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
          if (inputValue.length <= 9) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setCedula(inputValue);
          } else {
              // La entrada supera el límite, muestra un alert
              toast.error('La cédula no debe superar los 9 digitos.', {
                  position: toast.POSITION.TOP_RIGHT,
              });
          }
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
          if (inputValue.length <= 9) {
            // La entrada no supera el límite de 100 caracteres, puedes actualizar el estado
            setTelefono(inputValue);
          } else {
              // La entrada supera el límite, muestra un alert
              toast.error('El número de teléfono no debe superar los 9 digitos.', {
                  position: toast.POSITION.TOP_RIGHT,
              });
          }
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
            <ToastContainer />
          </form>

        </div>
                    
                    
      </div>

  </Fragment>
  );
};
