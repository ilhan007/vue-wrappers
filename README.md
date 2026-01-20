# Vue 3 Wrapper for UI5 Web Components

TypeScript wrapper utility for seamless integration of UI5 Web Components in Vue 3.

## What Does Work

- ✅ Slot Forwarding
- ✅ Existing Prop Autocompletion and Type-checking
- ✅ `v-model` Binding (for inputs + configurable v-model for any ui5 web component)


## What Doesn't Work

- ❌ Invalid Prop Names Not Caught
Typos in prop names (e.g., `valueddd` instead of `value`) are not flagged as TypeScript errors in Vue templates
- ❌ Invalid Slot Names Not Validated
Using non-existent slot names (e.g., `#footerr` instead of `#footer`) are not flagged as TypeScript errors in Vue templates
- ❌ Slot Autocomplete Limited

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
  <Input v-model="value" />
  <Dialog v-model="isOpen">
    <template #footer>
      <button>Close</button>
    </template>
  </Dialog>
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
