import React, { Component, Fragment } from 'react'
import { Form, Button, Input, Modal, DatePicker } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

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

class AddBookPage extends Component {
    render() {
        return (
            <Fragment>
                <Button onClick={this.props.showAddModal} type="primary" block>
                    Add Book
                </Button>
                <Modal visible={this.props.isAddModalVisable} title="Add Book" footer={null} onCancel={this.props.closeAddModal}>
                    <Form
                        name="modifyForm"
                        {...layout}
                        onFinish={(val) => { 
                            val.BookId = this.props.Bookdata[this.props.Bookdata.length - 1].BookId + 1;
                            this.props.addBook(val) 
                        }}
                    >
                        <Form.Item
                            label="書籍編號"
                            name="BookId"
                            hidden={true}
                        >
                            <Input disabled={true}/>
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAddModalVisable: state.isAddModalVisable,
        Bookdata: state.Bookdata
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showAddModal() {
            const action = {
                type: "showAddModal",
            }
            dispatch(action);
        },
        closeAddModal() {
            const action = {
                type: "closeAddModal",
            }
            dispatch(action);
        },
        addBook(value) {
            value.BookBoughtDate = value.BookBoughtDate.format("YYYY-MM-DD");
            axios.post("http://localhost:3001/insert", value)
            .then(() => {
                axios.post("http://localhost:3001/read")
                .then((res) => {
                    const action = {
                        type: "addBook",
                        data: res.data,
                    }
                    dispatch(action);
                })
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);