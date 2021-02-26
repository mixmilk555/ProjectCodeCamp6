import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppHeader2 from './header2'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from './footer';
import axios from '../../config/axios'
import {withRouter} from 'react-router-dom'

const layout = {
    labelCol: { xs: 1, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
    wrapperCol: { xs: 23, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
};

function WritingPage(props) {
    const onFinish = values => {
        // console.log('Success:', values);
        const body = {
            title: values.title,
            plot: values.plot
        }
        axios.post('/novel/createnovel', body)
            .then(() => {
                notification.success({
                    message: `Create Success`
                })
                props.history.push('/myNovel')
            })
            .catch(err => {
                notification.error({
                    message: `ไม่สามารถสร้างได้`
                })
            })
    };

    return (
        <div className="main">
            <Layout className='mainLayout'>
                <Header>
                    <AppHeader2 />
                </Header>
                <Content style={{ backgroundColor: "#F5F5DC" }}>
                    <div className='From-box'>
                        <Row justify="center">
                            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                                <div className="Form">
                                    <Row justify="center">
                                        <Title level={2} className="Title">
                                            Create Novel
                    </Title>
                                    </Row>
                                    <Divider className="Divider" />
                                    <Form
                                        className="App"
                                        {...layout}
                                        onFinish={onFinish}
                                        style={{ width: "100%" }}
                                    >
                                        <Form.Item
                                            label="Title"
                                            name="title"
                                            rules={[{ required: true, message: 'Please input your Title!' }]}
                                        >
                                            <Input placeholder="Input Title Novel" />
                                        </Form.Item>

                                        <Form.Item
                                            label="Story:Introduction"
                                            name="plot"
                                            rules={[{ required: true, message: 'Please input your Story!' }]}
                                        >
                                            <Input.TextArea maxLength='450' style={{ height: '20vh' }} />
                                        </Form.Item>
                                        <Row justify="center">
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                                                <Button style={{ width: "50%" }} className="Button" type="primary" htmlType="submit">
                                                    Create
                                        </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Content>
                <Footer>
                    <AppFooter />
                </Footer>
            </Layout>
        </div >
    );
}
export default withRouter(WritingPage);