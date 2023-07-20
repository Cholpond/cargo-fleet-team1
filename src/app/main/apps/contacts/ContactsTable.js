import { forwardRef, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import ContactsTablePaginationActions from './ContactsTablePaginationActions';
import { openAssignDialog, openNewContactDialog, openUnassignDialog } from './store/contactsSlice';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <Checkbox ref={resolvedRef} {...rest} />
    </>
  );
});

const assignButtonStyles = {
  borderRadius: '10px',
  padding: '7px',
  fontSize: 'inherit',
  backgroundColor: '#FEBE2C',
  color: 'black',
  width: '90px'
};

const EnhancedTable = ({ columns, data, onRowClick }) => {
  console.log('columns', columns);
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      autoResetPage: true
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(_columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          sortable: false,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} onClick={ev => ev.stopPropagation()} />
            </div>
          )
        },
        ..._columns
      ]);
    }
  );
  const dispatch = useDispatch();

  //5 create function to open dialog assignDialog/unassignDialog
  const assignHandler = (e, id) => {
    e.stopPropagation();
    dispatch(openAssignDialog(id));
  };

  const unassignHandler = (e, id) => {
    e.stopPropagation();
    dispatch(openUnassignDialog(id));
  };

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };
  console.log('page', page);
  // Render the UI for your table
  return (
    <div className="flex flex-col min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
      <TableContainer className="flex flex-1">
        <Table {...getTableProps()} stickyHeader className="simple borderless">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    className="whitespace-nowrap p-4 md:p-12"
                    {...(!column.sortable
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render('Header')}
                    {column.sortable ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={ev => onRowClick(ev, row)}
                  className="truncate cursor-pointer"
                >
                  {row.cells.map(cell => {
                    // console.log(cell, 'cell');

                    //4 to change assign/unassign button on vehacle table
                    if (cell.column.Header === 'Assignment') {
                      const value = !row.original?.driver ? (
                        <Button
                          style={assignButtonStyles}
                          variant="primary"
                          color="secondary"
                          onClick={e => assignHandler(e, row.original)}
                        >
                          {' '}
                          Assign
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ ...assignButtonStyles, ...{ backgroundColor: '#006565', color: 'white' } }}
                          onClick={e => unassignHandler(e, row.original)}
                        >
                          {' '}
                          Unassign
                        </Button>
                      );
                      return (
                        <TableCell {...cell.getCellProps()} className={clsx('p-4 md:p-12', cell.column.className)}>
                          {cell.render('Cell')}
                          {value}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell {...cell.getCellProps()} className={clsx('p-4 md:p-12', cell.column.className)}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        classes={{
          root: 'flex-shrink-0 border-t-1'
        }}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
        colSpan={5}
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: false
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={ContactsTablePaginationActions}
      />
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func
};

export default EnhancedTable;
