import z from 'https://deno.land/x/zod@v3.23.4/mod.ts';

export const UpdateExternalAuthProfileRequestSchema = z.object({
  email: z.string().email(),
});
