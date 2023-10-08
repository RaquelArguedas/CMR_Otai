import pyodbc

import sys
sys.path.append('CRM/Modelo')
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

class SingletonMeta(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:  #metodo obligatorio getInstance
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class SingletonDAO(metaclass=SingletonMeta):
    
    #Atributos de conexión
    connection = None
    cursor = None

    

    #Atributos para conetarse a MONGO
    # MONGO_HOST="localhost"
    # MONGO_PUERTO="27017"
    # MONGO_TIEMPO_FUERA=1000
    # MONGO_URI="mongodb://"+MONGO_HOST+":"+MONGO_PUERTO+"/"
    # MONGO_CLIENTE = None
    # MONGO_BASEDATOS = None

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
        self.funcionario = self.setFromBD("Funcionario")
        self.perfil = self.setFromBD("Perfil")
        self.porcentaje = self.setFromBD("Porcentajes")
        self.proyecto = self.setFromBD("Proyecto")
        self.tipoCapacitacion = self.setFromBD("TipoCapacitacion")
        self.tipoEvaluacion = self.setFromBD("TipoEvaluacion")
        self.usuario = self.setFromBD("Usuario")
        
    #ejecuta algun comando 
    def execute(self, command):
        
        # Define los parámetros de la conexión
        server_name = 'crmotaidb.cpx8e9dy0ty7.us-east-2.rds.amazonaws.com'
        database_name = 'otai'
        username = 'admin'
        password = 'Otaicrm2023!'

        connection_string = f'DRIVER=ODBC Driver 17 for SQL Server;SERVER={server_name};DATABASE={database_name};UID={username};PWD={password}'
                
        # Intenta establecer la conexión
        try:
            conn = pyodbc.connect(connection_string)
            cursor = conn.cursor()
            #print("Conexión exitosa a SQL Server en AWS")
            
            # Ejecuta consultas o comandos SQL aquí
            cursor.execute(command)
            rows = cursor.fetchall()
            cursor.close()
            conn.close()

            return rows
            
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
        if (tablaBD == "Funcionario"):
            objeto = Funcionario(lista[0], lista[1], lista[2], lista[3], lista[4], lista[5], lista[6], lista[7], lista[8], lista[9])
        if (tablaBD == "Perfil"):
            objeto = Perfil(lista[0], lista[1])
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

    
    #CONEXION A MONGODB



    #CRUDS Capacitacion

    #CRUDS Cliente

    #CRUDS Cotizacion

    #CRUDS Evaluacion

    #CRUDS Funcionario

    #CRUDS Perfil

    #CRUDS Procentaje

    #CRUDS Proyecto

    #CRUDS TipoCapacitacion

    #CRUDS TipoEvaluacion

    #CRUDS Usuario