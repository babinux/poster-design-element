// const circle = require('./circle.js');

// require('planet-clock-element.js');
import '../node_modules/planet-clock-element/dist/index.js';




import {
  html,
  LitElement
} from 'lit-element';

import customStyle from './style.scss';

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
  static nice() {
    return "nice";

  }
  static get styles() {
    console.log(customStyle);

    return [customStyle];

  }

  static get properties() {
    return {
      title: {
        type: String
      }
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.counter = 5;
    // this.shadowRoot.adoptedStyleSheets = [sheet];

  }

  __increment() {
    this.counter += 1;
  }



  render() {


    return html `
     
      <noscript>
        Could not render the custom element. Check that JavaScript is enabled.
      </noscript>

      <div id="poster_box" class="poster-frame-preview print" >
        <div class="poster-frame-inner-container">
          <div id="poster" class="poster w-node-8ec960d784d5-60d784d5 navy print" data-ix="new-interaction">
            <div class="border-grid">
              <div id="w-node-8ec960d784d7-60d784d5" class="circle-wrap">
                <div id="circle-wrapper-quadrent" class="circle-wrapper-quadrent">
                  <img  class="poster-quadrent-calendar-astro--black" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant.png">
                  <img class="poster-quadrent-calendar-astro--white" src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white.png" >
                  
                  <div class="svghtml-embed w-embed">

                  
                    <planet-clock-element color="white"  ></planet-clock-element>
                  
                  </div>
                </div>
              </div>
              <div id="" class="poster-label">
                <h1 id="posterTitle" class="poster-title">Name Of Someone You Love<br></h1>
                <div id="posterSubtitle" class="poster-subtitle"> </div>
                <p id="posterCoordinates" class="poster-coordinates">Coordinates, 47.90444°N -116.74111°W<br></p>
                <p id="posterDate" class="poster-date">December 19, 2019</p>
              </div>
            </div>
          </div>
          <div class="inner-shadow"></div>
        </div>
      </div>


    `;
  }
}

window.customElements.define('poster-design-element', PosterDesignElement);
