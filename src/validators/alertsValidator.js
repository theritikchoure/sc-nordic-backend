const { z } = require("zod");



const createAlertSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  price_signal: z.string().optional().nullable(), // optional and can be null
  criteria: z.enum(["gt", "lt"], {
    required_error: "Criteria is required and must be either 'gt' or 'lt'",
  }),
  value: z.number({
    required_error: "Value is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  phone: z.string({
    required_error: "Phone is required",
  }),
});

module.exports = { createAlertSchema };

