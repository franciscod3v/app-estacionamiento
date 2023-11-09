import { Crud } from "./Crud.js"
import { CuadroInicial } from "./CuadroInicial.js"
import { Imprimir } from "./Imprimir.js"
import { Menu } from "./Menu.js"

const API_URL = 'https://api-estacionamiento-dev-mrah.1.us-1.fl0.io/registros'

const btn_parking = document.getElementById('btn-parking')

const btn_cochera = document.getElementById('btn-cochera')

const label_servicio = document.getElementById('label-servicio')

const menuAgregarRegistro = document.getElementById('menu-agregar-registro')

const menuRegistrarSalida = document.getElementById('menu-registrar-salida')

const label_puerta_ingreso = document.getElementById('label-puerta-ingreso')

//Boton cerrar menu agregar
const btn_cerrar_ingreso = document.getElementById('btn-cerrar-ingreso')

document.addEventListener('DOMContentLoaded', () => {

    let idLocal = null

    let transaccionLocal = {
        puerta_salida: null,
        salida: null,
        ticket_perdido: false,
        descarga: false,
        tiempo_en_estacionamiento: null,
        total_a_pagar: null

    }



    btn_parking.addEventListener('click', () => {

        if (document.getElementById('puerta-ingreso').value === 'Escoge puerta por defecto') {

            alert('Selecciona puerta predeterminada')

        } else {

            Menu.abrirMenuRegistrarParking(CuadroInicial, menuAgregarRegistro, label_servicio, label_puerta_ingreso)
        }
    })

    btn_cochera.addEventListener('click', () => {

        if (document.getElementById('puerta-ingreso').value === 'Escoge puerta por defecto') {

            alert('Selecciona puerta predeterminada')

        } else {

            Menu.abrirMenuRegistrarCochera(CuadroInicial, menuAgregarRegistro, label_servicio, label_puerta_ingreso)
        }
    })

    btn_cerrar_ingreso.addEventListener('click', () => {

        menuAgregarRegistro.classList.add('desactive')

        document.getElementById('input-placa').value = ""

        document.getElementById('select-vehiculo').value = 'Escoge tipo de vehículo'
    })

    //Boton registrar
    const btn_registrar_ingreso = document.getElementById('btn-registrar')

    btn_registrar_ingreso.addEventListener('click', async () => {

        if (document.getElementById('select-vehiculo').value === 'Escoge tipo de vehículo') {

            alert('Escoge un tipo de vehiculo')

        } else if (document.getElementById('input-placa').value === ''

            || document.getElementById('input-placa').value.length !== 7) {

            alert('Placa invalida')

        } else {

            menuAgregarRegistro.classList.add('desactive')

            console.log('Test')

            const nuevaPlaca = document.getElementById('input-placa').value

            const fecha = new Date()

            console.log('Fecha creada: ', fecha)

            fecha.setMinutes(fecha.getMinutes() - 300)

            console.log('Fecha modificada', fecha)

            const nuevaFecha = fecha.toISOString()

            console.log('Ultima fecha: ', nuevaFecha)

            const tipoVehiculo = document.getElementById('select-vehiculo').value

            const nuevoIngreso = {

                placa: nuevaPlaca.toString(),
                puerta_ingreso: label_puerta_ingreso.textContent.toString(),
                tipo_servicio: label_servicio.textContent.toString(),
                tipo_vehiculo: tipoVehiculo.toString(),
                ingreso: nuevaFecha,
                puerta_salida: "",
                salida: "",
                ticket_perdido: false,
                descarga: false,
                tiempo_en_estacionamiento: "",
                total_a_pagar: 0

            }

            console.log("Console Log antes de Crud: ", nuevoIngreso)
            const nuevoRegistro = await Crud.registarEntrada(nuevoIngreso, API_URL)
            console.log(nuevoRegistro)
            const ticketParaImprimir = document.getElementById('ticket-ingreso')
            const idIngresoImprimir = document.getElementById('id-ticket-ingreso')
            const placaParaImprimir = document.getElementById('placa-ticket-ingreso')
            const puertaIngresoTicket = document.getElementById('puerta-ingreso-ticket')
            const fechaIngresoTicket = document.getElementById('fecha-ingreso-ticket')
            const servicioIngresoTicket = document.getElementById('servicio-ticket-ingreso')
            const horaIngresoTicket = document.getElementById('hora-ticket-ingreso')

            const fechaDate = new Date(nuevoRegistro.ingreso)
            fechaDate.setMinutes(fechaDate.getMinutes() + 300)

            idIngresoImprimir.textContent = nuevoRegistro.id
            placaParaImprimir.textContent = nuevoRegistro.placa
            puertaIngresoTicket.textContent = `Puerta ${nuevoRegistro.puerta_ingreso}`
            fechaIngresoTicket.textContent = extraerSoloFecha(fechaDate)
            servicioIngresoTicket.textContent = nuevoRegistro.tipo_servicio
            horaIngresoTicket.textContent = formatearFecha(fechaDate)

            Imprimir.imprimirBloque(ticketParaImprimir, 'ticket-ingreso')

            limpiarFormularioRegistro()
        }

    })

    //Cerrar formulario salida
    const btn_cerrar_salida = document.getElementById('btn-cerrar-salida')

    btn_cerrar_salida.addEventListener('click', () => {

        menuRegistrarSalida.classList.add('desactive')

        limpiarFormulariosalida()

    })

    //Boton salida
    const btn_salida = document.getElementById('btn-salida')

    btn_salida.addEventListener('click', () => {

        Menu.abrirMenuSalida(menuRegistrarSalida)

    })

    //Buscar placa
    const btn_buscar_placa = document.getElementById('btn-buscar')

    btn_buscar_placa.addEventListener('click', async () => {

        console.log('valor de la puerta', document.getElementById('puerta-ingreso').value)

        if (document.getElementById('puerta-ingreso').value === 'Escoge puerta por defecto') {

            alert('No has seleccionado una puerta por defecto')

        } else {

            if (document.getElementById('input-placa-salida').value.length !== 7) {

                alert('Placa Inválida')

                limpiarFormulariosalida()

            } else {

                const input_placa = document.getElementById('input-placa-salida')

                console.log("Que hay en la placa", input_placa.value)

                const registroObtenido = await Crud.buscarUltimaPlaca(input_placa.value, API_URL)

                console.log(registroObtenido)

                //Colocar la info en el formulario
                const id_salida = document.getElementById('id-servicio-salida')

                console.log(id_salida)

                const servicio_salida = document.getElementById('servicio-solicitado-salida')

                const puerta_ingreso_salida = document.getElementById('puerta-ingreso-salida')

                const label_vehiculo_salida = document.getElementById('label-vehiculo-salida')

                const label_hora_ingreso_salida = document.getElementById('label-hora-ingreso-salida')

                const puerta_salida = document.getElementById('puerta-salida')

                console.log('Registro test: ', registroObtenido.id)

                id_salida.textContent = registroObtenido.id

                servicio_salida.textContent = registroObtenido.tipo_servicio

                puerta_ingreso_salida.textContent = registroObtenido.puerta_ingreso

                label_vehiculo_salida.textContent = registroObtenido.tipo_vehiculo

                const fechaTraida = new Date(registroObtenido.ingreso)

                fechaTraida.setMinutes(fechaTraida.getMinutes() + 300)

                label_hora_ingreso_salida.textContent = formatearFecha(fechaTraida)

                puerta_salida.textContent = document.getElementById('puerta-ingreso').value

            }



        }

    })

    //Calcular Pago
    const btn_calcular_pago = document.getElementById('btn-calcular')

    btn_calcular_pago.addEventListener('click', async () => {

        if (document.getElementById('input-placa-salida').value.length !== 7) {

            alert('Primero busca la placa')

            limpiarFormulariosalida()

        } else {

            const input_placa = document.getElementById('input-placa-salida')

            const cbx_perdida_ticket = document.getElementById('perdio-ticket')

            const cbx_descarga = document.getElementById('realizo-descarga')

            const label_hora_salida = document.getElementById('label-hora-salida')

            const label_tiempo_parqueo = document.getElementById('label-tiempo-parqueo')

            const registroObtenido = await Crud.buscarUltimaPlaca(input_placa.value, API_URL)

            const fechaIngreso = new Date(registroObtenido.ingreso)

            fechaIngreso.setMinutes(fechaIngreso.getMinutes() + 300)

            const fechaSalida = new Date()

            console.log('Fecha creada: ', fechaSalida)

            label_hora_salida.textContent = formatearFecha(fechaSalida)

            const tiempo_en_estacionamiento = tiempoEnEstacionamiento(registroObtenido.ingreso, fechaSalida)

            label_tiempo_parqueo.textContent = `
            ${tiempo_en_estacionamiento.dias} dias, 
            ${tiempo_en_estacionamiento.horas} hrs, 
            ${tiempo_en_estacionamiento.minutos} min, 
            ${tiempo_en_estacionamiento.segundos} seg`

            console.log(tiempo_en_estacionamiento)

            let estado_cbx_perdida = false

            let estado_cbx_descarga = false

            if (cbx_perdida_ticket.checked) {
                estado_cbx_perdida = true
            }

            if (cbx_descarga.checked) {
                estado_cbx_descarga = true
            }

            const pagoFinal = calcularPago(registroObtenido.tipo_servicio, estado_cbx_perdida, estado_cbx_descarga, tiempo_en_estacionamiento.total, registroObtenido.tipo_vehiculo)

            const label_pago_final = document.getElementById('label-pago-final')

            label_pago_final.textContent = `S/ ${pagoFinal}`

            idLocal = registroObtenido.id

            transaccionLocal.ticket_perdido = estado_cbx_perdida

            transaccionLocal.descarga = estado_cbx_descarga

            transaccionLocal.puerta_salida = document.getElementById('puerta-salida').textContent

            fechaSalida.setMinutes(fechaSalida.getMinutes() - 300)

            const fechaSalidaGuardar = fechaSalida.toISOString()

            transaccionLocal.salida = fechaSalidaGuardar

            transaccionLocal.tiempo_en_estacionamiento = JSON.stringify(tiempo_en_estacionamiento)

            transaccionLocal.total_a_pagar = pagoFinal

            console.log(transaccionLocal.total_a_pagar)

            console.log(transaccionLocal.salida)

            console.log('Id: ', idLocal)

            console.log('Transaccion: ', transaccionLocal)

        }

    })

    //Pagar
    const btn_pagar = document.getElementById('btn-pagar')

    btn_pagar.addEventListener('click', async () => {

        if (

            idLocal === null ||

            transaccionLocal.total_a_pagar === null ||

            document.getElementById('label-pago-final').textContent === '-'

        ) {

            alert('Calcula el monto a pagar primero')

        } else {

            console.log('Entraste al pago')

            console.log(transaccionLocal)

            await Crud.actualizarRegistro(idLocal, transaccionLocal, API_URL)

            console.log('Id Local:', idLocal)

            await setearTicketSalida(idLocal)

            const ticket_salida = document.getElementById('ticket-salida')

            Imprimir.imprimirBloque(ticket_salida, 'ticket-salida')

            limpiarFormulariosalida()

            menuRegistrarSalida.classList.add('desactive')

        }



    })


})

