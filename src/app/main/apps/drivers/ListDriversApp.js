
import withReducer from 'app/store/withReducer';
import DriversDialog from './driversDialog';
import ListdriversAppContent from './ListDriversAppContent';
import ListdriversAppHeader from './ListDriversAppHeader';
import driversReducer from './store';

function ListdriversApp() {
  return (
    <div>
      <ListdriversAppHeader />
      <DriversDialog />
      <ListdriversAppContent />
    </div>
  );
}

export default withReducer('listdriversApp', driversReducer)(ListdriversApp);