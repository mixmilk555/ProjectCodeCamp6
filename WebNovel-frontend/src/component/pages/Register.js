import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import Title from 'antd/lib/typography/Title';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppHeader from './header'
import AppFooter from './footer';
import axios from '../../config/axios'
import { withRouter } from 'react-router-dom'

const layout = {
    labelCol: { xs: 24, sm: 7, md: 6, lg: 6, xl: 5, xxl: 4 },
    wrapperCol: { xs: 24, sm: 17, md: 18, lg: 18, xl: 19, xxl: 20 },
};
function Register(props) {

    const onFinish = values => {
        // console.log('Received values of form: ', values);
        const body = {
            username: values.email,
            password: values.password
        }
        async function register() {
            try {
                await axios.post('/user/register', body)
                {
                    notification.success({
                        message: `User : ${values.email} ได้สมัครเรียบร้อยแล้ว`
                    })
                }
                props.history.push('/login')
            } catch (err) {
                {
                    notification.error({
                        message: `Username นี้มีผู้อื่นใช้งานแล้ว`
                    })
                }
            }
        }
        register()
    };

    return (
        <div className='main'>
            <Layout className='mainLayout'>
                <Header>
                    <AppHeader />
                </Header>
                <Content style={{ backgroundColor: "#F5F5DC" }}>
                    <div className='From-box'>
                        <Row justify="center" >
                            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                                <div
                                    className="Form"
                                >
                                    <Row justify="center">
                                        <Title level={2} className="Title">
                                            Register
                        </Title>
                                    </Row>
                                    <Divider className="Divider" />
                                    <Form
                                        {...layout}
                                        onFinish={onFinish}
                                        style={{ width: "100%" }}
                                    >
                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            label="Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item
                                            name="confirm"
                                            label="Confirm Password"
                                            hasFeedback
                                            dependencies={['password']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => {
                                                    return ({
                                                        validator(rule, value) {
                                                            if (!value || getFieldValue('password') === value) {
                                                                return Promise.resolve();
                                                            } else {
                                                                return Promise.reject("Confirm Password don't match")
                                                            }
                                                        }
                                                    })
                                                }
                                            ]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Row justify="center">
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                                                <Button style={{ width: "100%" }} className="Button" type="primary" htmlType="submit">
                                                    Submit
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
        </div>
    );
}
export default withRouter(Register);