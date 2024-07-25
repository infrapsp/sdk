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
    }, { message: 'Invalid document' }),
  cpf: () => z.custom<string>((data) => typeof data === 'string' ? isValidCpf(data) : false, { message: 'Invalid document' }),
  cnpj: () => z.custom<string>((data) => typeof data === 'string' ? isValidCnpj(data) : false, { message: 'Invalid document' }),
  alphanumeric: () => z.string().regex(/^[0-9a-zA-Z ]+$/),
  numeric: () => z.string().regex(/^[0-9]+$/),
  phone: () => z.string().regex(/^\+[0-9]{3,15}$/),
  name: () => z.string().regex(/^([ \u00c0-\u01ffa-zA-Z'\-])+$/i, 'Special characters are not allowed').min(5).max(50),
  companyName: () => z.string().regex(/^[A-Z]([a-zA-Z0-9]|[- \._&])*$/i, 'Special characters are not allowed').min(5).max(320),
  stringArray: <T extends z.ZodType>(e: T) => z.preprocess((val) => String(val ?? '').split(','), z.array(e)),
  booleanString: () => z.string().transform((data) => JSON.parse(data)).pipe(z.boolean()),
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
      ZodHelpers.issue(ctx, 'documentNumber', 'Invalid document');
    }

    if (type === DocumentType.CNPJ && number.length !== 14) {
      ZodHelpers.issue(ctx, 'documentNumber', 'Invalid document');
    }
  },

  validDateRange(ctx: z.RefinementCtx, from: Date, to: Date, maximumRangeMs: number, fieldName?: string) {
    const range = to.getTime() - from.getTime();

    if (range < 0) {
      ZodHelpers.issue(ctx, fieldName ?? '', 'LTE date should be greater than GTE');
    }

    if (range > maximumRangeMs) {
      ZodHelpers.issue(ctx, fieldName ?? '', 'Date range surpasses maximum range of ' + maximumRangeMs + 'ms');
    }
  },

  hasCompanyData(ctx: z.RefinementCtx, companyName: string | undefined | null, documentType: DocumentType, fieldName?: string) {
    if (companyName && documentType === DocumentType.CPF) {
      ZodHelpers.issue(ctx, fieldName ?? '', 'Cannot be set for documentType cpf.');
    }
    if (!companyName && documentType === DocumentType.CNPJ) {
      ZodHelpers.issue(ctx, fieldName ?? '', 'Required for documentType cnpj.');
    }
  },
};
