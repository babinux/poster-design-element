import {
  html,
  LitElement
} from 'lit-element';

import '../node_modules/planet-clock-element/index.js';

import customStyle from './style.scss';

const posterDesigns = ['', 'cosmic-latte', 'deep-space-blue', 'navy', 'cosmic-love', 'blackhole', 'supernova'];
const posterDarkOrbits = ['2', '4'];
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const url = new URL(document.location);
const posterParams = new URLSearchParams(url.search);

// const sheet = new CSSStyleSheet();

// // set its contents by referencing a file
// sheet.replace('@import url("./src/style.css")')
//   .then(sheet => {
//     console.log('Styles loaded successfully');
//   })
//   .catch(err => {
//     console.error('Failed to load:', err);
//   });


export class PosterDesignElement extends LitElement {

  static get styles() {
    console.log(customStyle);
    return [customStyle];
  }

  static get properties() {
    return {
      posterDesign: {
        type: String,
        reflect: true
      },
      posterDate: {
        type: String,
        reflect: true,
        converter(value) {
          return new Date(value);
        }
      },
      posterFormatedDate: {
        type: String,
        reflect: true,
        converter() {
          return new Date(this.posterDate).toLocaleDateString('en-EN', options);
        }
      },
      posterPrint: {
        type: String,
        reflect: true
      },
      posterTitle: {
        type: String,
        reflect: true
      },
      posterSubtitle: {
        type: String,
        reflect: true
      },
      posterCoordinates: {
        type: String,
        reflect: true
      },
      posterLocation: {
        type: String,
        reflect: true
      },
      color: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();
    // this.shadowRoot.adoptedStyleSheets = [sheet];
    this.updatePropsFromUrl();
  }

  firstUpdated() {

    this.updateUrlFromProps();
  }

  updateUrlFromProps() {
    // posterParams.set("color", this.color);
    posterParams.set("posterPrint", this.posterPrint);
    posterParams.set("posterDesign", this.posterDesign);
    posterParams.set("posterDate", `${this.posterDate.getFullYear()}-${this.posterDate.toLocaleString('default', { month: 'short' })}-${this.posterDate.getDate()}`);
    posterParams.set("posterTitle", this.posterTitle);
    // posterParams.set("posterSubtitle", this.posterSubtitle);
    posterParams.set("posterLocation", this.posterLocation);
    posterParams.set("posterCoordinates", this.posterCoordinates);

    window.history.replaceState({}, "Updating poster Design", `?${posterParams.toString()}`)
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    this.updateUrlFromProps();
  }

  updatePropsFromUrl() {
    this.posterPrint = posterParams.has("posterPrint") && posterParams.get("posterPrint") > 0 ? 1 : 0;
    this.posterTitle = posterParams.has("posterTitle") ? posterParams.get("posterTitle") : 'Name Of Someone You Love';
    this.posterSubtitle = posterParams.has("posterSubtitle") ? posterParams.get("posterSubtitle") : '';
    this.posterLocation = posterParams.has("posterLocation") ? posterParams.get("posterLocation") : 'Amazing Place, World';
    this.posterCoordinates = posterParams.has("posterCoordinates") ? posterParams.get("posterCoordinates") : '47.90444°N -116.74111°W';
    this.posterDesign = posterParams.has("posterDesign") ? posterParams.get("posterDesign") : '1';
    this.color = posterParams.has("color") ? posterParams.get("color") : posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    this.posterDate = posterParams.has("posterDate") ? new Date(isNaN(posterParams.get("posterDate")) ? posterParams.get("posterDate") : new Date()) : new Date();
    this.posterFormatedDate = this.posterDate.toLocaleDateString('en-EN', options);
  }

  render() {

    let styleString;
    if (this.posterPrint) {
      styleString = html `
      <style>
        #poster-container {
            transform: scale(1)!important;
        }
      </style>`;
    }

    return html `

      ${styleString}
    
      <div id="poster-container">
          <div id="poster" class="${posterDesigns[this.posterDesign]}" >
            <div class="poster-grid">
              <div id="" class="starry-design-wrapper">
                <div id="starry-quadrent" class="starry-quadrent">
                  <img class="poster-quadrent-calendar-astro--black" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant.png">
                  <img class="poster-quadrent-calendar-astro--white" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white.png" >
                  
                  <div class="svghtml-embed w-embed">
                  
                    <planet-clock-element color="${this.color}" .posterDate="${this.posterDate}"  ></planet-clock-element>
                  
                  </div>
                </div>
              </div>
              <div id="" class="poster-label">
                <h1 id="posterTitle" class="poster-title">${this.posterTitle}<br></h1>
                <div id="posterSubtitle" class="poster-subtitle">${this.posterSubtitle}</div>
                <p id="posterCoordinates" class="poster-coordinates">${this.posterLocation}, ${this.posterCoordinates}<br></p>
                <p id="posterDate" class="poster-date">${this.posterFormatedDate}</p>
              </div>
            </div>
          </div>
      </div>
    `;
  }
}

window.customElements.define('poster-design-element', PosterDesignElement);
