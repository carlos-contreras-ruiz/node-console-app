const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareas,
    confirmar,
    listadoTareasChecklist,
} = require('./inquirer/inquirer')
const TareasService = require('./services/tareasService')
require('colors')

const main = async () => {
    let opt = ''
    //const tareas = new Tareas()

    const tareas = new TareasService()
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case '1':
                const desc = await leerInput('Ingresa una descripcion: ')
                tareas.crearTarea(desc)
                break
            case '2':
                console.log(tareas.listTareas())
                break
            case '3':
                console.log(tareas.listTareasCompletadas())
                break
            case '4':
                console.log(tareas.listTareasPendientes())
                break
            case '5':
                const ids = await listadoTareasChecklist(
                    tareas.getArrayTareas()
                )
                tareas.updateTareasStatus(ids)
                break
            case '6':
                const id = await listadoTareas(tareas.getArrayTareas())
                const confirm = await confirmar(
                    'Estas seguro de borrar este elemento'
                )
                if (confirm) {
                    tareas.borrarTarea(id)
                    console.log('Tarea borrada correctamente')
                }
                break
            case '0':
                opt = '0'
                break
            default:
                opt = '0'
        }
        await pausa()
    } while (opt !== '0')
}

main()
