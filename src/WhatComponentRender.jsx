import React from 'react';
import PropTypes from 'prop-types';
import Page1 from './pages/page1/Page1';
import Page2 from './pages/page2/Page2';

function WhatComponentRender(props) {
  const { match } = props;
  if (match.url === '/page2' && match.isExact) {
    return <Page2 />;
  }

  return <Page1 />;
}

WhatComponentRender.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    isExact: PropTypes.bool.isRequired,
  }).isRequired,
};

export default WhatComponentRender;
