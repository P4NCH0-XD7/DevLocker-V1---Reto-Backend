import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import User from '../models/User.js';

// Proteger rutas
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Leer el token JWT del encabezado 'Authorization'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Asegurarse de que el token existe
  if (!token) {
    return next(new ErrorResponse('No autorizado para acceder a esta ruta', 401));
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
        return next(new ErrorResponse('Usuario no encontrado', 404));
    }

    next();
  } catch (error) {
    return next(new ErrorResponse('No autorizado para acceder a esta ruta', 401));
  }
});
