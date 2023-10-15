import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import '../Evaluaciones/DetalleEvaluacion.css'; 
import Swal from 'sweetalert2';


import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

const API = "http://127.0.0.1:5000";
export const DetalleProyecto = () => {
    let navigate = useNavigate();
    const { idProyecto } = useParams();
    const gotoModificarProyecto = () => { navigate(`/modificarProyecto/${idProyecto}`); }
    const gotoProyecto = () => { navigate('/proyectos'); }
    
   
    const [idProyect, setidProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [fechaIncio, setfechaIncio] = useState('');
    const [fechaFinalizacion, setfechaFinalizacion] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [estado, setEstado] = useState('');
    const [costo, setCosto] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [servicios, setServicios] = useState([[]]);//Meter los datos de todo el mundo o hacer otro donde el filtro seleccione que tipo de informacion quiere ver
    //const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    const archivosAdjuntos = [
        { nombre: 'Carnet e Infrome de matricula.pdf', url: 'CRMFrontend\public\Carnet e Infrome de matricula.pdf' },
        { nombre: 'logo192.png', url: 'CRMFrontend/public/logo192.png' },
      ];
    
    const handleSearch = async () => {
        //Buscamos la informacion del backend
        const res = await fetch(`${API}/readProyecto/${idProyecto}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        setidProyecto('E1231')
        setDescripcion('Evaluacion de accesibilidad')
        setFechaCreacion('20/09/2022')
        setfechaIncio('20/09/2023')
        setfechaFinalizacion('20/09/2023')
        
        setEstado('En proceso')
        setCosto(230000)
        setCedula('123129131')
        setNombreCliente('Ministerio de hacienda')
        setNombreProyecto('Proyecto ministerio')// Si es nulo no se mete 
         // Simula los datos de servicios
        const datosSimulados = [
            {
            id: 1,
            nombre: 'Evaluación 1',
            fecha: '2023-10-12',
            // Otros datos relacionados con Evaluación 1
            },
            {
            id: 2,
            nombre: 'Cotización 1',
            fecha: '2023-10-13',
            // Otros datos relacionados con Cotización 1
            }
        ];

        // Utiliza setServicios para establecer los datos simulados
        setServicios(datosSimulados);
    };

    const handleDelete = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar el proyecto seleccionado?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              Swal.fire('La evaluación se ha eliminado satisfactoriamente')

              gotoProyecto();
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
                        <Title>{nombreProyecto}</Title>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label  for="idProlabel" class="form-label">ID Proyecto:</label>
                        <label  style={{ marginLeft: '148px' }}for="idProyecto" class="form-label">{idProyect}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="namelabel" class="form-label">Nombre:</label>
                        <label style={{ marginLeft: '180px' }} for="nameevaluacion" class="form-label">{nombreProyecto}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="descripcionLabel" class="form-label">Descripción:</label>
                        <label style={{ marginLeft: '148px' }} for="descripcion" class="form-label">{descripcion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Estado:</label>
                        <label style={{ marginLeft: '191px' }} for="idevaluacion" class="form-label">{estado}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label">Fecha de creación:</label>
                        <label style={{ marginLeft: '99px' }}  for="fecha" class="form-label">{fechaCreacion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label">Fecha de ejecución:</label>
                        <label style={{ marginLeft: '90px' }}  for="fecha" class="form-label">{fechaIncio}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label">Fecha de finalización:</label>
                        <label style={{ marginLeft: '70px' }}  for="fecha" class="form-label">{fechaFinalizacion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Sub total:</label>
                        <label style={{ marginLeft: '175px' }} for="idevaluacion" class="form-label">{costo}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Nombre del cliente o entidad:</label>
                        <label for="idevaluacion" class="form-label">{nombreCliente}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Cédula Juridica: </label>
                        <label style={{ marginLeft: '105px' }} for="idevaluacion" class="form-label">{cedula}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label">Servicios: </label>
                        <ul>
                            {servicios.map(servicio => (
                            <li key={servicio.id}>
                                <p> ID: {servicio.id} - Nombre: {servicio.nombre} </p>
                                {/* Mostrar otros datos relacionados con el servicio si es necesario */}
                            </li>
                            ))}
                        </ul>
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
                    
                    
                    
                    
                    
                        <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarProyecto}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Modificar proyecto
                            </button>
                            <button type="submit" className="button2" onClick={handleDelete}>
                                <RiDeleteBinLine style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Eliminar proyecto
                            </button>
                        </div>

                     </div>
                     
                     
        </div>

    </Fragment>
    );
};
