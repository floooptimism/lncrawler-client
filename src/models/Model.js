class Model{
    static db = null;
    getDB(){
        return this.constructor.db;
    }

    static get(){
        // get model data
    }

    static getAll(){
        // get all model data
    }

    static save(){
        // save model data
    }

}

module.exports = Model;