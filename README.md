# Project description

This is a template for creating a Node.js package. It is meant to be used as a starting point for new projects which are intended to be published to npm (or a custom registry) and used as a dependency in other projects (e.g. a library).

You are free to do whatever you want with this template. If you find it useful, please consider starring ⭐ the repository or supporting it in some other way. Attribution is not required, but appreciated.

This repository is based on https://github.com/RobertBarachini/npm-package-template

Last update: Fri Mar 31 2023 19:22:37 GMT+0200 (Central European Summer Time)

# Template usage

Initial setup:

1. Clone the repository
2. Remove `.git` folder and initialize a new one with `git init -b main`
3. Update `package.json` with your project details
4. Rename default names in files / configs to suit your needs.
5. Delete unused files / configs

Have fun `:^)`!

# Guidelines

## Code style

Project is defined as a TypeScript project, but you can also use plain JavaScript. TypeScript is used at build time to transpile the code to CommonJS and ES6 modules, which can be easily required / imported in other projects.

Code uses `ES6` syntax (`"type": "module"` in package.json). It is recommended to use `const` and `let`. Use arrow functions. Function declarations using the `function` keyword is discouraged (hoisting can cause issues and decreases readability).

It is also suggested you use good coding practices, such as early returns, avoiding nested if statements, etc.

## Commit messages

Commit messages should be short and descriptive. They should be written in the imperative mood. Example:

```sh
git commit -m "Add new feature"
```

Commit messages should be written in English. Try to avoid implementing multiple changes / functionalities if not necessary (could be needed for certain situations, such as major changes and refactoring).

## import / export

Imports should occur at the top of the file.

Exports should occur at the bottom of the file in the following pattern:

```js
export { foo, bar, baz }
```

or

```js
export default foo
```

NOTE: Linting doen't play nicely with imports (still broken for some reason). Node.js path aliases are not recognized as valid imports either. This is a known issue and will be fixed in the future.

# Development

It is recommended that you use VS Code as your editor as it provides a seamless development experience (even on remotes) without the need for any additional programs. It has built-in support for ESLint and Prettier. It also has a built-in debugger. If you are developing natively, and have enabled 'smart' auto-attach, the debugged is automatically attached to the running process.

## Native

If you wish to run the project natively, you will need to install Node.js and npm. It is also suggested that you use pnpm instead of npm (it has many advantages). You can install it using `npm install -g pnpm` or natively (check their website).

### Install dependencies

```sh
pnpm install
```

# Scripts (npm)

Not all of the scripts are listed here. Just the main ones you might want to consider.

- `prepack` - runs before the package is packed and published (runs `npm run build`)
- `build` - builds the project (creates the CommonJS and ES6 libraries in the `dist/` folder)
- `start` - builds and runs the project at `dist/lib/mjs/src/index.js`
- `test` - runs the unit tests
- `lint` - runs ESLint

# Testing

## Unit tests

Testing is done using the Mocha framework. It is recommended you put unit tests in the same folder as the file you are testing. For example, if you are testing `src/server/index.js`, you should put the test in `src/server/index.test.js`.

# Publishing

## Publishing to npm

Publishing to other registries works similarly, without some npm specifics.

To publish to npm, you will need to create an account on npmjs.com.

### Publishing a new version

If you want to check how the package will look before publishing, you can run `pnpm pack` which will create a tarball in the root directory of the project. You can inspect the contents of the tarball by running `tar -xvf <tarball_name> -C destination/path`. You can also install the package locally by running `npm install <tarball_name>`.

Anotehr way of simulating the publishing process is to run `pnpm publish --dry-run`. This will simulate the publishing process, but will not actually publish the package.

If you are using scoped packages, you will need to add the scope to the name in `package.json` (e.g. `@scope/package-name`). Scoped packages are private by default, so you may want to use the `--access public` flag when publishing. Access is also controlled by the `private` field in `package.json`. Private packages will not be published to the registry.

1. Update the version by running `npm version <major|minor|patch>` or `npm version <version_number>` which should usually follow semantic versioning. This will update the version in `package.json` and create a git tag. If you don't want to create a git tag, you can use `npm version <major|minor|patch> --no-git-tag-version`.
2. Commit the changes
3. Login to npm using `npm login`
4. Publish the package using `npm publish`
5. Push the changes to the remote repository

