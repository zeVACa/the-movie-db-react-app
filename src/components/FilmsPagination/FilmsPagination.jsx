import { Component } from 'react';

import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import styles from './FilmsPagination.module.css';

class FilmsPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  onChangeHandle = (page) => {
    const { renderCardListByQureyAndPage, query } = this.props;
    this.setState({ page });
    renderCardListByQureyAndPage(query, page);
  };

  render() {
    const { totalDataItems } = this.props;
    const { page } = this.state;
    return (
      <div className={styles.paginationArea}>
        <Pagination
          total={totalDataItems > 10000 ? 10000 : totalDataItems}
          pageSize="20"
          showSizeChanger={false}
          onChange={this.onChangeHandle}
          hideOnSinglePage
          current={page}
          defaultCurrent={1}
        />
      </div>
    );
  }
}

FilmsPagination.propTypes = {
  totalDataItems: PropTypes.number,
  renderCardListByQureyAndPage: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

FilmsPagination.defaultProps = {
  totalDataItems: 1,
};

export default FilmsPagination;
