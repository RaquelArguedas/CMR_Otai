import json
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from MainController import *
from datetime import datetime, timedelta
from io import BytesIO
from PIL import Image
from flask import send_file #nuevo import
import base64

# Instantiation
app = Flask(__name__)

# Settings
CORS(app)
control = SingletonDAO()

# Routes

#CRUD Capacitacion
#Crear
@app.route('/createCapacitacion', methods=['POST'])
def createCapacitacion(): 
  id = control.createCapacitacion(request.json['idCapacitacion'], request.json['nombre'],
                                  request.json['descripcion'], request.json['fechaCreacion'], 
                                  request.json['fechaEjecucion'], request.json['documentos'], 
                                  request.json['idEstado'], request.json['horasDuracion'],
                                  request.json['fechaFinalizacion'], request.json['modalidad'],
                                  request.json['idFuncionario'], request.json['precio'],
                                  request.json['tipoCapacitacion'], request.json['idProyecto'],
                                  request.json['idCliente'])
  
  return jsonify(str(id))

#Read
@app.route('/readCapacitacion/<idCapacitacion>', methods=['GET'])
def readCapacitacion(idCapacitacion):
  c = control.readCapacitacion(idCapacitacion)
  if (c == None):
     return jsonify("No existe")
  return json.dumps(c.__dict__)

#Update
@app.route('/updateCapacitacion', methods=['POST'])
def updateCapacitacion(): 
  id = control.updateCapacitacion(request.json['idCapacitacion'], request.json['nombre'],
                                  request.json['descripcion'], request.json['fechaCreacion'], 
                                  request.json['fechaEjecucion'], request.json['documentos'], 
                                  request.json['idEstado'], request.json['horasDuracion'],
                                  request.json['fechaFinalizacion'], request.json['modalidad'],
                                  request.json['idFuncionario'], request.json['precio'],
                                  request.json['tipoCapacitacion'], request.json['idProyecto'],
                                  request.json['idCliente'])
  
  return jsonify(str(id))

#Delete
@app.route('/deleteCapacitacion/<idCapacitacion>', methods=['POST'])
def deleteCapacitacion(idCapacitacion): 
  id = control.updateCapacitacion(idCapacitacion, None, None, None, None, None, 
                                  1, None, None, None, None, None, None, None, None)
  
  return jsonify(str(id))


#CRUD Cliente
@app.route('/createCliente', methods=['POST'])
def createCliente():
    id = control.createCliente(
        request.json['cedJuridica'],
        request.json['nombre'],
        request.json['numTelefono'],
        request.json['correo'],
        request.json['fechaIngreso'],
        request.json['estado']
    )
    return jsonify(str(id))

@app.route('/readCliente/<idCliente>', methods=['GET'])
def readCliente(idCliente):
    c = control.readCliente(int(idCliente))
    if (c == None):
        return jsonify("No existe")
    return json.dumps(c.__dict__)

@app.route('/updateCliente', methods=['POST'])
def updateCliente():
    id = control.updateCliente(
        request.json['idCliente'],
        request.json['cedJuridica'],
        request.json['nombre'],
        request.json['numTelefono'],
        request.json['correo'],
        request.json['estado']
    )
    return jsonify(str(id))

@app.route('/deleteCliente/<idCliente>', methods=['POST'])
def deleteCliente(idCliente):
    id = control.updateCliente( idCliente, None, None, None, None, 1)
    return jsonify(str(id))

#CRUD Cotizacion
@app.route('/createCotizacion', methods=['POST'])
def createCotizacion():
    id = control.createCotizacion(
        request.json['nombre'],
        request.json['descripcion'],
        request.json['idCliente'],
        request.json['idPorcentajesC'],
        request.json['Total'],
        request.json['idServicio'],
        request.json['estado'],
        request.json['fechaCreacion']
    )
    return jsonify(str(id))

@app.route('/readCotizacion/<idCotizacion>', methods=['GET'])
def readCotizacion(idCotizacion):
    c = control.readCotizacion(int(idCotizacion))
    if (c == None):
        return jsonify("No existe")
    return json.dumps(c.__dict__)

@app.route('/updateCotizacion', methods=['POST'])
def updateCotizacion():
    id = control.updateCotizacion(
        request.json['idCotizacion'],
        request.json['nombre'],
        request.json['descripcion'],
        request.json['idCliente'],
        request.json['idPorcentajesC'],
        request.json['Total'],
        request.json['idServicio'],
        request.json['estado'],
        request.json['fechaCreacion']
    )
    return jsonify(str(id))

@app.route('/deleteCotizacion/<idCotizacion>', methods=['POST'])
def deleteCotizacion(idCotizacion):
    id = control.updateCotizacion( idCotizacion, None,None,None,None,None,None,1,None)
    return jsonify(str(id))


