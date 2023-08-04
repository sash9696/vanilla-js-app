export  class OrderPage extends HTMLElement {

  //private object, datamodel using it as single source of truth 
  //to avoid dulication of data in different places
  //we will bind this object automaticall in both ways
  //like if the object is changed i want form to recieve that
  //and vice versa 
  #user = {
    name: '',
    phone: '',
    email: ''
  }
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });    
        const styles = document.createElement("style");
        this.root.appendChild(styles);
        const section = document.createElement("section");
        this.root.appendChild(section);
  
        async function loadCSS() {
          const request = await fetch("/components/OrderPage.css");
          styles.textContent = await request.text();
        }
        loadCSS();
    }   
  
    connectedCallback() {
      window.addEventListener("appcartchange", () => {
        this.render();
      })
      this.render();
    }
    
    render() {
      // document.querySelector("form") will not work because form is
      //inside shadow dom
      let section = this.root.querySelector("section");   
      if (app.store.cart.length==0) {     
        section.innerHTML = `
            <p class="empty">Your order is empty</p>
        `;
      } else {
        let html = `
            <h2>Your Order</h2>
            <ul>
            </ul>
        `;
        section.innerHTML = html;
  
        const template = document.getElementById("order-form-template");
        const content = template.content.cloneNode(true);
        section.appendChild(content);
  
        let total = 0;
        for (let prodInCart of app.store.cart) {      
            const item = document.createElement("cart-item");
              item.dataset.item = JSON.stringify(prodInCart);
            this.root.querySelector("ul").appendChild(item);
          
            total += prodInCart.quantity * prodInCart.product.price;
        }
        this.root.querySelector("ul").innerHTML += `
              <li>
                  <p class='total'>Total</p>
                  <p class='price-total'>$${total.toFixed(2)}</p>
              </li>                
          `;            
      }
      this.setFormBindings(this.root.querySelector("form"))

    }
    setFormBindings(form){
      
      form.addEventListener("submit", event => {
        event.preventDefault();
        alert(`Thanks for your order ${this.#user.name}`)
        this.#user.name = '';
        this.#user.email = '';
        this.#user.phone = '';
        //TODO send data to the server

      })
      //set double data binding
      this.#user = new Proxy(this.#user, {
        set (target,property,value){
          target[property] = value
          //old dom ai to get elements of a form
          form.elements[property].value = value;
          //till now it is only one way binding
          //it is important to return true
          return true;
        }
      })
      //second way binding
      Array.from(form.elements).forEach((element) => {
        element.addEventListener("change", event => {
          this.#user[element.name] = element.value
        })
      })
      //it seems kind of an infinite loop problem
      //but it does not happen because chage will only trigger not from javasvript
      //but when user changes something
      //so this is kind of like a handshake mecahnism
    }
  }
  customElements.define("order-page", OrderPage);
