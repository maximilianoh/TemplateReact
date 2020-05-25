import React from 'react';
import PropTypes from 'prop-types';

export default function Page1(props) {
  const { msg } = props;
  return <div>{msg}</div>;
}
Page1.propTypes = {
  msg: PropTypes.string,
};

Page1.defaultProps = {
  msg: 'page 1',
};
