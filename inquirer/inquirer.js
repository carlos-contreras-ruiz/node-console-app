const inquirer = require('inquirer')
require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'options',
        message: 'Que desea hacer?',
        choices: [
            { value: '1', name: `${'1.'.green} Crear tarea` },
            { value: '2', name: `${'2.'.green} Listar tareas` },
            { value: '3', name: `${'3.'.green} Listar tareas completadas` },
            { value: '4', name: `${'4.'.green} Listar tareas pendientes` },
            { value: '5', name: `${'5.'.green} Completar tareas` },
            { value: '6', name: `${'6.'.green} Borrar tareas` },
            { value: '0', name: `${'0.'.green} Salir \n` },
        ],
    },
]

const inquirerMenu = async () => {
    console.clear()
    console.log('======================='.green)
    console.log(' Seleccione una opcion'.green)
    console.log('=======================\n'.green)

    const { options } = await inquirer.prompt(menuOpts)
    return options
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: 'Presione enter para continuar',
        },
    ]

    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            },
        },
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoTareas = async (tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        return { value: tarea.id, name: `${idx + 1}. ${tarea.desc}` }
    })

    const preguntas = [
        {
            type: 'list',
            name: 'deleteOpt',
            message: 'Cual tarea deseas borrar?',
            choices,
        },
    ]

    const { deleteOpt } = await inquirer.prompt(preguntas)
    return deleteOpt
}

const listadoTareasChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        return {
            value: tarea.id,
            name: `${idx + 1}. ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false,
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione las tareas por completar',
            choices,
        },
    ]

    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        },
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareas,
    confirmar,
    listadoTareasChecklist,
}
