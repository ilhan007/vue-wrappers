import { h } from 'vue';
import type UI5Element from '@ui5/webcomponents-base/dist/UI5Element.js';

type isArray<T> = T extends HTMLElement[] ? true : false;
type ExtractComponentProps<T> = {
  [K in keyof T as 
    K extends `_${string}` ? never : // Remove private props
    T[K] extends Array<HTMLElement> ? never : // Remove slots (check type first)
    K extends `data-${string}` ? never : // Remove data-* attributes
    K extends keyof HTMLElement ? never : // Remove HTMLElement props
    K extends keyof UI5Element ? never : // Remove UI5Element base props
    K extends 'dangerouslySetInnerHTML' ? never : // Remove React-specific props
    K]: T[K];
};
type ExtractSlotNames<T> = {
  [K in keyof T]: isArray<Exclude<T[K], undefined>> extends true ? K : never;
}[keyof T];

export default function createWrapper<T extends typeof UI5Element>(Klass: T, options?: {
  modelProp: string;
  modelEvent: string;
}) {
  const tagName = Klass.getMetadata().getTag();
  const modelProp = options?.modelProp ?? 'value';
  const modelEvent = options?.modelEvent ?? 'input';

  type ComponentInstance = InstanceType<T>;
  type ComponentProps = ExtractComponentProps<InstanceType<T>['_jsxProps']>;

  type SlotNames = ExtractSlotNames<ComponentInstance['_jsxProps']> | 'default';
  type SlotTypes = {
    [K in SlotNames]?: () => any;
  };

  return function FComponent(
    props: Omit<ComponentProps, 'ref'> & { modelValue?: any },
    { slots, emit }: { slots?: SlotTypes; emit?: any }
  ) {

    // v-model handling
    let propsFromModel = {};
    if (props.modelValue !== undefined) {
      const eventHandlerName = `on${modelEvent
        .charAt(0)
        .toUpperCase()}${modelEvent.slice(1)}`;

      propsFromModel = {
        [modelProp]: props.modelValue,
        [eventHandlerName]: (e: Event) => {
          const newValue =
            (e as any).detail?.[modelProp] ?? (e.target as any)?.[modelProp];
          emit?.('update:modelValue', newValue);
        },
      };
    }

    // slots handling
    const children: any[] = []; 
    if (slots) {
      Object.keys(slots).forEach((slotName: string) => {
        const slotFn = slots[slotName as keyof SlotTypes];
        const slotContent = typeof slotFn === 'function' ? slotFn() : slotFn;
        
        if (!slotContent) return;
        
        const vnodes = Array.isArray(slotContent) ? slotContent : [slotContent];
        
        vnodes.forEach((vnode: any) => {
          if (!vnode) return;
          
          if (slotName !== 'default') {
            if (vnode.props) {
              vnode.props = { ...vnode.props, slot: slotName };
            } else {
              vnode.props = { slot: slotName };
            }
          }
          
          children.push(vnode);
        });
      });
    }

    return h(
      tagName,
      { ...props, ...propsFromModel } as any,
      children
    );
  };
}