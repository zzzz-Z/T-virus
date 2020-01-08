import { VNode, ComponentInternalInstance, Component } from 'vue'
// // tslint:disable: only-arrow-functions

export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function generateId() {
  return Math.floor(Math.random() * 10000)
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

function camelCase(name: string) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}
// getStyle
export function getStyle(element: HTMLElement, styleName: string) {
  if (!element || !styleName) {
    return null
  }
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView!.getComputedStyle(element, '')
    return element.style[styleName as any] || computed
      ? computed[styleName as any]
      : null
  } catch (e) {
    return element.style[styleName as any]
  }
}

// Find components downward
export function findComponentsDownward(
  context: ComponentInternalInstance,
  componentName: string
): ComponentInternalInstance[] | [] {
  const childs = (context.subTree.children || []) as VNode[]

  return childs.reduce((components: any[], child) => {
    const { type, component } = child
    const name = isObject(type) ? (type as Component).name : null
    if (name && name === componentName) {
      components.push(child)
    }
    const foundChilds = component
      ? findComponentsDownward(component, componentName)
      : []
    return components.concat(foundChilds)
  }, [])
}

// Find components upward
export function findComponentUpward(
  context: ComponentInternalInstance,
  componentName: string,
  componentNames?: string[]
) {
  componentNames =
    typeof componentName === 'string' ? [componentName] : componentName
  let parent = context.parent || context.root
  let name = parent.type.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.parent!
    if (parent) {
      name = parent.type.name
    }
  }
  return parent
}

// Find components upward
export function findComponentsUpward(
  context: ComponentInternalInstance,
  componentName: string
): ComponentInternalInstance[] | [] {
  const parents = []
  const parent = context.parent
  if (parent) {
    if (parent.type.name === componentName) {
      parents.push(parent)
    }
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

const trim = function(str: string) {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function hasClass(el: Element, cls: string) {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}
/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) {
    return
  }
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

export function removeClass(el: Element, cls: string) {
  if (!el || !cls) {
    return
  }
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
