import { lazy } from 'react';

const ListDriversConfigApp = {
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

export default ListDriversConfigApp;
