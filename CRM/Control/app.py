import json
from flask import Flask, jsonify, request, send_file, Response,make_response
from flask_cors import CORS
from MainController import *
from datetime import datetime, timedelta
from io import BytesIO
from PIL import Image
from flask import send_file #nuevo import
import base64
import mimetypes
import io
import os
import zipfile
from datetime import datetime

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
  id = control.createCapacitacion(request.json['nombre'],
                                  request.json['descripcion'], request.json['fechaCreacion'], 
                                  request.json['fechaEjecucion'], request.json['documentos'], 
                                  int(request.json['idEstado']), int(request.json['horasDuracion']),
                                  request.json['fechaFinalizacion'], int(request.json['modalidad']),
                                  request.json['idFuncionario'], float(request.json['precio']),
                                  int(request.json['tipoCapacitacion']), request.json['idProyecto'],
                                  request.json['idCliente'])
  
  return jsonify(str(id))

#Read
@app.route('/readCapacitacion/<idCapacitacion>', methods=['GET'])
def readCapacitacion(idCapacitacion):
  c = control.readCapacitacion(idCapacitacion)
  print("info")
  print(c.idFuncionario)
  if (c == None):
     return jsonify("No existe")
  return jsonify(c.toList())

#Update
@app.route('/updateCapacitacion', methods=['POST'])
def updateCapacitacion(): 
  id = control.updateCapacitacion(int(request.json['idCapacitacion']), request.json['nombre'],
                                  request.json['descripcion'], request.json['fechaCreacion'], 
                                  request.json['fechaEjecucion'], None, 
                                  int(request.json['idEstado']), int(request.json['horasDuracion']),
                                  request.json['fechaFinalizacion'], int(request.json['modalidad']),
                                  int(request.json['idFuncionario']), float(request.json['precio']),
                                  int(request.json['tipoCapacitacion']), int(request.json['idProyecto']),
                                  int(request.json['idCliente']))
  print("DESPUES DEL BACK")
  print(id)
  return jsonify(str(id))

#Delete
@app.route('/deleteCapacitacion/<idCapacitacion>', methods=['POST'])
def deleteCapacitacion(idCapacitacion): 
  id = control.updateCapacitacion(idCapacitacion, None, None, None, None, None, 
                                  1, None, None, None, None, None, None, None, None)
  print("ID DESDE DELETE", idCapacitacion)
  return jsonify(str(id))


#CRUD Cliente
@app.route('/createCliente', methods=['POST'])
def createCliente():
    fecha_actual = datetime.now().strftime('%Y-%m-%d')
    print(fecha_actual)

    # Accede a los datos del formulario en lugar de request.json
    cedJuridica = request.form.get('cedula')
    nombre = request.form.get('nombre')
    numTelefono = request.form.get('telefono')
    correo = request.form.get('correo')
    print(cedJuridica, nombre,numTelefono,correo)
    id = control.createCliente(int(cedJuridica), nombre, int(numTelefono), correo, fecha_actual, 5)
    return jsonify(str(id))

@app.route('/readCliente/<idCliente>', methods=['GET'])
def readCliente(idCliente):
    c = control.readCliente(int(idCliente))
    if (c == None):
        return jsonify("No existe")
    return jsonify(c.toList())

@app.route('/updateCliente/<idCliente>', methods=['POST'])
def updateCliente(idCliente):
    print("update")

    # Accede a los datos del formulario en lugar de request.json
    cedJuridica = request.form.get('cedula')
    nombre = request.form.get('nombre')
    numTelefono = request.form.get('telefono')
    correo = request.form.get('correo')
    estado = request.form.get('estado')
    #print(idCliente, cedJuridica, nombre, numTelefono, correo, estado)
    id = control.updateCliente(idCliente, cedJuridica, nombre, numTelefono, correo, estado)

    return jsonify(str(id))

