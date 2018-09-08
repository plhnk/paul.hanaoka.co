import React, { Component } from 'react';
import Icon from '../../atoms/Icon';
import {ICONS} from '../../../utilities/constants.js';
// eslint-disable-next-line 
import styles from "./nightmode.module.css";

class NightMode extends Component {
  constructor(props) {
    super(props);

    this.css = `
      html { filter: invert(100%); background: #fff; }
    `;

    if (this.props.preserveRasters) {
      this.css += 'svg, img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';
    }

    // this.supported = this.isDeclarationSupported('filter', 'invert(100%)');

    this.state = {
      active: false
    };

    this.toggle = this.toggle.bind(this);
  }

  // isDeclarationSupported (property, value) {
  //   var prop = property + ':',
  //       el = document.createElement('test'),
  //       mStyle = el.style;
  //   el.style.cssText = prop + value;
  //   return mStyle[property];
  // }

  toggle() {
    this.setState({
      active: !this.state.active
    });
  }

  // componentDidMount() {
  //   if (this.props.store) {
  //     this.setState({
  //       supported: this.isDeclarationSupported('filter', 'invert(100%)'),
  //       active: this.props.store.getItem(this.props.storeKey) || false
  //     });
  //   }
  // }

  // componentDidUpdate() {
  //   if (this.props.store) {
  //     this.props.store.setItem(this.props.storeKey, this.state.active);
  //   }
  // }

  render() {
    // if (!this.supported) {
    //   return null;
    // }

    return (
      <div>
        <button aria-pressed={this.state.active} onClick={this.toggle}>
          <Icon color="var(--main)" icon={ICONS["night-mode"]} />
        </button>
        <style media={this.state.active ? 'none' : 'screen'}>
          {this.state.active ? this.css.trim() : this.css}
        </style>
      </div>
    );
  }
}

NightMode.defaultProps = {
  preserveRasters: true,
  // store: localStorage,
  storeKey: 'NightMode',
}

export default NightMode;