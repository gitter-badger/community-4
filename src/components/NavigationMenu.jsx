import React from 'react';
import NavigationLink from './NavigationLink';

const NavigationMenu = function navigationMenu() {
  return (
    <ul role="nav">
      <li>
        <NavigationLink to="/" onlyActiveOnIndex>Home</NavigationLink>
      </li>
      <li>
        <NavigationLink to="/users">User List</NavigationLink>
      </li>
    </ul>
  );
};

export default NavigationMenu;
