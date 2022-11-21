const Tarea = require('./tarea');
require('colors');

class Tareas {
    listado = {};

    get listTareas () {
        const list = [];
        Object.keys(this.listado).forEach( key => list.push(this.listado[key]));
        return list;
    }

    constructor() {
        this.listado = {};
    }

    cargarTareasFromArray ( tareas = [] ) {
        
        tareas.forEach ( tarea => {
            this.listado[tarea.id] = tarea;        
        } );

    }

    crearTarea (desc = '') {
        const tarea = new Tarea(desc);
        this.listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        // const tareas = this.listTareas;
        // for (let i = 0; i<tareas.length ; i++){
        //     const indice = `${i+1}.`.blue;
        //     const estado = tareas[i].completadoEn != null ? 'Completada'.green : 'Pendiente'.red;
        //     console.log(`${indice} ${tareas[i].desc} :: ${estado}`);
        // }
    
        this.listTareas.forEach ( (tarea, index) => {
            const idx = `${index + 1}.`.blue;
            //Desestructuracion
            const { completadoEn, desc } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        } );
    
    }

    listarPendientesCompletadas ( completadas = true ) {
        let idx = 0;
        this.listTareas.forEach ( (tarea) => {
            const { completadoEn, desc } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            if ( completadas && completadoEn){
                idx += 1;
                console.log(`${(idx + '.').blue} ${desc} :: ${completadoEn.blue}`);
            }
            if ( !completadas && !completadoEn){
                idx += 1;
                console.log(`${(idx + '.').blue} ${desc} :: ${estado}`);
            }
        } );
    }

    borrarTarea ( id = '') {
        if (this.listado[id]){
            delete this.listado[id];
        }
    }

    toggleCompletadas (ids = []) {
        
        ids.forEach (id => {
            const tarea = this.listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listTareas.forEach( tarea => {
            if (!ids.includes(tarea.id)){
                const tarea1 = this.listado[tarea.id];
                tarea1.completadoEn = null;
            }
        })
    }
}


module.exports = Tareas