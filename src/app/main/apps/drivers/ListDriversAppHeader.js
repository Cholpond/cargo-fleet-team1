
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import _ from '@lodash';
import { makeStyles } from '@material-ui/core';
import ListdriverSide from './ListDriversSide';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#003737',
    background: 'linear-gradient(to right, #006565 0%, #003737 100%)',
    color: 'white'
  }
}));


function ListdriversAppHeader() {
  const user = useSelector(({ auth }) => auth.user);

  // 1 header style
  const classes = useStyles();
  return (
    <>
      <div className={`${classes.header} flex flex-col justify-between flex-1 min-w-0 px-24 pt-24 pb-24`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center min-w-0">
            {user.data.photoURL ? (
              <Avatar className="w-52 h-52 sm:w-64 sm:h-64" alt="user photo" src={user.data.photoURL} />
            ) : (
              <Avatar className="w-52 h-52 sm:w-64 sm:h-64">{user.data.displayName[0]}</Avatar>
            )}
            <div className="mx-12 min-w-0">
              <Typography className="text-18 sm:text-24 md:text-32 font-bold leading-none mb-8 tracking-tight">
                Welcome back, {user.data.displayName}!
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <ListdriverSide />
    </>
  );
}

export default ListdriversAppHeader;
