export class Menu {
    static abrirMenuRegistrarParking (cuadroInicial, menu, servicio, puertaIngreso) {
        menu.classList.remove('desactive');
        const propiedades = cuadroInicial.getPropiedadesParking(); // Accede al método de la clase
        puertaIngreso.textContent = propiedades.puertaIngreso;
        console.log(puertaIngreso.textContent);
        servicio.textContent = propiedades.servicio;
        console.log(servicio.textContent);
    }

    static abrirMenuRegistrarCochera (cuadroInicial, menu, servicio, puertaIngreso) {
        menu.classList.remove('desactive');
        const propiedades = cuadroInicial.getPropiedadesCochera(); // Accede al método de la clase
        puertaIngreso.textContent = propiedades.puertaIngreso;
        console.log(puertaIngreso.textContent);
        servicio.textContent = propiedades.servicio;
        console.log(servicio.textContent);
    }

    static abrirMenuSalida(menu) {
        menu.classList.remove('desactive')
    }
}