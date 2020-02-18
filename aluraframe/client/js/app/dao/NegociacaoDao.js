class NegociacaoDao{

    constructor(connection){

        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){

      return new Promise((resolve, reject) => {

        let request = this._connection
                        .transaction([this._store], 'readwrite')
                        .objectStore(this._store)
                        .add(negociacao);
                        
        request.onsuccess = e => {

            resolve('Negociacação cadastrada com sucesso');
        }

        request.onerror = e => {

            console.log(e.target.error);
            reject('Erro ao gravar negociacão');
        }
      });
    }

    listaTodos(){

      return new Promise((resolve, reject) => {

        let cursor = this._connection
                      .transaction([this._store], 'readwrite')
                      .objectStore(this._store)
                      .openCursor();
       
        let negociacoes = [];

        cursor.onsuccess = e => {

          let itemAtual = e.target.result;

          if(itemAtual){

            let dado = itemAtual.value;
            negociacoes.push(new Negociacao(new Date(dado._data), dado._quantidade, dado._valor));
            itemAtual.continue();

          }else{
            
            resolve(negociacoes);
          }
        };

        cursor.onerror = e => {

          console.log(e.target.error);
          reject('Não foi possível listar as negociações');
        };

      });
    }

    apagaTodos(){

      return new Promise((resolve, reject) => {

        let request = this._connection
                      .transaction([this._store], 'readwrite')
                      .objectStore(this._store)
                      .clear();

        request.onsuccess = e => resolve('Negociações removidas com sucesso');

        request.onerror = e => {

          console.log(e.target.error);
          reject('Erro ao remover as negociações');
        }

      });
    }
}