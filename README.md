# HawAPI - js-sdk

HawAPI SDK for JavaScript/TypeScript

- [API Docs](https://hawapi.theproject.id/docs/)
- [TypeDoc](https://hawapi.github.io/js-sdk/v1/)

## Topics

- [Installation](#installation)
  - [Npm](#npm)
  - [Yarn](#yarn)
  - [Script](#script)
- [Usage](#usage)
  - [Javascript (UMD)](#javascript-umd)
  - [Javascript (ESM)](#javascript-esm)

## Installation

### Npm

```
npm install @hawapi/js-sdk
```

### Yarn

```
yarn add @hawapi/js-sdk
```

### Script

```html
<script src="https://cdn.jsdelivr.net/npm/@hawapi/js-sdk@latest/dist/index.umd.min.js"></script>
```

## Usage

- [See examples](./examples/)

### Javascript (UMD)

```js
const client = HawAPI.createClient();
// Also valid:
// const { createClient } = HawAPI
// const client = createClient()
console.log('HawAPI client: ', client);
```

### Javascript (ESM)

```js
import { createClient } from '<REF>';
const client = createClient();
console.log('HawAPI client: ', client);
```

## Repository template

This repository uses [typescript-library-boilerplate](https://github.com/VitorLuizC/typescript-library-boilerplate) as template.