It is also a good practice to test if your package works as intended after publishing. You can do this by creating a new project and installing your package from the registry.

# Project structure

- `src/` - source code
- `src/scripts/` - scripts (build, ...)
- `src/utils/` - utilities
  - It is recommended to use ustils (especially makeRequest) as it provides a unified way of handling errors and responses. Suggested import: `import { makeRequest } from '#utils/requests.js'`. Project uses path aliases, so you can use `#utils/requests.js` instead of `../../utils/requests.js`. Try to avoid using child paths (`../..`) as it makes it harder to move files around.

# Keywords:

- nodejs
- template
- typescript
- ES6
- commonjs
- eslint
- prettier
- development
- production
- testing
- debug
- mocha

# Rant about path resolution and imports

Language designers are really forcing my hand with the lack of support for consistent path resolution on imports... Having to use package.json "imports" field for supporting path aliases for classic JS, then having to use "paths" in tsconfig.json and additionally having to copy them to each respective dist/ out folder's package.json is really something else. Additionally if you use imports like "#utils/demoJS.js", the code will work, however the linter will complain about it. If we appease the linting and inference gods we still have to deal with broken type declarations. The project supports writing the code in classic ES6 ("type": "module") and TypeScript and is then transpiled to /cjs/ which uses "type":"commonjs" and /mjs/ which uses "type":"module" and EVERYTHING JUST WORKS (for the most part). You can import this as a library into your CommonJS project, by using require and it will correctly source from /cjs/ build output. Similarly if you're using ES6 modules, you can import the library without any problems. Additionally you can import the library into your TypeScript project and you will get all the goodies such as type inference, ... HOWEVER - only if you NEVER use any subpath imports / path aliasing or whichever related term you want to use for mapping file paths. Why is this broken? Well because the language designers decided, that correctly resolving paths is not a worthwhile feature even though countless issues have been opened and hundreds of people have voiced their support for implementing this (as a compilation flag, a plugin, or an officially supported package). Currently the only way of resolving paths in the dist/ build directory is to run some post-processing using Babel or some other custom library / plugin which seems really backwards when wanting to write clean code and maintaining a single source of truth when defining path aliases. On that note - why can't tsconfig.json use the same "paths" field as package.json "imports" field or source from it if we enter some additional config? Why do we have to copy the same paths in two different places (minimally) just to get the same functionality working... If we don't duplicate the imports then we may have broken imports with JavaScript or with TypeScript (respectively).

Related issues:

- https://github.com/microsoft/TypeScript/issues/15479
- https://github.com/Microsoft/TypeScript/issues/5039
- https://github.com/microsoft/TypeScript/issues/25677

Also import file extensions (or their omission) is unintuitive: https://github.com/microsoft/TypeScript/issues/40878 ; TL;DR: you need to reference the file extension that will be present after the file is transpiled... If you want to import two.ts into one.ts you will need to `import \* as sth from './two.js'` not `'./two.ts'`, as it exists in the current state... This is really unintuitive. Additionally - TypeScript language design is forcing (forcefully suggesting) importing without extensions (`'./two'`), however this is once again a broken import on the transpiled side, as there are no 'two' files - only 'two.js'... How are basic paths not automatically resoled when specifying the output with es2015 or something is beyond me. This should absolutely be a bug, as we get no errors on compilation, but the code is broken at runtime. What's the point of having a compiler and build steps if it doesn't catch (and solve) these things?

Possible workarounds:

- https://github.com/justkey007/tsc-alias
- https://www.npmjs.com/package/typescript-transform-paths
- https://github.com/dividab/tsconfig-paths
- https://github.com/dropbox/ts-transform-import-path-rewrite
- https://stackoverflow.com/questions/53647638/simple-absolute-import-causing-cannot-find-module-error/53691493#53691493
- https://github.com/ezolenko/rollup-plugin-typescript2/issues/201
- https://www.devxperiences.com/pzwp1/2021/11/21/how-to-solve-the-problem-with-typescript-unresolved-path-aliases-in-transpiled-js-files/
- https://www.npmjs.com/package/tsconfig-paths

Accepted workaround (for now the simplest solution):

- https://github.com/justkey007/tsc-alias

# TODO

- [x] Write a README.md
- [x] Test installation and usage in
  - [x] CommonJS
  - [x] ES6
  - [x] TypeScript
- [x] Extend README.md
- [ ] Extend template
