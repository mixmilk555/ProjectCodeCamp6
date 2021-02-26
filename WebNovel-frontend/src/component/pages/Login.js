import React from 'react';
import { Form, Input, Button, Row, Col, Divider, notification } from 'antd';
import { Link } from 'react-router-dom'
import Title from 'antd/lib/typography/Title';
import AppHeader from './header'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from './footer';
import axios from '../../config/axios';
import localStorageService from '../services/localStorageService'
import { withRouter } from 'react-router-dom'

const layout = {
    labelCol: { xs: 1, sm: 5, md: 4, lg: 5, xl: 4, xxl: 3 },
    wrapperCol: { xs: 23, sm: 19, md: 20, lg: 19, xl: 20, xxl: 21 },
};
function Login(props) {
    const onFinish = values => {
        // console.log('Success:', values);
        const body = {
            username: values.username,
            password: values.password
        }
        axios.post('/user/login', body)
            .then(result => {
                localStorageService.setToken(result.data.token);
                props.setRole("user")
                notification.success({
                    message: `เข้าสู่ระบบสำเร็จ`
                })
                props.history.push('/home2')
            }
            )
            .catch(err => {
                notification.error({
                    message: `Username or Password ไม่ถูกต้อง`
                })
            })

    };

    return (
        <div className="main">
            <Layout className='mainLayout'>
                <Header>
                    <AppHeader />
                </Header>
                <Content style={{ backgroundColor: "#F5F5DC" }}>
                    <div className='From-box'>
                        <Row justify="center">
                            <Col xs={23} sm={23} md={23} lg={14} xl={14} xxl={12}>
                                <div className="Form">
                                    <Row justify="center">
                                        <Title level={2} className="Title">
                                            Login
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
                                            label="Username"
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Row justify="space-around">
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                                                <Button style={{ width: "100%"}} className="Button" type="primary" htmlType="submit">
                                                    Login
                                        </Button>
                                            </Col>
                                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} >
                                                <Link to='/register'>
                                                    <Button style={{ width: "100%", marginLeft: "2rem" }} className="Button" type="primary">
                                                        Sing up </Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ marginTop: '7vh' }} />
                </Content>
                <Footer>
                    <AppFooter />
                </Footer>
            </Layout>
        </div >
    );
}

export default withRouter(Login);