import Vue, { VNode } from 'vue'
// tslint:disable: only-arrow-functions

export function generateId() {
  return Math.floor(Math.random() * 10000)
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name: string) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}
// getStyle
export function getStyle(element: HTMLElement, styleName: string) {
  if (!element || !styleName) { return null }
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView!.getComputedStyle(element, '');
    return element.style[styleName as any] || computed ? computed[styleName as any] : null;
  } catch (e) {
    return element.style[(styleName as any)];
  }
}

export function broadcast(this: Vue, componentName: string, eventName: string, params: any) {
  this.$children.forEach((child) => {
    const name = child.$options.name

    if (name === componentName) {
      (child.$emit as any).apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, ([componentName, eventName] as any).concat([params]))
    }
  })
}

export function dispatch(this: Vue, componentName: string, eventName: string, params: any) {
  let parent = this.$parent || this.$root
  let name = parent.$options.name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent

    if (parent) {
      name = parent.$options.name
    }
  }
  if (parent) {
    parent.$emit.apply(parent, ([eventName] as any).concat(params))
  }
}


// Find components downward
export function findComponentsDownward(context: Vue, componentName: string): Vue[] | [] {
  return context.$children.reduce((components: Vue[], child) => {
    if (child.$options.name === componentName) {
      components.push(child)
    }
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// Find components upward
export function findComponentsUpward(context: Vue, componentName: string): Vue[] | [] {
  const parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === componentName) {
      parents.push(parent)
    }
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// Find components upward
export function findComponentUpward(context: Vue, componentName: string, componentNames?: string[]) {
  componentNames = typeof componentName === 'string'
    ? [componentName]
    : componentName
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) { name = parent.$options.name }
  }
  return parent;
}

const trim = function(str: string) {
  return (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

export function hasClass(el: Element, cls: string) {
  if (!el || !cls) { return false }
  if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.') }
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
}
/* istanbul ignore next */
export function addClass(el: Element, cls: string) {
  if (!el) { return };
  let curClass = el.className;
  const classes = (cls || '').split(' ');

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) { continue };

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el: Element, cls: string) {
  if (!el || !cls) { return }
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' ';

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) { continue };

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}
