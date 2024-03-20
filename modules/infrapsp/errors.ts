import { CommonError, ErrorObject } from '../../modules/errors/common_error.ts';

type InfraPSPClientErrorCodes = 'INFRAPSP_CLIENT_ERROR';

export class InfraPSPClientError<T> extends CommonError<InfraPSPClientErrorCodes> {
  constructor(object: ErrorObject<InfraPSPClientError<T>>) {
    super(object);
  }
}