#CRUD Evaluacion
@app.route('/createEvaluacion', methods=['POST'])
def createEvaluacion(): 
    id = control.createEvaluacion(
        request.json['idEvaluacion'],
        request.json['nombre'],
        request.json['descripcion'],
        request.json['fechaCreacion'],
        request.json['tipoEvaluacion'],
        request.json['fechaEjecucion'],
        request.json['documentos'],
        request.json['idEstado'],
        request.json['precio'],
        request.json['idProyecto'],
        request.json['idCliente']
    )
    return jsonify(str(id))

@app.route('/readEvaluacion/<idEvaluacion>', methods=['GET'])
def readEvaluacion(idEvaluacion):
    c = control.readEvaluacion(idEvaluacion)
    if (c == None):
        return jsonify("No existe")
    return jsonify(c.toList())

@app.route('/updateEvaluacion', methods=['POST'])
def updateEvaluacion(): 
    id = control.updateEvaluacion(
        request.json['idEvaluacion'],
        request.json['nombre'],
        request.json['descripcion'],
        request.json['fechaCreacion'],
        request.json['tipoEvaluacion'],
        request.json['fechaEjecucion'],
        request.json['documentos'],
        request.json['idEstado'],
        request.json['precio'],
        request.json['idProyecto'],
        request.json['idCliente']
    )
    return jsonify(str(id))

@app.route('/deleteEvaluacion/<idEvaluacion>', methods=['POST'])
def deleteEvaluacion(idEvaluacion): 
    id = control.updateEvaluacion( idEvaluacion, None,None,None,None,None,None,1,None,None,None)
    return jsonify(str(id))


#CRUD Funcionario
@app.route('/createFuncionario', methods=['POST'])
def createFuncionario():
    id = control.createFuncionario(
        request.json['nombre'],
        request.json['apellido'],
        request.json['fechaNacimiento'],
        request.json['cedula'],
        request.json['numTelefono'],
        request.json['correo'],
        request.json['estado'],
        request.json['fechaIngreso'],
        request.json['perfil']
    )
    return jsonify(str(id))

@app.route('/readFuncionario/<idFuncionario>', methods=['GET'])
def readFuncionario(idFuncionario):
    f = control.readFuncionario(int(idFuncionario))
    if (f == None):
        return jsonify("No existe")
    return json.dumps(f.__dict__)

@app.route('/updateFuncionario', methods=['POST'])
def updateFuncionario():
    id = control.updateFuncionario(
        request.json['idFuncionario'],
        request.json['nombre'],
        request.json['apellido'],
        request.json['fechaNacimiento'],
        request.json['cedula'],
        request.json['numTelefono'],
        request.json['correo'],
        request.json['estado'],
        request.json['fechaIngreso'],
        request.json['perfil']
    )
    return jsonify(str(id))

@app.route('/deleteFuncionario/<idFuncionario>', methods=['POST'])
def deleteFuncionario(idFuncionario):
    id = control.updateFuncionario(idFuncionario,None,None,None,None,None,None,1,None,None)
    return jsonify(str(id))


#CRUD Perfil
@app.route('/createPerfil', methods=['POST'])
def createPerfil():
    id = control.createPerfil(request.json['nombre'])
    return jsonify(str(id))

@app.route('/readPerfil/<idPerfil>', methods=['GET'])
def readPerfil(idPerfil):
    p = control.readPerfil(int(idPerfil))
    if (p == None):
        return jsonify("No existe")
    return json.dumps(p.__dict__)

@app.route('/updatePerfil', methods=['POST'])
def updatePerfil():
    id = control.updatePerfil(
        request.json['idPerfil'],
        request.json['nombre']
    )
    return jsonify(str(id))


#CRUD Porcentaje
@app.route('/createPorcentaje', methods=['POST'])
def createPorcentaje():
    id = control.createPorcentaje(
        request.json['fdu'],
        request.json['coordinacionGeneral'],
        request.json['coordinacionEspecifica'],
        request.json['iva'],
        request.json['fechaIngreso'],
        request.json['idUsuario']
    )
    return jsonify(str(id))

@app.route('/readPorcentaje/<idPorcentaje>', methods=['GET'])
def readPorcentaje(idPorcentaje):
    p = control.readPorcentaje(int(idPorcentaje))
    if (p == None):
        return jsonify("No existe")
    return json.dumps(p.__dict__)

@app.route('/updatePorcentaje', methods=['POST'])
def updatePorcentaje():
    id = control.updatePorcentaje(
        request.json['idPorcentaje'],
        request.json['fdu'],
        request.json['coordinacionGeneral'],
        request.json['coordinacionEspecifica'],
        request.json['iva'],
        request.json['fechaIngreso'],
        request.json['idUsuario']
    )
    return jsonify(str(id))


