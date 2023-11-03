from Enums import *

class Evaluacion:
    def __init__(self, id, idEvaluacion, nombre, descripcion, fechaCreacion, tipoEvaluacion, fechaEjecucion, documentos, idEstado, precio, idProyecto, idCliente):
        # Verificar si la variable es una lista y contiene elementos de tipo int
        if isinstance(documentos, list) and all(isinstance(item, int) for item in documentos):
            try:
                self.id = int(id)
                self.idEvaluacion = str(idEvaluacion)
                self.nombre = str(nombre)
                self.descripcion = str(descripcion)
                self.fechaCreacion = str(fechaCreacion)
                self.tipoEvaluacion = int(tipoEvaluacion)
                self.fechaEjecucion = str(fechaEjecucion)
                self.documentos = documentos #se guardara el id de mongo
                self.idEstado = Estado(idEstado)
                self.precio = float(precio)
                self.idProyecto = int(idProyecto)
                self.idCliente = int(idCliente)
            except (ValueError, TypeError):
                raise TypeError("Tipos de atributos no válidos")
        else:
            raise TypeError("documentos no es lista de enteros")

    def editar(self, idEvaluacion, nombre, descripcion, fechaCreacion, tipoEvaluacion, fechaEjecucion, documentos, idEstado, precio, idProyecto, idCliente):
        try:
            if idEvaluacion is not None:
                self.idEvaluacion = str(idEvaluacion)
            if nombre is not None:
                self.nombre = str(nombre)
            if descripcion is not None:
                self.descripcion = str(descripcion)
            if fechaCreacion is not None:
                self.fechaCreacion = str(fechaCreacion)
            if tipoEvaluacion is not None:
                self.tipoEvaluacion = int(tipoEvaluacion)
            if fechaEjecucion is not None:
                self.fechaEjecucion = str(fechaEjecucion)
            if documentos is not None:
                # Verificar si la variable es una lista y contiene elementos de tipo int
                if isinstance(documentos, list) and all(isinstance(item, int) for item in documentos):
                    self.documentos = documentos
                else:
                    raise TypeError("documentos no es lista de enteros")
            if idEstado is not None:
                self.estado = Estado(idEstado)
            if precio is not None:
                self.precio = float(precio)
            if idProyecto is not None:
                self.idProyecto = int(idProyecto)
            if idCliente is not None:
                self.idCliente = int(idCliente)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.id,
            self.idEvaluacion,
            self.nombre,
            self.descripcion,
            self.fechaCreacion,
            self.tipoEvaluacion,
            self.fechaEjecucion,
            self.documentos,
            self.idEstado.value, 
            self.precio,
            self.idProyecto,
            self.idCliente
        ]
        return lista


