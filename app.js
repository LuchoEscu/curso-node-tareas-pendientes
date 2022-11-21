require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { menuPrincipal, leerInput, pause, listTareasBorrar, confirmar, mostrarListado } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();
const main = async () => {

    const tareas = new Tareas;
    let op = '';

    const carga = leerDB();

    if ( carga ) {
        tareas.cargarTareasFromArray(carga);
    }

    do {
        op = await menuPrincipal();
        switch (op) {
            case '1':
                const desc = await leerInput ('Descripción:');
                tareas.crearTarea(desc);
            break;
        
            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas( true );
            break;
            
            case '4':
                tareas.listarPendientesCompletadas ( false );
            break;

            case '5':
                const ids = await mostrarListado (tareas.listTareas);
                tareas.toggleCompletadas(ids)
                // console.log(ids);
            break;

            case '6':
                const id = await listTareasBorrar ( tareas.listTareas );
                if( id !== '0'){
                    const confirm = await confirmar('Esta seguro?');
                    if ( confirm ){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada satisfactoriamente.');
                    }
                }

            break;
        }

        guardarDB (tareas.listTareas);

        await pause();

    } while (op !== '0');
}


main();





