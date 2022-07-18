import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../store/slices/filtersSlice';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel='<'
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
