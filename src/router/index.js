import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

// const router = new VueRouter({
//   mode: 'history',
//   base: __dirname,
//   scrollBehavior,
//   routes: [
//     { path: '/', component: Home, meta: { scrollToTop: true } },
//     { path: '/foo', component: Foo },
//     { path: '/bar', component: Bar, meta: { scrollToTop: true } }
//   ]
// })

export default new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { scrollToTop: true }
    },
    {
      path: '/:anchor',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { scrollToTop: true }
    }
  ]
})
