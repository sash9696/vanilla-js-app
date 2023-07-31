
const Store = {
    menu: null,
    cart:[]
};

//reactive programming using proxy pattern
//using proxy to  broadcast changes globally 
const proxiedStore = new Proxy(Store, {
    set(target, property, value){
        target[property] = value;
        if(property == 'menu'){
            window.dispatchEvent(new Event('appmenuchange'))
            //we r not using document.dispatchEvent because
            //we r using multiple documents like shadow dom
        }
        if(property == 'cart'){
            window.dispatchEvent(new Event('appcartchange'))

        }
        return true;

    }
})

//next problem is how to annouce globally that the data is changed
//so we can implement observer pattern, or recieve callbacks
export default proxiedStore;