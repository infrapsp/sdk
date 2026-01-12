import { AsyncResult } from '../../../modules/types/result.ts';
import { validateResponse } from '../../../modules/infrapsp/validate_response.ts';
import type { HttpClient } from '../../../modules/http/http_client.ts';
import { TagResponseDto } from '../../../modules/types/tag/tag_response.ts';

export class TagHandler {
  private readonly basePath = '/v1/tags';

  constructor(private readonly httpClient: HttpClient) {}

  async findMany(requestInit: RequestInit = {}): AsyncResult<TagResponseDto[]> {
    const url = this.basePath;

    const response = await this.httpClient.get(url, requestInit);

    const data = await response.json();

    return validateResponse({ data, status: response.status });
  }
}
