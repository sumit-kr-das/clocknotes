import { z } from "zod";

const projectEditSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  client: z.string().min(1, {
    message: "client required",
  }),
  isBillable: z
    .boolean({
      required_error: "booleans is required",
    })
    .default(false),
  rate: z.string({
    required_error: "rate required",
  }),
  currencyType: z
    .string({
      required_error: "currency required",
    })
    .default("USD"),
  color: z.string({
    required_error: "color required",
  }),
});
export default projectEditSchema;
