# HawAPI - js-sdk

HawAPI SDK for JavaScript/TypeScript

- [API Docs](https://hawapi.theproject.id/docs/)
- [TypeDoc](https://hawapi.github.io/js-sdk/v1/)

## Topics

- [Installation](#installation)
  - [Npm](#npm)
  - [Yarn](#yarn)
  - [Cdn](#cdn)
- [Usage](#usage)
  - [Init](#init-client)
    - [Javascript (UMD)](#javascript-umd)
    - [Javascript (ESM)](#javascript-esm)
  - [Error handling](#error-handling)
    - [Then/Catch](#thencatch)
    - [Try/Catch](#trycatch)

## Installation

### Npm

```
npm install @hawapi/js-sdk
```

### Yarn

```
yarn add @hawapi/js-sdk
```

### Cdn

```html
<script src="https://cdn.jsdelivr.net/npm/@hawapi/js-sdk/dist/index.umd.min.js"></script>
```

## Usage

- [See examples](./examples/)

### Init client

#### Javascript (UMD)

```js
const client = HawAPI.createClient();
// Also valid:
// const { createClient } = HawAPI
// const client = createClient()
console.log('HawAPI client: ', client);
```

#### Javascript (ESM)

```js
import { createClient } from '<path>';
const client = createClient();
console.log('HawAPI client: ', client);
```

### Error handling

#### Then/Catch

```js
const result = client
  .getAll('actors')
  .then((data) => data)
  .catch((err) => console.error(err));
```

#### Try/Catch

```js
let result;
try {
  result = await client.getAll('actors');
} catch (err) {
  console.error(err);
}
```

## Repository template

This repository uses [typescript-library-boilerplate](https://github.com/VitorLuizC/typescript-library-boilerplate) as template.
