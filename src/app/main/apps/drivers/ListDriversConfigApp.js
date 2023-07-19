

import { lazy } from 'react';

const ListdriversConfigApp = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/drivers',
      component: lazy(() => import(`./ListDriversApp`))
    }
  ]
};

export default ListdriversConfigApp;
