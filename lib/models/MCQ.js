const mongoose = require('mongoose');

const mcqSchema = new mongoose.Schema({
    statement: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v.length >= 2; // Ensure at least two options
            },
            message: 'An MCQ must have at least two options.',
        },
    },
    correctOption: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 0 && v < this.options.length; // Ensure correctOption is a valid index
            },
            message: 'Correct option must be a valid index of the options array.',
        },
    },
    correctOptionAlt: { type: Number },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    class: {
        type: String,
        required: true,
        enum: ['Nine', 'Ten', 'Eleven', 'Twelve', 'Entry Test'],
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        enum: ["Math", "Physics", "Chemistry", "Biology", "English", "Computer Science", "IQ"],
        trim: true,
    },
    topic: {
        type: String,
        required: true,
        trim: true,
    },
    reference: {
        pastPaper: {
            type: Boolean,
        },
        referenceName: {
            type: String,
            enum: ['MDCAT', 'ECAT', 'Learning'],
        },
        conductor: {
            type: String,
        },
        year: {
            type: Number,
            required: function () {
                return this.reference?.pastPaper === true;
            }
        },
        // Time must be in hours
        time: {
            type: Number,
            required: function () {
                return this.reference?.pastPaper === true;
            }
        }
    },
    reason: {
        type: String,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const MCQ = mongoose.models.MCQ || mongoose.model("MCQ", mcqSchema);

export default MCQ; 