import { DefineComponent } from 'vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    [key: `ui5-${string}`]: DefineComponent<any, any, any>;
  }
}

export {};