import React, { Component } from 'react';

import { Input } from 'antd';
import PropTypes from 'prop-types';

import { debounce } from 'lodash';
import styles from './SearchFilmInput.module.css';

class SearchFilmInput extends Component {
  debouncedFetching = debounce((query, page) => {
    const { renderCardListByQureyAndPage } = this.props;
    renderCardListByQureyAndPage(query, page);
  }, 500);

  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }

  onChangeHandle = (e) => {
    this.debouncedFetching(e.target.value, 1);
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Input
        placeholder="Type to search..."
        value={inputValue}
        onChange={this.onChangeHandle}
        size="large"
        className={styles.SearchFilmInput}
      />
    );
  }
}

SearchFilmInput.propTypes = {
  renderCardListByQureyAndPage: PropTypes.func.isRequired,
};

export default SearchFilmInput;
