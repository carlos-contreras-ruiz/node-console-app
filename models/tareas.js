const { saveTarea, loadDB } = require('../repository/crudOperations')
const Tarea = require('./tarea')

class Tareas {
    constructor() {
        this.listado = loadDB()
    }

    getListado() {
        return this.listado
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this.listado[tarea.id] = tarea
        saveTarea(JSON.stringify(this.listado))
        return this.listado
    }

    borrarTarea(id) {
        if (this.listado[id]) {
            delete this.listado[id]
            saveTarea(JSON.stringify(this.listado))
        }
        return this.listado
    }

    updateTareasStatus(id, status) {
        this.listado[id].completadoEn = status
        saveTarea(JSON.stringify(this.listado))
    }

    updateTareasStatusBulk(listadoParam) {
        this.listado = listadoParam
        saveTarea(JSON.stringify(this.listado))
        return this.listado
    }
}

module.exports = Tareas
