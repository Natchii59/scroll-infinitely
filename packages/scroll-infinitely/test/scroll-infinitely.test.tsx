import { render, waitFor } from '@testing-library/react'
import { mockIntersectionObserver } from 'jsdom-testing-mocks'
import { ScrollInfinitely, type ScrollInfinitelyProps } from '../src'

const io = mockIntersectionObserver()

describe('ScrollInfinitely component', () => {
  const defaultProps: ScrollInfinitelyProps = {
    action: jest.fn(),
    hasMore: true
  }

  it('should render the component', () => {
    const { getByText } = render(
      <ScrollInfinitely {...defaultProps}>Hello World!</ScrollInfinitely>
    )

    expect(getByText('Hello World!')).toBeInTheDocument()
  })

  it('should call the action when the element is intersecting', async () => {
    render(
      <ScrollInfinitely {...defaultProps}>
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>{index}</p>
        ))}
      </ScrollInfinitely>
    )

    await waitFor(() => {
      io.enterAll()
    })

    expect(defaultProps.action).toHaveBeenCalledTimes(1)
  })

  it('should show the loader when the action is being performed', async () => {
    jest.spyOn(defaultProps, 'action').mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(resolve, 1)
      })
    })

    const { queryByTestId } = render(
      <ScrollInfinitely
        {...defaultProps}
        loader={<p data-testid='loader'>Loading...</p>}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>{index}</p>
        ))}
      </ScrollInfinitely>
    )

    await waitFor(() => {
      io.enterAll()
    })

    expect(queryByTestId('loader')).toBeInTheDocument()

    await new Promise(resolve => {
      setTimeout(resolve, 2)
    })

    expect(queryByTestId('loader')).not.toBeInTheDocument()
  })

  it('should show the end component when there is no more data', () => {
    const { queryByTestId, rerender } = render(
      <ScrollInfinitely
        {...defaultProps}
        end={<p data-testid='end'>End of data</p>}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>{index}</p>
        ))}
      </ScrollInfinitely>
    )

    expect(queryByTestId('end')).not.toBeInTheDocument()

    rerender(
      <ScrollInfinitely
        {...defaultProps}
        hasMore={false}
        end={<p data-testid='end'>End of data</p>}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <p key={index}>{index}</p>
        ))}
      </ScrollInfinitely>
    )

    expect(queryByTestId('end')).toBeInTheDocument()
  })

  it('should allow you to customize the component', () => {
    const { getByTestId } = render(
      <ScrollInfinitely
        as='ul'
        {...defaultProps}
        data-testid='scroll-infinitely'
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}>{index}</li>
        ))}
      </ScrollInfinitely>
    )

    expect(getByTestId('scroll-infinitely').tagName).toBe('UL')
  })
})
