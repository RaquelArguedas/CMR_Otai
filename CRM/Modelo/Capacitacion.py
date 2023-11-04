from Enums import *

class Capacitacion:
    def __init__(self, id, idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documentos, idEstado, horasDuracion, fechaFinalizacion, modalidad, idFuncionario, precio, tipoCapacitacion, idProyecto, idCliente):
        try:
            self.id = int(id)
            self.idCapacitacion = str(idCapacitacion)
            self.nombre = str(nombre)
            self.descripcion = str(descripcion)
            self.fechaCreacion = str(fechaCreacion)
            self.fechaEjecucion = str(fechaEjecucion)
            
            # Verificar si 'documentos' es una lista de enteros
            if isinstance(documentos, list) and all(isinstance(item, int) for item in documentos):
                self.documentos = documentos
            else:
                raise TypeError("'documentos' no es una lista de enteros")
            
            self.idEstado = Estado(idEstado)
            self.horasDuracion = int(horasDuracion)
            self.fechaFinalizacion = str(fechaFinalizacion)
            self.modalidad = Modalidad(modalidad)
            self.idFuncionario = int(idFuncionario)
            self.precio = float(precio)
            self.tipoCapacitacion = int(tipoCapacitacion)
            if (idProyecto == None):
                self.idProyecto = None
            else:
                self.idProyecto = int(idProyecto)
            self.idCliente = int(idCliente)
        
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, idCapacitacion, nombre, descripcion, fechaCreacion, fechaEjecucion, documentos, idEstado, horasDuracion, fechaFinalizacion, modalidad, idFuncionario, precio, tipoCapacitacion, idProyecto, idCliente):
        try:
            if idCapacitacion is not None:
                self.idCapacitacion = str(idCapacitacion)
            if nombre is not None:
                self.nombre = str(nombre)
            if descripcion is not None:
                self.descripcion = str(descripcion)
            if fechaCreacion is not None:
                self.fechaCreacion = str(fechaCreacion)
            if fechaEjecucion is not None:
                self.fechaEjecucion = str(fechaEjecucion)
            
            if documentos is not None:
                # Verificar si 'documentos' es una lista de enteros
                if isinstance(documentos, list) and all(isinstance(item, int) for item in documentos):
                    self.documentos = documentos
                else:
                    raise TypeError("'documentos' no es una lista de enteros")
            
            if idEstado is not None:
                self.idEstado = Estado(idEstado)
            if horasDuracion is not None:
                self.horasDuracion = int(horasDuracion)
            if fechaFinalizacion is not None:
                self.fechaFinalizacion = str(fechaFinalizacion)
            if modalidad is not None:
                self.modalidad = Modalidad(modalidad)
            if idFuncionario is not None:
                self.idFuncionario = int(idFuncionario)
            if precio is not None:
                self.precio = float(precio)
            if tipoCapacitacion is not None:
                self.tipoCapacitacion = int(tipoCapacitacion)
            if idProyecto is not None:
                self.idProyecto = int(idProyecto)
            if idCliente is not None:
                self.idCliente = int(idCliente)
        
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.id,
            self.idCapacitacion,
            self.nombre,
            self.descripcion,
            self.fechaCreacion,
            self.fechaEjecucion,
            self.documentos,
            self.idEstado.value, 
            self.horasDuracion,
            self.fechaFinalizacion,
            self.modalidad.value,
            self.idFuncionario,
            self.precio,
            self.tipoCapacitacion,
            self.idProyecto,
            self.idCliente
        ]
        return lista
