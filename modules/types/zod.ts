import { z } from 'https://deno.land/x/zod@v3.23.4/mod.ts';
import { isValidCpf } from '../../modules/utils/cpf.ts';
import { isValidCnpj } from '../../modules/utils/cnpj.ts';
import { DocumentType } from '../../modules/types/merchant/types.ts';

export const ZodSchemas = {
  datetime: () => z.string().datetime().pipe(z.coerce.date()).or(z.date()),
  nanoid: () => z.string().length(21).regex(/^[0-9a-zA-Z_]+$/),
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
  alphanumeric: () => z.string().regex(/^[0-9a-zA-Z]+$/),
  numeric: () => z.string().regex(/^[0-9]+$/),
  phone: () => z.string().regex(/^\+[0-9]{3,15}$/),
  name: () => z.string().regex(/^([ \u00c0-\u01ffa-zA-Z'\-])+$/i, 'special characters are not allowed').min(5).max(50),
  stringArray: <T extends z.ZodType>(e: T) => z.preprocess((val) => String(val ?? '').split(','), z.array(e)),
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

  validDateRange(ctx: z.RefinementCtx, from: Date, to: Date, maximumRangeMs: number, fieldName?: string) {
    const range = to.getTime() - from.getTime();

    if (range < 0) {
      ZodHelpers.issue(ctx, fieldName ?? '', 'LTE date should be greater than GTE');
    }

    if (range > maximumRangeMs) {
      ZodHelpers.issue(ctx, fieldName ?? '', 'date range surpasses maximum range of ' + maximumRangeMs + 'ms');
    }
  },

  hasCompanyData(ctx: z.RefinementCtx, companyName: string | undefined | null, documentType: DocumentType) {
    if (companyName && documentType === DocumentType.CPF) {
      ZodHelpers.issue(ctx, 'companyName', 'Cannot be set for documentType cpf.');
    }
    if (!companyName && documentType === DocumentType.CNPJ) {
      ZodHelpers.issue(ctx, 'companyName', 'Required for documentType cnpj.');
    }
  },
};
