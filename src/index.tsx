import * as React from 'react'

type PolymorphicAsProp<E extends React.ElementType> = {
  /**
   * The element type to render as. Defaults to 'div'.
   */
  as?: E
}

type PolymorphicProps<E extends React.ElementType> =
  React.ComponentPropsWithoutRef<E> & PolymorphicAsProp<E>

const defaultElement = 'div'

/**
 * Props for the ScrollInfinitely component.
 *
 * @template E - The type of the root element. Defaults to `typeof defaultElement`.
 */
type ScrollInfinitelyProps<
  E extends React.ElementType = typeof defaultElement
> = PolymorphicProps<E> & {
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
   * The threshold in the range `[0, 1]`. When the user scrolls to this percentage of the div, the `action` will be triggered. Defaults to `1`.
   */
  threshold?: number

  /**
   * The threshold margin in CSS units. When the user scrolls within this margin from the bottom of the div, the `action` will be triggered.
   */
  thresholdMargin?: string

  /**
   * The component to render at the end of the scrollable content.
   */
  end?: React.ReactNode
}

/**
 * `ScrollInfinitely` is a React component that allows you to perform an action when the user scrolls to the bottom of the div.
 *
 * @component
 * @param {Object} props - The properties that define the component.
 * @param {React.ElementType} [props.as] - The element type to render as. Defaults to 'div'.
 * @param {() => void | Promise<void>} props.action - The action to perform when the user scrolls to the bottom of the div.
 * @param {boolean} [props.hasMore] - A boolean indicating whether there is more content to load. If `false`, the `action` will not be triggered. Defaults to `true`.
 * @param {React.ReactNode} [props.loader] - The component to render while the `action` is being performed.
 * @param {number} [props.threshold] - The threshold in the range `[0, 1]`. When the user scrolls to this percentage of the div, the `action` will be triggered. Defaults to `1`.
 * @param {string} [props.thresholdMargin] - The margin in CSS units. When the user scrolls within this margin from the bottom of the div, the `action` will be triggered.
 * @param {React.ReactNode} [props.end] - The component to render at the end of the scrollable content.
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
const ScrollInfinitely = <E extends React.ElementType = typeof defaultElement>({
  as,
  action,
  children,
  hasMore,
  loader,
  threshold,
  thresholdMargin,
  end,
  ...props
}: ScrollInfinitelyProps<E>): React.JSX.Element => {
  const observerRef = React.useRef<HTMLDivElement>(null)

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async entries => {
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
      { threshold: threshold ?? 1, rootMargin: thresholdMargin }
    )

    if (observerRef.current && hasMore !== false) {
      observer.observe(observerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [action, hasMore, loading, threshold, thresholdMargin])

  const Component = as ?? defaultElement

  return (
    <Component {...props}>
      {children}

      {loading ? loader : null}

      {hasMore === false ? end : <div ref={observerRef} />}
    </Component>
  )
}

export { ScrollInfinitely, type ScrollInfinitelyProps }
