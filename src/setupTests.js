// @flow
/* eslint-disable import/no-extraneous-dependencies,import/first */

import './shim'; // TODO: remove after "react-scripts": "1.0.14",
import 'jest-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// get rid of warnings in in "react-scripts": "1.0.14"
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener() {},
    removeListener() {},
  }));
