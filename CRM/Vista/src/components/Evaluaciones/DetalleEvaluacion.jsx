import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import './DetalleEvaluacion.css';
import Swal from 'sweetalert2';


import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

export const DetalleEvaluacion = () => {
    let navigate = useNavigate();
    const gotoModificarEvaluacion = () => { navigate('/modificarEvaluacion'); }
    const gotoEvaluacion = () => { navigate('/'); }

    const [idevaluacion, setidEvaluacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEjecucion, setFechaEjecucion] = useState('');
    const [tipoEvalaucion, setTipoEvaluacion] = useState('');
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
        
        setidEvaluacion('E1231')
        setNombre('Evaluacion para el Ministerio de salud')
        setDescripcion('Evaluacion de accesibilidad')
        setFechaEjecucion('20/09/2023')
        setTipoEvaluacion('Automatica')
        
        setEstado('En proceso')
        setCosto(230000)
        setCedula('123129131')
        setNombreCliente('Ministerio de hacienda')
        setNombreProyecto('')// Si es nulo no se mete 
    };

    const handleDelete = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar la evaluación seleccionada?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              Swal.fire('La evaluación se ha eliminado satisfactoriamente')
              gotoEvaluacion();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
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
            <div class="row">
                    <div class="col-sm-3">
                        <Title>{nombre}</Title>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label  for="idEvlabel" class="form-label">ID Evaluación:</label>
                        <label  style={{ marginLeft: '130px' }}for="idevaluacion" class="form-label">{idevaluacion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="namelabel" class="form-label">Nombre:</label>
                        <label style={{ marginLeft: '180px' }} for="nameevaluacion" class="form-label">{nombre}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="descripcionLabel" class="form-label">Descripción:</label>
                        <label style={{ marginLeft: '150px' }} for="descripcion" class="form-label">{descripcion}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label">Fecha de ejecución:</label>
                        <label style={{ marginLeft: '90px' }}  for="fecha" class="form-label">{fechaEjecucion}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Tipo de evaluación:</label>
                        <label style={{ marginLeft: '90px' }} for="idevaluacion" class="form-label">{tipoEvalaucion}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Documentos adjuntos: </label>
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
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Estado:</label>
                        <label style={{ marginLeft: '190px' }} for="idevaluacion" class="form-label">{estado}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Costo:</label>
                        <label style={{ marginLeft: '200px' }} for="idevaluacion" class="form-label">{costo}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Cédula Juridica: </label>
                        <label style={{ marginLeft: '100px' }} for="idevaluacion" class="form-label">{cedula}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Nombre del cliente o entidad:</label>
                        <label for="idevaluacion" class="form-label">{nombreCliente}</label>
                    </div>
                    
                    {nombreProyecto !== '' && (
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label">Proyecto asociado:</label>
                            <label for="idevaluacion" class="form-label">{nombreProyecto}</label>
                        </div>
                        )}
                        <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarEvaluacion}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Modificar evaluación
                            </button>
                            <button type="submit" className="button2" onClick={handleDelete}>
                                <RiDeleteBinLine style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Eliminar evaluación
                            </button>
                        </div>

                     </div>
                     
                     
        </div>

    </Fragment>
    );
};
