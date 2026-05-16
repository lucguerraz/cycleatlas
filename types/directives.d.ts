import type { Directive } from 'vue'
import type { ClickOutsideHandler, ClickOutsideOptions } from 'vue3-click-outside-directive'

declare module 'vue' {
  interface GlobalDirectives {
    vClickOutside: Directive<HTMLElement, ClickOutsideHandler | ClickOutsideOptions>
  }
}
