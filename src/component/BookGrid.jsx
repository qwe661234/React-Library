import React, { Component, Fragment } from 'react';
import { Form, Input, Table, Space, Button, Modal, DatePicker } from 'antd';
import { connect } from 'react-redux';

const { Column, ColumnGroup } = Table;


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

<Form />;

class BookGrid extends Component {

  componentDidMount() {
    this.props.getBook();
  }

  render() {
    return (
      <Fragment>
        <Table dataSource={this.props.bookInLocalStorage}>
          <ColumnGroup title="Book">
            <Column
              title='書籍編號'
              dataIndex='BookId'
              key='BookId' />
            <Column
              title='書籍種類'
              dataIndex='BookCategory'
              key='BookCategory' />
            <Column
              title='書名'
              dataIndex='BookName'
              key='BookName' />
            <Column
              title='作者'
              dataIndex='BookAuthor'
              key='BookAuthor'
            />
            <Column
              title='購書日期'
              dataIndex='BookBoughtDate'
              key='BookBoughtDate' />
            <Column
              title='出版社'
              dataIndex='BookPublisher'
              key='BookPublisher' />
          </ColumnGroup>
          <ColumnGroup title="Action">
            <Column
              title="Delete"
              key="delete"
              render={(record) => (
                <Space size="middle">
                  <Button onClick={() => { this.props.deleteBook(record.BookId) }}>Delete</Button>
                </Space>
              )}>
            </Column>
            <Column
              title="Modify"
              key="modify"
              render={(record) => (
                <Space size="middle">
                  <Button onClick={() => { this.props.showModal(record.BookId) }}>Modify</Button>
                </Space>
              )}>
            </Column>
          </ColumnGroup>
        </Table>

        <Modal
          title="Modify Page"
          visible={this.props.isModalVisible}
          onCancel={this.props.closeModal}
          footer={null}
        >
          <Form
            name="modifyForm"
            {...layout}
            fields={this.props.targetBook}
            onFinish={ (val) => {this.props.submitForm(val)}}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="書籍編號"
              name="BookId"
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="書名"
              name="BookName"
              rules={[{ required: true, message: 'Please input your book name!' }]}
            >
              <Input />
            </Form.Item>
                
            <Form.Item
              label="作者"
              name="BookAuthor"
              rules={[{ required: true, message: 'Please input your book author!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="購書日期"
              name="BookBoughtDate"
              rules={[{ required: true, message: 'Please input your book bought date!' }]}
            >
             <DatePicker format={"YYYY-MM-DD"} ></DatePicker>
            {/* <Input></Input> */}
            </Form.Item>

            <Form.Item
              label="書籍種類"
              name="BookCategory"
              rules={[{ required: true, message: 'Please input book category!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="出版社"
              name="BookPublisher"
              rules={[{ required: true, message: 'Please input book publisher!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Form.Item>
          </Form>
        </Modal>
      </Fragment>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    bookInLocalStorage: state.bookInLocalStorage,
    isModalVisible: state.isModalVisible,
    targetBook: state.targetBook
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
    },
    showModal(value) {
      const action = {
        type: "showModal",
        value
      }
      dispatch(action);
    },
    closeModal() {
      const action = {
        type: "closeModal",
      }
      dispatch(action);
    },
    submitForm(val) {
      const action = {
        type: "submitForm",
        data: val,
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToPops)(BookGrid);
