import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import styles from './FilmsPagination.module.css';

function FilmsPagination({ totalDataItems, renderCardListByQureyAndPage }) {
  const onChangeHandle = (page) => {
    renderCardListByQureyAndPage('return', page);
  };

  return (
    <div className={styles.paginationArea}>
      <Pagination
        defaultCurrent={1}
        total={totalDataItems > 10000 ? 10000 : totalDataItems}
        pageSize="20"
        showSizeChanger={false}
        onChange={onChangeHandle}
      />
    </div>
  );
}

FilmsPagination.propTypes = {
  totalDataItems: PropTypes.number,
  renderCardListByQureyAndPage: PropTypes.func.isRequired,
};

FilmsPagination.defaultProps = {
  totalDataItems: 1,
};

export default FilmsPagination;
