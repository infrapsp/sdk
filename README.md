# InfraPSP SDK

Esse é um módulo privado feito facilitar a integração com as apis do InfraPSP por meio de um client.

Para utilizá-lo é necessário ter em mãos um token do github com permissão para leitura para esse repositório. Para gerar um token, basta seguir as instruções do [próprio github](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

Com o token gerado é necessário exportar a variável de ambiente `DENO_AUTH_TOKENS` no formato abaixo:

```bash
export DENO_AUTH_TOKENS={{ seu_token }}@raw.githubusercontent.com                                                                                                                          
```

Para usar a versão mais recente: 

```typescript
import { InfraPSPClient } from 'https://raw.githubusercontent.com/infrapsp/sdk/main/modules/mod.ts'
```

Para usar uma versão específica:

```typescript
import { InfraPSPClient } from 'https://raw.githubusercontent.com/infrapsp/sdk/0.0.2/modules/mod.ts'
```

