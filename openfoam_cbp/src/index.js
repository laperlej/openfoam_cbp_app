import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/approutes/approutes.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-complex-tree/lib/style.css';
import 'semantic-ui-css/semantic.min.css'

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
<Router>
    <AppRoutes />
</Router>,
document.getElementById('app'));