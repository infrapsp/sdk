export type ItauProviderConfig = {
  certificateKey: string;
  certificateCrt: string;
  clientId: string;
  clientSecret: string;
  pixKey: string;
  transferPersonDocument: string;
  transferAccountBranch: string;
  transferAccountNumber: string;
  transferAccountType: string;
  transferPersonType: string;
  transferModule: string;
};

export type LogtoProviderConfig = {
  baseUrl: string;
  audience: string;
};
