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
    console.log(idProyecto)
    const gotoModificarProyecto = () => { navigate(`/modificarProyecto/${idProyecto}`); }
    const gotoProyecto = () => { navigate('/proyectos'); }
    
   
    const [idProyect, setidProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaIncio, setfechaIncio] = useState('');
    const [fechaFinalizacion, setfechaFinalizacion] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [estado, setEstado] = useState('');
    const [costo, setCosto] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [servicios, setServicios] = useState([[]]);//Meter los datos de todo el mundo o hacer otro donde el filtro seleccione que tipo de informacion quiere ver
    const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    // const archivosAdjuntos = [
    //     { nombre: 'Carnet e Infrome de matricula.pdf', url: 'CRMFrontend\public\Carnet e Infrome de matricula.pdf' },
    //     { nombre: 'logo192.png', url: 'CRMFrontend/public/logo192.png' },
    //   ];
    
    const handleSearch = async () => {
        //Buscamos la informacion del backend
        const res = await fetch(`${API}/readProyecto/${idProyecto}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)
        setidProyecto(data[1])
        setDescripcion(data[3])
        setfechaIncio(data[6])
        setfechaFinalizacion(data[7])
        var est = ''
        if (data[9] === 1) { est = 'Eliminado' }
        if (data[9] === 2) { est = 'En progreso' }
        if (data[9] === 3) { est = 'Solicitado' }
        if (data[9] === 4) { est = 'En planeacion' }
        if (data[9] === 5) { est = 'Activo' }
        if (data[9] === 6) { est = 'Inactivo' }
        console.log('est: ', est)
        setEstado(est)
        setCosto(data[8])


        const rest = await fetch(`${API}/readCliente/${data[4]}`); // cambiar por el id
        const dato = await rest.json();//resultado de la consulta
        setCedula(dato[1])
        setNombreCliente(dato[2])
        setNombreProyecto(data[2])// Si es nulo no se mete 
         // Simula los datos de servicios
         ///getServiciosProyecto/<idProyecto>
        const respuesta = await fetch(`${API}/getServiciosProyecto/${data[0]}`); // cambiar por el id
        const serviciosP = await respuesta.json();//resultado de la consulta
        console.log(serviciosP)
        const serviciosConID = serviciosP.map(item => {
            return {
              id: item[1], // Suponiendo que el ID de servicio está en la posición 0
              nombre: item[2], // Suponiendo que el nombre del servicio está en la posición 1
              // Agrega otras propiedades si es necesario
            };
          });
          
          setServicios(serviciosConID);
        
        const res2 = await fetch(`${API}/getDocs/${data[1]}`);
        const data2 = await res2.json();
        const files = Object.keys(data2);
        console.log("FILEEEEEEEEEEEEEEEES")
        console.log(files);

        const modifiedData = Object.keys(data2).map(nombre => ({
            nombre: nombre,
            url: data2[nombre]
          }));
          console.log(modifiedData);
        
          setArchivosAdjuntos(modifiedData);
    };

    const handleDelete = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar el proyecto seleccionado?',
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
              Swal.fire('El proyecto se ha eliminado satisfactoriamente')
              const res = fetch(`${API}/deleteProyecto/${idProyecto}`);
              gotoProyecto();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
            }
          })


    };
    const handleFileClick = async (e, nombre, url) => {
        e.preventDefault(); // Evita la navegación predeterminada
        // Ahora puedes manejar la descarga del archivo, por ejemplo, mediante una solicitud AJAX
        // Utiliza la URL y otros datos según sea necesario
        //console.log("Hacer algo con el archivo:", nombre, url);
        const res = await fetch(`${API}/blop/${nombre}/${url}`);
        const data = await res.json();
        console.log(data)
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
            <div class="row">
                <div class="col-sm-3" style={{ marginBottom: '20px'}}>
                    <h1 class="titulo-h1">
                        {nombreProyecto}
                    </h1>
                </div>
                <div class="mb-3" style={{ marginTop: '-20px'}}>
                    <h2 class="titulo-h2" >
                        Información general
                    </h2>
                    <div className="dividers"></div>
                </div>
                <div style={{ marginLeft:'20px' }}>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label  for="idProlabel" class="form-label custom-label">ID Proyecto:</label>
                        <label  style={{ marginLeft: '148px' }}for="idProyecto" class="form-label custom-label">{idProyect}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="namelabel" class="form-label custom-label">Nombre:</label>
                        <label style={{ marginLeft: '171px' }} for="nameevaluacion" class="form-label custom-label">{nombreProyecto}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="descripcionLabel" class="form-label custom-label">Descripción:</label>
                        <label style={{ marginLeft: '148px' }} for="descripcion" class="form-label custom-label">{descripcion}</label>
                    </div>

                </div>
                <div class="mb-3" style={{ marginTop: '20px'}}>
                    <h2 class="titulo-h2" >
                        Gestión del servicio
                    </h2>
                    <div className="dividers"></div>
                </div>
                <div style={{ marginLeft:'20px' }}> 
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label custom-label">Estado:</label>
                        <label style={{ marginLeft: '181px' }} for="idevaluacion" class="form-label custom-label">{estado}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label custom-label">Fecha de ejecución:</label>
                        <label style={{ marginLeft: '105px' }}  for="fecha" class="form-label custom-label">{fechaIncio}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha" class="form-label custom-label">Fecha de finalización:</label>
                        <label style={{ marginLeft: '95px' }}  for="fecha" class="form-label custom-label">{fechaFinalizacion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label custom-label">Sub total:</label>
                        <label style={{ marginLeft: '168px' }} for="idevaluacion" class="form-label custom-label">{costo}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label custom-label">Documentos adjuntos: </label>
                        <ul>
                            {archivosAdjuntos.map((file) => (
                                        <li key={file.nombre}>
                                        <a href={`${API}/blop/${file.nombre}/${file.url}`} target="_blank" onClick={(e) => handleFileClick(e, file.nombre, file.url)}>
                                            {file.nombre} {/* Muestra el nombre del archivo */}
                                        </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <h2 class="titulo-h2">
                   Servicios asociados
                </h2>
                <div className="dividers"></div>
                <div style={{ marginLeft:'20px' }}>
                    <div class="mb-3" style={{ marginBottom: '30px', fontFamily: 'Lato, sans-serif' }}>
                        <ul >
                            {servicios.map(servicio => (
                            <li key={servicio.id} style={{ marginBottom: '15px' }}>
                                <label  for="idevaluacion" class="form-label custom-label"> 
                                ID: {servicio.id} - Nombre: {servicio.nombre} </label>
                                {/* Mostrar otros datos relacionados con el servicio si es necesario */}
                            </li>
                            ))}
                        </ul>
                    </div>

                </div>                        
                
                <h2 class="titulo-h2">
                    Información del cliente o entidad asociado
                </h2>
                <div className="dividers"></div>
                <div style={{ marginLeft:'20px' }}>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label custom-label">Nombre del cliente o entidad:</label>
                        <label style={{ marginLeft: '42px' }} for="idevaluacion" class="form-label custom-label">{nombreCliente}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave" class="form-label custom-label">Cédula Juridica: </label>
                        <label style={{ marginLeft: '123px' }} for="idevaluacion" class="form-label custom-label">{cedula}</label>
                    </div>
                
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
