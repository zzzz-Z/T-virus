import { ButtonDemo } from './pages/button'
import { createComponent, Menu, MenuItem, reactive, SubMenu } from '@/ui'


export default createComponent({
  setup() {
    const state = reactive({
      opens: ['title', 'title1']
    })
    return () => (
      <div style='padding:40px;width:100vw;height:100vh' id='app'>
        {/* <ButtonDemo /> */}
        <Menu
          openNames={state.opens}
          activeName='222'
          on-open-change={(name: any) => {
            state.opens = name
          }}>
          <SubMenu title='title' name='title'>
            <MenuItem name='zcc'>
              111
          </MenuItem>
            <MenuItem name='2221'>
              222
            </MenuItem>
          </SubMenu>
          <SubMenu title='title1' name='title1'>
            <MenuItem name='zcc1'>
              111
            </MenuItem>
            <MenuItem name='222'>
              222
            </MenuItem>
          </SubMenu>
          <SubMenu title='title2' name='title2'>
            <MenuItem name='2222'>
              111
            </MenuItem>
            <MenuItem name='sss'>
              222
            </MenuItem>
          </SubMenu>
          <MenuItem name='333'>
            333
        </MenuItem>
        </Menu>
      </div>
    )
  }

})
