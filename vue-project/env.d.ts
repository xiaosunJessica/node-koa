/// <reference types="vite/client" />
declare module '*.scss'
declare module 'components/*'
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

// declare module '*'
// declare module '@/*'
