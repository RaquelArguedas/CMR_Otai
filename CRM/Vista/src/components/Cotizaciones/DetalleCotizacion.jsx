import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../Evaluaciones/DetalleEvaluacion.css'; 

import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

const API = "http://127.0.0.1:5000";

export const DetalleCotizacion = () => {
    let navigate = useNavigate();
    
    const gotoModificarCotizacion = () => { navigate(`/modificarCotizacion/${idCotizacion}`); }
    const gotoCotizacion = () => { navigate('/cotizacion'); }
    const { idCotizacion } = useParams();
    
    const [ idCotizaciones, setidCotizacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [idServicio, setIdServicio] = useState('');
    const [estado, setEstado] = useState('');
    const [total, setTotal] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');

    const handleSearch = async () => {
        const res = await fetch(`${API}/readCotizacion/${idCotizacion}`);
        const data = await res.json();
        console.log(data)
        
        const resp = await fetch(`${API}/readCliente/${data[3]}`);
        const datac = await resp.json();
        console.log(datac)
        
        setidCotizacion(data[0]);
        setNombre(data[1]);
        setDescripcion(data[2]);
        setCedula(datac[1]);
        setNombreCliente(datac[2]);
        setTotal(data[5]);
        setIdServicio(data[6]);
        setFechaCreacion(data[8]);

        var est = '';
        if (data[7] === 1) { est = 'Eliminado' }
        if (data[7] === 2) { est = 'En progreso' }
        if (data[7] === 3) { est = 'Solicitado' }
        if (data[7] === 4) { est = 'En planeación' }
        if (data[7] === 5) { est = 'Activo' }
        if (data[7] === 6) { est = 'Inactivo' }
        setEstado(est);
        
    };

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar la cotización seleccionada?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: 'Cancelar',
            confirmButtonColor: "#4CAF50",
            denyButtonColor: "#d33",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const options = { method: 'POST' };
                fetch(`${API}/deleteCotizacion/${idCotizacion}`, options)
                .then(response => {
                    if (response.ok) {
                        Swal.fire('La cotización se ha eliminado satisfactoriamente');
                        gotoCotizacion();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un problema al eliminar la cotización.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                        });
                    }
                });
                gotoCotizacion();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios');
            }
        });
    }


    const Title = styled.h1`
        font-size: 24px;
        color: #000000;
        margin-bottom: 80px;
        margin-top: 25px;
    `;

    React.useEffect(() => {
        handleSearch();
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
                        <h2 class="titulo-h2">
                            Información general
                        </h2>
                        <div className="dividers"></div>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idCotizacionLabel" class="form-label custom-label">ID Cotización:</label>
                            <label style={{ marginLeft: '132px' }} for="idcotizacion" class="form-label custom-label">{idCotizacion}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="nombreLabel" class="form-label custom-label">Nombre:</label>
                            <label style={{ marginLeft: '165px' }} for="nombrecotizacion" class="form-label custom-label">{nombre}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="descripcionLabel" class="form-label custom-label">Descripción:</label>
                            <label style={{ marginLeft: '142px' }} for="descripcion" class="form-label custom-label">{descripcion}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="totalLabel" class="form-label custom-label">Total:</label>
                            <label style={{ marginLeft: '185px' }} for="total" class="form-label custom-label">{total}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idServicioLabel" class="form-label custom-label">ID Servicio:</label>
                            <label style={{ marginLeft: '147px' }} for="idservicio" class="form-label custom-label">{idServicio}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="estadoLabel" class="form-label custom-label">Estado:</label>
                            <label style={{ marginLeft: '170px' }} for="estado" class="form-label custom-label">{estado}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="fechaCreacionLabel" class="form-label custom-label">Fecha Creación:</label>
                            <label style={{ marginLeft: '115px' }} for="fechaCreacion" class="form-label custom-label">{fechaCreacion}</label>
                        </div>
                    </div>
                    <h2 class="titulo-h2">
                        Información del cliente o entidad asociado
                    </h2>
                    <div className="dividers"></div>
                    <div style={{ marginLeft: '20px' }}>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idCotizacionLabel" class="form-label custom-label">Cédula Jurídica:</label>
                            <label style={{ marginLeft: '117px' }} for="idcotizacion" class="form-label custom-label">{cedula}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idCotizacionLabel" class="form-label custom-label">Nombre del cliente o entidad:</label>
                            <label style={{ marginLeft: '36px' }} for="idcotizacion" class="form-label custom-label">{nombreCliente}</label>
                        </div>
                    </div>    
                    <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                        <button type="submit" className="button2" onClick={gotoModificarCotizacion}>
                            <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E'
                            }} /> Modificar cotización
                        </button>
                        <button type="submit" className="button2" onClick={handleDelete}>
                            <RiDeleteBinLine style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E'
                            }} /> Eliminar cotización
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
