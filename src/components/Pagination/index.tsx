import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (e: { selected: number }) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={onPageChange}
      pageRangeDisplayed={4}
      pageCount={pageCount}
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
