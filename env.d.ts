/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
  interface IModalConfig {}
  export { IModalConfig }
}

declare module 'element-plus' {
  export class ElMessage {
    static success(message: string): void
    static warning(message: string): void
    static info(message: string): void
    static error(message: string): void
  }
}

declare module '*.mjs'