@app.route('/deleteCliente/<idCliente>', methods=['GET'])
def deleteCliente(idCliente):
    print(idCliente)
    id = control.updateCliente(idCliente, None, None, None, None, 6)
    print(id)
    return jsonify(str(id))

@app.route('/getClientes', methods=['GET'])
def getClientes():
    clientes = control.cliente
    lista = []
    for cliente in clientes:
        lista += [cliente.toList()]
    print(lista)
    return jsonify(lista)

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
    return jsonify(c.toList())

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
    print('DeleteCotizacion!')
    id = control.updateCotizacion(int (idCotizacion), None,None,None,None,None,None,1,None)
    return jsonify(str(id))


#CRUD Evaluacion
@app.route('/createEvaluacion', methods=['POST'])
def createEvaluacion(): 
    id = control.createEvaluacion(
        request.json['nombre'],
        request.json['descripcion'],
        request.json['fechaCreacion'],
        int(request.json['tipoEvaluacion']),
        request.json['fechaEjecucion'],
        request.json['documentos'],
        int(request.json['idEstado']),
        int(request.json['precio']),
        int(request.json['idProyecto']),
        int(request.json['idCliente'])
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
        None,
        int(request.json['tipoEvaluacion']),
        request.json['fechaEjecucion'],
        None,
        int(request.json['idEstado']),
        int(request.json['precio']),
        int(request.json['idProyecto']),
        int(request.json['idCliente'])
    )
    return jsonify(str(id))

@app.route('/deleteEvaluacion/<idEvaluacion>', methods=['POST'])
def deleteEvaluacion(idEvaluacion): 
    print('ALO', idEvaluacion)
    id = control.updateEvaluacion( idEvaluacion, None,None,None,None,None,None,1,None,None,None)
    print('id',id)
    return jsonify(str(id))


#CRUD Funcionario
@app.route('/createFuncionario', methods=['POST'])
def createFuncionario():
    fecha_actual = datetime.now().strftime('%Y-%m-%d')

    id = control.createFuncionario(
        request.form.get('nombre'),
        request.form.get('apellido'),
        request.form.get('fechaNacimiento'),
        request.form.get('cedula'),
        request.form.get('numTelefono'),
        request.form.get('correo'),
        5,
        fecha_actual,
        [int(item) for item in (request.form.get('perfilesIds')).split(',')]
    )

    return jsonify(str(id))

@app.route('/readFuncionario/<idFuncionario>', methods=['GET'])
def readFuncionario(idFuncionario):
    f = control.readFuncionario(int(idFuncionario))
    if (f == None):
        return jsonify("No existe")
    return jsonify(f.toList())

@app.route('/updateFuncionario/<idFuncionario>', methods=['POST'])
def updateFuncionario(idFuncionario):
    print("update", type(request.form.get('perfilesIds')),request.form.get('perfilesIds'))

    id = control.updateFuncionario(
        int(idFuncionario),
        request.form.get('nombre'),
        request.form.get('apellido'),
        request.form.get('fechaNacimiento'),
        request.form.get('cedula'),
        request.form.get('numTelefono'),
        request.form.get('correo'),
        int(request.form.get('estado')),
        None,
        [int(item) for item in (request.form.get('perfilesIds')).split(',')]
    )
    print(id)
    return jsonify(str(id))

@app.route('/deleteFuncionario/<idFuncionario>', methods=['GET'])
def deleteFuncionario(idFuncionario):
    id = control.updateFuncionario(int(idFuncionario),None,None,None,None,None,None,6,None,None)
    print(id)
    return jsonify(str(id))


@app.route('/getFuncionarios', methods=['GET'])
def getFuncionarios():
    funcionarios = control.funcionario
    lista = []
    for funcionario in funcionarios:
        lista += [funcionario.toList()]
    print(lista)
    return jsonify(lista)

@app.route('/getPerfiles', methods=['GET'])
def getPerfiles():
    perfiles = control.perfil
    lista = []
    for perfil in perfiles:
        lista += [perfil.toList()]
    print(lista)
    return jsonify(lista)

