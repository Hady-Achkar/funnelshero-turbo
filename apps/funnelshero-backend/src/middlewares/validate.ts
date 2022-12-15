import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import validate from '../utils/validate';

/**
 * A middleware to validate schema.
 *
 * @param {Joi.Schema} params
 */
export function schema(params: Joi.Schema) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {

      await validate(req.body, params);

      next();
    } catch (err) {
      next(err);
    }
  };
}

export function params(params: Joi.Schema) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await validate(req.params, params);

      next();
    } catch (err) {
      next(err);
    }
  };
}

