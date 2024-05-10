export interface WebhookInPayload<T> {
  data: T;
  meta: {
    ip: string;
    provider: string;
    userAgent: string;
  };
}

export interface WebhookOutPayload<T> {
  id: string;
  event: string;
  data: T;
  meta: {
    url: string;
  };
}
