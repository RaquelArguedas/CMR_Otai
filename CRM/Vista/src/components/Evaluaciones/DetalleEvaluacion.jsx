import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import './DetalleEvaluacion.css';
import Swal from 'sweetalert2';


import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';

const API = "http://127.0.0.1:5000";
export const DetalleEvaluacion = () => {
    let navigate = useNavigate();
    
    const { idEvaluacion } = useParams();
    const gotoModificarEvaluacion = () => { navigate(`/modificarEvaluacion/${idEvaluacion}`); }
    const gotoEvaluacion = () => { navigate('/'); }

    const [idevaluacione, setidEvaluacion] = useState('');
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
    const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);

    
    const handleSearch = async () => {
        //Buscamos la informacion del backend
        const res = await fetch(`${API}/readEvaluacion/${idEvaluacion}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        const resp = await fetch(`${API}/readCliente/${data[11]}`); // cambiar por el id
        const datac = await resp.json();//resultado de la consulta
        const respu = await fetch(`${API}/readCliente/${data[11]}`); // cambiar por el id
        const datap = await respu.json();//resultado de la consulta
        const respue = await fetch(`${API}/readTipoEvaluacion/${data[5]}`); // cambiar por el id
        const dataT = await respue.json();//resultado de la consulta
        console.log(data)
        console.log(datac)
        console.log(datap)
        setidEvaluacion(data[1])
        setNombre(data[2])
        setDescripcion(data[3])
        setFechaEjecucion(data[6])

        setTipoEvaluacion(dataT[1])
        var est = ''
        if (data[8] === 1) { est = 'Eliminado' }
        if (data[8] === 2) { est = 'En progreso' }
        if (data[8] === 3) { est = 'Solicitado' }
        if (data[8] === 4) { est = 'En planeacion' }
        if (data[8] === 5) { est = 'Activo' }
        if (data[8] === 6) { est = 'Inactivo' }
        console.log('est: ', est)
        setEstado(est)
        setCosto(data[9])
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

    const handleDelete = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar la evaluación seleccionada?',
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
              Swal.fire('La evaluación se ha eliminado satisfactoriamente')
            
              const res = fetch(`${API}/deleteEvaluacion/${idEvaluacion}`, {
                method: 'POST'
            });
              
              gotoEvaluacion();
            } else if (result.isDenied) {
              Swal.fire('No se guaron los cambios')
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
                        <div class="mb-3" style={{ marginBottom: '30px'}}>
                            <label  for="idEvlabel"  class="form-label custom-label">ID Evaluación:</label>
                            <label  style={{ marginLeft: '130px' }}for="idevaluacion" class="form-label custom-label">{idEvaluacion}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="namelabel" class="form-label custom-label">Nombre:</label>
                            <label style={{ marginLeft: '165px' }} for="nameevaluacion" class="form-label custom-label">{nombre}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="descripcionLabel" class="form-label custom-label">Descripción:</label>
                            <label style={{ marginLeft: '141px' }} for="descripcion" class="form-label custom-label">{descripcion}</label>
                        </div>
                        
                        
                        
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label custom-label">Tipo de evaluación:</label>
                            <label style={{ marginLeft: '100px' }} for="idevaluacion" class="form-label custom-label">{tipoEvalaucion}</label>
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
                            <label for="fecha" class="form-label custom-label">Fecha de ejecución:</label>
                            <label style={{ marginLeft: '98px' }}  for="fecha" class="form-label custom-label">{fechaEjecucion}</label>
                        </div>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label custom-label">Estado:</label>
                            <label style={{ marginLeft: '173px' }} for="idevaluacion" class="form-label custom-label">{estado}</label>
                        </div>
                        
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label custom-label">Costo:</label>
                            <label style={{ marginLeft: '180px' }} for="idevaluacion" class="form-label custom-label">{costo}</label>
                        </div>
                        
                        {nombreProyecto !== '' && (
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label custom-label">Proyecto asociado:</label>
                            <label style={{ marginLeft: '101px' }} for="idevaluacion" class="form-label custom-label">{nombreProyecto}</label>
                        </div>
                        )}
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
                        Información del cliente o entidad asociado
                    </h2>
                    <div className="dividers"></div>
                    <div style={{ marginLeft:'20px' }}>
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label custom-label">Cédula Juridica: </label>
                            <label style={{ marginLeft: '115px' }} for="idevaluacion" class="form-label custom-label">{cedula}</label>
                        </div>
                        
                        <div class="mb-3" style={{ marginBottom: '30px' }}>
                            <label for="idEvLave" class="form-label custom-label">Nombre del cliente o entidad:</label>
                            <label style={{ marginLeft: '34px' }}  for="idevaluacion" class="form-label custom-label">{nombreCliente}</label>
                        </div>
                    </div>
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
