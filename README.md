# mh-platform-ui
Styles and js components for MH projects.

# Consuming styles and js components

## Styles

The platform css is built using [tailwind css](https://tailwindcss.com/). Tailwind is a css framework that builds with utility classes first.
You'll need to do two things to customize the platform for your application.

### 1. Inherit from the platform tailwind configuration
You can import `src/styles/mh-platform-tailwind.js` and then override its members in your applications's tailwind configuration.

### 2. Importing the platform styles in the correct order.

The platform has three scss files you'll need to import into your app's stylesheet.  You'll provide most of your customizations after importing `components.scss`.
Below is an example of the `application.scss` file that the sample page in this repo uses.

```scss
// This is an example of how to consume the platform styles.
// The preflight includes the tailwind preflight and the fontawesome fonts.
@import './preflight.scss';

// Components brings in the tailwind component system and declares all the component classes
// for forms, buttons, etc
@import './components.scss';
// Override the platform component styles after importing them, and add any application-specific component
// declarations here


// Utilities are the tailwind utility classes
@import './utilities.scss';
```

# Viewing the default styles
Run `npm start` to create a webpack dev server and go to `localhost:8080`


## Js components

This repo provides a set of [stimulus](https://stimulusjs.org/) controllers that manage javascript
components, for instance a [react-select](https://react-select.com/home) underpins a typeahead dropdown
and a bootstrap-style dropdown button.

You can import and load the platform's controllers alonside the ones for your own application.
Here's an example from a rails app.


```js
import Rails from 'rails-ujs';
import Turbolinks from 'turbolinks';
import {
  Application
} from "stimulus"
import {
  definitionsFromContext
} from "stimulus/webpack-helpers"

Rails.start();
Turbolinks.start();

// start the stimulus app
const application = Application.start()

// load controllers from our local application
const context = require.context("./stimulus-controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

// load the platform's controllers
const context = require.context("mh-platform-ui/src/js/stimulus-controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
```