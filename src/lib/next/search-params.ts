import { isArray, isNil } from "@/utils/is"
import { SearchParams } from "next/dist/server/request/search-params"

export function convertNextSearchParams(
    searchParams: SearchParams,
): URLSearchParams {
    const convertedSearchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(searchParams)) {
        if (isNil(value)) {
            continue
        }

        if (isArray(value)) {
            // nota 1: `innerValue` por que o valor é uma coleção.
            // nota 2: normalmente for dentro de for me causa arrepios
            //         mas nesse caso estaremos sempre tratando de coleções pequenas, logo,
            //         não faz diferença se a complexidade é linear (O(n)) ou quadrática (O(n^2)),
            //         não há impacto significante na performance.
            for (const innerValue of value) {
                convertedSearchParams.append(key, innerValue)
            }
            continue
        }

        convertedSearchParams.set(key, value)
    }

    return convertedSearchParams
}
