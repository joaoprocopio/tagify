# Plano de desenvolvimento

Este é um projeto B2B voltado a mercadores que utilizam o Shopify para gerenciar seu e-commerce.

## Requisitos não-funcionais

- Utilizar o framework [Next.js](https://nextjs.org)
- Código hospedado no [Github](http://github.com)

## Requisitos funcionais

1. Listagem com todas as tags únicas de produtos.
2. Ver todos os produto para cada tag selecionada.
    - Mostrar também a quantidade total de cada item no inventário.

### Página com listagem das tags únicas dos produtos

Crie uma página com as seguintes funcionalidades, em que:

- Retorna todos os produtos da API de produtos do Shopify.
- Extrai todas as tags únicas dos produtos.
- Mostra a listagem das tags únicas de produtos (e.g. Aerodynamic, Clock, Concrete).
- Permite clicar em uma tag para navegar a correspondente página de listagem de produtos. Por exemplo: /tags/aerodynamic.

### Página com listagem de produtos

Crie uma página para a tag selecionada, em que:

- Lista todos os produtos que tenham uma tag.
- Para cada produto mostra no mínimo:
    - Nome do produto.
    - Quantidade total disponível deste item em todas as variantes disponíveis.

## Acionáveis

> [!WARNING]
> Esta seção está sob construção.

<!-- TODO: expandir e ir mais longe com os acionáveis, tá muito raso no momento corrente; aqui ficarão as tarefas. -->

1. Implementação inicial do App e da API
2. CI/CD e Deploy
3. Design com Solaris
4. Next.js Server Rendered
5. Apresentação do projeto com Tech Show-off

## Acionáveis nice-to-have

> [!WARNING]
> Esta seção está sob construção.

<!--
    TODO: fazer as tarefas que são nice-to-have

    Optional Extra Challenges
    Name your bonus section in the README and go wild:

    - Glow Up Mode
    - Power User Mode
    - Collector Mode
    - Wizard Mode
    - Chaos Mode (for anything we didn’t think of)
-->

## Entrega

A entrega desse projeto consiste nos seguintes passos sendo executados:

1. Uma captura de tela do app mostrando a listagem de tags.
2. Uma captura de tela do app mostrando a página de listagem de produtos ao clicar na tag "Aeroynamic".
3. Link para o repositório do GitHub.
