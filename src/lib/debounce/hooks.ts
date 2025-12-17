import * as React from "react"

// 166ms = 10 frames at 60 Hz
export const useDebouncedFn = <Fn extends (...args: Parameters<Fn>) => void>(
    fn: Fn,
    wait = 166,
): ((...args: Parameters<Fn>) => void) => {
    const rafId = React.useRef(0)

    const render = React.useCallback(
        (...args: Parameters<Fn>) => {
            cancelAnimationFrame(rafId.current)

            const timeStart = performance.now()

            const renderFrame = (timeNow: number) => {
                if (timeNow - timeStart < wait) {
                    rafId.current = requestAnimationFrame(renderFrame)
                    return
                }

                fn(...args)
            }

            rafId.current = requestAnimationFrame(renderFrame)
        },
        [fn, wait],
    )

    React.useEffect(() => () => cancelAnimationFrame(rafId.current), [])

    return render
}
