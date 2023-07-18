
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HomeTab.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar } from '@material-ui/core';
import { getdashBoard } from '../store/dashBoardSlice';
import Widget1 from '../widgets/Widget1';
import Widget2 from '../widgets/Widget2';
import Widget3 from '../widgets/Widget3';
import Widget4 from '../widgets/Widget4';
import Widget5 from '../widgets/Widget5';
import Widget6 from '../widgets/Widget6';
import Widget7 from '../widgets/Widget7';
import Widget8 from '../widgets/Widget8';
import Widget9 from '../widgets/Widget9';
import Widget10 from '../widgets/Widget10';
import Widget11 from '../widgets/Widget11';
import Widget12 from '../widgets/Widget12';
import { selectWidgets } from '../store/widgetsSlice';


const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
function HomeTab() {
  // const dashboard = useSelector(selectDashBoard);
  // console.log(dashboard);
  const dispatch = useDispatch();
  const drivers = useSelector(state => state.projectDashboardApp.dashboard.drivers);
  const issues = useSelector(state => state.projectDashboardApp.dashboard.issues);
  const vehicles = useSelector(state => state.projectDashboardApp.dashboard.vehicles);
  const widgets = useSelector(selectWidgets);

  const classes = useStyles();

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    dispatch(getdashBoard());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <Card className="item1">
        <Link to="/apps/issues/all">
          <AppBar position="static" elevation={0}>
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit" align="center">
                ISSUES
              </Typography>
            </Toolbar>
          </AppBar>

          <div className="itemData dataContentSmall">
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.issues.open || 0} */}
                {issues ? issues.open : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                open
              </Typography>
            </div>
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.issues.overdue || 0} */}
                {issues ? issues.overdue : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                overdue
              </Typography>
            </div>
          </div>
        </Link>
      </Card>
      <Card className="item2">
        <Link to="/apps/vehicles/all">
          <AppBar position="static" elevation={0}>
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit">
                VEHICLES
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="itemData dataContentBig">
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.vehicles.assigned || 0} */}
                {vehicles ? vehicles.assigned : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                assigned
              </Typography>
            </div>
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.vehicles.unassigned || 0} */}
                {vehicles ? vehicles.unassigned : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                unasigned
              </Typography>
            </div>
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.vehicles.active || 0} */}
                {vehicles ? vehicles.active : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                active
              </Typography>
            </div>
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.vehicles.archived || 0} */}
                {vehicles ? vehicles.archived : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                archived
              </Typography>
            </div>
          </div>
        </Link>
      </Card>
      <Card className="item3">
        <Link to="/apps/drivers/all">
          <AppBar position="static" elevation={0}>
            <Toolbar className="flex w-full">
              <Typography variant="subtitle1" color="inherit">
                DRIVERS
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="itemData dataContentSmall">
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.drivers.active || 0} */}
                {drivers ? drivers.active : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                active
              </Typography>
            </div>
            <div className="visible">
              <Typography variant="h4" gutterBottom>
                {/* {dashboard.data.drivers.archived || 0} */}
                {drivers ? drivers.archived : 0}
              </Typography>
              <Typography variant="h6" gutterBottom>
                ARCHIVED
              </Typography>
            </div>
          </div>
        </Link>
      </Card>
  
    <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget1 widget={widgets.widget1} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget2 widget={widgets.widget2} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget3 widget={widgets.widget3} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
        <Widget4 widget={widgets.widget4} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
        <Widget5 widget={widgets.widget5} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
        <Widget8 widget={widgets.widget8} />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full p-12">
        <Widget12 widget={widgets.widget12} />
      </motion.div>
    </motion.div>
  </div>
  );
}

export default HomeTab;
