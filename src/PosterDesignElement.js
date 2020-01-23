import { html, LitElement } from 'lit-element';

import '@vaadin/vaadin-date-picker';

// Style Import : Main/Current Component Style
import componentStyle from './style.scss';

// Element Import : Planet Clock, required for poster design (style included)
// import '../node_modules/planet-clock-element/index.js';
import 'planet-clock-element';

import svgClockQuadrantBlack from './assets/svg/clock-quadrant-black.svg';
import svgClockQuadrantWhite from './assets/svg/clock-quadrant-white.svg';
import pngClockQuadrantBlack from './assets/img/clock-quadrant-black.png';
import pngClockQuadrantWhite from './assets/img/clock-quadrant-white.png';

const GoogleMapsLoader = require('google-maps'); // only for common js environments

GoogleMapsLoader.KEY = 'AIzaSyCq8BCifO8u5oCBMPcbZsh6Q4MySDX-4JQ';
GoogleMapsLoader.LIBRARIES = ['places'];

// List : All the designs for Poster
const posterDesigns = [
  '',
  'cosmic-latte',
  'deep-space-blue',
  'navy',
  'cosmic-love',
  'blackhole',
  'supernova',
  'milk-drop',
];

// Settings : color of the planets orbits based on the poster's background
const posterDarkOrbits = ['2', '4', '7'];

