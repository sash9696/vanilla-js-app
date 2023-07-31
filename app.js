import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";
import { MenuPage } from "./components/MenuPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import { OrderPage } from "./components/OrderPage.js";
import ProductItem from "./components/ProductItem.js";

//Link my web components using import
//because js we load that file and execute web components module
//so browser will know, so we need to import that somewhere in the chain



window.app = {};
app.store = Store;
app.router = Router;
//Its better to wait for the event for manipulation

window.addEventListener("DOMContentLoaded", async() => {
    loadData();
    app.router.init();
})