#CRUD Perfil
@app.route('/createPerfil/<nombre>', methods=['POST'])
def createPerfil(nombre):
    id = control.createPerfil(nombre)
    print("ID DESDE BACKEND", id)
    return jsonify(str(id))

@app.route('/readPerfil/<idPerfil>', methods=['GET'])
def readPerfil(idPerfil):
    p = control.readPerfil(int(idPerfil))
    if (p == None):
        return jsonify("No existe")
    return jsonify(p.toList())

@app.route('/updatePerfil/<idPerfil>/<nombre>', methods=['POST'])
def updatePerfil(idPerfil,nombre):
    print(idPerfil, nombre)
    id = control.updatePerfil( int(idPerfil), nombre)
    print(id)
    return jsonify(str(id))

@app.route('/deletePerfil/<idPerfil>', methods=['POST'])
def deletePerfil(idPerfil):
    print("HOLAAAAAAAAAAAAA")
    id = control.deletePerfil(int(idPerfil))
    print(id)
    return jsonify(str(id))

@app.route('/isPerfilFK/<idPerfil>', methods=['POST'])
def isPerfilFK(idPerfil):
    result = 0
    for funcionario in control.funcionario:
        for perfil in funcionario.perfiles:
            if (perfil.idPerfil == idPerfil):
                result = 1
    return jsonify(result)

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
    return jsonify(p.toList())

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
    idS = request.json['idServicios']
    print("idServicioooo:", idS)
    id = control.createProyecto(
        request.json['nombre'],
        request.json['descripcion'],
        idS,
        request.json['documentos'],
        request.json['fechaInicio'],
        request.json['fechaFinalizacion'],
        int(request.json['subTotal']),
        int(request.json['estado'])
    )
    return jsonify(str(id))

@app.route('/readProyecto/<idProyecto>', methods=['GET'])
def readProyecto(idProyecto):
    print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', idProyecto)
    p = None
    for proyecto in control.proyecto:
        if proyecto.idProyecto == idProyecto:
            p = proyecto
    if (p == None):
        return jsonify("No existe")
    print(p.toList())
    return jsonify(p.toList())

@app.route('/getServiciosProyecto/<idProyecto>', methods=['GET'])
def getServiciosProyecto(idProyecto):
    print("________________________________________")
    print(idProyecto, type(idProyecto))
    capacitaciones = control.capacitacion
    evaluaciones = control.evaluacion
    lista = []

    for cap in capacitaciones:
        if cap.idProyecto == int(idProyecto):
            lista += [cap.toList()]
    
    for eval in evaluaciones:
        if eval.idProyecto == int(idProyecto):
            lista += [eval.toList()]
        
    print(lista)
    return jsonify(lista)

@app.route('/updateProyecto/<idProyecto>', methods=['POST'])
def updateProyecto(idProyecto):
    #print("updateProyecto", request.form.get('doc'))
    print("updateProyecto", request.form.get('fechaInicio'))
    print("updateProyecto", request.form.get('fechaFinalizacion'))
    print("servicios", type(request.form.get('servicios')))
    servicios = request.form.get('servicios');
    listaServicios = str.split(servicios, ',')
    id = control.updateProyecto(
        idProyecto,
        request.form.get('nombre'),
        request.form.get('descripcion'),
        listaServicios,
        None,
        request.form.get('fechaInicio'),
        request.form.get('fechaFinalizacion'),
        request.form.get('subTotal'),
        request.form.get('estado'),
        None #recibe una lista con ids de funcionarios
    )
    #print("__________________")
    if id==None: #si sale bien, crea los archivos y hace los cambios en servicios
        mi_lista = (request.form.get('servicios')).split(',')
        for servicio in mi_lista:
            #print(servicio, "AAA")
            for c in control.capacitacion:
                if c.idCapacitacion == servicio:
                    c.idProyecto = idProyecto
                    #print("cambie cap")
            for c in control.evaluacion:
                if c.idEvaluacion == servicio:
                    c.idProyecto = idProyecto
                    #print("cambie eval")
        
    return jsonify(str(id))