function formatearFecha(fecha) {
    const day = fecha.getDate().toString().padStart(2, '0')
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0') // Suma 1 porque los meses se indexan desde 0 (0 = enero, 1 = febrero, ...)
    const year = fecha.getFullYear()
    const hours = fecha.getHours().toString().padStart(2, '0')
    const minutes = fecha.getMinutes().toString().padStart(2, '0')
    const seconds = fecha.getSeconds().toString().padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

function extraerSoloFecha(fecha) {
    const day = fecha.getDate().toString().padStart(2, '0')
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0') // Suma 1 porque los meses se indexan desde 0 (0 = enero, 1 = febrero, ...)
    const year = fecha.getFullYear()
    return `${day}/${month}/${year}`
}

function tiempoEnEstacionamiento(fechaIni, fechaFin) {

    const ini = new Date(fechaIni)

    const fin = new Date(fechaFin)

    // Calcula la diferencia en milisegundos
    const diferenciaEnMilisegundos = fin - ini - 18000000

    // Convierte la diferencia en milisegundos a días, horas, minutos y segundos
    const segundos = Math.floor(diferenciaEnMilisegundos / 1000) % 60
    const minutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60)) % 60
    const horas = Math.floor(diferenciaEnMilisegundos / (1000 * 3600)) % 24
    const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 86400))

    return {
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos,
        total: diferenciaEnMilisegundos
    }
}

