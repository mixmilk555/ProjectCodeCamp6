import { List, Row, Col, Divider, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import AppHeader from './header';
import AppHeader2 from './header2';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from './footer';
import localStorageService from '../services/localStorageService';
import axios from '../../config/axios';
import { useParams, Link } from 'react-router-dom';

const { Text } = Typography;

export default function AllChapter() {
    const [novel, setNovel] = useState([]);
    const [titleNovel, setTitle] = useState({});

    let { id } = useParams();

    const fetchAllChapter = async (id) => {
        const httpResponse = await axios.get(`/chapter/novel/${id}`)
        httpResponse.data.filter(item => item.novel_id === +id)
        setNovel(httpResponse.data.filter(item => item.novel_id === +id));
    }

    const fetchAllNovel = async (id) => {
        const httpResponse = await axios.get(`/chapter/titleNovel/${id}`)
        let a = await httpResponse.data.find(item => item.id === +id)
         setTitle(a)
    }

    useEffect(() => {
        fetchAllChapter(id)
        fetchAllNovel(id)
    }, []);

    let content = <AppHeader />
    if (localStorageService.getRole() === 'user') {
        content = <AppHeader2 />
    }

    return (
        <div className="main" >
            <Layout className='mainLayout'>
                <Header>
                    {content}
                </Header>
                <Content style={{ backgroundColor: "#F5F5DC" }} >
                    <div className='From-box'>
                        <Row justify="center">
                            <Col xs={18} sm={18} md={14} lg={14} xl={14} xxl={12}>
                                <div className="Form" style={{ width: '100%' }}>
                                    <Row justify="center">
                                        <Col>
                                            <Row justify="center" style={{ fontSize: "1.5em" }} >
                                                <Text > </Text>
                                            </Row>
                                            <Divider />
                                            <Row justify="center" style={{ width: '100%' }}>
                                                <List style={{ width: "400px", borderStyle: 'groove', borderRadius: '10px', borderColor: '#EFE1CE', borderWidth: "7px" }}
                                                    header={<div>รายชื่อตอน</div>}
                                                    bordered
                                                    dataSource={novel}
                                                    renderItem={item => (
                                                        <List.Item >
                                                            <Link to={{ pathname: `/readPage/${id}/${item.id}` }}> {item.chapterName}</Link>
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