#CRUD Proyecto
@app.route('/createProyecto', methods=['POST'])
def createProyecto():
    id = control.createProyecto(
        request.json['idProyecto'],
        request.json['nombre'],
        request.json['descripcion'],
        request.json['idCliente'],
        request.json['documentos'],
        request.json['fechaInicio'],
        request.json['fechaFinalizacion'],
        request.json['subTotal'],
        request.json['estado'],
        request.json['funcionarios'] #recibe una lista con ids de funcionarios
    )
    return jsonify(str(id))

@app.route('/readProyecto/<idProyecto>', methods=['GET'])
def readProyecto(idProyecto):
    p = control.readProyecto(int(idProyecto))
    if (p == None):
        return jsonify("No existe")
    return json.dumps(p.__dict__)

@app.route('/updateProyecto', methods=['POST'])
def updateProyecto():
    id = control.updateProyecto(
        request.json['idProyecto'],
        request.json['nombre'],
        request.json['descripcion'],
        request.json['idCliente'],
        request.json['documentos'],
        request.json['fechaInicio'],
        request.json['fechaFinalizacion'],
        request.json['subTotal'],
        request.json['estado'],
        request.json['funcionarios'] #recibe una lista con ids de funcionarios
    )
    return jsonify(str(id))

@app.route('/deleteProyecto/<idProyecto>', methods=['POST'])
def deleteProyecto(idProyecto):
    id = control.updateProyecto(idProyecto,None,None,None,None,None,None,None,1,None)
    return jsonify(str(id))


#CRUD TipoCapacitacion
@app.route('/createTipoCapacitacion', methods=['POST'])
def createTipoCapacitacion():
    id = control.createTipoCapacitacion(request.json['nombre'])
    return jsonify(str(id))

@app.route('/readTipoCapacitacion/<idTipoCapacitacion>', methods=['GET'])
def readTipoCapacitacion(idTipoCapacitacion):
    t = control.readTipoCapacitacion(int(idTipoCapacitacion))
    if (t == None):
        return jsonify("No existe")
    return json.dumps(t.__dict__)

@app.route('/updateTipoCapacitacion', methods=['POST'])
def updateTipoCapacitacion():
    id = control.updateTipoCapacitacion(
        request.json['idTipoCapacitacion'],
        request.json['nombre']
    )
    return jsonify(str(id))


#CRUD TipoEvaluacion
@app.route('/createTipoEvaluacion', methods=['POST'])
def createTipoEvaluacion():
    id = control.createTipoEvaluacion(request.json['nombre'], request.json['precio'])
    return jsonify(str(id))

@app.route('/readTipoEvaluacion/<idTipoEvaluacion>', methods=['GET'])
def readTipoEvaluacion(idTipoEvaluacion):
    t = control.readTipoEvaluacion(int(idTipoEvaluacion))
    if (t == None):
        return jsonify("No existe")
    return json.dumps(t.__dict__)

@app.route('/updateTipoEvaluacion', methods=['POST'])
def updateTipoEvaluacion():
    id = control.updateTipoEvaluacion(
        request.json['idTipoEvaluacion'],
        request.json['nombre'],
        request.json['precio']
    )
    return jsonify(str(id))


#CRUD Usuario
@app.route('/createUsuario', methods=['POST'])
def createUsuario():
    id = control.createUsuario(
        request.json['nombre'],
        request.json['apellido'],
        request.json['fechaNacimiento'],
        request.json['cedula'],
        request.json['numTelefono'],
        request.json['correo'],
        request.json['fechaIngreso'],
        request.json['contrasenha'],
        request.json['estado']
    )
    return jsonify(str(id))

@app.route('/readUsuario/<idUsuario>', methods=['GET'])
def readUsuario(idUsuario):
    u = control.readUsuario(int(idUsuario))
    if (u == None):
        return jsonify("No existe")
    return json.dumps(u.__dict__)

@app.route('/updateUsuario', methods=['POST'])
def updateUsuario():
    id = control.updateUsuario(
        request.json['idUsuario'],
        request.json['nombre'],
        request.json['apellido'],
        request.json['fechaNacimiento'],
        request.json['cedula'],
        request.json['numTelefono'],
        request.json['correo'],
        request.json['fechaIngreso'],
        request.json['contrasenha'],
        request.json['estado']
    )
    return jsonify(str(id))

@app.route('/deleteUsuario/<idUsuario>', methods=['POST'])
def deleteUsuario(idUsuario):
    id = control.updateUsuario(idUsuario,None,None,None,None,None,None,None,None,1)
    return jsonify(str(id))

#Papelera
@app.route('/consultarPapelera', methods=['GET'])
def consultarPapelera():
    l = control.consultarPapelera()
    if (l == []):
        return jsonify("vacia")
    return json.dumps(l.__dict__)

# inicia el servidor
if __name__ == "__main__":
    app.run(debug=True)

