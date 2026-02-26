import ErrorResponse from '../utils/errorResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log para el desarrollador
  console.error(err.stack);

  // Error de Mongoose: CastError (ID mal formado)
  if (err.name === 'CastError') {
    const message = `Recurso no encontrado con el id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Error de Mongoose: Duplicado de clave
  if (err.code === 11000) {
    const message = 'Valor duplicado introducido';
    error = new ErrorResponse(message, 400);
  }

  // Error de Mongoose: ValidationError
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error del Servidor',
  });
};

export default errorHandler;
