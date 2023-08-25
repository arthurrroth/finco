import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger";


const validateResource
  = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {

      log.info('started parsing Resource')
      try {

        schema.parse({

          body: req.body,
          query: req.query,
          params: req.params

        });


        next();

      } catch (err: any) {

        return res.status(400).send(err.errors)
      }

    };

export default validateResource;
