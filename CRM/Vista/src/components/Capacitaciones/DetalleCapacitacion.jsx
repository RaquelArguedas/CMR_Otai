import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import './DetalleCapacitacion.css';

import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

export const DetalleCapacitacion = () => {
    let navigate = useNavigate();
    const gotoModificarCapacitacion = () => { navigate('/modificarCapacitacion'); }


    const [idCapacitacion, setidCapacitacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEjecucion, setFechaEjecucion] = useState('');
    const [tipoCapacitacion, setTipoCapacitacion] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [estado, setEstado] = useState('');
    const [costo, setCosto] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('');
    //const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    const archivosAdjuntos = [
        { nombre: 'Carnet e Infrome de matricula.pdf', url: 'CRMFrontend\public\Carnet e Infrome de matricula.pdf' },
        { nombre: 'logo192.png', url: 'CRMFrontend/public/logo192.png' },
      ];
    
    const handleSearch = async () => {
        //Buscamos la informacion del backend
        
        setidCapacitacion('E1231')
        setNombre('Capacitacion para el Ministerio de salud')
        setDescripcion('Capacitacion de accesibilidad')
        setFechaEjecucion('20/09/2023')
        setTipoCapacitacion('Automatica')
        
        setEstado('En proceso')
        setCosto(230000)
        setCedula('123129131')
        setNombreCliente('Ministerio de hacienda')
        setNombreProyecto('')// Si es nulo no se mete 
    };


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
                    <div style={{ marginBottom: '30px'}}>
                        <label  for="iCavlabel" class="form-label" style={{fontSize: '16px'}}>ID Capacitación:</label>
                        <label  style={{ marginLeft: '70px', fontSize: '16px' }}for="idCapacitacion" class="form-label">{idCapacitacion}</label>
                    </div>
                    <div style={{ marginBottom: '30px'}}>
                        <label for="namelabel" class="form-label" style={{fontSize: '16px'}}>Nombre:</label>
                        <label style={{ marginLeft: '120px', fontSize: '16px' }} for="nameCapacitacion" class="form-label">{nombre}</label>
                    </div>
                    <div style={{ marginBottom: '30px'}}>
                        <label for="descripcionLabel" class="form-label" style={{fontSize: '16px'}}>Descripción:</label>
                        <label style={{ marginLeft: '98px', fontSize: '16px' }} for="descripcion" class="form-label">{descripcion}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px'}}>
                        <label for="fecha" class="form-label" style={{fontSize: '16px'}}>Fecha de ejecución:</label>
                        <label style={{ marginLeft: '50px', fontSize: '16px' }}  for="fecha" class="form-label">{fechaEjecucion}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px'}}>
                        <label for="idCaLave" class="form-label" style={{fontSize: '16px'}}>Tipo de capacitación:</label>
                        <label style={{ marginLeft: '40px', fontSize: '16px' }} for="idCapacitacion" class="form-label">{tipoCapacitacion}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px'}}>
                        <label for="idCaLave" class="form-label" style={{fontSize: '16px'}}>Documentos adjuntos: </label>
                        <ul>
                            {archivosAdjuntos.map((archivo, index) => (
                                <li key={index}>
                                    <a href={archivo.url} download>
                                        {archivo.nombre}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div style={{ marginBottom: '30px'}}>
                        <label for="idCaLave" class="form-label" style={{fontSize: '16px'}}>Estado:</label>
                        <label style={{ marginLeft: '135px', fontSize: '16px' }} for="idCapacitacion" class="form-label">{estado}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px'}}>
                        <label for="idCaLave" class="form-label" style={{fontSize: '16px'}}>Costo:</label>
                        <label style={{ marginLeft: '150px', fontSize: '16px' }} for="idCapacitacion" class="form-label">{costo}</label>
                    </div>
                    <div style={{ marginBottom: '30px'}}>
                        <label for="idCaLave" class="form-label" style={{fontSize: '16px'}}>Cédula Juridica: </label>
                        <label style={{ marginLeft: '78px', fontSize: '16px' }} for="idCapacitacion" class="form-label">{cedula}</label>
                    </div>
                    
                    <div style={{ marginBottom: '30px'}}>
                        <label for="idCaLave" class="form-label" style={{fontSize: '16px'}}>Nombre del cliente o entidad:</label>
                        <label for="idCapacitacion" class="form-label" style={{fontSize: '16px'}}>{nombreCliente}</label>
                    </div>
                    
                    {nombreProyecto !== '' && (
                        <div style={{ marginBottom: '30px'}}>
                            <label for="idCaLave" class="form-label"style={{fontSize: '16px'}}>Proyecto asociado:</label>
                            <label for="idCapacitacion" class="form-label" style={{fontSize: '16px'}}>{nombreProyecto}</label>
                        </div>
                        )}
                        <div style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarCapacitacion}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Modificar capacitación
                            </button>
                            <button type="submit" className="button2">
                                <RiDeleteBinLine style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Eliminar capacitación
                            </button>
                        </div>

                     </div>
                     
                     
        </div>

    </Fragment>
    );
};
