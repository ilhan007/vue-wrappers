# Vue 3 Wrapper for UI5 Web Components

TypeScript wrapper utility for seamless integration of UI5 Web Components in Vue 3.

## Features

- ✅ **TypeScript Support** - Component-specific props with autocomplete
- ✅ **v-model Binding** - Configurable two-way data binding
- ✅ **slot Forwarding** - Automatic slot mapping to web components
- ✅ **Prop Autocomplete** 
- ✅ **Type Check** - Extract and validate UI5 component properties

## Usage

```typescript
import createWrapper from './createWrapper';
import Input_ from '@ui5/webcomponents/dist/Input.js';
import Dialog_ from '@ui5/webcomponents/dist/Dialog.js';

// Basic wrapper
const Input = createWrapper(Input_);

// Custom v-model config
const Dialog = createWrapper(Dialog_, {
  modelProp: 'open',
  modelEvent: 'close'
});
```

```html
<template>
  <WrappedInput v-model="value" />
  <WrappedDialog v-model="isOpen">
    <template #footer>
      <button>Close</button>
    </template>
  </WrappedDialog>
</template>
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
