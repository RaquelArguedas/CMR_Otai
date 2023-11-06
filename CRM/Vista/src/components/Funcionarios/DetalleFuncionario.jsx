import React, { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import styled  from 'styled-components';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import '../Clientes/CSSClientes/Clientes.css'
import Swal from 'sweetalert2';
const API = "http://127.0.0.1:5000";
export const DetalleFuncionario = () => {
    let navigate = useNavigate();
    const gotoModificarFuncionario= () => { navigate(`/modificarFuncionario/${idFuncionario}`); }
    const gotoFuncionario = () => { navigate('/funcionarios'); }
    const { idFuncionario } = useParams();
    const [idFuncionari, setidFuncionario] = useState('');
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [fechaNacimineto, setfechaNacimineto] = useState('');
    const [fechaIngreso, setfechaIngreso] = useState('');
    const [telefono, setTelefono] = useState('');
    const [estado, setEstado] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);


    const handleSearch = async () => {
        //Buscamos la informacion del backend
        console.log(idFuncionario)
        const res = await fetch(`${API}/readFuncionario/${idFuncionario}`); // cambiar por el id
        const data = await res.json();//resultado de la consulta
        console.log(data)

        setidFuncionario(data[0])
        setNombre(data[1] + " " + data[2])
        setCedula(data[4])
        setfechaNacimineto(data[3])
        setfechaIngreso(data[8])
        setTelefono(data[5])
        setCorreo(data[6])

        // ELIMINADO = 1
        // EN_PROGRESO = 2
        // SOLICITADO = 3
        // EN_PLANEACION = 4
        // ACTIVO = 5
        // INACTIVO = 6
        var est = ''
        if (data[7] === 1) { est = 'Eliminado' }
        if (data[7] === 2) { est = 'En progreso' }
        if (data[7] === 3) { est = 'Solicitado' }
        if (data[7] === 4) { est = 'En planeacion' }
        if (data[7] === 5) { est = 'Activo' }
        if (data[7] === 6) { est = 'Inactivo' }
        setEstado(est)

        // data[9] = [[1, 'programador'],[2, 'disenhador']]
        const opcionesDesdeBackend = data[9];
        console.log(opcionesDesdeBackend)
        // [ 
        //     { id: 1, nombre: 'Opción 1' },
        //     { id: 2, nombre: 'Opción 2' },
        //     { id: 3, nombre: 'Opción 3' },
            
        //     { id: 4, nombre: 'Opción 4' },
        //     { id: 5, nombre: 'Opción 5' },
        //     { id: 6, nombre: 'Opción 6' },
        //     { id: 7, nombre: 'Opción 7' },
        //     { id: 8, nombre: 'Opción 8' },
        //     { id: 9, nombre: 'Opción 9' },
        //   ];
            // Mapeamos las opciones desde el backend al formato que utiliza react-select
            if (Array.isArray(opcionesDesdeBackend)) {
                const opcionesFormateadas = opcionesDesdeBackend.map((opcion) => ({
                  value: opcion[0],
                  label: opcion[1],
                }));
                
                setSelectedOption(opcionesFormateadas);
              } else {
                console.error('opcionesDesdeBackend no es una matriz válida');
              }
          // Supongamos que las opciones seleccionadas anteriormente están en un array de IDs
            // const opcionesSeleccionadasAnteriormente = [1, 2,3]; // IDs de opciones seleccionadas

            // // Mapeamos las IDs a objetos de opciones seleccionadas
            // const opcionesSeleccionadas = opcionesSeleccionadasAnteriormente.map((value) =>
            //     opcionesFormateadas.find((opcion) => opcion.value === value)
            // );

            // // Establecer las opciones seleccionadas
            // setSelectedOption(opcionesSeleccionadas);
    };
    const Title = styled.h1`
    font-size: 24px;
    color: #000000;
    margin-bottom: 80px;
    margin-top: 25px;
    `;
    const handleDelete = async () =>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar el funcionario seleccionado?',
            showDenyButton: true,
            confirmButtonText: 'Aceptar',
            denyButtonText: 'Cancelar', // Cambiar texto del botón de cancelación
            confirmButtonColor: "#4CAF50",
            denyButtonColor: "#d33",
            allowOutsideClick: false, // Evita que se cierre haciendo clic fuera de la notificación
            allowEscapeKey: false, 
            style: {
                onOpen: function () {
                  this.querySelector('.swal-title').style.color = 'black';
                  this.querySelector('.swal-button').style.backgroundColor = '#12959E';
                }
              },
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            
            if (result.isConfirmed) {
              Swal.fire('El funcionario se ha eliminado satisfactoriamente')
              const res = fetch(`${API}/deleteFuncionario/${idFuncionario}`); // cambiar por el id
              gotoFuncionario();
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
                    <h1 class="titulo-h1">
                            {nombre}
                    </h1>
                    <div class="mb-3" style={{ marginTop: '-20px'}}>
                        <h2 class="titulo-h2" >
                            Información general
                        </h2>
                        <div className="dividers"></div>
                    </div>
                    <div style={{ marginLeft:'20px' }}>
                        <div class="mb-3" >
                            <label style={{ marginRight: '105px'}} for="idFuncionarioInput"  class="form-label custom-label">ID Funcionario:</label>
                            <label  style={{ marginLeft: '125px' }}for="idFuncionario"  class="form-label custom-label">{idFuncionario}</label>
                            
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}}>
                            <label style={{ marginRight: '110px'}} for="nameInput"  class="form-label custom-label">Nombre completo:</label>
                            <label  style={{ marginLeft: '100px' }}for="idNombre"  class="form-label custom-label">{nombre}</label>
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label  style={{ marginRight: '150px' }}for="cedulainput"  class="form-label custom-label">Cédula:</label>
                            <label  style={{ marginLeft: '129px' }}for="cedula"  class="form-label custom-label">{cedula}</label>
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label  style={{ marginRight: '90px' }}for= "fechaNaciminetoinput" class="form-label custom-label">Fecha de nacimiento:</label>
                            <label  style={{ marginLeft: '104px' }}for="fechaNacimiento"  class="form-label custom-label">{fechaNacimineto}</label>
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
                            <label style={{ marginRight: '50px' }} for="telefonoInput"  class="form-label custom-label">Número de teléfono:</label>
                            <label  style={{ marginLeft: '148px' }}for="telefono"  class="form-label custom-label">{telefono}</label>
                            
                        </div>
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label style={{ marginRight: '150px' }} for="correoInput"  class="form-label custom-label">Correo:</label>
                            <label  style={{ marginLeft: '129px' }}for="correo"  class="form-label custom-label">{correo}</label>  
                        </div>
                    </div>

                    <div class="mb-3" style={{ marginTop: '40px'}}>
                        <h2 class="titulo-h2" >
                            Perfil profecional
                        </h2>
                        <div className="dividers"></div>
                    </div>
                    <div style={{ marginLeft:'10px' }}>
                        <div class="mb-3" style={{ marginBottom: '30px', marginTop:'30px' }}>
                            <ul style={{ marginTop:'30px' }}>
                                {selectedOption.map((opcion, index) => (
                                    <li key={index} style={{marginLeft: '50px', fontFamily: 'Lato, sans-serif'}}>
                                            {opcion.label}
                                    </li>
                                ))}
                            </ul>
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
                            <label  style={{ marginRight: '90px' }}for= "fechaIngresoinput"  class="form-label custom-label">Fecha de ingreso:</label>
                            <label  style={{ marginLeft: '128px' }}for="fechaIngreso"  class="form-label custom-label">{fechaIngreso}</label>
                        </div>
                        
                    
                        <div class="mb-3" style={{ marginTop: '30px'}} >
                            <label style={{ marginRight: '150px' }} for="estadoInput"  class="form-label custom-label">Estado:</label>
                            <label  style={{ marginLeft: '132px' }}for="estado"  class="form-label custom-label">{estado}</label>  
                        </div>

                    </div>
                   
                    
                    <div className="mb-3" style={{ marginTop: '100px', display: 'flex' }}>
                        <button type="submit" className="button2" onClick={gotoModificarFuncionario}>
                            <BsFillPencilFill style={{
                            fontSize: '25px',
                            marginRight: '20px',
                            marginLeft: '20px',
                            color: '#12959E' // Tamaño del icono
                            }} /><div style={{ textAlign: 'left' }}> 
                            Modificar<br />Funcionario
                        </div>
                        </button>
                        <button type="submit" className="button2" onClick={handleDelete}>
                            <RiDeleteBinLine style={{
                            fontSize: '25px',
                            marginRight: '20px',
                            marginLeft: '20px',
                            color: '#12959E' // Tamaño del icono
                            }} /> <div style={{ textAlign: 'left' }}>
                            Eliminar<br />Funcionario
                        </div>
                        </button>
                    </div>

                     </div>
                     
                     
        </div>

    </Fragment>
    );
};