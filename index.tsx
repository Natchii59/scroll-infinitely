import * as React from 'react'

type ScrollInfinitelyProps =
  & React.HTMLAttributes<HTMLDivElement>
  & {
    /**
     * The action to perform when the user scrolls to the bottom of the div.
     */
    action: () => void | Promise<void>

    /**
     * A boolean indicating whether there is more content to load. If `false`, the `action` will not be triggered. Defaults to `true`.
     */
    hasMore?: boolean

    /**
     * The component to render while the `action` is being performed.
     */
    loader?: React.ReactNode

    /**
     * The margin from the bottom of the div at which to trigger the `action`. Defaults to '0px'.
     */
    actionMargin?: string
  }

/**
 * `ScrollInfinitely` is a React component that allows you to perform an action when the user scrolls to the bottom of the div.
 *
 * @component
 * @param {Object} props - The properties that define the component.
 * @param {() => void | Promise<void>} props.action - The action to perform when the user scrolls to the bottom of the div.
 * @param {boolean} [props.hasMore] - A boolean indicating whether there is more content to load. If `false`, the `action` will not be triggered. Defaults to `true`.
 * @param {React.ReactNode} [props.loader] - The component to render while the `action` is being performed.
 * @param {string} [props.actionMargin] - The margin from the bottom of the div at which to trigger the `action`. Defaults to '0px'.
 * @returns {React.JSX.Element} The `ScrollInfinitely` component.
 * 
 * @example
 * ```tsx
 * <ScrollInfinitely
 *   action={() => console.log('Scrolled to bottom!')}
 *   loader={<div>Loading...</div>}
 * >
 *   <p>Scroll down...</p>
 * </ScrollInfinitely>
 * ```
*/
const ScrollInfinitely = ({ action, hasMore, loader, actionMargin, children, ...props }: ScrollInfinitelyProps): React.JSX.Element => {
  const observerRef = React.useRef<HTMLDivElement>(null)

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries.some(entry => entry.isIntersecting) && !loading) {
          setLoading(true)

          const result = action()
          if (result instanceof Promise) {
            result.finally(() => {
              setLoading(false)
            })
          } else {
            setLoading(false)
          }
        }
      },
      { threshold: 1, rootMargin: actionMargin }
    )

    if (observerRef.current && hasMore !== false) {
      observer.observe(observerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [action, hasMore, loading, actionMargin])

  return (
    <div {...props}>
      {children}

      {loading ? loader : null}

      <div ref={observerRef} />
    </div>
  )
}

export { ScrollInfinitely, type ScrollInfinitelyProps }
