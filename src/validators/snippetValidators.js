import { body } from 'express-validator';

export const snippetValidator = [
  body('title', 'El título es obligatorio y debe tener al menos 3 caracteres')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 3 }),
  body('language', 'El lenguaje es obligatorio').not().isEmpty().trim(),
  body('code', 'El código no puede estar vacío').not().isEmpty(),
  body('tags', 'Las etiquetas deben ser un array de strings').optional().isArray(),
];
