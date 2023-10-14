import pyodbc
import pymongo 
from werkzeug.utils import secure_filename
from bson.binary import Binary
from bson import ObjectId
import os

import sys
sys.path.append('C:/Users/raque/OneDrive - Estudiantes ITCR/Documentos/GitHub/CMR_Otai/CRM/Modelo')
from Capacitacion import *
from Cliente import *
from Cotizacion import *
from Evaluacion import *
from Funcionario import *
from Perfil import *
from Porcentaje import *
from Proyecto import *
from TipoCapacitacion import *
from TipoEvaluacion import *
from Usuario import *
from Enums import *

class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:  #metodo obligatorio getInstance
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class SingletonDAO(metaclass=SingletonMeta):

    #Atributos provenientes de la bd
    capacitacion = []
    cliente = []
    cotizacion = []
    evaluacion = []
    funcionario = []
    perfil = []
    porcentaje = []
    proyecto = []
    tipoCapacitacion = []
    tipoEvaluacion = []
    usuario = []


    #Constructor que instancia los objetos necesarios del modelo
    def __init__(self):
        self.capacitacion = self.setFromBD("Capacitacion")
        self.cliente = self.setFromBD("Cliente")
        self.cotizacion = self.setFromBD("Cotizacion")
        self.evaluacion = self.setFromBD("Evaluacion")
        self.perfil = self.setFromBD("Perfil")
        self.funcionario = self.setFromBD("Funcionario")
        self.porcentaje = self.setFromBD("Porcentajes")
        self.proyecto = self.setFromBD("Proyecto")
        self.tipoCapacitacion = self.setFromBD("TipoCapacitacion")
        self.tipoEvaluacion = self.setFromBD("TipoEvaluacion")
        self.usuario = self.setFromBD("Usuario")
        
    #ejecuta algun comando 
    def execute(self, command):

        # ___________________BORRAR _____________________
        # Define los parámetros de la conexión
        server_name = 'DESKTOP-K69I3NM'  # Nombre del servidor local
        database_name = 'otai2'  # Nombre de tu base de datos
        trusted_connection = 'yes'  # Indica autenticación de Windows

        # Define la cadena de conexión
        connection_string = f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server_name};DATABASE={database_name};Trusted_Connection={trusted_connection}'
        # ___________________FIN BORRAR _____________________
        
        # Define los parámetros de la conexión
        # server_name = 'crmotaidb.cpx8e9dy0ty7.us-east-2.rds.amazonaws.com'
        # database_name = 'otai'
        # username = 'admin'
        # password = 'Otaicrm2023!'

        # connection_string = f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server_name};DATABASE={database_name};UID={username};PWD={password}'
                
        # Intenta establecer la conexión
        try:
            conn = pyodbc.connect(connection_string)
            cursor = conn.cursor()
            #print("Conexión exitosa a SQL Server en AWS con " + command)
            
            # Ejecuta consultas o comandos SQL aquí
            cursor.execute(command)
            rows = cursor.fetchall()
            cursor.close()
            conn.close()

            return rows
            
        except Exception as e:
            print(f"Error al conectar a la base de datos: {str(e)}")

    #ejecuta algun comando que no devuelve nada como create o update
    def executeCommit(self, command):

        # ___________________BORRAR _____________________
        # Define los parámetros de la conexión
        server_name = 'DESKTOP-K69I3NM'  # Nombre del servidor local
        database_name = 'otai2'  # Nombre de tu base de datos
        trusted_connection = 'yes'  # Indica autenticación de Windows

        # Define la cadena de conexión
        connection_string = f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server_name};DATABASE={database_name};Trusted_Connection={trusted_connection}'
        # ___________________FIN BORRAR _____________________
        
        # Define los parámetros de la conexión
        # server_name = 'crmotaidb.cpx8e9dy0ty7.us-east-2.rds.amazonaws.com'
        # database_name = 'otai'
        # username = 'admin'
        # password = 'Otaicrm2023!'

        # connection_string = f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server_name};DATABASE={database_name};UID={username};PWD={password}'
                
        # Intenta establecer la conexión
        try:
            conn = pyodbc.connect(connection_string)
            cursor = conn.cursor()
            #print("Conexión exitosa a SQL Server en AWS con " + command)
            
            # Ejecuta consultas o comandos SQL aquí
            r = cursor.execute(command)
            conn.commit()  # Realiza el commit para aplicar los cambios en la base de datos
            cursor.close()
            conn.close()
        except Exception as e:
            print(f"Error al conectar a la base de datos: {str(e)}")
    
    #Auxiliar del constructor 
    def setFromBD(self, tablaBD):
        salida =self.execute("SELECT * FROM " + tablaBD)
        lista = []
        objeto = []
        for row in salida:
            for item in row:
                objeto += [item]
            lista += [self.generarObjeto(tablaBD, objeto)]
            objeto = []

        return lista
        
    #Auxiliar del constructor
    def generarObjeto(self, tablaBD, lista):
        objeto = None
        
        if (tablaBD == "Capacitacion"):
            objeto = Capacitacion(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], [], lista[7], lista[8], lista[9], lista[10], lista[11], lista[12], lista[13], lista[14], lista[15])
        if (tablaBD == "Cliente"):
            objeto = Cliente(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6])
        if (tablaBD == "Cotizacion"):
            objeto = Cotizacion(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8])
        if (tablaBD == "Evaluacion"):
            objeto = Evaluacion(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], [], lista[8], lista[9], lista[10], lista[11])
        if (tablaBD == "Perfil"):
            objeto = Perfil(lista[0], lista[1])
        if (tablaBD == "Funcionario"):
            objeto = Funcionario(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8], self.getListaPerfiles(lista[0]))
        if (tablaBD == "Porcentajes"):
            objeto = Porcentaje(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6])
        if (tablaBD == "Proyecto"):
            objeto = Proyecto(lista[0], lista[1], lista[2], lista[3], lista[4], [], lista[6], lista[7], lista[8], lista[9], self.getListaFuncionarios(lista[0]))
        if (tablaBD == "TipoCapacitacion"):
            objeto = TipoCapacitacion(lista[0], lista[1])
        if (tablaBD == "TipoEvaluacion"):
            objeto = TipoEvaluacion(lista[0], lista[1], lista[2])
        if (tablaBD == "Usuario"):
            objeto = Usuario(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8], lista[9])


        return objeto

    #FUNCIONES QUE AYUDAN A CARGAR LA INFORMACION DE LA BD
    #devuelve una lista de funcionarios segun el proyecto 
    def getListaFuncionarios(self, idProyecto):
        salida = self.execute(f"SELECT idFuncionario FROM ProyectoXFuncionario WHERE idProyecto = {idProyecto}")
        lista = []
        for idFunc in salida:
            for funcionario in self.funcionario:
                if (idFunc[0]  == funcionario.idFuncionario):
                    lista += [funcionario]
        return lista
    
    #devuelve una lista de perfiles segun el funcionario 
    def getListaPerfiles(self, idFuncionario):
        salida = self.execute(f"SELECT idPerfil FROM PerfilXFuncionario WHERE idFuncionario = {idFuncionario}")
        #print(salida, self.perfil)
        lista = []
        for idPerfil in salida:
            for perfil in self.perfil:
                #print(idPerfil[0], perfil.idPerfil)
                if (idPerfil[0]  == perfil.idPerfil):
                    lista += [perfil]
        return lista

    #CRUDS Capacitacion
    def createCapacitacion(self, idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documentos, idEstado, horasDuracion, fechaFinalizacion, modalidad, idFuncionario, precio, tipoCapacitacion, idProyecto, idCliente):
        if idCapacitacion == None or nombre == None or descripcion== None or fechaCreacion== None or fechaEjecucion== None or documentos== None or idEstado== None or horasDuracion== None or fechaFinalizacion== None or modalidad== None or idFuncionario== None or precio== None or tipoCapacitacion== None or idProyecto== None or idCliente== None:
            return -1 #No se puede crear una capacitacion con atributos nulos
        
        #lo crea en la bd si no se producen errores
        self.executeCommit(f"EXEC createCapacitacion '{idCapacitacion}', '{nombre}', '{descripcion}', '{fechaCreacion}', '{fechaEjecucion}', null, {idEstado}, {horasDuracion}, '{fechaFinalizacion}', {modalidad}, {idFuncionario}, {precio}, {tipoCapacitacion}, {idProyecto}, {idCliente}")
        result = self.execute(f"SELECT id from Capacitacion where idCapacitacion = '{idCapacitacion}'")

        #si hay lista y no existe el idCapacitacion en los datos se crea
        if result and (self.readCapacitacion(idCapacitacion) == None):
            self.capacitacion += [Capacitacion(result[0][0], idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, [], idEstado, horasDuracion, fechaFinalizacion, modalidad, idFuncionario, precio, tipoCapacitacion, idProyecto, idCliente)]
        
    def readCapacitacion(self, idCapacitacion):
        for capacitacion in self.capacitacion:
            if capacitacion.idCapacitacion == idCapacitacion: 
                return capacitacion
        return None
        
    def updateCapacitacion(self, idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documentos, idEstado, horasDuracion, fechaFinalizacion, modalidad, idFuncionario, precio, tipoCapacitacion, idProyecto, idCliente):
        cap = self.readCapacitacion(idCapacitacion)
        if cap != None:
            #print(f"EXEC updateEvaluacion {eval.id}, {eval.idEvaluacion}, {eval.nombre}, {eval.descripcion}, '{eval.fechaCreacion}', {eval.tipoEvaluacion}, '{eval.fechaEjecucion}', null, {eval.idEstado}, {eval.precio}, {eval.idProyecto}, {eval.idCliente}")
            cap.editar(idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, None, idEstado, horasDuracion, fechaFinalizacion, modalidad, idFuncionario, precio, tipoCapacitacion, idProyecto, idCliente)
            self.executeCommit(f"EXEC updateCapacitacion {cap.id}, {cap.idCapacitacion}, {cap.nombre}, {cap.descripcion}, '{cap.fechaCreacion}', '{cap.fechaEjecucion}', null, {cap.idEstado.value}, {cap.horasDuracion}, '{cap.fechaFinalizacion}', {cap.modalidad.value}, {cap.idFuncionario}, {cap.precio}, {cap.tipoCapacitacion}, {cap.idProyecto}, {cap.idCliente}")
        else:
            return -1

    #CRUDS Evaluacion
    def createEvaluacion(self, idEvaluacion, nombre, descripcion, fechaCreacion, tipoEvaluacion, fechaEjecucion, documentos, idEstado, precio, idProyecto, idCliente):
        if idEvaluacion == None or nombre == None or descripcion== None or fechaCreacion== None or tipoEvaluacion== None or fechaEjecucion== None or documentos== None or idEstado== None or precio== None or idProyecto== None or idCliente== None:
            return -1 #No se puede crear una capacitacion con atributos nulos   

        self.executeCommit(f"EXEC createEvaluacion {idEvaluacion}, {nombre}, {descripcion}, '{fechaCreacion}', {tipoEvaluacion}, '{fechaEjecucion}', null, {idEstado}, {precio}, {idProyecto}, {idCliente}")
        result = self.execute(f"SELECT id from Evaluacion where idEvaluacion = '{idEvaluacion}'")

        #si hay lista y no existe el idCapacitacion en los datos se crea
        if result and (self.readEvaluacion(idEvaluacion) == None):
            self.evaluacion += [Evaluacion(result[0][0], idEvaluacion, nombre, descripcion, fechaCreacion, tipoEvaluacion, fechaEjecucion, [], idEstado, precio, idProyecto, idCliente)]
        
    def readEvaluacion(self, idEvaluacion):
        for eval in self.evaluacion:
            if eval.idEvaluacion == idEvaluacion: 
                return eval
        return None
    
    def updateEvaluacion(self, idEvaluacion, nombre, descripcion, fechaCreacion, tipoEvaluacion, fechaEjecucion, documentos, idEstado, precio, idProyecto, idCliente):
        eval = self.readEvaluacion(idEvaluacion)
        if eval != None:
            #print(f"EXEC updateEvaluacion {eval.id}, {eval.idEvaluacion}, {eval.nombre}, {eval.descripcion}, '{eval.fechaCreacion}', {eval.tipoEvaluacion}, '{eval.fechaEjecucion}', null, {eval.idEstado}, {eval.precio}, {eval.idProyecto}, {eval.idCliente}")
            eval.editar(idEvaluacion, nombre, descripcion, fechaCreacion, tipoEvaluacion, fechaEjecucion, documentos, idEstado, precio, idProyecto, idCliente)
            self.executeCommit(f"EXEC updateEvaluacion {eval.id}, {eval.idEvaluacion}, {eval.nombre}, {eval.descripcion}, '{eval.fechaCreacion}', {eval.tipoEvaluacion}, '{eval.fechaEjecucion}', null, {eval.idEstado.value}, {eval.precio}, {eval.idProyecto}, {eval.idCliente}")
        else:
            return -1

    #CRUDS Proyecto
    def createProyecto(self, idProyecto, nombre, descripcion, idCliente, documentos, fechaInicio, fechaFinalizacion, subTotal, estado, funcionariosIds):
        if idProyecto == None or nombre == None or descripcion== None or idCliente== None or documentos== None or fechaInicio==None or fechaFinalizacion==None or subTotal==None or estado== None or funcionariosIds == None:
            return -1 #No se puede crear una capacitacion con atributos nulos   

        self.executeCommit(f"EXEC createProyecto {idProyecto}, {nombre}, {descripcion}, {idCliente}, null, '{fechaInicio}', '{fechaFinalizacion}', {subTotal}, {estado}")
        result = self.execute(f"SELECT id from Proyecto where idProyecto = '{idProyecto}'")

        #si hay lista y no existe el idCapacitacion en los datos se crea
        if result and (self.readProyecto(idProyecto) == None):
            funcionarios = []
            for fId in funcionariosIds:
                f = self.readFuncionario(int(fId))
                if f is not None:
                    funcionarios += [f]
                    self.executeCommit(f"EXEC createProyectoXFuncionario {result[0][0]}, {fId}")
            self.proyecto += [Proyecto(result[0][0], idProyecto, nombre, descripcion, idCliente, [], fechaInicio, fechaFinalizacion, subTotal, estado, funcionarios)]
        
    def readProyecto(self, idProyecto):
        for p in self.proyecto:
            if p.idProyecto == idProyecto: 
                return p
        return None
    
    def updateProyecto(self, idProyecto, nombre, descripcion, idCliente, documentos, fechaInicio, fechaFinalizacion, subTotal, estado, funcionariosIds):
        p = self.readProyecto(idProyecto)
        if p != None:
            #print(f"EXEC updateEvaluacion {eval.id}, {eval.idEvaluacion}, {eval.nombre}, {eval.descripcion}, '{eval.fechaCreacion}', {eval.tipoEvaluacion}, '{eval.fechaEjecucion}', null, {eval.idEstado}, {eval.precio}, {eval.idProyecto}, {eval.idCliente}")
            if funcionariosIds != None:
                funcionarios = []
                self.executeCommit(f"delete from ProyectoXFuncionario where idProyecto = {p.id}")
                for fId in funcionariosIds:
                    f = self.readFuncionario(int(fId))
                    if f is not None:
                        funcionarios += [f]
                        self.executeCommit(f"EXEC createProyectoXFuncionario {p.id}, {fId}")
            p.editar(idProyecto, nombre, descripcion, idCliente, documentos, fechaInicio, fechaFinalizacion, subTotal, estado, funcionarios)
            self.executeCommit(f"EXEC updateProyecto {p.id}, {p.idProyecto}, {p.nombre}, {p.descripcion}, '{p.idCliente}',  null, '{p.fechaInicio}', '{p.fechaFinalizacion}', {p.subTotal}, {p.estado.value}")
        else:
            return -1
    
    #CRUDS Cliente
    def createCliente(self, cedJuridica, nombre, numTelefono, correo, fechaIngreso, estado):
        if cedJuridica is None or nombre is None or numTelefono is None or correo is None or fechaIngreso is None or estado is None:
            return -1  # No se puede crear un cliente con atributos nulos

        self.executeCommit(f"EXEC createCliente {cedJuridica}, '{nombre}', {numTelefono}, '{correo}', '{fechaIngreso}', {estado}")
        idCliente = self.execute(f"SELECT MAX(idCliente) FROM Cliente")

        # Si hay lista y no existe el idCliente en los datos se crea
        if self.readCliente(idCliente[0][0]) is None:
            self.cliente += [Cliente(idCliente[0][0], cedJuridica, nombre, numTelefono, correo, fechaIngreso, estado)]

    def readCliente(self, idCliente):
        for c in self.cliente:
            if c.idCliente == idCliente:
                return c
        return None

    def updateCliente(self, idCliente, cedJuridica, nombre, numTelefono, correo, estado):
        c = self.readCliente(int(idCliente))
        if c is not None:
            c.editar(cedJuridica, nombre, numTelefono, correo, estado)
            
            self.executeCommit(f"EXEC updateCliente {c.idCliente}, {c.cedJuridica}, '{c.nombre}', {c.numTelefono}, '{c.correo}', null, {c.estado.value}")
        else:
            return -1

    #CRUDS Cotizacion
    def createCotizacion(self, nombre, descripcion, idCliente, idPorcentajesC, Total, idServicio, estado, fechaCreacion):
        if nombre is None or descripcion is None or idCliente is None or idPorcentajesC is None or Total is None or idServicio is None or estado is None or fechaCreacion is None:
            return -1  # No se puede crear una cotización con atributos nulos

        self.executeCommit(f"EXEC createCotizacion '{nombre}', '{descripcion}', {idCliente}, {idPorcentajesC}, {Total}, '{idServicio}', {estado}, '{fechaCreacion}'")
        idCotizacion = self.execute(f"SELECT MAX(idCotizacion) FROM Cotizacion")

        # Si hay lista y no existe el idCotizacion en los datos se crea
        if self.readCotizacion(idCotizacion[0][0]) is None:
            self.cotizacion += [Cotizacion(idCotizacion[0][0], nombre, descripcion, idCliente, idPorcentajesC, Total, idServicio, estado, fechaCreacion)]

    def readCotizacion(self, idCotizacion):
        for c in self.cotizacion:
            if c.idCotizacion == idCotizacion:
                return c
        return None

    def updateCotizacion(self, idCotizacion, nombre, descripcion, idCliente, idPorcentajesC, Total, idServicio, estado, fechaCreacion):
        c = self.readCotizacion(idCotizacion)
        if c is not None:
            c.editar(nombre, descripcion, idCliente, idPorcentajesC, Total, idServicio, estado, fechaCreacion)
            self.executeCommit(f"EXEC updateCotizacion {c.idCotizacion}, '{c.nombre}', '{c.descripcion}', {c.idCliente}, {c.idPorcentajesC}, {c.Total}, '{c.idServicio}', {c.estado.value}, '{c.fechaCreacion}'")
        else:
            return -1

    #CRUDS Funcionario
    def createFuncionario(self, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfilesIds):
        if nombre is None or apellido is None or fechaNacimiento is None or cedula is None or numTelefono is None or correo is None or estado is None or fechaIngreso is None or perfilesIds is None:
            return -1  # No se puede crear un funcionario con atributos nulos

        self.executeCommit(f"EXEC createFuncionario '{nombre}', '{apellido}', '{fechaNacimiento}', {cedula}, {numTelefono}, '{correo}', {estado}, '{fechaIngreso}'")
        idFuncionario = self.execute(f"SELECT MAX(idFuncionario) FROM Funcionario")

        # Si hay una lista y no existe el idFuncionario en los datos, se crea
        if self.readFuncionario(idFuncionario[0][0]) is None:
            perfiles = []
            for pId in perfilesIds:
                p = self.readPerfil(int(pId))
                if p is not None:
                    perfiles += [p]
                    self.executeCommit(f"INSERT INTO PerfilXFuncionario (idPerfil, idFuncionario) VALUES ({pId}, {idFuncionario[0][0]})")
            self.funcionario += [Funcionario(idFuncionario[0][0], nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfiles)]


    def readFuncionario(self, idFuncionario):
        for f in self.funcionario:
            if f.idFuncionario == idFuncionario:
                return f
        return None

    def updateFuncionario(self, idFuncionario, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfilesIds):
        f = self.readFuncionario(idFuncionario)
        if f is not None:
            if perfilesIds != None:
                perfiles = []
                self.executeCommit(f"delete from PerfilXFuncionario where idFuncionario = {f.idFuncionario}")
                for pId in perfilesIds:
                    p = self.readPerfil(int(pId))
                    if p is not None:
                        perfiles += [p]
                        self.executeCommit(f"INSERT INTO PerfilXFuncionario (idPerfil, idFuncionario) VALUES ({pId}, {f.idFuncionario})")
            else:
                perfiles = None
            f.editar(nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, estado, fechaIngreso, perfiles)
            print(f.toList())
            self.executeCommit(f"EXEC updateFuncionario {f.idFuncionario}, '{f.nombre}', '{f.apellido}', '{f.fechaNacimiento}', {f.cedula}, {f.numTelefono}, '{f.correo}', {f.estado.value}, '{f.fechaIngreso}'")
        else:
            return -1

    #CRUDS Perfil
    def createPerfil(self, nombre):
        if nombre == None:
            return -1 #No se puede crear una capacitacion con atributos nulos   

        self.executeCommit(f"EXEC createPerfil {nombre}")
        idPerfil = self.execute(f"SELECT MAX(idPerfil) FROM Perfil")

        #si hay lista y no existe el idCapacitacion en los datos se crea
        if self.readPerfil(idPerfil[0][0]) == None:
            self.perfil += [Perfil(idPerfil[0][0], nombre)]
        
    def readPerfil(self, idPerfil):
        for p in self.perfil:
            if p.idPerfil == idPerfil: 
                return p
        return None
    
    def updatePerfil(self, idPerfil, nombre):
        p = self.readPerfil(idPerfil)
        if p != None:
            #print(f"EXEC updateEvaluacion {eval.id}, {eval.idEvaluacion}, {eval.nombre}, {eval.descripcion}, '{eval.fechaCreacion}', {eval.tipoEvaluacion}, '{eval.fechaEjecucion}', null, {eval.idEstado}, {eval.precio}, {eval.idProyecto}, {eval.idCliente}")
            p.editar(nombre)
            self.executeCommit(f"EXEC updatePerfil {p.idPerfil}, {p.nombre}")
        else:
            return -1
    
    #CRUDS Procentaje
    def createPorcentaje(self, fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario):
        if fdu is None or coordinacionGeneral is None or coordinacionEspecifica is None or iva is None or fechaIngreso is None or idUsuario is None:
            return -1  # No se puede crear un porcentaje con atributos nulos

        self.executeCommit(f"EXEC createPorcentajes {fdu}, {coordinacionGeneral}, {coordinacionEspecifica}, {iva}, '{fechaIngreso}', {idUsuario}")
        idPorcentaje = self.execute(f"SELECT MAX(idPorcentajes) FROM Porcentajes")

        # Si hay una lista y no existe el idPorcentaje en los datos, se crea
        if self.readPorcentaje(idPorcentaje[0][0]) is None:
            self.porcentaje += [Porcentaje(idPorcentaje[0][0], fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario)]

    def readPorcentaje(self, idPorcentaje):
        for p in self.porcentaje:
            if p.idPorcentaje == idPorcentaje:
                return p
        return None

    def updatePorcentaje(self, idPorcentaje, fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario):
        p = self.readPorcentaje(idPorcentaje)
        if p is not None:
            p.editar(fdu, coordinacionGeneral, coordinacionEspecifica, iva, fechaIngreso, idUsuario)
            self.executeCommit(f"EXEC updatePorcentajes {p.idPorcentaje}, {p.fdu}, {p.coordinacionGeneral}, {p.coordinacionEspecifica}, {p.iva}, '{p.fechaIngreso}', {p.idUsuario}")
        else:
            return -1

    #CRUDS TipoCapacitacion
    def createTipoCapacitacion(self, nombre):
        if nombre is None:
            return -1  # No se puede crear un tipo de capacitación con atributos nulos

        self.executeCommit(f"EXEC createTipoCapacitacion '{nombre}'")
        idTipoCapacitacion = self.execute(f"SELECT MAX(idTipo) FROM TipoCapacitacion")

        # Si hay una lista y no existe el idTipoCapacitacion en los datos, se crea
        if self.readTipoCapacitacion(idTipoCapacitacion[0][0]) is None:
            self.tipoCapacitacion += [TipoCapacitacion(idTipoCapacitacion[0][0], nombre)]

    def readTipoCapacitacion(self, idTipoCapacitacion):
        for t in self.tipoCapacitacion:
            if t.idTipoCapacitacion == idTipoCapacitacion:
                return t
        return None

    def updateTipoCapacitacion(self, idTipoCapacitacion, nombre):
        t = self.readTipoCapacitacion(idTipoCapacitacion)
        if t is not None:
            t.editar(nombre)
            self.executeCommit(f"EXEC updateTipoCapacitacion {t.idTipoCapacitacion}, '{t.nombre}'")
        else:
            return -1

    #CRUDS TipoEvaluacion
    def createTipoEvaluacion(self, nombre, precio):
        if nombre is None or precio is None:
            return -1  # No se puede crear un tipo de evaluación con atributos nulos

        self.executeCommit(f"EXEC createTipoEvaluacion '{nombre}', {precio}")
        idTipoEvaluacion = self.execute(f"SELECT MAX(idTipo) FROM TipoEvaluacion")

        # Si hay una lista y no existe el idTipoEvaluacion en los datos, se crea
        if self.readTipoEvaluacion(idTipoEvaluacion[0][0]) is None:
            self.tipoEvaluacion += [TipoEvaluacion(idTipoEvaluacion[0][0], nombre, precio)]

    def readTipoEvaluacion(self, idTipoEvaluacion):
        for t in self.tipoEvaluacion:
            if t.idTipoEvaluacion == idTipoEvaluacion:
                return t
        return None

    def updateTipoEvaluacion(self, idTipoEvaluacion, nombre, precio):
        t = self.readTipoEvaluacion(idTipoEvaluacion)
        if t is not None:
            t.editar(nombre, precio)
            self.executeCommit(f"EXEC updateTipoEvaluacion {t.idTipoEvaluacion}, '{t.nombre}', {t.precio}")
        else:
            return -1

    #CRUDS Usuario
    def createUsuario(self, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, estado):
        if (nombre is None or apellido is None or fechaNacimiento is None or cedula is None or numTelefono is None or correo is None or fechaIngreso is None or contrasenha is None or estado is None):
            return -1  # No se puede crear un usuario con atributos nulos

        self.executeCommit(f"EXEC createUsuario '{nombre}', '{apellido}', '{fechaNacimiento}', {cedula}, {numTelefono}, '{correo}', '{fechaIngreso}', '{contrasenha}', {estado}")
        idUsuario = self.execute(f"SELECT MAX(idUsuario) FROM Usuario")

        # Si hay una lista y no existe el idUsuario en los datos, se crea
        if self.readUsuario(idUsuario[0][0]) is None:
            self.usuario += [Usuario(idUsuario[0][0], nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, estado)]

    def readUsuario(self, idUsuario):
        for u in self.usuario:
            if u.idUsuario == idUsuario:
                return u
        return None

    def updateUsuario(self, idUsuario, nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, estado):
        u = self.readUsuario(idUsuario)
        if u is not None:
            u.editar(nombre, apellido, fechaNacimiento, cedula, numTelefono, correo, fechaIngreso, contrasenha, estado)
            self.executeCommit(f"EXEC updateUsuario {u.idUsuario}, '{u.nombre}', '{u.apellido}', '{u.fechaNacimiento}', {u.cedula}, {u.numTelefono}, '{u.correo}', '{u.fechaIngreso}', '{u.contrasenha}', {u.estado.value}")
        else:    
            return -1

    #Consultar papelera
    def consultarPapelera(self):
        listaA = self.capacitacion + self.evaluacion
        listaB = self.cliente + self.cotizacion  + self.funcionario + self.proyecto + self.usuario
        listaSalida = []

        for itemB in listaB:
            if itemB.estado == Estado.ELIMINADO:
                listaSalida += [itemB]
        for itemA in listaA:
            if itemA.idEstado == Estado.ELIMINADO:
                listaSalida += [itemA]
        
        return listaSalida
        

    #guarda el documento
    def saveDoc(self,id,doc):
        try:
            MONGO_HOST="localhost"
            MONGO_PUERTO="27017"
            MONGO_TIEMPO_FUERA=1000
            MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"

            MONGO_CLIENTE = pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
            MONGO_BASEDATOS = MONGO_CLIENTE["Otai"]   
            docs = MONGO_BASEDATOS["documentos"]
            print("Conexion a Mongo exitosa.")

            doc_data = doc.read()
            docs.insert_one({'id':id, 'nombreDoc': secure_filename(doc.filename), 'foto': Binary(doc_data)})
            # Guarda los datos del archivo en MongoDB
            print("Se ha insertado exitosamente.")

            MONGO_CLIENTE.close()
        except Exception as ex:
            print(ex)

    #elimina documento de un id
    def deleteDocs(self, id):
        try:
            MONGO_HOST = "localhost"
            MONGO_PUERTO = "27017"
            MONGO_TIEMPO_FUERA = 1000
            MONGO_URI = f"mongodb://{MONGO_HOST}:{MONGO_PUERTO}/"

            MONGO_CLIENTE = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
            MONGO_BASEDATOS = MONGO_CLIENTE["Otai"]
            docs = MONGO_BASEDATOS["documentos"]
            print("Conexion a Mongo exitosa.")

            # Eliminar todas las filas con el mismo 'id'
            docs.delete_many({'id': id})

            MONGO_CLIENTE.close()
        except Exception as ex:
            print(ex)

    #obtiene todos los documentos de un id
    def getDoc(self,idBuscado):
        try:
            MONGO_HOST="localhost"
            MONGO_PUERTO="27017"
            MONGO_TIEMPO_FUERA=1000
            MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"

            MONGO_CLIENTE = pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
            MONGO_BASEDATOS = MONGO_CLIENTE["Otai"]   
            docs = MONGO_BASEDATOS["documentos"]
            print("Conexion a Mongo exitosa.")
            
            dict = {}
            for x in docs.find({'id':idBuscado}):
                n = x['nombreDoc']
                dict[n] = str(x['_id'])

            return dict

        except Exception as ex:
            print(ex)

    def download(self,idBuscado):
        try:
            MONGO_HOST="localhost"
            MONGO_PUERTO="27017"
            MONGO_TIEMPO_FUERA=1000
            MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"

            MONGO_CLIENTE = pymongo.MongoClient(MONGO_URI,serverSelectionTimeoutMS=MONGO_TIEMPO_FUERA)
            MONGO_BASEDATOS = MONGO_CLIENTE["Otai"]   
            docs = MONGO_BASEDATOS["documentos"]
            print("Conexion a Mongo exitosa.")
            
            x = docs.find_one({'_id': ObjectId(idBuscado)})  # Utiliza find_one para encontrar el documento
            if x:
                print(x['nombreDoc'], "descargado")
                carpeta_descargas = os.path.expanduser("~" + os.sep + "Downloads")

                ruta_archivo = os.path.join(carpeta_descargas, x['nombreDoc'])
                with open(ruta_archivo, 'wb') as archivo_local:
                    archivo_local.write(x['foto'])
            else:
                print("No se encontró ningún documento con ese _id.")
                return None

        except Exception as ex:
            print(ex)