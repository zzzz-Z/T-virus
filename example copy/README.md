# Vue 3 Alpha Starter Template
This repository contains a simple starter template to experiment with the alpha version of Vue 3! ParcelJS is used to bundler the SPA. Typescript is used to make it easier to explore the new API since there is limited documentation.

**DISCLAIMERS**: 
* Vue just entered alpha so there could be bugs
* Single file components (SFC) are not supported, you must use the `template` option in the component
* The bundle size is not accurate size since we are not using the production build of Vue

## Getting Started
Here are the steps necessary to start experiemnting yourself:
1. Clone this repo

2. Install dependencies

	```bash
	// Using NPM
	$ npm i

	// Using Yarn
	$ yarn
	```

2. Run development server

	```bash
	// Using NPM
	$ npm run dev

	// Using Yarn
	$ yarn dev
	```

3. Build the project (*This will not be an accurate bundle size since we are not using the production build of Vue*)

	```bash
	// Using NPM
	$ npm run build

	// Using Yarn
	$ yarn build
	```

## Documentation
Since Vue 3 is not released there is currently limited documentation on how to use it. Typescript mitgrates this a little bit because it is easier to explore and understand the new API. That being said there are some places to that could be useful:
* [Examples in the Vue 3 source code](https://github.com/vuejs/vue-next/tree/1c4cdd841daa2ba9c1ec35068c92f1ae776cacea/packages/vue/examples)
* [Vue Composition API RFC](https://vue-composition-api-rfc.netlify.com/#summary)
* [Vue 3 RFCs](https://github.com/vuejs/rfcs/tree/master/active-rfcs) and potentially open [pull requests](https://github.com/vuejs/rfcs/pulls)
* [Any sort of unit, integration, or E2E test in the Vue 3 source code](https://github.com/vuejs/vue-next/tree/1c4cdd841daa2ba9c1ec35068c92f1ae776cacea/packages/) (I would start in files that end in `.spec.ts`)

## Production build
If you would like to build the project using the production build change the `alias` field in `package.json` to:
```json
{
	// ...
	"alias": {
		"vue": "./node_modules/vue/dist/vue.esm.prod.js"
	}
}
```
