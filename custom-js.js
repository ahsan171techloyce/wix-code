class VariantSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const variants = JSON.parse(this.getAttribute('variants') || '[]');
    const productId = this.getAttribute('productId') || '';
    const label = this.getAttribute('label') || 'Choose an option';

    const style = `
      <style>
        label {
          margin-right: 15px;
          cursor: pointer;
        }
        input[type="radio"] {
          margin-right: 5px;
        }
      </style>
    `;

    const radios = variants.map(v => `
      <label>
        <input type="radio" name="variant" value="${v.id}" />
        ${v.title}
      </label>
    `).join('');

    this.shadowRoot.innerHTML = `
      ${style}
      <div>
        <p>${label}</p>
        ${radios}
      </div>
    `;

    this.shadowRoot.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.dispatchEvent(new CustomEvent('variantSelected', {
          detail: {
            variantId: e.target.value,
            productId: productId
          },
          bubbles: true,
          composed: true
        }));
      });
    });
  }
}

customElements.define('variant-selector', VariantSelector);