function calcularPago(servicio, perdioTicket, realizaDescarga, tiempo, vehiculo) {

    let pagoFinal = 0
    let costePorCochera = 0

    if (servicio === 'Parking') {

        if (tiempo <= 7200000) {

            pagoFinal = 0

        } else {

            let horasTotales = tiempo / 3600000

            let horasCobro = Math.ceil(horasTotales) - 2

            pagoFinal = horasCobro * 2

        }
        //Empieza el otro servicio  - Falta Moto triciclo que es 5 
    } else {

        switch (vehiculo) {
            case 'Moto lineal':
                costePorCochera = 4
                break;
            case 'Carreta':
                costePorCochera = 5
                break;
            case 'Mototaxi':
                costePorCochera = 5
                break;
            case 'Autos':
                costePorCochera = 5
                break;
            case 'Camioneta':
                costePorCochera = 6
                break;
            case 'Minivan':
                costePorCochera = 6
                break;
            case 'Combis':
                costePorCochera = 6
                break;
            case 'Furgón pequeño':
                costePorCochera = 6
                break;
            case 'Furgón mediano':
                costePorCochera = 7
                break;
            case 'Furgón grande':
                costePorCochera = 10
                break;
            case 'Camión':
                costePorCochera = 20
                break;
            case 'Trailer':
                costePorCochera = 20
                break;
            default:
                break;
        }

        let horasMultiploDoce = tiempo / 43200000

        let horasCobro = Math.ceil(horasMultiploDoce)

        pagoFinal = horasCobro * costePorCochera
    }

    //Se verifica si hay pago de ticket
    if (perdioTicket === true) {
        pagoFinal += 25
    }

    //Se verifica si hay descarga
    if (realizaDescarga === true) {
        pagoFinal += 5
    }

    return pagoFinal
}

