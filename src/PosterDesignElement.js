import {
  html,
  css,
  LitElement,
  unsafeCSS
} from 'lit-element';


const sheet = new CSSStyleSheet();

// set its contents by referencing a file
sheet.replace('@import url("./src/style.css")')
  .then(sheet => {
    console.log('Styles loaded successfully');
  })
  .catch(err => {
    console.error('Failed to load:', err);
  });


export class PosterDesignElement extends LitElement {
  static get styles() {
    // return css`
    //   :host {
    //     --poster-design-element-text-color: #000;

    //     display: block;
    //     padding: 25px;
    //     color: var(--poster-design-element-text-color);
    //   }
    // `;
    // const request = new XMLHttpRequest();
    // request.open('GET', '/src/style.css', false);
    // request.send();

    // return [
    //   css `${unsafeCSS(request.responseText)}`
    // ];
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      counter: {
        type: Number
      },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.counter = 5;
    this.shadowRoot.adoptedStyleSheets = [sheet];

  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return html `
      <h2>${this.title} Nr. ${this.counter}!</h2>
      
      <button @click=${this.__increment}>increment</button>




<div id="poster_box" class="poster-frame-preview print" style="">
	<div class="poster-frame-inner-container">
		<div id="poster" class="poster w-node-8ec960d784d5-60d784d5 cosmic-latte print" data-ix="new-interaction">
			<div class="border-grid">
				<div id="w-node-8ec960d784d7-60d784d5" class="circle-wrap">
					<div id="circle-wrapper-quadrent" class="circle-wrapper-quadrent"><img
							src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant.png"
							srcset="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant-p-500.png 500w, https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant-p-800.png 800w, https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851e61967da18_new%20quadrant.png 1000w"
							sizes="100vw" alt="" class="poster-quadrent-calendar-astro-black"><img
							src="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white.png"
							srcset="https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white-p-500.png 500w, https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white-p-800.png 800w, https://uploads-ssl.webflow.com/5c982a546929129ffbb9a2cc/5d165ecedb0851771d67da17_new%20quadrant%20white.png 1000w"
							sizes="(max-width: 479px) 50vw, (max-width: 767px) 73vw, 379.0234375px" alt=""
							class="poster-quadrent-calendar-astro-white">
						<div class="svghtml-embed w-embed">


<planet-clock-element color="pink">
	<noscript>
		Could not render the custom element. Check that JavaScript is enabled.
	</noscript>
</planet-clock-element>

						</div>
					</div>
				</div>
				<div id="w-node-8ec960d784dc-60d784d5" class="poster-label">
					<h1 id="posterTitle" class="poster-title">Name Of Someone You LOVE<br></h1>
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
