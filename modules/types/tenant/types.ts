export type ItauProviderConfig = {
  certificateKey: string;
  certificateCsr: string;
  clientId: string;
  clientSecret: string;
  pixKey: string;
};

export type LogtoProviderConfig = {
  baseUrl: string;
  audience: string;
};
