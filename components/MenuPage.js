export class MenuPage extends HTMLElement{
    constructor(){
        super();

       
        //if it was here we get the belowe error
        // const template = document.getElementById('menu-page-template');
        // //template is unusable so we have to create a new instance of it and clone it
        // const content = template.content.cloneNode(true);
        // this.appendChild(content);
        //so move it to connectedCallback


        //typicall we create shadown dom in the constructor
        this.root = this.attachShadow({mode: 'open'});

        const styles = document.createElement('style');
        this.root.appendChild(styles);
       async function loadCSS(){
          const request =  await fetch('components/MenuPage.css');
          const css = await request.text();
          styles.textContent = css;

        }
        loadCSS()

    }
    // Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children
    //to solve this error either we can use shadow dom or connectedCallback lifecycle 

    //when the component is attached to the DOM
    connectedCallback(){
        const template = document.getElementById('menu-page-template');
        //template is unusable so we have to create a new instance of it and clone it
        const content = template.content.cloneNode(true);
        // this.appendChild(content);
        this.root.appendChild(content);

        window.addEventListener('appmenuchange', () => {
            this.render()
        });
        this.render();

    }

    render(){
        if(app.store.menu){
            this.root.querySelector('#menu').innerHTML = ''

            for (let category of app.store.menu){
                const liCategory = document.createElement('li');
                liCategory.innerHTML = `
                    <h3> ${category.name} </h3>
                    <ul class = 'category'>
                    </ul>
                `
                this.root.querySelector('#menu').appendChild(liCategory)

                //creating another component like in react for products
                category.products.forEach((product) => {
                    const item = document.createElement('product-item');
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector('ul').appendChild(item);
                })
            }
        }else{
            this.root.querySelector('#menu').innerHTML = 'Loading...'
        }
    }

}

customElements.define("menu-page", MenuPage);

//by default we dont have shadow dom