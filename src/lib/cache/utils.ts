import type { DefaultError, MutationKey, UseMutationOptions } from "@/lib/cache"

export type Namespace = string
export type Definition = Record<Namespace, AnyFn>

export type KeysDefinition<
    TNamespace extends Namespace,
    TDefinition extends Definition,
> = {
    [TDef in keyof TDefinition]: TDefinition[TDef] extends (
        ...args: infer TArgs
    ) => infer TReturn
        ? TReturn extends [...infer Keys]
            ? (...args: TArgs) => readonly [TNamespace, ...Keys]
            : never
        : never
}

export type QueriesDefinition<
    TNamespace extends Namespace,
    TDefinition extends Definition,
> = {
    [TDef in keyof TDefinition]: TDefinition[TDef] extends (
        ...args: infer TArgs
    ) => infer TReturn
        ? TReturn extends { queryKey: readonly [...infer Keys] }
            ? (
                  ...args: TArgs
              ) => TReturn & { queryKey: readonly [TNamespace, ...Keys] }
            : never
        : never
}

export type MutationsDefinition<
    TNamespace extends Namespace,
    TDefinition extends Definition,
> = {
    [TDef in keyof TDefinition]: TDefinition[TDef] extends (
        ...args: infer TArgs
    ) => infer TReturn
        ? TReturn extends { mutationKey: readonly [...infer Keys] }
            ? (
                  ...args: TArgs
              ) => TReturn & { mutationKey: readonly [TNamespace, ...Keys] }
            : never
        : never
}

export type CacheDefinition<
    TNamespace extends Namespace,
    TQueryKeysDefinition extends Definition,
    TMutationKeysDefinition extends Definition,
    TQueriesDefinition extends Definition,
    TMutationsDefinition extends Definition,
> = {
    keys?: {
        queries?: KeysDefinition<TNamespace, TQueryKeysDefinition>
        mutations?: KeysDefinition<TNamespace, TMutationKeysDefinition>
    }
    queries?: QueriesDefinition<TNamespace, TQueriesDefinition>
    mutations?: MutationsDefinition<TNamespace, TMutationsDefinition>
}

export function defineCache<const TNamespace extends Namespace>(_: TNamespace) {
    return function <
        const TQueryKeysDefinition extends Definition,
        const TMutationKeysDefinition extends Definition,
        const TQueriesDefinition extends Definition,
        const TMutationsDefinition extends Definition,
        const TCacheDefinition extends CacheDefinition<
            TNamespace,
            TQueryKeysDefinition,
            TMutationKeysDefinition,
            TQueriesDefinition,
            TMutationsDefinition
        > = CacheDefinition<
            TNamespace,
            TQueryKeysDefinition,
            TMutationKeysDefinition,
            TQueriesDefinition,
            TMutationsDefinition
        >,
    >(cache: TCacheDefinition) {
        return cache
    }
}

export function key<const TKeys extends AnyArray>(...args: TKeys) {
    return args
}

export function mutationOptions<
    TData = unknown,
    TError = DefaultError,
    TVariables = void,
    TContext = unknown,
    TMutationKey = MutationKey,
>(
    options: UseMutationOptions<TData, TError, TVariables, TContext> & {
        mutationKey: TMutationKey
    },
) {
    return options
}

export { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
