import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import '../Clientes/CSSClientes/Clientes.css'
import Swal from 'sweetalert2';

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
            
            setidFuncionario('E1231')
            setNombre('Ministerio de salud')
            setCedula('123129131')
            setfechaNacimineto('20/09/2023')
            setfechaIngreso('15/10/2005')
            setTelefono('25486963')
            setCorreo('ministeriosalud@gmail.com')
            setEstado('Activo')
            
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
                            <Title>{nombre}</Title>
                        </div>
                        <div class="mb-3" style={{ marginTop: '50px'}}>
                            <label style={{ marginRight: '110px'}} for="nameInput" class="form-label">Nombre completo:</label>
                            <label  style={{ marginLeft: '100px' }}for="idNombre" class="form-label">{nombre}</label>
                        </div>
                        <div class="mb-3" style={{ marginTop: '50px'}} >
                            <label  style={{ marginRight: '150px' }}for="cedulainput" class="form-label">Cédula:</label>
                            <label  style={{ marginLeft: '150px' }}for="cedula" class="form-label">{cedula}</label>
                        </div>
                        
                        <div class="mb-3" style={{ marginTop: '50px'}} >
                            <label  style={{ marginRight: '90px' }}for= "fechaNaciminetoinput"class="form-label">Fecha de nacimiento:</label>
                            <label  style={{ marginLeft: '95px' }}for="fechaNacimiento" class="form-label">{fechaNacimineto}</label>
                        </div>
                        <div class="mb-3" style={{ marginTop: '50px'}} >
                            <label style={{ marginRight: '50px' }} for="telefonoInput" class="etiqueta-personalizada">Número de teléfono:</label>
                            <label  style={{ marginLeft: '145px' }}for="telefono" class="etiqueta-personalizada">{telefono}</label>
                            
                        </div>
                        <div class="mb-3" style={{ marginTop: '50px'}} >
                            <label style={{ marginRight: '150px' }} for="correoInput" class="form-label">Correo:</label>
                            <label  style={{ marginLeft: '150px' }}for="correo" class="form-label">{correo}</label>  
                        </div>
                        
                        <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarMiCuenta}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /><div style={{ textAlign: 'left' }}> 
                                Modificar<br />Mi Información
                            </div>
                            </button>
                            
                        </div>
    
                         </div>
                         
                         
            </div>
    
        </Fragment>
        );
    };