import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

//Link my web components using import
//because js we load that file and execute web components module
//so browser will know, so we need to import that somewhere in the chain


console.log('Store',Store)
window.app = {};
app.store = Store;
app.router = Router;
//Its better to wait for the event for manipulation

window.addEventListener("DOMContentLoaded", async() => {
    loadData();
    app.router.init();
})

window.addEventListener('appcartchange', (event) => {
    const badge = document.getElementById('badge');
    const qty = app.store.cart.reduce((acc,curr) => acc + curr.quantity,0);
    badge.textContent = qty;
    badge.hidden = qty === 0;
    console.log(app.store.cart)
})
// console.log(app.store.cart,'app.store.cart')
