import z, { TypeOf } from "zod";


export const userCreationSchema = z.object({
  body: z.object({

    username: z.string({
      required_error: 'Username is required'
    }),

    email: z.string({
      required_error: 'Email is required'
    }).email('Not a valid Email'),

    password: z.string({
      required_error: 'Password is required'
    }).min(8, 'Password is too short - should be min 8 chars'),

    passwordConfirmation: z.string({
      required_error: 'Password conformation is required'
    })
  }).refine((here) => here.password === here.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })

});

export const userVerificationSchema = z.object({
  params: z.object({
    id: z.string(),
    verificationCode: z.string()
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required!'
    }).email('Not a valid email')
  })
});

export const resetPasswordSchema = z.object({

  params: z.object({
    id: z.string(),
    resetPasswordCode: z.string()
  }),

  body: z.object({
    password: z.string({
      required_error: 'Password is required'
    }).min(8, 'Password is too short - should be min 8 chars'),

    passwordConfirmation: z.string({
      required_error: 'Password conformation is required'
    }),

  }).refine((here) => here.password === here.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })

});

export const getUserAccSchema = z.object({
  body: z.object({
    id: z.string()
  })
})

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type UserCreationInput = TypeOf<typeof userCreationSchema>['body'];
export type UserVerificationInput = TypeOf<typeof userVerificationSchema>['params'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