@app.route('/deleteProyecto/<idProyecto>', methods=['GET'])
def deleteProyecto(idProyecto):
    print("11111111111111111111111")
    id = control.updateProyecto(idProyecto,None,None,None,None,None,None,None,1,None)
    print("EOOOOOOOOOOOO")
    print(id)
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
    return jsonify(t.toList())

@app.route('/updateTipoCapacitacion', methods=['POST'])
def updateTipoCapacitacion():
    id = control.updateTipoCapacitacion(int(request.json['id']), request.json['nombre'])
    return jsonify(str(id))

@app.route('/getTipoCapacitacion', methods=['GET'])
def getTipoCapacitacion():
    tiposCap = control.tipoCapacitacion
    lista = []
    for tipo in tiposCap:
        lista += [tipo.toList()]
    print(lista)
    return jsonify(lista)

@app.route('/deleteTipoCapacitacion/<idTipo>', methods=['POST'])
def deleteTipoCapacitacion(idTipo):
    id = control.deleteTipoCapacitacion(int(idTipo))
    print(id)
    return jsonify(str(id))

@app.route('/isTipoCapacitacionFK/<idTipoCapacitacion>', methods=['GET'])
def isTipoCapacitacionFK(idTipoCapacitacion):
    res = control.isTipoCapacitacionFK(idTipoCapacitacion)
    return jsonify(res)

#CRUD TipoEvaluacion
@app.route('/createTipoEvaluacion', methods=['POST'])
def createTipoEvaluacion():
    print(request.json['nombre'], request.json['precio'])
    id = control.createTipoEvaluacion(request.json['nombre'], request.json['precio'])
    return jsonify(str(id))

@app.route('/readTipoEvaluacion/<idTipoEvaluacion>', methods=['GET'])
def readTipoEvaluacion(idTipoEvaluacion):
    t = control.readTipoEvaluacion(int(idTipoEvaluacion))
    if (t == None):
        return jsonify("No existe")
    return jsonify(t.toList())


@app.route('/updateTipoEvaluacion', methods=['POST'])
def updateTipoEvaluacion():
    nombre = request.form.get('nombre')
    precio = request.form.get('precio')
    idTipoEvaluacion=request.form.get('idTipoEvaluacion')
    print(idTipoEvaluacion, nombre, precio
    )
    id = control.updateTipoEvaluacion(idTipoEvaluacion, nombre, precio
    )
    return jsonify(str(id))

@app.route('/getTipoEvaluaciones', methods=['GET'])
def getTipoEvaluaciones():
    tiposEval = control.tipoEvaluacion
    lista = []
    for tipo in tiposEval:
        lista += [tipo.toList()]
    print(lista)
    return jsonify(lista)

@app.route('/deleteTipoEvaluacion/<idTipo>', methods=['POST'])
def deleteTipoEvaluacion(idTipo):
    id = control.deleteTipoEvaluacion(int(idTipo))
    print(id)
    return jsonify(str(id))

@app.route('/isTipoEvaluacionFK/<idTipoEvaluacion>', methods=['GET'])
def isTipoEvaluacionFK(idTipoEvaluacion):
    res = control.isTipoEvaluacionFK(idTipoEvaluacion)
    return jsonify(res)

#CRUD Estado
@app.route('/getEstado', methods=['GET'])
def getEstado():
    estados = control.estado
    lista = []
    for estado in estados:
        lista += [estado.toList()]
    print("ESTADOS....................")
    print(lista)
    return jsonify(lista)

