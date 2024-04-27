<h1 align="center">Scroll Infinitely</h1>
<br />

<p align="center">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/scroll-infinitely">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/scroll-infinitely">
  <a href="https://github.com/Natchii59/scroll-infinitely/blob/master">
    <img alt="Static Badge" src="https://img.shields.io/badge/PRs-welcome-brightgreen">
  </a>
</p>

<br />

Scroll Infinitely is a lightweight and easy-to-use library that allows you to create infinite scrolling pages with ease. It is built with TypeScript and has no dependencies.

## Table of contents

- [Documentation](#documentation)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Documentation

You can find the full documentation [here](https://github.com/Natchii59/scroll-infinitely/blob/master/README.md).

A website with the documentation is coming soon...

## Features

- **Lightweight**: The library is very lightweight and has no dependencies.
- **Easy to use**: The library is very easy to use and has a simple API.
- **Customizable**: You can customize the library to fit your needs.
- **Built with TypeScript**: The library is built with TypeScript and has type definitions.
- **Inverse scrolling**: You can also use inverse scrolling with the library.

## Installation

To use Scroll Infinitely, all you need to do is install the `scroll-infinitely` package.

```sh
# Using npm
npm install scroll-infinitely

# Using yarn
yarn add scroll-infinitely

# Using pnpm
pnpm add scroll-infinitely
```

## Usage

Here is a simple example of how you can use Scroll Infinitely:

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
```

## Contributing

Feel like contributing? That's awesome! We have a
[contributing guide](https://github.com/Natchii59/scroll-infinitely/blob/master/CONTRIBUTING.md) to help guide you.

## License

Scroll Infinitely is licensed under the [MIT License](https://github.com/Natchii59/scroll-infinitely/blob/master/LICENSE.md).
