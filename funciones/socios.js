// esta app simula la reserva de turnos por actividades
import inquirer from "inquirer";
import fs from "fs";

//Primero declarar una variable para que lea nuestro archivo json
const socios = JSON.parse(fs.readFileSync("./socios.json", "utf-8"));

export const sociosMain = async () => {
    const input = await inquirer.prompt([
        {
            name: "accion",
            message: "¿Que acción desea realizar?",
            type: "list",
            choices: ["Agregar", "Eliminar", "Actualizar", "Leer"],
        },
    ]);
    // AGREGAR SOCIO

    if (input.accion === "Agregar") {
        const { nombre, dni, actividad } = await inquirer.prompt([
            {
                name: "nombre",
                message: "¿Cual es tu nombre?",
            },
            {
                name: "dni",
                message: "¿Cual es tu documento?",
            },
            {
                name: "actividad",
                message: "¿Que actividad desea realizar hoy?",
                type: "list",
                choices: ["Natación", "Gimnasio", "Boxeo", "Spinning"],
            },
        ]);
        const socio = {
            nombre: nombre,
            dni: dni,
            actividad: actividad,
        };
        socios.push(socio);
        fs.writeFileSync("./socios.json", JSON.stringify(socios));
        console.log("Socio agregado", socio);
    }
    // ELIMINAR SOCIO

    else if (input.accion === "Eliminar") {
        const { dni } = await inquirer.prompt([
            {
                name: "dni",
                message: "¿Cual es el documento del socio a eliminar?"
            },
        ]);

        const indice = socios.findIndex((socio) => socio.dni == dni);

        socios.splice(indice, 1);

        fs.writeFileSync("./socios.json", JSON.stringify(socios));
    }
    // ACTUALIZAR 
    else if (input.accion === "Actualizar") {
        const { dni } = await inquirer.prompt([
            {
                name: "dni",
                message: "¿Cuál es el documento del socio a actualizar?",
            },
        ]);
        const socio = socios.find((item) => item.dni === dni);

        if (!socio) {
            console.log("Socio no encontrado");
            return;
        }
        const { nombre } = await inquirer.prompt([
            {
                name: "nombre",
                message: `¿Cuál es el nuevo nombre? (actual: ${socio.nombre})`,
            },
        ]);
        socio.nombre = nombre;
        fs.writeFileSync("./socios.json", JSON.stringify(socios));
        console.log("Socio actualizado:", socio);
    }

    // VER TODOS LOS ALUMNOS
    else if (input.accion === "Leer") {
        socios.forEach((element) => {
            console.log(element);
        });
    }
};
