Thanks for showing interest in contributing to Scroll Infinitely! 🎉

When it comes to open source, there are different ways you can contribute, all
of which are valuable. Here's a few guidelines that should help you as you
prepare your contribution.

## Setup the project

The following steps will get you up and running to contribute to
Scroll Infinitely:

1. Fork the repo (click the <kbd>Fork</kbd> button at the top right of
   [this page](https://github.com/Natchii59/scroll-infinitely)).

2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/scroll-infinitely.git
cd scroll-infinitely
```

3. Setup all the dependencies and packages by running `pnpm install`.
   This command will install dependencies.

4. You can create vite react app in an `example` folder to test the library.

```sh
pnpm create vite example --template react
```

## Development

### Tooling

- [PNPM](https://pnpm.io/) to manage packages and dependencies
- [Changeset](https://github.com/changesets/changesets) for changes
  documentation, changelog generation, and release management.
- [Husky](https://github.com/typicode/husky) for pre-commit hooks.

### Commands

**`pnpm build`**: build the package.

**`pnpm lint`**: check for linting errors.

**`pnpm typecheck`**: check for TypeScript type errors.

**`pnpm format`**: format the code with Prettier.

**`pnpm format:check`**: check if the code is formatted correctly.

### Husky

We use Husky to run linting and type checking before you commit. This ensures a consistent code style and prevents errors.

- **`pre-commit`**: runs `pnpm lint-staged` to check for linting errors.

- **`commit-msg`**: runs `commitlint` to check if your commit message follows the
  [commit convention](#commit-convention).

## Think you found a bug?

Please conform to the issue template and provide a clear path to reproduction
with a code example. The best way to show a bug is by sending a CodeSandbox
link.

The issue template is coming soon...

## Making a Pull Request?

Pull requests are the best way to propose changes to the codebase. We actively
welcome your pull requests.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category: message` in your commit message while using one of the following
categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/

### Steps to PR

1. Fork of the scroll-infinitely repository and clone your fork. (Check the
   [setup section](#setup-the-project) for more information).

2. Create a new branch out of the `master` branch. We follow the convention
   `[type/scope]`. For example `fix/action-loader` or `docs/readme`. `type`
   can be either `docs`, `fix`, `feat`, or any other conventional commit
   type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/Natchii59/scroll-infinitely/blob/main/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `pnpm build` and `pnpm lint` to make sure
   everything works as expected. Husky will run these commands before you commit.

4. Check if you rebase your branch on the latest `master` branch. You can do
   this by running `git pull origin master` and then `git rebase master` on your branch.

5. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli). Check if your branch is up to date with the `master` branch before
   running this command.

### Tests

All commits that fix bugs or add features need a test.

Tests are coming soon...

## License

By contributing your code to the scroll-infinitely GitHub repository, you
agree to license your contribution under the MIT license.