async function setearTicketSalida(idLocal) {

    console.log('Entraste a setear')

    const registroBuscado = await Crud.buscarPorId(idLocal, API_URL)

    console.log('Registro Buscado: ', registroBuscado)

    console.log(document.getElementById('puerta-ingreso-ticket-salida'))

    document.getElementById('puerta-ingreso-ticket-salida').textContent = `Puerta ${registroBuscado.id}`

    const soloFechaIngresoTicket = new Date(registroBuscado.ingreso)

    document.getElementById('fecha-ingreso-ticket-salida').textContent = extraerSoloFecha(soloFechaIngresoTicket)

    document.getElementById('placa-ticket-ingreso-salida').textContent = registroBuscado.placa

    document.getElementById('id-ticket-salida').textContent = registroBuscado.id

    const fechaIngresoTicket = new Date(registroBuscado.ingreso)

    fechaIngresoTicket.setMinutes(fechaIngresoTicket.getMinutes() + 300)

    document.getElementById('hora-ticket-ingreso-salida').textContent = formatearFecha(fechaIngresoTicket)

    const fechaSalidaTicket = new Date(registroBuscado.salida)

    fechaSalidaTicket.setMinutes(fechaSalidaTicket.getMinutes() + 300)

    document.getElementById('hora-ticket-salida').textContent = formatearFecha(fechaSalidaTicket)

    const tiempoEnParqueo = JSON.parse(registroBuscado.tiempo_en_estacionamiento)

    document.getElementById('ticket-tiempo-parqueo').textContent = `
    ${tiempoEnParqueo.dias} dias, 
    ${tiempoEnParqueo.horas} hrs, 
    ${tiempoEnParqueo.minutos} min, 
    ${tiempoEnParqueo.segundos} seg`

    document.getElementById('ticket-pago').textContent = `S/ ${registroBuscado.total_a_pagar}`

    document.getElementById('servicio-ticket-salida').textContent = registroBuscado.tipo_servicio
}

function limpiarFormularioRegistro() {
    document.getElementById('label-puerta-ingreso').textContent = '-'
    document.getElementById('label-servicio').textContent = '-'
    document.getElementById('input-placa').value = ''
    document.getElementById('select-vehiculo').value = 'Escoge tipo de vehículo'
}

function limpiarFormulariosalida() {
    document.getElementById('input-placa-salida').value = ''
    document.getElementById('id-servicio-salida').textContent = '-'
    document.getElementById('servicio-solicitado-salida').textContent = '-'
    document.getElementById('puerta-ingreso-salida').textContent = '-'
    document.getElementById('label-vehiculo-salida').textContent = '-'
    document.getElementById('label-hora-ingreso-salida').textContent = '-'
    document.getElementById('puerta-salida').textContent = '-'
    document.getElementById('label-hora-salida').textContent = '-'
    document.getElementById('label-tiempo-parqueo').textContent = '-'
    document.getElementById('label-pago-final').textContent = '-'
    document.getElementById('perdio-ticket').checked = false
    document.getElementById('realizo-descarga').checked = false
}