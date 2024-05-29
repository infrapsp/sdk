import ttlcache from 'npm:@isaacs/ttlcache@1.4.1';
import { AsyncResult } from '../../modules/types/result.ts';
import { isError } from '../../modules/errors/is_error.ts';

export class Memcache {
  private cache: ttlcache<string, unknown>;

  constructor(opts: { maxTtl: number }) {
    this.cache = new ttlcache({
      checkAgeOnGet: true,
      ttl: opts.maxTtl,
    });
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  set<T>(key: string, value: T, ttl?: number): void {
    this.cache.set(key, value, { ttl });
  }

  del(key: string): void {
    this.cache.delete(key);
  }

  async getset<T>(key: string, fallbackFn: () => AsyncResult<T>, ttl?: number): AsyncResult<T | undefined> {
    const cached = this.get<T>(key);
    if (cached) {
      return cached;
    }

    const result = await fallbackFn();

    if (isError(result)) return result;

    this.set(key, result, ttl);
    return result;
  }
}
