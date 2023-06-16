const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: '',
    },
    avatarURL: {
        type: String,
        required: true,
    }

}, {
    versionKey: false,
    timestamps: true,
}
)

const User = mongoose.model('User', UserSchema);

module.exports = User; 
