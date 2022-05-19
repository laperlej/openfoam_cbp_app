import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './components/approutes/approutes.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-complex-tree/lib/style.css';
import 'semantic-ui-css/semantic.min.css'

if (module.hot) {
    module.hot.accept();
}

const container = document.getElementById('app');
const root = createRoot(container)
root.render(
    <Router>
        <AppRoutes />
    </Router>,
);