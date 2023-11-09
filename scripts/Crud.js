export class Crud {

    static async mostrarTodosRegistros (api) {
        try {

            const response = await fetch(api)

            if (!response.ok) {
                throw new Error(`Código de error: ${response.status}`)
            }

            const data = await response.json()

            return data

        } catch (error) {

            console.error('Error en Crud: ', error)

        }
    }

    static async registarEntrada(data, api) {
        try {
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {

                const responseData = await response.json(); // Procesar la respuesta si la solicitud fue exitosa

                return responseData

            } else {

                throw new Error('Error en la solicitud POST');
            }

        } catch (error) {

            console.error(error)
        }
    }

    static async filtrarPlaca (placa, api) {

        try {
            console.log(`Placa buscada ${placa}, api buscada: ${api}`)

            const response = await fetch(`${api}?placa=${placa}`)

            if (!response.ok) {

                throw new Error(`Código de error: ${response.status}`)
            }
            const data = await response.json()

            return data

        } catch (error) {

            console.error(error)

        }
    }

    static async buscarUltimaPlaca (placa, api) {
        try {
            console.log(`Placa buscada ${placa}, api buscada: ${api}`)

            const response = await fetch(`${api}?placa=${placa}`)

            if (!response.ok) {

                throw new Error(`Código de error: ${response.status}`)
            }
            
            const data = await response.json()

            const ultimoindex = data.length - 1

            return data[ultimoindex]

        } catch (error) {

            console.error(error)
        }
    }

    static async actualizarRegistro (id, data, api) {
        try {

            console.log('Entraste al actualizar')

            console.log('Quiero ver esto: ', JSON.stringify(data))

            const response = await fetch(`${api}/${id}`, {
                
                method: 'PATCH',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(data)

            })

            if (response.ok) {

                const responseData = await response.json(); // Procesar la respuesta si la solicitud fue exitosa

                console.log(`Se actualizó el id: ${id}`)

                return responseData

            } else {

                throw new Error('Error en la solicitud PATCH');
            }

        } catch (error) {

            console.error(error)

        }
    }

    static async buscarPorId (id, api) {
        try {
            const response = await fetch(`${api}/${id}`)

            if (!response.ok) {

                throw new Error(`Código de error: ${response.status}`)
            }

            const data = await response.json()

            return data
            
        } catch (error) {

            console.error('Error CATCH: ', error)
        }
    }

}