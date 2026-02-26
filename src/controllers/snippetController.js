import Snippet from '../models/Snippet.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Crear un nuevo snippet
 * @route   POST /api/v1/snippets
 * @access  Private
 */
export const createSnippet = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, language, code, tags } = req.body;

  const snippet = await Snippet.create({
    title,
    language,
    code,
    tags,
    user: req.user._id, // Asignar el snippet al usuario logueado
  });

  res.status(201).json(snippet);
});

/**
 * @desc    Obtener todos los snippets del usuario logueado
 * @route   GET /api/v1/snippets
 * @access  Private
 */
export const getSnippets = asyncHandler(async (req, res, next) => {
  const snippets = await Snippet.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(snippets);
});

/**
 * @desc    Actualizar un snippet
 * @route   PUT /api/v1/snippets/:id
 * @access  Private
 */
export const updateSnippet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  let snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return next(new ErrorResponse(`Snippet no encontrado con id ${req.params.id}`, 404));
  }

  // Verificar que el snippet pertenece al usuario
  if (snippet.user.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse(`No autorizado para actualizar este snippet`, 401));
  }

  const { title, language, code, tags } = req.body;
  snippet.title = title;
  snippet.language = language;
  snippet.code = code;
  snippet.tags = tags;

  snippet = await snippet.save();

  res.status(200).json(snippet);
});

/**
 * @desc    Borrar un snippet
 * @route   DELETE /api/v1/snippets/:id
 * @access  Private
 */
export const deleteSnippet = asyncHandler(async (req, res, next) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return next(new ErrorResponse(`Snippet no encontrado con id ${req.params.id}`, 404));
  }

  // Verificar que el snippet pertenece al usuario
  if (snippet.user.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse(`No autorizado para borrar este snippet`, 401));
  }

  await snippet.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
