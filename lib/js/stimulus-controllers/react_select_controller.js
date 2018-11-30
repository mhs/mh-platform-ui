function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Controller } from 'stimulus';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
export default class extends Controller {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "unmountComponent", () => {
      ReactDOM.unmountComponentAtNode(this.element);
    });
  }

  connect() {
    // const Component = window.ReactComponents[this.data.get('component')];
    let props = this.data.get('props') || {};

    if (typeof props === 'string') {
      props = JSON.parse(props);
    }

    const className = 'mh-select-container';
    const classNamePrefix = 'mh-select';

    const appliedProps = _objectSpread({
      className,
      classNamePrefix
    }, props);

    ReactDOM.render(React.createElement(Select, appliedProps), this.element);
    document.addEventListener('turbolinks:before-cache', this.unmountComponent);
  }

  disconnect() {
    document.removeEventListener('turbolinks:before-cache', this.unmountComponent);
  }

}