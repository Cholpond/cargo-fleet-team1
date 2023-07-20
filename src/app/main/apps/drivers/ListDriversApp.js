import withReducer from 'app/store/withReducer';
import DriversDialog from './DriversDialog';
import ListDriversAppContent from './ListDriversAppContent';
import ListDriversAppHeader from './ListDriversAppHeader';
import driversReducer from './store';

function ListDriversApp() {
  return (
    <div>
      <ListDriversAppHeader />
      <DriversDialog/>
      <ListDriversAppContent />
    </div>
  );
}

export default withReducer('listDriversApp', driversReducer)(ListDriversApp);
