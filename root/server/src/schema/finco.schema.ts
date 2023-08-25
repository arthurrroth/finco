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
    cardDesign: z.string({
      required_error: 'A Card Design is required'
    }),
    spendingLimit: z.union([z.number(), z.undefined()])

  }),

});

export const txCreationSchema = z.object({

  params: z.object({
    cardNumber: z.string({
      required_error: 'Card Number is required'
    })
  }),

  body: z.object({
    amount: z.string(),
    category: z.string(),
    transactionType: z.string(),
    date: z.string(),
    time: z.string()
  })
});

export type TxCreationInput = TypeOf<typeof txCreationSchema>;
export type CardCreationInput = TypeOf<typeof cardCreationSchema>;

// amount, category, transactionType, date, time 
