const version = 3;
const stores = ['negociacoes'];
const dbName = 'aluraframe';

let connection = null;
let close = null;

export class ConnectionFactory{

    constructor() {
        
        throw new Error('A classe ConnectionFactory não pode ser instanciada');
    }

    static getConnection(){

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = e => {

                ConnectionFactory._createStores(e.target.result);
            }
            
            openRequest.onsuccess = e => {
                
                if(!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function(){
                        throw new Error('Não é possível chamar o método close a partir da conexão');
                    }
                }
                resolve(connection);
            }
            
            openRequest.onerror = e => {

                console.log(e.target.error);
                reject("e.target.error.name");
            }
        });
    }
    
    static _createStores(connection){
        
        stores.forEach(store => {
    
            if(e.target.result.objectStoreNames.contains(store)) e.target.result.deleteObjectStore(store);
    
            e.target.result.createObjectStore(store);
        });
    }

    static close(){

        close();
        connection = null;
    }
}