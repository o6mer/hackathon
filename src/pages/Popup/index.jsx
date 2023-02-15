import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

import Popup from './Popup';
import './index.css';

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);
ReactDOM.render(<Popup />, app);
