import React from 'react';

import grumpyCat from '../../images/grumpy.svg';
import './styles.css';

const NotFound = () => (
    <div className="notFoundWrapper">
        <img src={grumpyCat} alt="Grumpy cat says nope, not found" />
        <p>Nope.</p>
    </div>
);

export default NotFound;
