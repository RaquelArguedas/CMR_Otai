class TipoEvaluacion:
    def __init__(self, idTipoEvaluacion, nombre, precio):
        try:
            self.idTipoEvaluacion = int(idTipoEvaluacion)
            self.nombre = str(nombre)
            self.precio = float(precio)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def editar(self, nombre, precio):
        try:
            if nombre is not None:
                self.nombre = str(nombre)
            if precio is not None:
                self.precio = float(precio)
        except (ValueError, TypeError):
            raise TypeError("Tipos de atributos no válidos")

    def toList(self):
        lista = [
            self.idTipoEvaluacion,
            self.nombre,
            self.precio
        ]
        return lista
