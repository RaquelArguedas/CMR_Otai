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
export const CrearUsuario = () => {
    let navigate = useNavigate();
    const gotoUsuario = () => { navigate('/crearUsuario'); }
    // toastify.configure({
    //     position: toast.POSITION.TOP_RIGHT,
    //   });

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
    
    const handleSubmit = async (event) => {
        event.preventDefault();  

        
        // Validación del campo "nombre"
        if (nombre.length < 2) {
            toast.error('El nombre debe ser mayor a un caracter.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
    
        // Validación del campo "apellido"
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
        //Es para enviar informacion al backend
        //Lo de abajo es la notificacion de que ya se creo la evalaucion

        // en data se guarda si existe o no el correo
        const res2 = await fetch(`${API}/existeUsuarioCorreo/${correo}`); 
        const data = await res2.json();//resultado de la consulta
        console.log(data)

        if (data == 0){
          const formData = new FormData();
          console.log("stuf")
          const año = fechaNacimiento.getFullYear();
          const mes = String(fechaNacimiento.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
          const dia = String(fechaNacimiento.getDate()).padStart(2, "0");
          const numeroAleatorio = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
          console.log(nombre, apellido,fechaNacimiento, cedula, telefono, correo)
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('fechaNacimiento', `${año}-${mes}-${dia}`);
            formData.append('cedula', cedula);
            formData.append('numTelefono', telefono);
            formData.append('correo', correo);
            formData.append('contrasenha', numeroAleatorio);
            const res = await fetch(`${API}/createUsuario`, {
                method: 'POST',
                body: formData
            });
            console.log("res:",res)
        //Recordar en el backend poner lo de fecha de ingreso que se hace alla
        //SE DEBE RECUPERAR LA CONTRASEÑA 
        Swal.fire({
          title: 'Confirmación',
          html: 'El usuario se ha creado satisfactoriamente<br/><br/>La contraseña temporal es:' + numeroAleatorio,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false,
          allowEscapeKey: false,
      }).then((result) => {
          if (result.isConfirmed) {
              // Recargar la página
              window.location.reload();
          }
      });
          
        }else{
          Swal.fire({
            title: 'Error',
            html: 'El correo ya se encuentra ingresado', // Cambia el texto según tus necesidades,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,    // Evita que se cierre al presionar la tecla Escape (esc)
          });
        }
        

        
        
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
            setNombre(inputValue);
        } else {
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
            setApellido(inputValue);
        } else {
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
        }),
        menu: (provided) => ({
          ...provided,
          overflowX: 'auto', // Habilita el desplazamiento horizontal
        }),
      };
    return (
        
        <Fragment>
        <div className="container"> 
        <Navbar />
        <div class="row">
                    <div class="col-sm-3">
                        <h1 class="titulo-h1">
                        Crear Usuario
                        </h1>
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
                            <label  style={{ marginRight: '160px' }}for="nameInput" class="form-label">Cédula:</label>
                            <input type="text" class="form-control custom-margin-right" id="nameInput"
                            placeholder="Ingrese la Cédula Juridica" value={cedula} onChange={handleCedulaChange}/>
                            
                        </div>
                        <div class="mb-3">
                            <label style={{ marginRight: '45px' }} for="celInput" class="form-label">Número de teléfono:</label>
                            <input type="text" class="form-control custom-margin-right" id="celInput"
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
                                                                    
                        <div className="mb-3" style={{ marginRight: '140px', marginTop:  '100px' }} >
                            <button type="submit" className='button1' >
                                <AiOutlinePlusCircle style={{
                                            fontSize: '25px',  marginRight: '20px',  marginLeft: '20px'// Tamaño del icono
                                        }} /> Crear usuario
                            </button>
                        
                        </div>
        
                        <ToastContainer />
                    </form>

            </div>
                     
                     
        </div>

    </Fragment>
    );
};
