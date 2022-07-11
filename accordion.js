//acordion content element start

const accordion_content = document.createElement('template');
accordion_content.innerHTML = `
<link rel="stylesheet" href="accordion.css" />
<div class="accordion">
<div class="element-content">
    <button id="toggle-content">
        <h3 class="title"><slot name="heading"/></h3>
        <svg class="icon icon-rotated" width="23" height="13" viewBox="0 0 23 13" xmlns="">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.540039 1.6527L1.24714 0.9456L11.5001 11.1986L21.7532 0.945599L22.4603 1.6527L11.5001 12.6128L0.540039 1.6527Z"/>
        </svg>
    </button>
    <div class="accordion-content">
        <slot name="content"/>
    </div>
</div>
</div>

 `

class AccordionContent extends HTMLElement {
    constructor() {
        super();

        this.showContent = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(accordion_content.content.cloneNode(true))


    }

    toggleContent() {
        this.showContent = !this.showContent;

        const content = this.shadowRoot.querySelector('.accordion-content');
        const toggleIcon = this.shadowRoot.querySelector('.icon');

        if (this.showContent) {

            content.classList.remove('content-hidden');
            toggleIcon.classList.add('icon-rotated')



        } else {

            content.classList.add('content-hidden');
            toggleIcon.classList.remove('icon-rotated')
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-content').addEventListener('click', () => this.toggleContent());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-content').removeEventListener();
    }

}

window.customElements.define('accordion-content', AccordionContent);


//acordion element start


const accordion = document.createElement('template');


accordion.innerHTML = `
<link rel="stylesheet" href="index.css" />
 `

class AwesomeAccordion extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        var title_array = JSON.parse(this.getAttribute('title'));
        var content_array = JSON.parse(this.getAttribute('content'));

        var text = '';

        for (let i = 0; i < title_array.length; i++) {
            text += `
        <accordion-content>
        <div slot="heading">${title_array[i]}</div>
        <div slot="content">${content_array[i]}</div>
        </accordion-content>
        `;
        }


        accordion.innerHTML += text;

        this.shadowRoot.appendChild(accordion.content.cloneNode(true));
    }
}

window.customElements.define('awesome-accordion', AwesomeAccordion);