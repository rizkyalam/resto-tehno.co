class Logo extends HTMLElement {

    connectedCallback() {
        this.src = this.getAttribute("src") || null;
        this.alt = this.getAttribute("alt") || null;
        this.render();
    }

    render(){
        this.innerHTML = `<img src="${this.src}" alt="${this.alt}">`;
    }

}

customElements.define("logo-nav", Logo);