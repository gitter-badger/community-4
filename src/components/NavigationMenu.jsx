import React from 'react';
import NavigationLink from './NavigationLink';
import LogOut from './LogOut';

const NavigationMenu = function navigationMenu() {
  return (
    <ul role="nav">
      <li>
        <NavigationLink to="/" onlyActiveOnIndex>Home</NavigationLink>
      </li>
      <li>
        My profile
      </li>
      <li>
        <LogOut />
      </li>
    </ul>
  );
};

export default NavigationMenu;
