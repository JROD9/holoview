import {mongoose, connect} from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    user_id: {
        type: String
    },
    email: {
        type: String
    },
    report_reference_id: {
        type: String
    },
    username: {
        type: String
    },
    phone_number: {
        type: Number
    }
});

const report = new Schema({
    transcript: {
        type: String
    },
    report_reference_id: {
        type: String
    },
    strengths: {
        type: String
    },
    weaknesses: {
        type: String
    }, 

});

class DB {
    constructor(model, modelName) {
        this.model =  mongoose.model( modelName, model);
    }
    async add(docs) {
        try {
            await this.model.insertMany(docs)
            console.log('saved successfully');
        } catch (err) {
            console.log(err.message);
        }
    }

    async delete(id) {
        try {
            await this.model.findByIdAndDelete(id);
            console.log('deleted successfully');
        } catch (err) {
            console.log(err.message);
        }
    }

    async find(param, data, fields) {
        try {
            // fields is a string you pass in specifying what columns you want to be returned
            return await this.model.find({[param]: data}, fields);
        } catch (err) {
            console.log(err.message);
        }
    }

    async update(id, data) {
        try {
            // pass in data as obj ex: {param: data}
            await this.model.findByIdAndUpdate(id, data);
            console.log('updated successfully');
        } catch (err) {
            console.log(err.message);
        }
    }
}

export {DB};