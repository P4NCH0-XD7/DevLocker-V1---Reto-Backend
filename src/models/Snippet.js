import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'El título es obligatorio.'],
      minlength: [3, 'El título debe tener al menos 3 caracteres.'],
      trim: true,
    },
    language: {
      type: String,
      required: [true, 'El lenguaje es obligatorio.'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'El código no puede estar vacío.'],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;
