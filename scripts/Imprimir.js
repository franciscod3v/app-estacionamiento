export class Imprimir {
    static imprimirBloque = (bloque, id) => {
        bloque.style.display = 'block'
        // Oculta el resto de la página
        const elementosParaOcultar = document.querySelectorAll(`body > *:not(#${id})`);
        elementosParaOcultar.forEach(elemento => {
            elemento.style.display = 'none';
        });

        // Imprime la sección deseada
        window.print();

        // Restaura la visibilidad de los elementos ocultos
        elementosParaOcultar.forEach(elemento => {
            elemento.style.display = '';
        });
        bloque.style.display = 'none'
    }
}