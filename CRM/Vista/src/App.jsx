import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Evaluacion } from "./components/Evaluaciones/Evaluacion";
import { CrearEvaluacion } from "./components/Evaluaciones/CrearEvaluacion";
import { DetalleEvaluacion } from "./components/Evaluaciones/DetalleEvaluacion";
import { ModificarEvaluacion } from "./components/Evaluaciones/ModificarEvaluacion";

import { Clientes } from "./components/Clientes/Clientes";
import { CrearCliente } from "./components/Clientes/CrearCliente";
import { DetalleCliente } from "./components/Clientes/DetalleCliente";
import { ModificarCliente } from "./components/Clientes/ModificarCliente";

import { Capacitacion } from "./components/Capacitaciones/Capacitacion";
import { CrearCapacitacion } from "./components/Capacitaciones/CrearCapacitacion";
import { DetalleCapacitacion } from "./components/Capacitaciones/DetalleCapacitacion";
import { ModificarCapacitacion } from "./components/Capacitaciones/ModificarCapacitacion";

import { Cotizacion } from "./components/Cotizaciones/Cotizacion";
import { CrearCotizacion} from "./components/Cotizaciones/CrearCotizacion";
import { DetalleCotizacion } from "./components/Cotizaciones/DetalleCotizacion";
import { ModificarCotizacion } from "./components/Cotizaciones/ModificarCotizacion";

import { ReporteRendimiento } from "./components/ReportesRendimiento/ReporteRendimiento";
import { ReporteFinanciero } from "./components/ReportesFinancieros/ReporteFinanciero";

import { Funcionarios } from "./components/Funcionarios/Funcionarios";
import { CrearFuncionarios } from "./components/Funcionarios/CrearFuncionarios";
import { DetalleFuncionario } from "./components/Funcionarios/DetalleFuncionario";
import { ModificarFuncionario } from "./components/Funcionarios/ModificarFuncionario";
import { CrearUsuario } from "./components/Usuarios/CrearUsuario";
import { DetalleMiCuenta } from "./components/Usuarios/DetalleMiCuenta";
import { ModficarMiCuenta } from "./components/Usuarios/ModficarMiCuenta";
import { Perfiles } from "./components/Funcionarios/Perfiles/Perfiles";

import { TiposEvaluaciones } from "./components/Evaluaciones/TiposEvluaciones/TiposEvaluaciones";
import { CrearTipoEvaluacion } from "./components/Evaluaciones/TiposEvluaciones/CrearTipoEvaluacion";
import { ModficarTipoEvaluacion } from "./components/Evaluaciones/TiposEvluaciones/ModficarTipoEvaluacion";

import { TiposCapacitaciones } from "./components/Capacitaciones/TiposCapacitaciones/TiposCapacitaciones";
import { CrearTipoCapacitacion } from "./components/Capacitaciones/TiposCapacitaciones/CrearTipoCapacitacion";
import { ModficarTipoCapacitacion } from "./components/Capacitaciones/TiposCapacitaciones/ModficarTipoCapacitacion";

import { Proyectos } from "./components/Proyectos/Proyectos";
import { CrearProyectos } from "./components/Proyectos/CrearProyectos";
import { DetalleProyecto } from "./components/Proyectos/DetalleProyecto";
import { ModificarProyecto } from "./components/Proyectos/ModificarProyecto";

export function App() {
    return (
    <Router>
        <div className="App">
            
            <Routes>
            {/*<Evaluacion /><Route exact path= "/" element = {<Login/>} />
            <Route exact path= "/recuperar" element = {<Recuperar/>} /> */}
            <Route exact path= "/" element = {<Evaluacion/>} />
            <Route exact path= "/crearEvaluacion" element = {<CrearEvaluacion/>} />
            <Route exact path= "/detalleEvaluacion/:idEvaluacion" element = {<DetalleEvaluacion/>} />
            <Route exact path= "/modificarEvaluacion/:idEvaluacion" element = {<ModificarEvaluacion/>} />

            <Route exact path= "/capacitacion" element = {<Capacitacion/>} />
            <Route exact path= "/crearCapacitacion" element = {<CrearCapacitacion/>} />
            <Route exact path= "/detalleCapacitacion" element = {<DetalleCapacitacion/>} />
            <Route exact path= "/modificarCapacitacion" element = {<ModificarCapacitacion/>} />

            <Route exact path= "/cotizacion" element = {<Cotizacion/>} />
            <Route exact path= "/crearCotizacion" element = {<CrearCotizacion/>} />
            <Route exact path= "/detalleCotizacion" element = {<DetalleCotizacion/>} />
            <Route exact path= "/modificarCotizacion" element = {<ModificarCotizacion/>} />

            <Route exact path= "/clientes" element = {<Clientes/>} />
            <Route exact path= "/crearClientes" element = {<CrearCliente/>} />
            <Route path="/detalleClientes/:idCliente" element={<DetalleCliente />} />
            <Route exact path= "/modificarCliente/:idCliente" element = {<ModificarCliente/>} />

            <Route exact path= "/funcionarios" element = {<Funcionarios/>} />
            <Route exact path= "/crearFuncionarios" element = {<CrearFuncionarios/>} />
            <Route exact path= "/detalleFuncionario/:idFuncionario" element = {<DetalleFuncionario/>} />
            <Route exact path= "/modificarFuncionario/:idFuncionario" element = {<ModificarFuncionario/>} />
            
            <Route exact path= "/crearUsuario" element = {<CrearUsuario/>} />
            <Route exact path= "/detalleMiCuenta" element = {<DetalleMiCuenta/>} />
            <Route exact path= "/modficarMiCuenta" element = {<ModficarMiCuenta/>} />

            <Route exact path= "/reportesRendimiento" element = {<ReporteRendimiento/>} />
            <Route exact path= "/reportesFinancieros" element = {<ReporteFinanciero/>} />

            <Route exact path= "/perfiles" element = {<Perfiles/>} />

            <Route exact path= "/tiposEvaluaciones" element = {<TiposEvaluaciones/>} />
            <Route exact path= "/crearTiposEvaluaciones" element = {<CrearTipoEvaluacion/>} />
            <Route exact path= "/modificarTiposEvaluaciones/:idTipoEvaluacion" element = {<ModficarTipoEvaluacion/>} />

            <Route exact path= "/tiposCapacitaciones" element = {<TiposCapacitaciones/>} />
            <Route exact path= "/crearTipoCapacitacion" element = {<CrearTipoCapacitacion/>} />
            <Route exact path= "/modficarTipoCapacitacion" element = {<ModficarTipoCapacitacion/>} />

            <Route exact path= "/proyectos" element = {<Proyectos/>} />
            <Route exact path= "/crearProyectos" element = {<CrearProyectos/>} />
            <Route exact path= "/detalleProyecto/:idProyecto" element = {<DetalleProyecto/>} />
            <Route exact path= "/modificarProyecto/:idProyecto" element = {<ModificarProyecto/>} />

            </Routes>
        </div>
    </Router>
    )
    
}