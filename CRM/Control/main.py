from MainController import *
import os
import zipfile

if __name__ == "__main__":
    dao = SingletonDAO()

    # fun = [2]
    # mi_dict = {}
    # mi_dict["nombre"] = "Juan"
    # mi_dict["edad"] = 30
    # mi_dict["ciudad"] = "Ejemploville"
    # print(mi_dict)

    #dao.createFuncionario('nombre222', 'apellido', '2023-10-10', 1212, 888888, 'correo', 1, '2023-10-10', [1])
    # dao.updateFuncionario(6, 'nombreupdate', None, None, None, None, None, None, None, [2])
    # print("MMMMMMMMMMMMMMMMMMMMMMMMMM")
    # dao.deletePerfil(25)
    # # d = dao.getDoc(1)
    # l=list(d)
    # print(d)
    # carpeta_descargas = os.path.expanduser("~" + os.sep + "Downloads")
    # l = list(d)
    # clave = l[0]
    # #print(d[clave])
    # ruta_archivo = os.path.join(carpeta_descargas, clave)
    # with open(ruta_archivo, 'wb') as archivo_local:
    #     archivo_local.write(d[clave])

    # print(f"Archivos descargados en la carpeta '{carpeta_descargas}'")

    # d = dao.getDoc(1)
    # carpeta_descargas = os.path.expanduser("~" + os.sep + "Downloads")
    # ruta_archivos_relacionados = os.path.join(carpeta_descargas, "archivosRelacionados.zip")

    # with zipfile.ZipFile(ruta_archivos_relacionados, "w", zipfile.ZIP_DEFLATED) as zipf:
    #     for nombre_archivo, archivo_binario in d.items():
    #         ruta_archivo = os.path.join(carpeta_descargas, nombre_archivo)
    #         with open(ruta_archivo, 'wb') as archivo_local:
    #             archivo_local.write(archivo_binario)
    #         zipf.write(ruta_archivo, nombre_archivo)

    # print(f"Archivos comprimidos en '{ruta_archivos_relacionados}'")


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
    # for item in dao.evaluacion:
    #     print("Evaluacion:", item.toList())
    # print("\n")
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

