import Vue from 'vue';
Vue.directive('is', {
  inserted: (el, { value }) => value || el.parentNode!.removeChild(el)
});

Vue.directive('thtml', (el, { value }) => { el.innerHTML = value; });

Vue.directive('ttext', (el, { value }) => { el.innerText = value; });
