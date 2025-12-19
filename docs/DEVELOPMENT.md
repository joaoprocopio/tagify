# Desenvolvimento

Plataforma web construída com Next.  
O sistema operacional que uso é o Debian 13, todo esse guia foi testado somente nessa plataforma usando Linux. O guia assume que você esteja em um sistema baseado em UNIX.

Caso você esteja utilizando em outro sistema operacional como MacOS ou Windows, sua contribuição com o guia de setup é bem vinda.

## Pré-requisitos

- [`nvm`](https://github.com/nvm-sh/nvm): gerenciador de versões do node.
    > [Clique aqui para seguir o guia de instalação dentro da documentação.](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- [`pnpm`](https://pnpm.io/): gerenciador de pacotes eficiente.
    > Para instalar rode o comando: `npm i -g pnpm`
    >
    > A versão correta vai ser instalada conforme a chave `packageManager` no arquivo [`package.json`](../package.json)

## Comandos

> [!IMPORTANT]
> Antes de tudo garanta que todos os [pré-requisitos](#pré-requisitos) foram cumpridos.

### Ative a versão correta do Node

```bash
nvm use
```

### Instale as dependências necessárias

```bash
pnpm install
```

### Insira as variáveis de ambiente necessárias

Esse comando copia o template de variáveis de ambiente.

```bash
cp .env.example .env
```

As únicas variáveis que você precisa preencher são essas:

- `SHOPIFY_ADMIN_GQL_API_URL`
  Você só precisa substituir o slug da variável de ambiente pelo slug da sua loja Shopify.
- `SHOPIFY_ADMIN_ACCESS_TOKEN`
  Para conseguir um access token você precisa criar uma loja, criar um app no painel do Shopify e instalar ele na sua loja.

Recomendo a [criação de uma _dev store_ no dashboard do shopify.dev](https://dev.shopify.com/dashboard/) que já vem com dados úteis para o desenvolvimento.

As outras variáveis de ambiente podem ser utilizas no valor padrão.

### Suba o servidor de desenvolvimento

```bash
pnpm dev
```

Abra este link [http://localhost:3000](http://localhost:3000) no seu browser preferido, e interaja com a aplicação.
