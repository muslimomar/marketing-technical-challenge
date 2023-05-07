import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/custom-error';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({errors: err.serializeErrors()});
    }

    // use a production-grade logger like winston or morgan.
    console.log(err);

    res.status(400).send({
        errors: [{message: 'Something went wrong'}]
    });
};
