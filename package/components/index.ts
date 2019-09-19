import '../styles/index.less';
import Button from './button';
import Input from './input';
import Card from './card';
import Dropdown from './dropdown';
import Menu from './menu';


const components = {
  Button,
  Input,
  Card,
  Menu,
  Dropdown
}

export default {
  ...components,
  install: (Vue: any) => {
    Object.values(components).forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

