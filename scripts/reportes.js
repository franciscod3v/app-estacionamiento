import { Crud } from "./Crud.js"

const API_URL = 'https://api-estacionamiento-dev-mrah.1.us-1.fl0.io/registros'

document.addEventListener('DOMContentLoaded', () => {

    const btn_generar_report = document.getElementById('btn-generar-reporte')

    btn_generar_report.addEventListener('click', async () => {

        const data = await Crud.mostrarTodosRegistros(API_URL)

        console.log(data)

        data.sort((a, b) => a.id - b.id); // Ordena los objetos por ID

        const tablaBody = document.getElementById("tabla-body")

        data.forEach(item => {

            const row = tablaBody.insertRow()

            for (const key in item) {

                const cell = row.insertCell()

                if (key === "ingreso" || key === "salida") {

                    if (item[key]) {

                        const fecha = new Date(item[key])

                        fecha.setMinutes(fecha.getMinutes() + 300)

                        cell.innerHTML = formatearFechaRegistro(fecha)

                    } else {

                        cell.innerHTML = ""

                    }

                } else {

                    cell.innerHTML = item[key]

                }
            }
        });
    })
})

function formatearFechaRegistro(fecha) {
    const day = fecha.getDate().toString().padStart(2, '0')
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0') // Suma 1 porque los meses se indexan desde 0 (0 = enero, 1 = febrero, ...)
    const year = fecha.getFullYear()
    const hours = fecha.getHours().toString().padStart(2, '0')
    const minutes = fecha.getMinutes().toString().padStart(2, '0')
    const seconds = fecha.getSeconds().toString().padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}