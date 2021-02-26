import { List, Input, Button, Row, Col, Divider, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import AppHeader2 from '../header2';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import TitleNovel from './TitleNovel'
import AppFooter from '../footer';
import axios from '../../../config/axios'

const { Text } = Typography;

export default function MyNovel() {
    const [myNovel, setMyNovel] = useState([]);

    const fetchAllMyNovel = async () => {
        const httpResponse = await axios.get('/novel/mynovel')
        setMyNovel(httpResponse.data);
        // console.log(httpResponse.data)
    }

    useEffect(() => {
        fetchAllMyNovel();
    }, []);

    const deleteNovel = async (id) => {
        await axios.delete(`/novel/createnovel/${id}`);
        fetchAllMyNovel();
    }

    return (
        <div className="main" >
            <Layout className='mainLayout'>
                <Header>
                    <AppHeader2 />
                </Header>
                <Content style={{ backgroundColor: "#F5F5DC" }} >
                    <div className='From-box'>
                        <Row justify="center">
                            <Col xs={18} sm={18} md={14} lg={14} xl={14} xxl={12}>
                                <div className="Form" style={{ width: '100%' }}>
                                    <Row justify="center">
                                        <Col>
                                            <Row justify="center" style={{ fontSize: "1.5em" }} >
                                                <Text > My Novel</Text>
                                            </Row>
                                            <Divider />
                                            <Row justify="center" style={{ width: '100%' }}>
                                                <List style={{ width: "400px", borderStyle: 'groove', borderRadius: '10px', borderColor: '#EFE1CE', borderWidth: "7px" }}
                                                    header={<div>My Novel</div>}
                                                    bordered
                                                    dataSource={myNovel}
                                                    renderItem={item => (
                                                        <List.Item >
                                                            <TitleNovel data={item} deletes={deleteNovel} fetchData={fetchAllMyNovel} />
                                                        </List.Item>
                                                    )}
                                                />
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Divider className="Divider" />
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

    )
}
