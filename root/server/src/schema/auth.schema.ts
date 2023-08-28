import z, { TypeOf } from "zod";


export const createSessionSchema = z.object({
  body: z.object({

    email: z.string({
      required_error: 'Email is required'
    }).email('Not a valid Email'),

    password: z.string({
      required_error: 'Password is required'
    }).min(8, 'Invalid login credentials'),

  })
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body'];

