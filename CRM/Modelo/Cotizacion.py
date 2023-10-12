from Enums import Estado  

class Cotizacion:
    def __init__(self, idCotizacion, nombre, descripcion, idCliente, idPorcentajesC, Total, idServicio, estado, fechaCreacion):
        try:
            self.idCotizacion = int(idCotizacion)
            self.nombre = str(nombre)
            self.descripcion = str(descripcion)
            self.idCliente = int(idCliente)
            self.idPorcentajesC = int(idPorcentajesC)
            self.Total = float(Total)
            self.idServicio = str(idServicio)
            self.estado = Estado(estado)
            self.fechaCreacion = str(fechaCreacion)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre, descripcion, idCliente, idPorcentajesC, Total, idServicio, estado, fechaCreacion):
        try:
            if nombre is not None:
                self.nombre = str(nombre)
            if descripcion is not None:
                self.descripcion = str(descripcion)
            if idCliente is not None:
                self.idCliente = int(idCliente)
            if idPorcentajesC is not None:
                self.idPorcentajesC = int(idPorcentajesC)
            if Total is not None:
                self.Total = float(Total)
            if idServicio is not None:
                self.idServicio = str(idServicio)
            if estado is not None:
                self.estado = Estado(estado)
            if fechaCreacion is not None:
                self.fechaCreacion = str(fechaCreacion)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idCotizacion,
            self.nombre,
            self.descripcion,
            self.idCliente,
            self.idPorcentajesC,
            self.Total,
            self.idServicio,
            self.estado.value, 
            self.fechaCreacion
        ]
        return lista
