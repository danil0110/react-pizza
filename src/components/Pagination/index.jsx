import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/filtersSlice';

import styles from './Pagination.module.scss';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filters.currentPage);

  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='<'
      renderOnZeroPageCount={null}
      containerClassName={styles.container}
      pageClassName={styles.item}
      pageLinkClassName={styles.link}
      activeClassName={styles.active}
      previousClassName={styles.item}
      previousLinkClassName={styles.link}
      nextLinkClassName={styles.link}
      nextClassName={styles.item}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
