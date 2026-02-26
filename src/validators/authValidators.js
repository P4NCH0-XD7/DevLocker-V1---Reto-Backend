import { body } from 'express-validator';

export const registerValidator = [
  body('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
  body('email', 'Por favor, incluye un email válido').isEmail().normalizeEmail(),
  body('password', 'La contraseña debe tener 6 o más caracteres').isLength({ min: 6 }),
];

export const loginValidator = [
  body('email', 'Por favor, incluye un email válido').isEmail().normalizeEmail(),
  body('password', 'La contraseña es obligatoria').not().isEmpty(),
];
