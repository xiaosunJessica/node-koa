/* eslint-disable prefer-rest-params */
import {
    triggerEventListener
} from '../event.js'

export function readonly (target: any, name: any, descriptor: any) {
    descriptor.writable = false
    return descriptor
}

export function notify (target: any, name: any, descriptor: any) {
    const fn = descriptor.value
    descriptor.value = function () {
        const isActived = this.isActived
        // eslint-disable-next-line prefer-rest-params
        const result = fn.apply(this, arguments)
        // 节点没有被添加到Node tree 中不触发事件
        if (!this.parentNode && !this.root) {
            return result
        }
        const event: any = {
            type: name,
            target: this
        }

        // 不属于下面事件触发时同时会触发update事件
        if (![
            'error',
            'activeClear',
            'active',
            'toggleInteractive',
            'componentHover',
            'componentMouserleave',
            'mobilePreviewSwitch',
            'refreshPreview'
        ].includes(name)) {
            triggerEventListener('update', event)
        }

        if (name === 'toggleInteractive') {
            event.interactiveShow = this.interactiveShow
            triggerEventListener('toggleInteractive', event)
        } else if (name === 'active' && isActived !== this.isActived) {
            event.isActived = true
            triggerEventListener('active', event)
        } else if (name === 'activeClear' && isActived !== this.isActived) {
            event.isActived = false
            triggerEventListener('activeClear', event)
        } else if ([
            'appendChild',
            'removeChild',
            'moveChild',
            'insertAfter'
        ].includes(name)) {
            event.child = arguments[0]
            triggerEventListener(name, event)
        } else {
            triggerEventListener(name, event)
        }
        return result
    }
    return descriptor
}
