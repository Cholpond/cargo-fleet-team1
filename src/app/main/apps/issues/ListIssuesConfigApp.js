import { lazy } from 'react';

const ListissuesConfigApp = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/issues',
      component: lazy(() => import(`./ListIssuesApp`))
    }
  ]
};

export default ListissuesConfigApp;
