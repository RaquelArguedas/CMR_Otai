from Funcionario import *
from Enums import *

class Proyecto:
    def __init__(self, id, idProyecto, nombre, descripcion, idCliente, documentos, fechaInicio, fechaFinalizacion, subTotal, estado, funcionarios):
        try:
            self.id = int(id)
            self.idProyecto = str(idProyecto)
            self.nombre = str(nombre)
            self.descripcion = str(descripcion)
            self.idCliente = int(idCliente)
            
            # Verificar si 'documentos' es una lista de enteros
            if isinstance(documentos, list) and all(isinstance(item, int) for item in documentos):
                self.documentos = documentos
            else:
                raise TypeError("'documentos' no es una lista de enteros")
            
            self.fechaInicio = str(fechaInicio)
            self.fechaFinalizacion = str(fechaFinalizacion)
            self.subTotal = float(subTotal)
            self.estado = Estado(estado)
            
            # Verificar si 'funcionarios' es una lista de instancias de la clase 'Funcionario'
            if isinstance(funcionarios, list) and all(isinstance(item, Funcionario) for item in funcionarios):
                self.funcionarios = funcionarios
            else:
                raise TypeError("'funcionarios' no es una lista de instancias de la clase 'Funcionario'")
        
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, idProyecto, nombre, descripcion, idCliente, documentos, fechaInicio, fechaFinalizacion, subTotal, estado, funcionarios):
        try:
            if idProyecto is not None:
                self.idProyecto = str(idProyecto)
            if nombre is not None:
                self.nombre = str(nombre)
            if descripcion is not None:
                self.descripcion = str(descripcion)
            if idCliente is not None:
                self.idCliente = int(idCliente)
            
            if documentos is not None:
                # Verificar si 'documentos' es una lista de enteros
                if isinstance(documentos, list) and all(isinstance(item, int) for item in documentos):
                    self.documentos = documentos
                else:
                    raise TypeError("'documentos' no es una lista de enteros")
            
            if fechaInicio is not None:
                self.fechaInicio = str(fechaInicio)
            if fechaFinalizacion is not None:
                self.fechaFinalizacion = str(fechaFinalizacion)
            if subTotal is not None:
                self.subTotal = float(subTotal)
            if estado is not None:
                print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOOOOOOOOOOOOOOOOOOOOOOO")
                self.estado = Estado(int(estado))
            
            if funcionarios is not None:
                # Verificar si 'funcionarios' es una lista de instancias de la clase 'Funcionario'
                if isinstance(funcionarios, list) and all(isinstance(item, Funcionario) for item in funcionarios):
                    self.funcionarios = funcionarios
                else:
                    raise TypeError("'funcionarios' no es una lista de instancias de la clase 'Funcionario'")
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        listaFuncionarios = []
        for f in self.funcionarios:
            listaFuncionarios += [f.toList()]
        lista = [
            self.id,
            self.idProyecto,
            self.nombre,
            self.descripcion,
            self.idCliente,
            self.documentos,
            self.fechaInicio,
            self.fechaFinalizacion,
            self.subTotal,
            self.estado.value,
            listaFuncionarios
        ]
        return lista

    def __str__(self):
        return f"Proyecto -> idProyecto:{self.idProyecto}, nombre:{self.nombre}, descripcion:{self.descripcion}"