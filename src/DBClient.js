class DBClient {
    constructor(database) {
        this.database = database
    }

    insert(modelName, record) {
        return this.database.create(modelName, record)
    }

    createModel(modelName, model) {
        return this.database.createModel(modelName, model)
    }

    find(modelName, query = {}) {
        return this.database.getAll(modelName, query)
    }

    findOne(modelName, id) {
        return this.database.getOne(modelName, id)
    }

    update(modelName, id, updatedRecord) {
        return this.database.update(modelName, id, updatedRecord)
    }

    delete(modelName, id) {
        return this.database.delete(modelName, id)
    }
}

module.exports = DBClient