#CRUD Usuario
@app.route('/createUsuario', methods=['POST'])
def createUsuario():
    fecha_actual = datetime.now().strftime('%Y-%m-%d')
    usuarios = control.usuario
    for user in usuarios:
        if user.correo == request.form.get('correo'):
            return jsonify(str("Correo existente"))
    id = control.createUsuario(
        request.form.get('nombre'),
        request.form.get('apellido'),
        request.form.get('fechaNacimiento'),
        request.form.get('cedula'),
        request.form.get('numTelefono'),
        request.form.get('correo'),
        fecha_actual,
        request.form.get('contrasenha'),
        5
    )
    print("id create usuario",id)
    return str(id)

@app.route('/existeUsuarioCorreo/<correo>', methods=['GET'])
def existeUsuarioCorreo(correo):
    usuarios = control.usuario
    for user in usuarios:
        if user.correo == correo:
            return jsonify(str(1))
    return jsonify(str(0))

@app.route('/readUsuario/<idUsuario>', methods=['GET'])
def readUsuario(idUsuario):
    u = control.readUsuario(int(idUsuario))
    if (u == None):
        return jsonify("No existe")
    return jsonify(u.toList())

@app.route('/updateUsuario/<idUsuario>', methods=['POST'])
def updateUsuario(idUsuario):
    id = control.updateUsuario(
        int(idUsuario),
        request.form.get('nombre'),
        request.form.get('apellido'),
        request.form.get('fechaNacimiento'),
        request.form.get('cedula'),
        request.form.get('numTelefono'),
        request.form.get('correo'),
        None,
        request.form.get('contrasenha'),
        None
    )
    print(id)
    return jsonify(str(id))

@app.route('/getCorreosUsuarios', methods=['GET'])
def getCorreosUsuarios():
    usuarios = control.usuario
    lista = []
    for user in usuarios:
        lista += [user.correo]

    print(lista)
    return jsonify(lista)

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
    print("LISTA")
    print(l)
    return jsonify(l)


#funciones de los documentos
@app.route('/saveDoc/<id>', methods=['POST'])
def saveDoc(id):
    if 'doc' in request.files:
        doc = request.files['doc']
        print(doc)
        control.saveDoc(id, doc)
        print ("Archivo guardado exitosamente") 
    else:
        print ("No se proporcionó ningún archivo")
    return "Done"
    

@app.route('/downloadDocs/<id>', methods=['GET'])
def downloadDocs(id):
    d = control.getDoc(id)
    carpeta_descargas = os.path.expanduser("~" + os.sep + "Downloads")
    ruta_archivos_relacionados = os.path.join(carpeta_descargas, "archivosRelacionados.zip")
    with zipfile.ZipFile(ruta_archivos_relacionados, "w", zipfile.ZIP_DEFLATED) as zipf:
        for nombre_archivo, archivo_binario in d.items():
            if nombre_archivo != "archivosRelacionados.zip":
                ruta_archivo = os.path.join(carpeta_descargas, nombre_archivo)
                with open(ruta_archivo, 'wb') as archivo_local:
                    archivo_local.write(archivo_binario)
                zipf.write(ruta_archivo, nombre_archivo)
    print(f"Archivos comprimidos en '{ruta_archivos_relacionados}'")
    return jsonify("Done")

@app.route('/getDocs/<id>', methods=['GET'])
def getDocs(id):
    d = control.getDoc(id)
    for clave, valor in d.items():
        d[clave] = str(valor)
    #print(d)
    return jsonify(d)

@app.route('/blop/<nombreDoc>/<idMongo>', methods=['GET'])
def blop(nombreDoc, idMongo):
    print("AAAAAAAAAAAAAAAAAAAAA", nombreDoc, idMongo)
    control.download(idMongo)
    return jsonify("Done")

#getProyectos
@app.route('/getProyectos', methods=['GET'])
def getProyectos():
    proyectos = control.proyecto
    lista = []
    nombreCliente = ""
    for pro in proyectos:
        for cliente in control.cliente:
            if pro.idCliente == cliente.idCliente:
                nombreCliente = cliente.nombre
        lista += [pro.toList()+[nombreCliente]]
    #print(lista)
    return jsonify(lista)

