import API from "./API.js";

export async function loadData() {
	app.store.menu = await API.fetchMenu();
}

//u can make this more modular using factory pattern and add an abstraction layer
