# Scroll Infinitely

This is the repository for the `scroll-infinitely` package. This package provides functionality for infinite scrolling.

## Installation

To install the package, you can use the following command:

```sh
npm install scroll-infinitely
```

or

```sh
pnpm add scroll-infinitely
```

## Usage

To use the package, you can follow the example below:

```tsx
import { useState } from 'react'
import { ScrollInfinitely } from '../../dist'

function App() {
  const [state, setState] = useState<number[]>(
    Array.from({ length: 100 }, (_, i) => i + 1)
  )

  const handleAction = () => {
    setState(prev => [
      ...prev,
      ...Array.from({ length: 100 }, (_, i) => i + prev.length + 1)
    ])
  }

  return (
    <ScrollInfinitely
      action={handleAction}
      hasMore={state.length < 1000}
      loader={<div>LOADING</div>}
    >
      {state.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </ScrollInfinitely>
  )
}

export default App
```

## Contributing

If you want to contribute to this project, you can follow the steps below:

1. Fork the repository.
2. Clone the repository.
3. Create a new branch.
4. Make your changes.
5. Commit your changes.
6. Push your changes.
7. Create a pull request.

## License

This project is licensed under the MIT license.

## Contact

If you have any questions, feel free to contact the author at [contact@natchi.fr](mailto:contact@natchi.fr) or report an issue [here](https://github.com/Natchii59/scroll-infinitely/issues/new).

For more information, you can visit the documentation [here](https://github.com/Natchii59/scroll-infinitely).
