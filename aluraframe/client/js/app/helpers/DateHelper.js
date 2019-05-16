class DateHelper {

    constructor() {
        
        throw new Error ("Esta classe não pode ser instanciada");
    }

    static textoParaData(texto) {
        if (/^\d{4}-\d{2}-\d{d}$/.test(texto)) throw new Error ("Data no formato inválido");
        return new Date(...texto.split('-').map((item, index) => item - index%2));
    }

    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;

    }

}