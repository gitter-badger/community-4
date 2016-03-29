import React from 'react';
import { Link } from 'react-router';

const NavigationLink = function navigationLink(props) {
  return <Link {...props} activeClassName="active" />;
};

export default NavigationLink;
