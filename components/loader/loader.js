import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import dataTests from '../global/data-tests';

import LoaderCore from './loader__core';

/**
 * @name Loader
 */
/**
 * Displays a large animated loader with an optional caption. Typical use cases: page loading animation, major action animation.
 */
export default class Loader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    colors: PropTypes.array,
    message: PropTypes.string,
    'data-test': PropTypes.string,
    stop: PropTypes.bool,
    deterministic: PropTypes.bool
  };

  componentDidUpdate(prevProps) {
    if (this.loader) {
      if (!prevProps.stop && this.props.stop) {
        this.loader.stopAnimation();
      } else if (prevProps.stop && !this.props.stop) {
        this.loader.startAnimation();
      }
    }
  }

  componentWillUnmount() {
    this.loader.destroy();
  }

  initLoader = el => {
    if (el) {
      this.loader = new LoaderCore(el, this.props);
    }
  };

  render() {
    const {
      message,
      size,
      colors,
      'data-test': dataTest,
      stop,
      deterministic,
      ...restProps
    } = this.props;

    return (
      <div
        data-test={dataTests('ring-loader', dataTest)}
        {...restProps}
        ref={this.initLoader}
      />
    );
  }
}
