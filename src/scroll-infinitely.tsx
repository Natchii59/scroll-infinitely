import * as React from 'react'
import {
  useScrollInfinitely,
  type ScrollInfinitelyOptions
} from './use-scroll-infinitely'

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
 * @template E - The type of the root element. Defaults to `div`.
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
 * @component
 * @param {Object} props - The properties that define the component.
 * @param {React.ElementType} [props.as] - The element type to render as. Defaults to 'div'.
 * @param {() => void | Promise<void>} props.action - The action to perform when the user scrolls to the bottom of the scrollable content.
 * @param {boolean} [props.hasMore] - A boolean indicating whether there is more content to load. If `false`, the `action` will not be triggered.
 * @param {React.ReactNode} [props.loader] - The component to render while the `action` is being performed.
 * @param {number} [props.threshold] - The threshold in the range `[0, 1]`. When the user scrolls to this percentage of the bottom of the scrollable content, the `action` will be triggered. Defaults to `1`.
 * @param {string} [props.thresholdMargin] - The margin in CSS units. When the user scrolls within this margin from the bottom of the scrollable content, the `action` will be triggered. Defaults to `'0px'`.
 * @param {React.ReactNode} [props.end] - The component to render at the end of the scrollable content.
 * @returns {React.JSX.Element} The `ScrollInfinitely` component.
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
const ScrollInfinitely = <E extends React.ElementType = typeof defaultElement>({
  as,
  action,
  children,
  hasMore,
  loader,
  threshold = 1,
  thresholdMargin = '0px',
  end,
  ...props
}: ScrollInfinitelyProps<E>): React.JSX.Element => {
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