#getEvaluaciones
@app.route('/getEvaluaciones', methods=['GET'])
def getEvaluaciones():
    evaluaciones = control.evaluacion
    lista = []
    for eval in evaluaciones:
        for cliente in control.cliente:
            if eval.idCliente == cliente.idCliente:
                nombreCliente = cliente.nombre
        for tipo in control.tipoEvaluacion:
            if eval.tipoEvaluacion == tipo.idTipoEvaluacion:
                nombreTipo = tipo.nombre
        lista += [eval.toList()+[nombreCliente]+[nombreTipo]]
    print(lista)
    return jsonify(lista)

#getCapacitaciones
@app.route('/getCapacitaciones', methods=['GET'])
def getCapacitaciones():
    capacitaciones = control.capacitacion
    lista = []
    for cap in capacitaciones:
        for cliente in control.cliente:
            if cap.idCliente == cliente.idCliente:
                nombreCliente = cliente.nombre
        for tipo in control.tipoCapacitacion:
            if cap.tipoCapacitacion == tipo.idTipoCapacitacion:
                nombreTipo = tipo.nombre
        lista += [cap.toList()+[nombreCliente]+[nombreTipo]]
    print(lista)
    return jsonify(lista)

#getServicios
@app.route('/getServicios', methods=['GET'])
def getServicios():
    capacitaciones = control.capacitacion
    evaluaciones = control.evaluacion
    lista = []

    for cap in capacitaciones:
        cliente = control.readCliente(cap.idCliente)
        lista += [cap.toList()+[cliente.idCliente]+[cliente.nombre]]

    
    for eval in evaluaciones:
        cliente = control.readCliente(eval.idCliente)
        lista += [eval.toList()+[cliente.idCliente]+[cliente.nombre]]
        
    print(lista)
    return jsonify(lista)

#getEvaluaciones
@app.route('/getCotizaciones', methods=['GET'])
def getCotizaciones():
    #print('GetCotizaciones!')
    cotizaciones = control.cotizacion
    lista = []
    for eval in cotizaciones:
        for cliente in control.cliente:
            if eval.idCliente == cliente.idCliente:
                nombreCliente = cliente.nombre
        lista += [eval.toList()+[nombreCliente]]
    #print(lista)
    return jsonify(lista)

#getNewIdProyecto
@app.route('/getNewIdProyecto', methods=['GET'])
def getNewIdProyecto():
    string = (control.proyecto[-1]).idProyecto
    numero_str = string[3:]  # Desde el cuarto carácter en adelante
    numero = int(numero_str)

    # Incrementa el número en 1
    numero += 1

    # Formatea el resultado nuevamente en el formato deseado
    nueva_cadena = f"PRO{numero:03}"  # El :03 indica que debe tener al menos 3 dígitos, rellenando con ceros si es necesario

    print(nueva_cadena)
    return jsonify(nueva_cadena)

#Crear Reporte Financiero
@app.route('/createReporteFinanciero', methods=['POST'])
def createReporteFinanciero():

    servicios = request.form.get('servicios')
    cliente = request.form.get('cliente')
    estado = request.form.get('estado')
    fechaInicio = request.form.get('fechaInicio')
    fechaFinal = request.form.get('fechaFinal')

    id = control.createReporteFinanciero(servicios, cliente, estado, fechaInicio, fechaFinal)
    return jsonify(str(id))

#Crear Reporte Rendimiento
@app.route('/createReporteRendimiento', methods=['POST'])
def createReporteRendimiento():

    servicios = request.form.get('servicios')
    cliente = request.form.get('cliente')
    estado = request.form.get('estado')
    fechaInicio = request.form.get('fechaInicio')
    fechaFinal = request.form.get('fechaFinal')

    id = control.createReporteRendimiento(servicios, cliente, estado, fechaInicio, fechaFinal)
    return jsonify(str(id))


# inicia el servidor
if __name__ == "__main__":
    app.run(debug=True)

