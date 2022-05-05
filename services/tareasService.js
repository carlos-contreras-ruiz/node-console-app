const Tareas = require('../models/tareas')

class TareasService {
    constructor() {
        this.tareasModel = new Tareas()
        this.listado = this.tareasModel.getListado()
        this.listadoArray = this.transformToArray(this.listado)
    }

    //Recive un array de tareas
    formatListTareasOutput(tareas) {
        let formatConsole = ''
        tareas.forEach((value, index) => {
            const idx = `${index + 1}`.green
            const { desc, completadoEn } = value
            const estado = completadoEn
                ? `${completadoEn}`.green
                : 'Pendiente'.red
            formatConsole += `${idx}. ${desc} :: ${estado} \n`
        })
        return formatConsole
    }

    listTareas() {
        return this.formatListTareasOutput(this.listadoArray)
    }

    listTareasPendientes() {
        const pendientes = this.listadoArray.filter(
            (value) => value.completadoEn == null
        )
        return this.formatListTareasOutput(pendientes)
    }

    listTareasCompletadas() {
        const completadas = this.listadoArray.filter(
            (value) => value.completadoEn != null
        )
        return this.formatListTareasOutput(completadas)
    }

    transformToArray(listadoObj) {
        return Object.entries(listadoObj).map((value) => value[1])
    }

    getArrayTareas() {
        return this.listadoArray
    }

    updateTareasStatus(ids = []) {
        ids.forEach((id) => {
            if (!this.listado[id].completadoEn) {
                this.tareasModel.updateTareasStatus(
                    id,
                    new Date().toISOString()
                )
            }
        })

        this.listadoArray.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this.tareasModel.updateTareasStatus(tarea.id, null)
            }
        })

        this.listado = this.tareasModel.getListado()
        this.listadoArray = this.transformToArray(this.listado)
    }

    updateTareasStatusBulk(ids = []) {
        ids.forEach((id) => {
            if (!this.listado[id].completadoEn) {
                this.listado[id].completadoEn = new Date().toISOString()
            }
        })

        this.listadoArray.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this.listado[tarea.id].completadoEn = null
            }
        })

        this.listado = this.tareasModel.updateTareasStatus(this.listado)
        this.listadoArray = this.transformToArray(this.listado)
    }

    borrarTarea(id) {
        this.listado = this.tareasModel.borrarTarea(id)
        this.listadoArray = this.transformToArray(this.listado)
    }
    crearTarea(desc = '') {
        this.listado = this.tareasModel.crearTarea(desc)
        this.listadoArray = this.transformToArray(this.listado)
    }
}

module.exports = TareasService
