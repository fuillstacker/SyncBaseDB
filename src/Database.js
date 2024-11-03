const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

class Database {
    constructor() {
        this.data = []
        this.id = 0
        this.load()
    }

    // config
    load() {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath);
            this.data = JSON.parse(fileData);
            this.id = this.data.length > 0 ? Math.max(...this.data.map(record => record.id)): 0
        }
    }

    save() {
        fs.writeFileSync(filePath, JSON.stringify(this.data, null, 2))
    }


    //functions

    createModel(modelName, model) {
        if(!this.data[modelName]) {
            this.data[modelName] = {
                records: [],
                nextId: 1
            }
            this.save()
            return {status: 'success', message: `Модель ${modelName} успішно створенна!`}
        } else {
            return {status: 'error', message: `Модель ${modelName} вже існує!`}
        }
    }

    create(modelName, record) {
       if(!this.data[modelName]) {
           return {status: 'error', message: `Модель ${modelName} не знайденно!`}
       }

       const model = this.data[modelName]
       const newRecord = {
            id: model.nextId++,
            ...record
       }

       model.records.push(newRecord)
       this.save()
       return {status: 'success', message: `Документ упішно створено!`}
    }

    getAll(modelName) {
        if(!this.data[modelName]) {
            return {status: 'error', message: `Модель ${modelName} не знайденно!`}
        }
        return this.data[modelName].records
    }

    getOne(modelName, id) {
        if(!this.data[modelName]) {
            return {status: 'error', message: `Модель ${modelName} не знайденно!`}
        }
        return this.data[modelName].records.find(record => record.id === id) || null
    }

    update(modelName, id, updatedRecord) {
        const index = this.data[modelName].findIndex(record => record.id === id)
        if(index) {
            Object.assign(index, updatedRecord)
            this.save()
            return {status: 'success', message: `Документ упішно оновленно!`}
        } else {
            return {status: 'error', message: `Модель ${modelName} не знайденно!`}
        }
    }

    delete(modelName, id) {
        if(!this.data[modelName]) {
            return {status: 'error', message: `Модель ${modelName} не знайденно!`}
        }
        this.data[modelName].records = this.data[modelName].records.filter(record => record.id !== id)
        this.save()
        return {status: 'success', message: `Документ упішно видаленно!`}
    }
}

module.exports = Database