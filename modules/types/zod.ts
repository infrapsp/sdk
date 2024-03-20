import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { isValidCpf } from '../../modules/utils/cpf.ts';
import { isValidCnpj } from '../../modules/utils/cnpj.ts';
import { DocumentType } from '../../modules/types/merchant/types.ts';

export const ZodSchemas = {
  datetime: () => z.string().datetime().pipe(z.coerce.date()),
  nanoid: () => z.string().length(21).regex(/^[0-9a-zA-Z_]+/),
  document: () =>
    z.custom<string>((data) => {
      if (typeof data === 'string') {
        if (data.length === 11) {
          return isValidCpf(data);
        } else if (data.length === 14) {
          return isValidCnpj(data);
        }
      } else {
        return false;
      }
    }, { message: 'invalid document' }),
  cpf: () => z.custom<string>((data) => typeof data === 'string' ? isValidCpf(data) : false, { message: 'invalid document' }),
  cnpj: () => z.custom<string>((data) => typeof data === 'string' ? isValidCnpj(data) : false, { message: 'invalid document' }),
  phone: () => z.string().regex(/^\+[0-9]{3,15}/),
};

export const ZodHelpers = {
  issue(ctx: z.RefinementCtx, property: string, message: string) {
    return ctx.addIssue({
      path: [property],
      code: z.ZodIssueCode.custom,
      message,
    });
  },
};

export const ZodRefines = {
  matchDocument: (ctx: z.RefinementCtx, number: string, type: DocumentType) => {
    if (type === DocumentType.CPF && number.length !== 11) {
      ZodHelpers.issue(ctx, 'documentNumber', 'invalid document');
    }

    if (type === DocumentType.CNPJ && number.length !== 14) {
      ZodHelpers.issue(ctx, 'documentNumber', 'invalid document');
    }
  },
};
