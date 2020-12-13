import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard";
import Product from "../views/Product";
import AddCart from "../views/AddCart";

Vue.use(VueRouter)


const routes = [
    { path: '/', component: Dashboard },
    { path: '/product/:id', component: Product },
    { path: '/addCart', component: AddCart },
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

export default router
