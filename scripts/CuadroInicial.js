export class CuadroInicial {
    static getPropiedadesParking = () => {
        return {
            puertaIngreso: document.getElementById('puerta-ingreso').value,
            servicio: document.getElementById('btn-parking').textContent
        }
    }

    static getPropiedadesCochera = () => {
        return {
            puertaIngreso: document.getElementById('puerta-ingreso').value,
            servicio: document.getElementById('btn-cochera').textContent
        }
    }
}
