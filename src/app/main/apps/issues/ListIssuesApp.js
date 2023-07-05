
import withReducer from 'app/store/withReducer';
import IssuesDialog from './issuesDialog';
import ListissuesAppContent from './ListIssuesAppContent';
import ListissuesAppHeader from './ListIssuesAppHeader';
import issuesReducer from './store';

function ListissuesApp() {
  return (
    <div>
      <ListissuesAppHeader />
      <IssuesDialog />
      <ListissuesAppContent />
    </div>
  );
}

export default withReducer('listissuesApp', issuesReducer)(ListissuesApp);