import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => onPageChange(e.selected + 1)}
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
    />
  );
};

export default Pagination;
