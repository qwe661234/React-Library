import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';

const { Search } = Input;

class SearchBar extends Component {

    render() {
        return (
            <Search value={this.props.inputValue}
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={() => {this.props.handleSearch(this.props.inputValue)}}
                onChange={this.props.handleChange}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
    }
}

const mapDispatchToPops = (dispatch) => {
    return {
        handleChange(e) {
            const action = {
                type: 'handleChange',
                value: e.target.value
            }
            dispatch(action);
        },
        handleSearch() {
            const action = {
                type: 'handleSearch',
            }
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToPops)(SearchBar);