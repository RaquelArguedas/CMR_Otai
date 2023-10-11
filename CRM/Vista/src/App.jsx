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

import { Funcionarios } from "./components/Funcionarios/Funcionarios";
import { CrearFuncionarios } from "./components/Funcionarios/CrearFuncionarios";
import { DetalleFuncionario } from "./components/Funcionarios/DetalleFuncionario";
import { ModificarFuncionario } from "./components/Funcionarios/ModificarFuncionario";
import { CrearUsuario } from "./components/Usuarios/CrearUsuario";
import { DetalleMiCuenta } from "./components/Usuarios/DetalleMiCuenta";
import { ModficarMiCuenta } from "./components/Usuarios/ModficarMiCuenta";
import { Proyectos } from "./components/Proyectos/Proyectos";
export function App() {
    return (
    <Router>
        <div className="App">
            
            <Routes>
            {/*<Evaluacion /><Route exact path= "/" element = {<Login/>} />
            <Route exact path= "/recuperar" element = {<Recuperar/>} /> */}
            <Route exact path= "/" element = {<Evaluacion/>} />
            <Route exact path= "/crearEvaluacion" element = {<CrearEvaluacion/>} />
            <Route exact path= "/detalleEvaluacion" element = {<DetalleEvaluacion/>} />
            <Route exact path= "/modficarEvaluacion" element = {<ModificarEvaluacion/>} />

            <Route exact path= "/clientes" element = {<Clientes/>} />
            <Route exact path= "/crearClientes" element = {<CrearCliente/>} />
            <Route exact path= "/detalleClientes" element = {<DetalleCliente/>} />
            <Route exact path= "/modificarCliente" element = {<ModificarCliente/>} />

            <Route exact path= "/funcionarios" element = {<Funcionarios/>} />
            <Route exact path= "/crearFuncionarios" element = {<CrearFuncionarios/>} />
            <Route exact path= "/detalleFuncionario" element = {<DetalleFuncionario/>} />
            <Route exact path= "/modificarFuncionario" element = {<ModificarFuncionario/>} />

            
            <Route exact path= "/crearUsuario" element = {<CrearUsuario/>} />
            <Route exact path= "/detalleMiCuenta" element = {<DetalleMiCuenta/>} />
            <Route exact path= "/modficarMiCuenta" element = {<ModficarMiCuenta/>} />

            <Route exact path= "/proyectos" element = {<Proyectos/>} />
            </Routes>
        </div>
    </Router>
    )
    
}