<template>
  <section class="box-demo">
    <section class="padding">
      <slot name="top" />
    </section>
    <section class="mid padding">
      <div class="code-title">
        {{ title }}
      </div>
      <slot name="mid" />
    </section>
    <div class="action padding">
      <img @click="toggle" :src="src"/>
    </div>
    <section v-show="codeExpand" class="padding bottom">
      <slot name="bottom" />
    </section>
  </section>
</template>
<script>
import close from '@/assets/icon/close.svg'
import open from '@/assets/icon/open.svg'
export default {
  name: 'DemoBox',
  props: ['id', 'title'],
  computed: {
    src() {
      return this.codeExpand ? this.open : this.close
    }
  },
  methods: {
    toggle() {
      this.codeExpand = !this.codeExpand
    }
  },
  data() {
    return {
      codeExpand: false,
      close,
      open
    }
  }
};
</script>
<style scoped lang="less">
.box-demo {
  padding: 0;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  box-shadow: none;
  margin-top: 20px;
  margin-bottom: 20px;
}
.padding {
  padding: 24px;
}
.action {
  text-align: center;
  border-top: 1px dashed #ebedf0;
  img {
    width: 15px;
    height: 15px;
    opacity: 0.55;
    cursor: pointer;
    &:hover{
     opacity: 1;
    }
  }
}
.mid {
  color: #314659;
  position: relative;
  padding: 24px;
  border-top: 1px solid #ebedf0;
}
.bottom{
  border-top: 1px dashed #ebedf0;
}
.code-title {
  position: absolute;
  top: -14px;
  margin-left: -11px;
  padding: 1px 8px;
  background: #fff;
  border-radius: 2px 2px 0 0;
  -webkit-transition: background-color 0.4s;
  transition: background-color 0.4s;
}

</style>
