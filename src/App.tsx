
import { ButtonDemo } from './pages/button';
import { createComponent } from './createComponent';

export default createComponent((props) => (h) => {
  const Menu = window.T.Menu
  return (
    <div style='padding:40px;width:100vw;height:100vh' id='app'>
      <ButtonDemo />
      <Menu style='width:100px'>
        111
      </Menu>
    </div>
  )
}) as any;


