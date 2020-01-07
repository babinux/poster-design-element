import {
  html,
  LitElement,
  svg
} from 'lit-element';

// Style Import : Main/Current Component Style
import componentStyle from './style.scss';

// Element Import : Planet Clock, required for poster design (style included)
// import '../node_modules/planet-clock-element/index.js';
import 'planet-clock-element';
import clockQuadrantBlack from './assets/svg/clock-quadrant-black.svg';
import clockQuadrantWhite from './assets/svg/clock-quadrant-white.svg';


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
        converter(value) {
          return new Date(value).toLocaleDateString('en-EN', posterDateSettings);
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
    // Getter: URL and Params for use later
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);
    this.updatePropsFromUrl();
  }

  firstUpdated() {
    this.updateUrlFromProps();
  }

  updateUrlFromProps() {
    // this.posterParams.set("color", this.color);
    this.posterParams.set("posterPrint", this.posterPrint);
    this.posterParams.set("posterDesign", this.posterDesign);
    this.posterParams.set("posterDate", `${this.posterDate.getFullYear()}-${this.posterDate.toLocaleString('default', { month: 'short' })}-${this.posterDate.getDate()}`);
    this.posterParams.set("posterTitle", this.posterTitle);
    // this.posterParams.set("posterSubtitle", this.posterSubtitle);
    this.posterParams.set("posterLocation", this.posterLocation);
    this.posterParams.set("posterCoordinates", this.posterCoordinates);

    // window.history.replaceState({}, "Updating poster Design", `?${this.posterParams.toString()}`)
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "posterdesign") {
      this.color = posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    }
    super.attributeChangedCallback(attr, oldVal, newVal);
    this.updateUrlFromProps();
  }

  updatePropsFromUrl() {

    // console.log(this.url);

    this.posterPrint = this.posterParams.has("posterPrint") && this.posterParams.get("posterPrint") > 0 ? 1 : 0;
    this.posterTitle = this.posterParams.has("posterTitle") ? this.posterParams.get("posterTitle") : 'Name Of Someone You Love';
    this.posterSubtitle = this.posterParams.has("posterSubtitle") ? this.posterParams.get("posterSubtitle") : '';
    this.posterLocation = this.posterParams.has("posterLocation") ? this.posterParams.get("posterLocation") : 'Amazing Place, World Country';
    this.posterCoordinates = this.posterParams.has("posterCoordinates") ? this.posterParams.get("posterCoordinates") : '00.00000°N -000.00000°W';
    this.posterDesign = this.posterParams.has("posterDesign") ? this.posterParams.get("posterDesign") : '1';
    this.color = this.posterParams.has("color") ? this.posterParams.get("color") : posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    this.posterDate = this.posterParams.has("posterDate") ? new Date(isNaN(this.posterParams.get("posterDate")) ? this.posterParams.get("posterDate") : new Date()) : new Date();
    this.posterFormatedDate = this.posterDate.toLocaleDateString('en-EN', posterDateSettings);
  }



  onDomChange(event) {
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    // console.log(this.url);
    // console.log(this.posterParams);
    const input = event.target || event.srcElement || event.srcElement.html;

    this.posterParams.set(input.getAttribute('data-property-name'), input.innerHTML.replace(/<!---->/sg, ""));
    window.history.replaceState({}, "Updating poster Design", `?${this.posterParams.toString()}`);

  }


  onInputChange(event) {
    let input = event.target || event.srcElement;
    console.log(input);
    // console.log(caller.name);
    // console.log(caller.id);
    console.log(input.getAttribute('data-property-name'));
    console.log(input.value);



    if (input.getAttribute('data-property-name') === "posterDate") {
      console.log(input.getAttribute('data-property-name'));
      console.log("+-----+");

      this[input.getAttribute('data-property-name')] = new Date(input.value);
      console.log(this[input.getAttribute('data-property-name')]);
      console.log(this.posterDate);
      console.log("+++++");

      console.log(this.posterFormatedDate);



      this.posterFormatedDate = this.posterDate;
      console.log(this.posterFormatedDate);


    } else {
      this[input.getAttribute('data-property-name')] = input.value;
    }
  }

  getQuadrant() {
    return posterDarkOrbits.includes(this.posterDesign) ? clockQuadrantBlack : clockQuadrantWhite;
  }

  render() {

    // let styleString;
    let posterScale;
    if (this.posterPrint) {
      posterScale = `transform: scale(2.5)!important;`
    } else {
      posterScale = `transform: scale(0.2)!important;`
    }

    const styleString = html `
      <style>
        #poster-container {
            ${posterScale}
        }
      </style>`;

    // <!-- <div>${clockQuadrantBlack}</div> -->
    // <!-- <div>${this.getQuadrant()}</div> -->


    return html `

      ${styleString}
           
     

      <div id="poster-container">
          <div id="poster" class="${posterDesigns[this.posterDesign]}" >
            <div class="poster-grid">
              <div id="" class="starry-design-wrapper">
                <div id="starry-quadrent" class="starry-quadrent">
                  
                  <!-- 
                    <img class="poster-quadrent-calendar-astro--black" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant.png">
                    <img class="poster-quadrent-calendar-astro--white" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white.png" > 
                  -->

                  <img class="poster-quadrent-calendar-astro" src="${this.getQuadrant()}">

                  <div class="svghtml-embed">
                    <planet-clock-element color="${this.color}" .posterDate="${this.posterDate}"></planet-clock-element>
                  </div>
                </div>
              </div>
              <div id="" class="poster-label">
                <h1 id="posterTitle" data-property-name="posterTitle" class="poster-title" @input="${this.onDomChange}" contenteditable="true">${this.posterTitle}</h1>
                <div id="posterSubtitle" data-property-name="posterSubtitle" class="poster-subtitle" contenteditable="true">${this.posterSubtitle}</div>
                <p id="posterCoordinates" data-property-name="posterCoordinates" class="poster-coordinates" contenteditable="true" @input="${this.onDomChange}" >${this.posterLocation}, ${this.posterCoordinates}</p>
                <p id="posterDate" data-property-name="posterDate" class="poster-date" contenteditable="true">${this.posterFormatedDate}</p>
              </div>
            </div>
          </div>
      </div>
    `;
  }





}

window.customElements.define('poster-design-element', PosterDesignElement);
