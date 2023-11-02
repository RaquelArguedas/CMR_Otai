class Estado:
    def __init__(self, idEstado, nombre):
        try:
            self.idEstado = int(idEstado)
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
            self.idEstado,
            self.nombre
        ]
        return lista