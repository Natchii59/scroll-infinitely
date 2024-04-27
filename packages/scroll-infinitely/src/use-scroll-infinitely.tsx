import * as React from 'react'

/**
 * Options for the useScrollInfinitely hook.
 */
interface ScrollInfinitelyOptions {
  /**
   * The action to perform when the user scrolls to the bottom of the scrollable content.
   */
  action: () => void | Promise<void>

  /**
   * A boolean indicating whether there is more content to load. If `false`, the `action` will not be triggered.
   */
  hasMore: boolean

  /**
   * The threshold in the range `[0, 1]`. When the user scrolls to this percentage of the bottom of the scrollable content, the `action` will be triggered. Defaults to `1`.
   */
  threshold?: number

  /**
   * The margin in CSS units. When the user scrolls within this margin from the bottom of the scrollable content, the `action` will be triggered. Defaults to `'0px'`.
   */
  thresholdMargin?: string
}

/**
 * Represents a hook for implementing infinite scrolling behavior.
 */
interface ScrollInfinitelyHook<E extends HTMLElement> {
  /**
   * The reference to the observer element.
   */
  observerRef: React.RefObject<E>

  /**
   * A boolean indicating whether the action is currently being performed.
   */
  loading: boolean
}

/**
 * Custom React hook for implementing infinite scrolling behavior.
 *
 * @param options - The options for configuring the infinite scrolling behavior.
 * @returns An object containing the observer reference and loading state.
 */
function useScrollInfinitely<E extends HTMLElement = HTMLDivElement>(
  options: ScrollInfinitelyOptions
): ScrollInfinitelyHook<E> {
  const {
    action,
    hasMore = true,
    threshold = 1,
    thresholdMargin = '0px'
  } = options

  const observer = React.useRef<IntersectionObserver | null>(null)
  const observerRef = React.useRef<E>(null)

  const [loading, setLoading] = React.useState(false)

  const observerCallback = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries.some(entry => entry.isIntersecting)) {
        setLoading(true)

        const result = action()
        void Promise.resolve(result).finally(() => {
          setLoading(false)
        })
      }
    },
    [action]
  )

  React.useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin: thresholdMargin
    })

    return () => {
      observer.current?.disconnect()
    }
  }, [observerCallback, threshold, thresholdMargin])

  React.useEffect(() => {
    if (observerRef.current && hasMore && !loading) {
      observer.current?.observe(observerRef.current)
    }

    return () => {
      observer.current?.disconnect()
    }
  }, [observer, observerRef, hasMore, loading])

  return {
    observerRef,
    loading
  }
}

export { useScrollInfinitely, type ScrollInfinitelyOptions }
