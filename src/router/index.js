import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/menu"
    },
    {
      path:"/home",
      component: () => import ("@/pages/Home/Home")
    },
    {
      path:"/menu",
      component:()=> import ("@/pages/Menu/Menu")
    },
    {
      path:"/menu/add",
      component:()=> import ("@/pages/Menu/Menuadd")
    },
    {
      path:"/menu/edit",
      component:()=> import ("@/pages/Menu/Menuadd")
    },
    {
      path:"/role",
      component:()=> import ("@/pages/Role/Role")
    },
    {
      path:"/role/add",
      component:()=> import ("@/pages/Role/Roleadd")
    },
    {
      path:"/role/edit",
      component:()=> import ("@/pages/Role/Roleadd")
    },
    {
      path:"/category",
      component:()=> import ("@/pages/Category/Category")
    },
    {
      path:"/category/add",
      component:()=> import ("@/pages/Category/Categoryadd")
    },
    {
      path:"/category/edit",
      component:()=> import ("@/pages/Category/Categoryadd")
    },
    {
      path:"/specs",
      component:()=> import ("@/pages/Specs/Specs")
    },
    {
      path:"/specs/add",
      component:()=> import ("@/pages/Specs/Specsadd")
    },
    {
      path:"/specs/edit",
      component:()=> import ("@/pages/Specs/Specsadd")
    },
  ]
})
