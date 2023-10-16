import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import './DetalleCotizacion.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";

export const DetalleCotizacion = () => {
    let navigate = useNavigate();
    const { idCotizacion } = useParams();
    const gotoModificarCotizacion = () => { navigate(`/modificarCotizacion/${idCotizacion}`); }
    const gotoCotizaciones = () => { navigate('/cotizacion'); }

    const [idcotizacion, setidCotizacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEjecucion, setFechaEjecucion] = useState('');
    const [estado, setEstado] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [total, setTotal] = useState('');
    const [serviciosAsociados, setServiciosAsociados] = useState('');
    //const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    const archivosAdjuntos = [
        { nombre: 'Carnet e Infrome de matricula.pdf', url: 'CRMFrontend\public\Carnet e Infrome de matricula.pdf' },
        { nombre: 'logo192.png', url: 'CRMFrontend/public/logo192.png' },
      ];
    
    const handleSearch = async () => {
        const res = await fetch(`${API}/readCotizacion/${idCotizacion}`); 
        const data = await res.json();//resultado de la consulta
        const resp = await fetch(`${API}/readCliente/${data[3]}`); 
        const datac = await resp.json();//resultado de la consulta
        const respu = await fetch(`${API}/readCliente/${data[3]}`); 
        const datap = await respu.json();//resultado de la consulta
        setNombre(data[1])
        setDescripcion(data[2])
        setFechaEjecucion(data[8])
        var est = ''
        if (data[7] === 1) { est = 'Eliminado' }
        if (data[7] === 2) { est = 'En progreso' }
        if (data[7] === 3) { est = 'Solicitado' }
        if (data[7] === 4) { est = 'En planeacion' }
        if (data[7] === 5) { est = 'Activo' }
        if (data[7] === 6) { est = 'Inactivo' }
        setEstado(est)
        setTotal(data[5])
        setCedula(datac[1])
        setNombreCliente(datac[2])


    };

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar la cotización seleccionada?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('La cotización se ha eliminado satisfactoriamente')
                const res = fetch(`${API}/deleteCotizacion/${idCotizacion}`, {method: 'POST'}); // cambiar por el id
                gotoCotizaciones();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios')
            }
        })
    }


    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;

    React.useEffect(() => {
        handleSearch()
    }, []);
    return (
        
        <Fragment>
        <div className="container"> 
        <Navbar />
            <div>
                    <div>
                        <Title>{nombre}</Title>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label  for="idColabel" class="form-label">ID Cotización:</label>
                        <label  style={{ marginLeft: '130px' }}for="idCotizacion" class="form-label">{idCotizacion}</label>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label for="namelabel" class="form-label">Nombre:</label>
                        <label style={{ marginLeft: '180px' }} for="nameCotizacion" class="form-label">{nombre}</label>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label for="descripcionLabel" class="form-label">Descripción:</label>
                        <label style={{ marginLeft: '150px' }} for="descripcion" class="form-label">{descripcion}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label">Fecha de creación:</label>
                        <label style={{ marginLeft: '90px' }}  for="fecha" class="form-label">{fechaEjecucion}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px' }}>
                        <label for="idCoLave" class="form-label">Total:</label>
                        <label style={{ marginLeft: '200px' }} for="total" class="form-label">{total}</label>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label for="idCoLave" class="form-label">Estado: </label>
                        <label style={{ marginLeft: '180px' }} for="estado" class="form-label">{estado}</label>
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label for="idCoLave" class="form-label">Cédula Juridica: </label>
                        <label style={{ marginLeft: '100px' }} for="idCotizacion" class="form-label">{cedula}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px' }}>
                        <label for="idCoLave" class="form-label">Nombre del cliente o entidad:</label>
                        <label for="idCotizacion" class="form-label">{nombreCliente}</label>
                    </div>
                        <div style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarCotizacion}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Modificar cotización
                            </button>
                            <button type="submit" className="button2" onClick={handleDelete}>
                                <RiDeleteBinLine style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Eliminar cotización
                            </button>
                        </div>

                     </div>
                     
                     
        </div>

    </Fragment>
    );
};
