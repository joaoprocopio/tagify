# Desenvolvimento

Plataforma web construída com Next.

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

### Suba o servidor de desenvolvimento

```bash
pnpm dev
```

Abra este link [http://localhost:3000](http://localhost:3000) no seu browser preferido, e interaja com a aplicação.
