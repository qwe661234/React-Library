import React, { Component } from 'react';
import { Table, Space, Button } from 'antd';
import { connect } from 'react-redux';

const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: '書籍編號',
    dataIndex: 'BookId',
    key: 'BookId',
  },
  {
    title: '書籍種類',
    dataIndex: 'BookCategory',
    key: 'BookCategory',
  },
  {
    title: '書名',
    dataIndex: 'BookName',
    key: 'BookName',
  },
  {
    title: '作者',
    dataIndex: 'BookAuthor',
    key: 'BookAuthor',
  },
  {
    title: '購書日期',
    dataIndex: 'BookBoughtDate',
    key: 'BookBoughtDate',
  },
  {
    title: '出版社',
    dataIndex: 'BookPublisher',
    key: 'BookPublisher',
  },
  {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <Space size="middle">
        <Button > Delete </Button>
      </Space>
    ),
  },
];


class BookGrid extends Component {

  componentDidMount() {
    this.props.getBook();
  }

  render() {
    return (
    <Table dataSource={this.props.bookInLocalStorage}>
       <ColumnGroup title="Book">
      <Column title= '書籍編號' dataIndex= 'BookId'  key= 'BookId'/>
      <Column title= '書籍種類'
    dataIndex= 'BookCategory'
    key='BookCategory' />
    <Column title= '書名'
    dataIndex= 'BookName'
    key= 'BookName'/>
    <Column 
    title= '作者'
    dataIndex= 'BookAuthor'
    key= 'BookAuthor'
  />
    <Column title= '購書日期'
    dataIndex= 'BookBoughtDate'
    key= 'BookBoughtDate'/>
    <Column title= '出版社'
    dataIndex= 'BookPublisher'
    key= 'BookPublisher'/>
    </ColumnGroup>
    <Column title="Action"
      key="action"
      render={(record) => (
        <Space size="middle">
          <Button onClick={() => { this.props.deleteBook(record.BookId) }}>Delete</Button>
        </Space>
      )}></Column>
    </Table>
      );

  }

}

const mapStateToProps = (state) => {
  return {
    bookInLocalStorage: state.bookInLocalStorage,
  }
}

const mapDispatchToPops = (dispatch) => {
  return {
    getBook() {
      const action = {
        type: "getBookData",
      }
      dispatch(action);
    },
    deleteBook(value) {
      const action = {
        type: "deleteBook",
        value
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToPops)(BookGrid);
