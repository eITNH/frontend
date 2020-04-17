import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';

import './css/main.css';

import Bootstrap from './js/Bootstrap';

render(<Bootstrap />, document.getElementById('app'));
