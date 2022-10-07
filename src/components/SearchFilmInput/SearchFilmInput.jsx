import React, { Component } from 'react';

import { Input } from 'antd';

import styles from './SearchFilmInput.module.css';

export default class SearchFilmInput extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  }

  onChangeHandle = (e) => {
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
