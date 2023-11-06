import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import '../Clientes/CSSClientes/Clientes.css'
import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";
export const DetalleMiCuenta = () => {
        let navigate = useNavigate();
        const gotoCliente = () => { navigate('/clientes'); }
        const gotoModificarMiCuenta = () => { navigate('/modficarMiCuenta'); }
        const [idFuncionario, setidFuncionario] = useState('');
        const [nombre, setNombre] = useState('');
        const [cedula, setCedula] = useState('');
        const [fechaNacimineto, setfechaNacimineto] = useState('');
        const [fechaIngreso, setfechaIngreso] = useState('');
        const [telefono, setTelefono] = useState('');
        const [estado, setEstado] = useState('');
        const [correo, setCorreo] = useState('');
        const [selectedOption, setSelectedOption] = useState([]);
        const [options, setOptions] = useState([]);
    
    
        const handleSearch = async () => {
            //Buscamos la informacion del backend
            const res = await fetch(`${API}/readUsuario/${1}`); // cambiar por el id
            const data = await res.json();//resultado de la consulta
            console.log(data)

            setidFuncionario(data[0])
            setNombre(data[1] + " " + data[2])
            setCedula(data[4])
            setfechaNacimineto(data[3])
            setfechaIngreso(data[8])
            setTelefono(data[5])
            setCorreo(data[6])

            // ELIMINADO = 1
            // EN_PROGRESO = 2
            // SOLICITADO = 3
            // EN_PLANEACION = 4
            // ACTIVO = 5
            // INACTIVO = 6
            var est = ''
            if (data[7] === 1) { est = 'Eliminado' }
            if (data[7] === 2) { est = 'En progreso' }
            if (data[7] === 3) { est = 'Solicitado' }
            if (data[7] === 4) { est = 'En planeacion' }
            if (data[7] === 5) { est = 'Activo' }
            if (data[7] === 6) { est = 'Inactivo' }
            setEstado(est)
            
            
            
        };
        const Title = styled.h1`
        font-size: 24px;
        color: #000000;
        margin-bottom: 80px;
        margin-top: 25px;
        `;
        const handleDelete = async () =>{
            Swal.fire({
                title: '¿Está seguro que desea eliminar el funcionario seleccionado?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: `Cancelar`,
                confirmButtonColor: "#4CAF50",
                denyButtonColor: "#d33",
                allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
                allowEscapeKey: false, 
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                
                if (result.isConfirmed) {
                  Swal.fire('El funcionario se ha eliminado satisfactoriamente')
                  gotoCliente();
                } else if (result.isDenied) {
                  Swal.fire('No se guaron los cambios')
                }
              })
    
    
        }
        React.useEffect(() => {
            handleSearch()
        }, []);
        return (
            <Fragment>
            <div className="container"> 
            <Navbar />
                <div class="row">
                        <div class="col-sm-3">
                            <h1 class="titulo-h1">{nombre}</h1>
                        </div>
                        <div class="mb-3" style={{ marginTop: '-20px'}}>
                            <h2 class="titulo-h2" >
                                Información general
                            </h2>
                            <div className="dividers"></div>
                        </div>
                        <div style={{ marginLeft:'20px' }}>
                            <div class="mb-3" style={{ marginTop: '30px'}}>
                                <label style={{ marginRight: '110px'}} for="nameInput" class="form-label custom-label">Nombre completo:</label>
                                <label  style={{ marginLeft: '100px' }}for="idNombre" class="form-label custom-label">{nombre}</label>
                            </div>
                            <div class="mb-3" style={{ marginTop: '30px'}} >
                                <label  style={{ marginRight: '150px' }}for="cedulainput" class="form-label custom-label">Cédula:</label>
                                <label  style={{ marginLeft: '130px' }}for="cedula" class="form-label custom-label">{cedula}</label>
                            </div>
                            
                            <div class="mb-3" style={{ marginTop: '30px'}} >
                                <label  style={{ marginRight: '90px' }}for= "fechaNaciminetoinput"class="form-label custom-label">Fecha de nacimiento:</label>
                                <label  style={{ marginLeft: '105px' }}for="fechaNacimiento" class="form-label custom-label">{fechaNacimineto}</label>
                            </div>
                        </div>
                        <div class="mb-3" style={{ marginTop: '40px'}}>
                            <h2 class="titulo-h2" >
                                Información de contacto
                            </h2>
                            <div className="dividers"></div>
                        </div>
                        <div style={{ marginLeft:'20px' }}>
                            <div class="mb-3" style={{ marginTop: '30px'}} >
                                <label style={{ marginRight: '55px' }} for="telefonoInput" class="form-label custom-label">Número de teléfono:</label>
                                <label  style={{ marginLeft: '145px' }}for="telefono" class="form-label custom-label">{telefono}</label>
                                
                            </div>
                            <div class="mb-3" style={{ marginTop: '30px'}} >
                                <label style={{ marginRight: '150px' }} for="correoInput" class="form-label custom-label">Correo:</label>
                                <label  style={{ marginLeft: '131px' }}for="correo" class="form-label custom-label">{correo}</label>  
                            </div>
                        </div>
                        <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarMiCuenta}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /><div style={{ textAlign: 'left' }}> 
                                Modificar<br />Mi información
                            </div>
                            </button>
                            
                        </div>
    
                         </div>
                         
                         
            </div>
    
        </Fragment>
        );
    };