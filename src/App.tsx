import { ButtonDemo } from './pages/button';
import { createComponent } from '@/ui';
export default createComponent((props) => (h) => {
  return (
    <div style='padding:40px;width:100vw;height:100vh' id='app'>
      <ButtonDemo />
    </div>
  )
})


