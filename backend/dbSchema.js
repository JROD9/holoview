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

// db scchema
// user_id
// reference num for credit report form intv
// pointer to s3 bucket for txt file
// name
// email
// username
// number

// other collection for reports