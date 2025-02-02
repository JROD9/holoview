import {mongoose, connect} from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    user_id: {
        type: String
    },
    email: {
        type: String
    },
    report_reference: {
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
    strengths: {
        type: String
    },
    weaknesses: {
        type: String
    }, 
});
