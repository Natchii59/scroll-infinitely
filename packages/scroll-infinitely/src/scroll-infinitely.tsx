import * as React from 'react'
import {
  useScrollInfinitely,
  type ScrollInfinitelyOptions
} from './use-scroll-infinitely'

interface PolymorphicAsProp<E extends React.ElementType> {
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
 */
type ScrollInfinitelyProps<
  E extends React.ElementType = typeof defaultElement
> = PolymorphicProps<E> &
  ScrollInfinitelyOptions & {
    /**
     * The component to render while the `action` is being performed.
     */
    loader?: React.ReactNode

    /**
     * The component to render at the end of the scrollable content.
     */
    end?: React.ReactNode
  }

/**
 * `ScrollInfinitely` is a React component that allows you to perform an action when the user scrolls to the bottom of a scrollable content area.
 *
 * @param props - The properties that define the component.
 * @returns The `ScrollInfinitely` component.
 *
 * @example
 * ```tsx
 * <ScrollInfinitely
 *   action={() => console.log('Scrolled to bottom!')}
 *   hasMore={true}
 * >
 *   <p>Scroll down...</p>
 * </ScrollInfinitely>
 * ```
 */
function ScrollInfinitely<E extends React.ElementType = typeof defaultElement>({
  as,
  action,
  children,
  hasMore,
  loader,
  threshold = 1,
  thresholdMargin = '0px',
  end,
  ...props
}: ScrollInfinitelyProps<E>): React.JSX.Element {
  const { observerRef, loading } = useScrollInfinitely({
    action,
    hasMore,
    threshold,
    thresholdMargin
  })

  const Component = as ?? defaultElement

  return (
    <Component {...props}>
      {children}

      {loading ? loader : null}

      {!hasMore ? end : <div ref={observerRef} />}
    </Component>
  )
}

export { ScrollInfinitely, type ScrollInfinitelyProps }
