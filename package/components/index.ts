import '../styles/index.less';
import Button from './button';
import Input from './input';

const components = [
  Button,
  Input
]

const install = (Vue: any) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
}
export default {
  Button,
  Input,
  install
}

