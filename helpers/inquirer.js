const inquirer = require('inquirer');
require('colors');

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.blue} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.blue} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.blue} Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${'5.'.blue} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.blue} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.blue} Salir`
            }
        ]
    }
];

const menuPrincipal = async () => {
    
    console.clear();
    console.log('==================================='.blue);
    console.log('       Seleccione una opción.'.blue);
    console.log('===================================\n'.blue);

    const {opcion} = await inquirer.prompt(opciones);

    return opcion;

}

const leerInput = async (message) => {
    const preg = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if (value.length === 0){
                    return 'Por favor ingrese un valor.';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(preg)
    return desc

}

const pause = async () => {
    const preg = [
        {
            type: 'input',
            name: 'pausa',
            message: `Para continuar presione ${'ENTER'.blue}`
        }
    ];

    const pause = await inquirer.prompt(preg);
    return pause

}

const listTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map ( (tareas, i) => {
        const idx = `${i + 1}.`.blue;
        return {
            value: tareas.id,
            name: `${idx} ${tareas.desc}`
        }
    } );
    choices.unshift ({
        value: '0',
        name: '0.'.red + ' Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async mensaje => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;

}


const mostrarListado = async ( tareas = [] ) => {

    const choices = tareas.map ( (tareas, i) => {
        const idx = `${i + 1}.`.blue;
        return {
            value: tareas.id,
            name: `${idx} ${tareas.desc}`,
            checked: tareas.completadoEn ? true : false
        }
    } );

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(preguntas);
    return ids;

}




module.exports = {
    menuPrincipal,
    leerInput,
    pause,
    listTareasBorrar,
    confirmar,
    mostrarListado
}