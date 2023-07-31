const Router = {
	init: () => {
		document.querySelectorAll("a.navlink").forEach((a) => {
			a.addEventListener("click", (event) => {
				event.preventDefault();
				//when we r using a its a closure
				// const url1 = a.href;
				// const url2 = a.getAttribute('href');

				//alternative to closure u can use event.target
				//   const url1 = event.target.href;
				const url = event.target.getAttribute("href");
				Router.go(url);
			});
		});
        //Event for URL changes
        window.addEventListener('popstate', event => {
            //one way to get the route is to get history path name but another is that
            //what ever we pushed in the history this event object will have
            //that state so we can use it
            Router.go(event.state.route, false);
            //we r using false because user is going back using back button
            //so we dont need to push the state again
        })
		//check the initial URL
		Router.go(location.pathname);
	},
	go: (route, addToHistory = true) => {
		console.log(`Going to ${route}`);
		if (addToHistory) {
			history.pushState({ route }, "", route);
		}
		let pageElement = null;
		switch (route) {
			case "/":
				pageElement = document.createElement("menu-page");
				break;
			case "/order":
				pageElement = document.createElement("order-page");
				break;
            default:
                if (route.startsWith("/product-")){
                    pageElement = document.createElement("details-page");
					// console.log('route',{route,pageElement})

                    const paramId = route.substring(route.lastIndexOf("-") + 1);
                    pageElement.dataset.productId = paramId;
                    //using dataset is googd here because browser will not
                    //parse it as it is for custom libraries


                }
				break;   

		}
		//quick and dirty way because its a string
		// document.querySelector("main").innerHTML = '';

		if (pageElement) {
			//u can cache but mordern browsers do it anyway
			const cache = document.querySelector("main");
			console.log('cache',cache)
			cache.innerHTML = "";
			cache.appendChild(pageElement);
			window.scrollX = 0;
			window.scrollY = 0;
			//scroll 0 is because when it is a large page and u change a route it will be at
			//that scroll position only and therefore making it to the top
		}

		//better way
		//childNodes will give comments and texts as objects
		//children will just give DOM elements
		//fidn the first fom element and removing it

		// document.querySelector("main").children[0].remove();
		// document.querySelector("main").appendChild(pageElement);
	},
};

//make the router reusable by recieving a collection of routes
// (path as regex and component to render)

export default Router;
