class TipoCapacitacion:
    def __init__(self, idTipoCapacitacion, nombre):
        try:
            self.idTipoCapacitacion = int(idTipoCapacitacion)
            self.nombre = str(nombre)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre):
        try:
            if nombre is not None:
                self.nombre = str(nombre)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idTipoCapacitacion,
            self.nombre
        ]
        return lista
