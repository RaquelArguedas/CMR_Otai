import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import './CSSClientes/Clientes.css'

import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";
export const DetalleCliente = () => {
    
    let navigate = useNavigate();
    const gotoModificarCliente= () => { navigate('/modificarCliente'); }
    const gotoCliente = () => { navigate('/clientes'); }

    const [idCliente, setIdCliente] = useState('');
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [correo, setCorreo] = useState('');

    const handleSearch = async () => {
        //Buscamos la informacion del backend

        console.log(1)
        const res = await fetch(`${API}/readCliente/${1}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)

        setIdCliente(data[0])
        setCedula(data[1])
        setNombre(data[2])
        setTelefono(data[3])
        setCorreo(data[4])
        setFechaIngreso(data[5])

        // ELIMINADO = 1
        // EN_PROGRESO = 2
        // SOLICITADO = 3
        // EN_PLANEACION = 4
        // ACTIVO = 5
        // INACTIVO = 6
        var est = ''
        if (data[6] === 1) { est = 'Eliminado' }
        if (data[6] === 2) { est = 'En progreso' }
        if (data[6] === 3) { est = 'Solicitado' }
        if (data[6] === 4) { est = 'En planeacion' }
        if (data[6] === 5) { est = 'Activo' }
        if (data[6] === 6) { est = 'Inactivo' }
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
            title: '¿Está seguro que desea eliminar el cliente seleccionado?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              Swal.fire('El cliente se ha eliminado satisfactoriamente')
              const res = fetch(`${API}/deleteCliente/${1}`); // cambiar por el id
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
                    <div class="mb-3" >
                        <label style={{ marginRight: '145px'}} for="idClienteInput" class="form-label">ID Cliente:</label>
                        <label  style={{ marginLeft: '130px' }}for="idCliente" class="form-label">{idCliente}</label>
                        
                    </div>
                    <div class="mb-3" style={{ marginTop: '50px'}}>
                        <label style={{ marginRight: '145px'}} for="nameInput" class="form-label">Nombre:</label>
                        <label  style={{ marginLeft: '150px' }}for="idNombre" class="form-label">{nombre}</label>
                    </div>
                    <div class="mb-3" style={{ marginTop: '50px'}} >
                        <label  style={{ marginRight: '95px' }}for="cedulainput" class="form-label">Cédula Jurídica:</label>
                        <label  style={{ marginLeft: '130px' }}for="cedula" class="form-label">{cedula}</label>
                    </div>
                    <div class="mb-3" style={{ marginTop: '50px'}} >
                        <label  style={{ marginRight: '90px' }}for="fechaIngresoinput" class="form-label">Fecha de ingreso:</label>
                        <label  style={{ marginLeft: '130px' }}for="fechaIngreso" class="form-label">{fechaIngreso}</label>
                    </div>
                    <div class="mb-3" style={{ marginTop: '50px'}} >
                        <label style={{ marginRight: '50px' }} for="telefonoInput" class="etiqueta-personalizada">Número de teléfono:</label>
                        <label  style={{ marginLeft: '145px' }}for="telefono" class="etiqueta-personalizada">{telefono}</label>
                        
                    </div>
                    <div class="mb-3" style={{ marginTop: '50px'}} >
                        <label style={{ marginRight: '150px' }} for="correoInput" class="form-label">Correo:</label>
                        <label  style={{ marginLeft: '150px' }}for="correo" class="form-label">{correo}</label>  
                    </div>
                    <div class="mb-3" style={{ marginTop: '50px'}} >
                        <label style={{ marginRight: '150px' }} for="estadoInput" class="form-label">Estado:</label>
                        <label  style={{ marginLeft: '150px' }}for="estadp" class="form-label">{estado}</label>  
                    </div>
                    <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                        <button type="submit" className="button2" onClick={gotoModificarCliente}>
                            <BsFillPencilFill style={{
                            fontSize: '25px',
                            marginRight: '20px',
                            marginLeft: '20px',
                            color: '#12959E' // Tamaño del icono
                            }} /> Modificar cliente
                        </button>
                        <button type="submit" className="button2" onClick={handleDelete}>
                            <RiDeleteBinLine style={{
                            fontSize: '25px',
                            marginRight: '20px',
                            marginLeft: '20px',
                            color: '#12959E' // Tamaño del icono
                            }} /> Eliminar cliente
                        </button>
                    </div>

                     </div>
                     
                     
        </div>

    </Fragment>
    );
};