import z, { TypeOf } from "zod";

export const cardCreationSchema = z.object({

  params: z.object({
    accId: z.string({
      required_error: 'User Account is required'
    })
  }),

  body: z.object({
    cardNumber: z.string({
      required_error: 'Card Number is required'
    }),
    cardTitle: z.union([z.string(), z.undefined()]),
    cardDescription: z.union([z.string(), z.undefined()]),
  }),

});

export type CardCreationInput = TypeOf<typeof cardCreationSchema>;