// Settings : Human readable date
const posterDateSettings = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export class PosterDesignElement extends LitElement {
  static get styles() {
    return [componentStyle];
  }

  static get properties() {
    return {
      posterDesign: {
        type: String,
        reflect: true,
      },
      posterDate: {
        reflect: true,
        converter: value => {
          // console.log(`DATE TO ${typeof value}`);
          // console.log(value);

          const userTimezoneOffset = new Date(value).getTimezoneOffset() * 60000;
          const newPosterDate = new Date(new Date(value).getTime() + userTimezoneOffset);

          return newPosterDate;
        },
      },
      posterFormatedDate: {
        // reflect: true,
        converter: value => {
          // console.log(`Formated DATE TO ${typeof value}`);
          // console.log(value);
          const newPosterFormatedDate = new Date(value).toLocaleDateString(
            'en-EN',
            posterDateSettings,
          );
          // console.log(newPosterFormatedDate);
          return newPosterFormatedDate;
        },
      },
      posterPrint: {
        type: String,
        reflect: true,
      },
      posterTitle: {
        type: String,
        reflect: true,
      },
      posterSubtitle: {
        type: String,
        reflect: true,
      },
      posterCoordinates: {
        type: String,
        reflect: true,
      },
      posterLocation: {
        type: String,
        reflect: true,
      },
      color: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    // Getter: URL and Params for use later
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);
    this.updatePropsFromUrl();

    [].forEach.call(this.shadowRoot.querySelectorAll('[contenteditable="true"]'), el => {
      el.addEventListener(
        'paste',
        e => {
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertHTML', false, text);
        },
        false,
      );
    });

    window.customElements.whenDefined('vaadin-date-picker').then(() => {
      const datepicker = this.shadowRoot.querySelector('vaadin-date-picker');

      // Set up the parser library for Finnish locale
      // Sugar.Date.setLocale('en');

      datepicker.i18n = {
        ...datepicker.i18n,
        formatDate: date =>
          new Date(`${date.year}-${date.month + 1}-${date.day}`).toLocaleDateString(
            'en-EN',
            posterDateSettings,
          ),
        parseDate: dateString => {
          const date = new Date(dateString);
          return {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
          };
        },
      };
    });
  }

  firstUpdated() {
    // this.googleMapDom = this.shadowRoot.querySelector('#map');
    this.googleMapDomInput = this.shadowRoot.querySelector('#posterLocation-Input');

    GoogleMapsLoader.load(google => {
      this.initAutocomplete(google);
    });

    this.updateUrlFromProps();
  }

  initAutocomplete(google) {
    const input = this.googleMapDomInput;
    const searchBox = new google.maps.places.SearchBox(input);
    searchBox.addListener('places_changed', () => {
      this.places = searchBox.getPlaces();
      if (this.places.length === 0) {
        return;
      }
      this.posterLocation = this.places[0].formatted_address;

      const latitudeNorthSouthSign = this.places[0].geometry.location.lat() > 0 ? 'N' : 'S';
      const longitudeEastWestSign = this.places[0].geometry.location.lng() > 0 ? 'E' : 'W';

      const latitude =
        this.places[0].geometry.location.lat() > 0
          ? this.places[0].geometry.location.lat().toFixed(5)
          : this.places[0].geometry.location.lat().toFixed(5) * -1;
      const longitude =
        this.places[0].geometry.location.lng() > 0
          ? this.places[0].geometry.location.lng().toFixed(5)
          : this.places[0].geometry.location.lng().toFixed(5) * -1;

      const coordinates = `${latitude}°${latitudeNorthSouthSign}, ${longitude}°${longitudeEastWestSign}`;
      this.setAttribute('posterCoordinates', coordinates);
    });
  }

  updateUrlFromProps() {
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    // this.posterParams.set("color", this.color);
    this.posterParams.set('posterPrint', this.posterPrint);
    this.posterParams.set('posterDesign', this.posterDesign);
    this.posterParams.set(
      'posterDate',
      `${this.posterDate.getFullYear()}-${this.posterDate.toLocaleString('default', {
        month: 'short',
      })}-${this.posterDate.getDate()}`,
    );
    this.posterParams.set('posterTitle', this.posterTitle);
    // this.posterParams.set("posterSubtitle", this.posterSubtitle);
    this.posterParams.set('posterLocation', this.posterLocation);
    this.posterParams.set('posterCoordinates', this.posterCoordinates);

    window.history.replaceState({}, 'Updating poster Design', `?${this.posterParams.toString()}`);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (attr === 'posterdesign') {
      this.color = posterDarkOrbits.includes(this.posterDesign) ? 'black' : 'white';
    }
    if (attr === 'posterdate') {
      this.setAttribute('posterFormatedDate', this.posterDate);
      // this.posterFormatedDate = this.posterDate;
    }
    this.updateUrlFromProps();
  }

  updatePropsFromUrl() {
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    // console.log(this.url);

    this.posterPrint =
      this.posterParams.has('posterPrint') && this.posterParams.get('posterPrint') > 0 ? 1 : 0;
    this.posterTitle = this.posterParams.has('posterTitle')
      ? this.posterParams.get('posterTitle').trim()
      : 'Name Of Someone You Love';
    this.posterSubtitle = this.posterParams.has('posterSubtitle')
      ? this.posterParams.get('posterSubtitle')
      : '';
    this.posterLocation = this.posterParams.has('posterLocation')
      ? this.posterParams.get('posterLocation')
      : '';
    this.posterCoordinates = this.posterParams.has('posterCoordinates')
      ? this.posterParams.get('posterCoordinates')
      : '00.00000°N -000.00000°W';
    this.posterDesign = this.posterParams.has('posterDesign')
      ? this.posterParams.get('posterDesign')
      : '1';
    // eslint-disable-next-line no-nested-ternary
    this.color = this.posterParams.has('color')
      ? this.posterParams.get('color')
      : posterDarkOrbits.includes(this.posterDesign)
      ? 'black'
      : 'white';

    this.posterDate = this.posterParams.has('posterDate')
      ? new Date(
          // eslint-disable-next-line no-restricted-globals
          isNaN(this.posterParams.get('posterDate'))
            ? this.posterParams.get('posterDate')
            : new Date(),
        )
      : new Date();

    this.posterFormatedDate = this.posterDate.toLocaleDateString('en-EN', posterDateSettings);
  }

  onDomChange(event) {
    this.url = new URL(document.location);
    this.posterParams = new URLSearchParams(this.url.search);

    const input = event.target || event.srcElement || event.srcElement.html;
    const tmpInput = input.innerText.trim();

    this.posterParams.set(input.getAttribute('data-property_name'), tmpInput.trim());
    window.history.replaceState({}, 'Updating poster Design', `?${this.posterParams.toString()}`);
  }

  onInputChange(event) {
    const input = event.target || event.srcElement;

    this.setAttribute(input.getAttribute('data-property_name'), input.value);

    // if (input.getAttribute('data-property_name') === 'posterDate') {
    //   // this.setAttribute('posterFormatedDate', this.posterDate);
    // }
  }

  getQuadrant() {
    let quadrantDesign;
    if (this.posterPrint > 0) {
      quadrantDesign = posterDarkOrbits.includes(this.posterDesign)
        ? svgClockQuadrantBlack
        : svgClockQuadrantWhite;
    } else {
      quadrantDesign = posterDarkOrbits.includes(this.posterDesign)
        ? pngClockQuadrantBlack
        : pngClockQuadrantWhite;
    }
    return quadrantDesign;
  }

  render() {
    let posterScale;
    if (this.posterPrint) {
      posterScale = `transform: scale(2.5)!important;`;
    } else {
      posterScale = `transform: scale(0.2)!important;`;
    }

    let posterSubtitle;
    if (this.posterSubtitle !== '') {
      posterSubtitle = `display: block;`;
    } else {
      posterSubtitle = `display: none;`;
    }

    const styleString = html`
      <style>
        #poster-container {
          transform-origin: left top;
          ${posterScale}
        }
        #poster {
          position: absolute;
        }

        .poster-subtitle {
          ${posterSubtitle}
        }
      </style>
    `;

    return html`
      ${styleString}

      <div id="poster-container">
        <div id="poster" class="${posterDesigns[this.posterDesign]}">
          <div class="poster-grid">
            <div id="" class="starry-design-wrapper">
              <div id="starry-quadrent" class="starry-quadrent">
                <img
                  class="poster-quadrent-calendar-astro"
                  src="${this.getQuadrant()}"
                  loading="lazy"
                />

                <div class="svghtml-embed">
                  <planet-clock-element color="${this.color}" .posterDate="${this.posterDate}">
                  </planet-clock-element>
                </div>
              </div>
            </div>
            <div id="" class="poster-label">
              <h1 id="posterTitle" class="poster-title">
                <span
                  @input="${this.onDomChange}"
                  contenteditable="true"
                  data-property_name="posterTitle"
                  >${this.posterTitle}</span
                >
              </h1>

              <div id="posterSubtitle" class="poster-subtitle">
                <span
                  @input="${this.onDomChange}"
                  contenteditable="true"
                  data-property_name="posterSubtitle"
                  >${this.posterSubtitle}</span
                >
              </div>

              <p
                id="posterDate"
                data-property_name="posterDate"
                class="poster-date"
                contenteditable="false"
              >
                ${this.posterFormatedDate}

                <dom-module
                  id="custom-date-picker--supercustom"
                  theme-for="vaadin-date-picker vaadin-text-field"
                >
                  <template>
                    <style>
                      :host([theme~='custom']),
                      :host([theme~='custom']) .vaadin-text-field-container,
                      :host([theme~='custom']) .vaadin-text-area-container {
                        all: initial;

                        /* opacity: 0; */
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        display: block;
                        background-color: transparent;
                      }
                    </style>
                  </template>
                </dom-module>

                <dom-module id="custom-date-picker--text" theme-for="vaadin-text-field">
                  <template>
                    <style>
                      /* :host([theme~='custom']), */
                      :host([theme~='custom']) div {
                        display: none !important;
                      }
                    </style>
                  </template>
                </dom-module>

                <dom-module id="custom-date-picker--trsh" theme-for="vaadin-text-field">
                  <template>
                    <style>
                      /* :host([theme~='custom']) {
                        position: relative;
                        display: block;
                      } */

                      /* :host([theme~='custom']) {
                        all: initial;
                        * {
                          all: unset;
                        }
                      } */
                      /* :host([theme~='custom']) .vaadin-text-field-container {
                        display: block;
                      }
                      :host([theme~='custom']) .vaadin-text-field-container [part='input-field'] {
                        font-family: 'Barlow Semi Condensed', sans-serif;
                        font-weight: bold;
                        display: block;
                        background-color: transparent;
                        font-size: 4.7em;
                        line-height: 100%;
                      }
                      :host([theme~='custom']) .vaadin-text-field-container [part='input-field'] input {
                        text-align: center;
                      } */
                    </style>
                  </template>
                </dom-module>

                <dom-module
                  id="custom-date-picker--overlay"
                  theme-for="vaadin-date-picker-overlay-content"
                >
                  <template>
                    <style>
                      :host,
                      :host([theme~='custom']) {
                        opacity: 0.95;
                        /* background-color: blue; */
                      }
                    </style>
                  </template>
                </dom-module>

                <vaadin-date-picker
                  theme="custom"
                  id=""
                  class="poster-date"
                  @change="${this.onInputChange}"
                  data-property_name="posterDate"
                  initial-position="1990-01-01"
                  value="${this.posterDate.toISOString().slice(0, 10)}"
                >
                </vaadin-date-picker>
              </p>

              <p id="posterLocation" class="poster-location">
                <input
                  id="posterLocation-Input"
                  data-property_name="posterLocation"
                  name="bla"
                  class="poster-location"
                  placeholder="Amazing Place, Country, Location ..."
                  .value="${this.posterLocation}"
                  @input="${this.onInputChange}"
                />
              </p>
              <p
                id="posterCoordinates"
                data-property_name="posterCoordinates"
                class="poster-coordinates"
                contenteditable="false"
                @input="${this.onDomChange}"
              >
                ${this.posterCoordinates}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('poster-design-element', PosterDesignElement);
