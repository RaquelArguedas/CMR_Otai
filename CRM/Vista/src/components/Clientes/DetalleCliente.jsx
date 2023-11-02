import React, { useState, Fragment } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import './CSSClientes/Clientes.css'

import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";
export const DetalleCliente = () => {
    
    let navigate = useNavigate();
    const { idCliente } = useParams();
    
    const gotoModificarCliente= () => { navigate(`/modificarCliente/${idCliente}`); }
    const gotoCliente = () => { navigate('/clientes'); }
    const [idClientes, setIdCliente] = useState('');
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [correo, setCorreo] = useState('');

    const handleSearch = async () => {
        //Buscamos la informacion del backend
        console.log(idCliente)
        const res = await fetch(`${API}/readCliente/${idCliente}`); // cambiar por el id
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
              const res = fetch(`${API}/deleteCliente/${idCliente}`); // cambiar por el id
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
                    <div class="col-sm-3" style={{ marginBottom: '20px'}}>
                        <h1 class="titulo-h1">
                            {nombre}
                        </h1>
                    </div>
                    <div class="mb-3" style={{ marginTop: '-20px'}}>
                        <h2 class="titulo-h2" >
                            Información general
                        </h2>
                        <div className="dividers"></div>
                    </div>
                    <div style={{ marginLeft:'20px' }}>
                        <div class="mb-3" >
                            <label style={{ marginRight: '145px'}} for="idClienteInput" class="form-label custom-label">ID Cliente:</label>
                            <label  style={{ marginLeft: '130px' }}for="idCliente" class="form-label custom-label">{idClientes}</label>
                            
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}}>
                            <label style={{ marginRight: '145px'}} for="nameInput" class="form-label custom-label">Nombre:</label>
                            <label  style={{ marginLeft: '143px' }}for="idNombre" class="form-label custom-label">{nombre}</label>
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label  style={{ marginRight: '95px' }}for="cedulainput" class="form-label custom-label">Cédula Jurídica:</label>
                            <label  style={{ marginLeft: '148px' }}for="cedula" class="form-label custom-label">{cedula}</label>
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
                            <label style={{ marginRight: '63px' }} for="telefonoInput" class="form-label custom-label">Número de teléfono:</label>
                            <label  style={{ marginLeft: '150px' }}for="telefono" class="form-label custom-label">{telefono}</label>
                            
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label style={{ marginRight: '150px' }} for="correoInput" class="form-label custom-label">Correo:</label>
                            <label  style={{ marginLeft: '146px' }}for="correo" class="form-label custom-label">{correo}</label>  
                        </div>
                    </div>
                    <div class="mb-3" style={{ marginTop: '40px'}}>
                        <h2 class="titulo-h2" >
                            Información adicional
                        </h2>
                        <div className="dividers"></div>
                    </div>
                    <div style={{ marginLeft:'20px' }}>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label  style={{ marginRight: '90px' }}for="fechaIngresoinput" class="form-label custom-label">Fecha de ingreso:</label>
                            <label  style={{ marginLeft: '145px' }}for="fechaIngreso" class="form-label custom-label">{fechaIngreso}</label>
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label style={{ marginRight: '150px' }} for="estadoInput" class="form-label custom-label">Estado:</label>
                            <label  style={{ marginLeft: '150px' }}for="estadp" class="form-label custom-label">{estado}</label>  
                        </div>
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