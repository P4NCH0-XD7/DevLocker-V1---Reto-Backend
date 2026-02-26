import Snippet from '../models/Snippet.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import { validationResult } from 'express-validator';


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
    user: req.user._id,
  });

  res.status(201).json(snippet);
});

export const getSnippets = asyncHandler(async (req, res, next) => {
  const snippets = await Snippet.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(snippets);
});

export const updateSnippet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  let snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return next(new ErrorResponse(`Snippet no encontrado con id ${req.params.id}`, 404));
  }

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

export const deleteSnippet = asyncHandler(async (req, res, next) => {
  const snippet = await Snippet.findById(req.params.id);

  if (!snippet) {
    return next(new ErrorResponse(`Snippet no encontrado con id ${req.params.id}`, 404));
  }

  if (snippet.user.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse(`No autorizado para borrar este snippet`, 401));
  }

  await snippet.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
