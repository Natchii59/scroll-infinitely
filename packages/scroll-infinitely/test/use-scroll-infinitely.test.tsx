import * as React from 'react'
import { render, renderHook, waitFor } from '@testing-library/react'
import { mockIntersectionObserver } from 'jsdom-testing-mocks'
import { useScrollInfinitely, type ScrollInfinitelyOptions } from '../src'

const io = mockIntersectionObserver()

describe('useScrollInfinitely hook', () => {
  const observerRef = React.createRef<HTMLDivElement>()

  const defaultOptions: ScrollInfinitelyOptions = {
    observerRef,
    action: jest.fn(),
    hasMore: true
  }

  it('should return the initial values', () => {
    const { result } = renderHook(() => useScrollInfinitely(defaultOptions))
    const { loading } = result.current

    expect(loading).toBeFalsy()
  })

  it('should call the action when the element is intersecting', async () => {
    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    renderHook(() => useScrollInfinitely(defaultOptions))

    await waitFor(() => {
      io.enterNode(getByTestId('observer'))
    })

    expect(defaultOptions.action).toHaveBeenCalledTimes(1)
  })

  it('should not call the action when the element is not intersecting', async () => {
    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    renderHook(() => useScrollInfinitely(defaultOptions))

    await waitFor(() => {
      io.leaveNode(getByTestId('observer'))
    })

    expect(defaultOptions.action).not.toHaveBeenCalled()
  })

  it('should not call the action when the element is intersecting but has no more data', async () => {
    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    renderHook(() => useScrollInfinitely({ ...defaultOptions, hasMore: false }))

    await waitFor(() => {
      io.enterNode(getByTestId('observer'))
    })

    expect(defaultOptions.action).not.toHaveBeenCalled()
  })

  it('should not call the action when the observer is not set', async () => {
    renderHook(() =>
      useScrollInfinitely({ ...defaultOptions, observerRef: { current: null } })
    )

    await waitFor(() => {
      io.enterAll()
    })

    expect(defaultOptions.action).not.toHaveBeenCalled()
  })

  it('should set the loading state to true when the action is called', async () => {
    jest.spyOn(defaultOptions, 'action').mockImplementationOnce(() => {
      return new Promise(resolve => {
        setTimeout(resolve, 1)
      })
    })

    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    const { result } = renderHook(() => useScrollInfinitely(defaultOptions))

    await waitFor(() => {
      io.enterNode(getByTestId('observer'))
    })

    expect(result.current.loading).toBeTruthy()
  })

  it('should set the loading state to false when the action is resolved', async () => {
    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    const { result } = renderHook(() => useScrollInfinitely(defaultOptions))

    await waitFor(() => {
      io.enterNode(getByTestId('observer'))
    })

    expect(result.current.loading).toBeFalsy()
  })

  it('should set the loading state to false when the action is rejected', async () => {
    jest
      .spyOn(defaultOptions, 'action')
      .mockRejectedValueOnce('An error occurred')

    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    const { result } = renderHook(() => useScrollInfinitely(defaultOptions))

    await waitFor(() => {
      io.enterNode(getByTestId('observer'))
    })

    expect(result.current.loading).toBeFalsy()
  })

  it('should set the loading state to false when the action is finally resolved after a delay', async () => {
    jest.spyOn(defaultOptions, 'action').mockImplementationOnce(() => {
      return new Promise(resolve => {
        setTimeout(resolve, 1)
      })
    })

    const { getByTestId } = render(
      <div ref={observerRef} data-testid='observer' />
    )

    const { result } = renderHook(() => useScrollInfinitely(defaultOptions))

    await waitFor(() => {
      io.enterNode(getByTestId('observer'))
    })

    expect(result.current.loading).toBeTruthy()

    await new Promise(resolve => {
      setTimeout(resolve, 2)
    })

    expect(result.current.loading).toBeFalsy()
  })
})
