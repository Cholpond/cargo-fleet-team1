
import withReducer from 'app/store/withReducer';
import DriversDialog from './driversDialog';
import ListDriversAppContent from './ListDriversAppContent';
import ListDriversAppHeader from './ListDriversAppHeader';
import driversReducer from './store';
import ListDriverAppCard from './ListDriversAppCard';

function ListDriversApp() {
  return (
    <div>
      <ListDriversAppHeader />
      <DriversDialog />
      <ListDriversAppContent />
      <ListDriverAppCard />
    </div>
  );
}

export default withReducer('listDriversApp', driversReducer)(ListDriversApp);