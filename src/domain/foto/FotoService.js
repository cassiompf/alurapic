export default class FotoService {

    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    lista() {
        return this._resource
                .query()
                .then(res => res.json(), err => {
                    console.log(err);
                    throw new Error("Não foi possível obter as fotos. Tente mais tarde");
                });
    }

    cadastra(foto) {

        if (foto._id) {
            return this._resource
            .update({ id: foto._id }, foto)
            .then(null, err => {
                console.log(err);
                throw new Error("Não foi possível atualizar a foto.");
            });
        }
        return this._resource
        .save(foto)
        .then(null, err => {
            console.log(err);
            throw new Error("Não foi possível cadastrar a foto.");
        });;
    }

    apaga(id) {
        return this._resource
        .delete({ id })
        .then(null, err => {
            console.log(err);
            throw new Error("Não foi possível remover a foto.");
        });
    }

    busca(id) {
        return this._resource
        .get({ id })
        .then(res => res.json());
    }
} 