import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import '../Evaluaciones/DetalleEvaluacion.css'; 

import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

const API = "http://127.0.0.1:5000";
export const DetalleCapacitacion = () => {
    let navigate = useNavigate();
    const gotoModificarCapacitacion = () => { navigate(`/modificarCapacitacion/${idCapacitacion}`); }
    const gotoCapacitacion = () => { navigate('/capacitacion'); }
    const { idCapacitacion } = useParams();
    const [ idCapacitacione, setidCapacitacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaEjecucion, setFechaEjecucion] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [tipoCapacitacion, setTipoCapacitacion] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [estado, setEstado] = useState('');
    const [costo, setCosto] = useState('');
    const [cedula, setCedula] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);
    //const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    const handleSearch = async () => {
        //Buscamos la informacion del backend
        const res = await fetch(`${API}/readCapacitacion/${idCapacitacion}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)
        const resp = await fetch(`${API}/readCliente/${data[15]}`); // cambiar por el id
        const datac = await resp.json();//resultado de la consulta
        const respu = await fetch(`${API}/readCliente/${data[15]}`); // cambiar por el id
        const datap = await respu.json();//resultado de la consulta
        const respue = await fetch(`${API}/readTipoCapacitacion/${data[13]}`); // cambiar por el id
        const dataT = await respue.json();//resultado de la consulta
        console.log(data)
        console.log(datac)
        console.log(datap)
        setidCapacitacion(data[1])
        setNombre(data[2])
        setDescripcion(data[3])
        setFechaEjecucion(data[5])
        setFechaFinal(data[9])
        setTipoCapacitacion(dataT[1])
        var est = ''
        if (data[7] === 1) { est = 'Eliminado' }
        if (data[7] === 2) { est = 'En progreso' }
        if (data[7] === 3) { est = 'Solicitado' }
        if (data[7] === 4) { est = 'En planeacion' }
        if (data[7] === 5) { est = 'Activo' }
        if (data[7] === 6) { est = 'Inactivo' }
        console.log('est: ', est)
        setEstado(est)
        setCosto(data[12])
        setCedula(datac[1])
        setNombreCliente(datac[2])
        setNombreProyecto(datap[2])// Si es nulo no se mete 



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

    const handleDelete = async () => {
        Swal.fire({
            title: '¿Está seguro que desea eliminar la capacitación seleccionada?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: `Cancelar`,
            confirmButtonColor: "#4CAF50",
            denyButtonColor: "#d33",
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const options = {method: 'POST',};
                fetch(`${API}/deleteCapacitacion/${idCapacitacion}`, options)
                .then(response => {
                    if (response.ok) {
                        Swal.fire('La capacitación se ha eliminado satisfactoriamente')
                        gotoCapacitacion();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un problema al eliminar la capacitación.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            });
                        }
                })
                gotoCapacitacion();
            } else if (result.isDenied) {
                Swal.fire('No se guardaron los cambios')
            }
        })
    }
    
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
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label  for="idEvlabel"class="form-label custom-label">ID Evaluación:</label>
                        <label  style={{ marginLeft: '130px' }}for="idevaluacion" class="form-label custom-label">{idCapacitacion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="namelabel"class="form-label custom-label">Nombre:</label>
                        <label style={{ marginLeft: '165px' }} for="nameevaluacion" class="form-label custom-label">{nombre}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="descripcionLabel"class="form-label custom-label">Descripción:</label>
                        <label style={{ marginLeft: '142px' }} for="descripcion"class="form-label custom-label">{descripcion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave"class="form-label custom-label">Tipo de capacitación:</label>
                        <label style={{ marginLeft: '92px' }} for="idevaluacion" class="form-label custom-label">{tipoCapacitacion}</label>
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
                        <label for="fecha"class="form-label custom-label">Fecha de ejecución:</label>
                        <label style={{ marginLeft: '100px' }}  for="fecha" class="form-label custom-label">{fechaEjecucion}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="fecha"class="form-label custom-label">Fecha de finalización:</label>
                        <label style={{ marginLeft: '89px' }}  for="fecha" class="form-label custom-label">{fechaFinal}</label>
                    </div>
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave"class="form-label custom-label">Estado:</label>
                        <label style={{ marginLeft: '175px' }} for="idevaluacion" class="form-label custom-label">{estado}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave"class="form-label custom-label">Costo:</label>
                        <label style={{ marginLeft: '180px' }} for="idevaluacion" class="form-label custom-label">{costo}</label>
                    </div>
                    
                    {nombreProyecto !== '' && (
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave"class="form-label custom-label">Proyecto asociado:</label>
                            <label style={{ marginLeft: '102px' }} for="idevaluacion" class="form-label custom-label">{nombreProyecto}</label>
                        </div>
                        )}
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave"class="form-label custom-label">Documentos adjuntos: </label>
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
                     
                <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave"class="form-label custom-label">Cédula Juridica: </label>
                        <label style={{ marginLeft: '117px' }} for="idevaluacion"class="form-label custom-label">{cedula}</label>
                    </div>
                    
                    <div class="mb-3" style={{ marginBottom: '30px' }}>
                        <label for="idEvLave"class="form-label custom-label">Nombre del cliente o entidad:</label>
                        <label style={{ marginLeft: '36px' }} for="idevaluacion" class="form-label custom-label">{nombreCliente}</label>
                    </div>
                
                </div>    
                  
                        <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                            <button type="submit" className="button2" onClick={gotoModificarCapacitacion}>
                                <BsFillPencilFill style={{
                                fontSize: '25px',
                                marginRight: '20px',
                                marginLeft: '20px',
                                color: '#12959E' // Tamaño del icono
                                }} /> Modificar capacitación
                            </button>
                            <button type="submit" className="button2" onClick={handleDelete}>
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
