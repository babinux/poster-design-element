import {
  html,
  LitElement
} from 'lit-element';

// Style Import : Main/Current Component Style
import componentStyle from './style.scss';

// Element Import : Planet Clock, required for poster design (style included)
// import '../node_modules/planet-clock-element/index.js';
import 'planet-clock-element';

// List : All the designs for Poster
const posterDesigns = ['', 'cosmic-latte', 'deep-space-blue', 'navy', 'cosmic-love', 'blackhole', 'supernova'];

// Settings : color of the planets orbits based on the poster's background
const posterDarkOrbits = ['2', '4'];

// Settings : Human readable date
const posterDateSettings = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

// Getter: URL and Params for use later
const url = new URL(document.location);
const posterParams = new URLSearchParams(url.search);

export class PosterDesignElement extends LitElement {

  static get styles() {
    return [componentStyle];
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
          return new Date(this.posterDate).toLocaleDateString('en-EN', posterDateSettings);
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
        type: String
      }
    };
  }

  constructor() {
    super();
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

    // window.history.replaceState({}, "Updating poster Design", `?${posterParams.toString()}`)
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "posterdesign") {
      this.color = posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    }
    super.attributeChangedCallback(attr, oldVal, newVal);
    this.updateUrlFromProps();
  }

  updatePropsFromUrl() {
    this.posterPrint = posterParams.has("posterPrint") && posterParams.get("posterPrint") > 0 ? 1 : 0;
    this.posterTitle = posterParams.has("posterTitle") ? posterParams.get("posterTitle") : 'Name Of Someone You Love';
    this.posterSubtitle = posterParams.has("posterSubtitle") ? posterParams.get("posterSubtitle") : '';
    this.posterLocation = posterParams.has("posterLocation") ? posterParams.get("posterLocation") : 'Amazing Place, World Country';
    this.posterCoordinates = posterParams.has("posterCoordinates") ? posterParams.get("posterCoordinates") : '00.00000°N -000.00000°W';
    this.posterDesign = posterParams.has("posterDesign") ? posterParams.get("posterDesign") : '1';
    this.color = posterParams.has("color") ? posterParams.get("color") : posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    this.posterDate = posterParams.has("posterDate") ? new Date(isNaN(posterParams.get("posterDate")) ? posterParams.get("posterDate") : new Date()) : new Date();
    this.posterFormatedDate = this.posterDate.toLocaleDateString('en-EN', posterDateSettings);
  }

  render() {

    let styleString;
    let posterScale;
    if (this.posterPrint) {
      posterScale = `transform: scale(2.5)!important;`
    } else {
      posterScale = `transform: scale(0.2)!important;`
    }

     styleString = html `
      <style>
        #poster-container {
            ${posterScale}
        }
      </style>`;

    return html `

      ${styleString}
    
      <div id="poster-container">
          <div id="poster" class="${posterDesigns[this.posterDesign]}" >
            <div class="poster-grid">
              <div id="" class="starry-design-wrapper">
                <div id="starry-quadrent" class="starry-quadrent">
                  <img class="poster-quadrent-calendar-astro--black" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant.png">
                  <img class="poster-quadrent-calendar-astro--white" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white.png" >
                  
                  <div class="svghtml-embed">
                  
                    <planet-clock-element color="${this.color}" .posterDate="${this.posterDate}"></planet-clock-element>
                  
                  </div>
                </div>
              </div>
              <div id="" class="poster-label">
                <h1 id="posterTitle" class="poster-title">${this.posterTitle}</h1>
                <div id="posterSubtitle" class="poster-subtitle">${this.posterSubtitle}</div>
                <p id="posterCoordinates" class="poster-coordinates">${this.posterLocation}, ${this.posterCoordinates}</p>
                <p id="posterDate" class="poster-date">${this.posterFormatedDate}</p>
              </div>
            </div>
          </div>
      </div>
    `;
  }
}

window.customElements.define('poster-design-element', PosterDesignElement);
