from MainController import *

if __name__ == "__main__":
    dao = SingletonDAO()
    fun = [2]
    # fun += [dao.readFuncionario(1)]
    # fun += [dao.readFuncionario(3)]
    # dao.updateProyecto("PRO007", None, None,None,None, None,None,None,None,fun)
    # print("_________________________________________")
    #dao.updateUsuario(2, 'Alexa', 'apellido', None, 1, 1, None, None, 'contrasenha',1)
    # l = dao.consultarPapelera()
    # print("HOLA")
    # for item in l:
    #     print(item.toList())
    # LO QUE ESTA COMENTADO A CONTINUACION IMPRIME TODITO LO QUE SE CARGO DE LA BD
    # # Capacitacion
    # for item in dao.capacitacion:
    #     print("Capacitacion:", item.toList())
    # print("\n")
    # # Cliente
    # for item in dao.cliente:
    #     print("Cliente:", item.toList())
    # print("\n")
    # # Cotizacion
    # for item in dao.cotizacion:
    #     print("Cotizacion:", item.toList())
    # print("\n")
    # Evaluacion
    for item in dao.evaluacion:
        print("Evaluacion:", item.toList())
    print("\n")
    # # Funcionario
    # for item in dao.funcionario:
    #     print("Funcionario:", item.toList())
    # print("\n")
    # # Perfil
    # for item in dao.perfil:
    #     print("Perfil:", item.toList())
    # print("\n")
    # # Porcentaje
    # for item in dao.porcentaje:
    #     print("Porcentaje:", item.toList())
    # print("\n")
    # # Proyecto
    # for item in dao.proyecto:
    #     print("Proyecto:", item.toList())
    # print("\n")
    # # TipoCapacitacion
    # for item in dao.tipoCapacitacion:
    #     print("TipoCapacitacion:", item.toList())
    # print("\n")
    # # TipoEvaluacion
    # for item in dao.tipoEvaluacion:
    #     print("TipoEvaluacion:", item.toList())
    # print("\n")
    # # Usuario
    # for item in dao.usuario:
    #     print("Usuario:", item.toList())

