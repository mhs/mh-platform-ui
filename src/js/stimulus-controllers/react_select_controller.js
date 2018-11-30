import {
  Controller
} from 'stimulus';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select'

export default class extends Controller {
  connect() {
    // const Component = window.ReactComponents[this.data.get('component')];
    let props = this.data.get('props') || {};
    if (typeof props === 'string') {
      props = JSON.parse(props);
    }

    const className = 'mh-select-container';
    const classNamePrefix = 'mh-select';

    const appliedProps = {
      className,
      classNamePrefix,
      ...props
    };

    ReactDOM.render( <
      Select { ...appliedProps
      }
      />,
      this.element,
    );

    document.addEventListener('turbolinks:before-cache', this.unmountComponent);
  }

  disconnect() {
    document.removeEventListener('turbolinks:before-cache', this.unmountComponent);
  }

  unmountComponent = () => {
    ReactDOM.unmountComponentAtNode(this.element);
  }
}