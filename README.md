# @favi_ty/babel-plugin-esm-pikacdn

## Installation

```
yarn add -D @favi_ty/babel-plugin-esm-pikacdn
```

## Usage

```js
"plugins": ["@favi_ty/babel-plugin-esm-pikacdn"]
```

## In

```js
import { Component, render } from "preact";
```

## Out

```js
import { Component, render } from "https://cdn.pika.dev/preact/8.5.2";
```

# Feature

transform import-path to url format that can be fetched from [PikaCDN](https://www.pika.dev/cdn)

- **only** the modules that exist in the `import-map` generated by [snowpack](https://www.snowpack.dev/#import-maps)
- apply the version of `package.json`
