import { Button, Row, Col, Input, BackTop } from 'antd';
import React, { useEffect, useState } from 'react';
import AppHeader from './header';
import AppHeader2 from './header2';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from './footer';
import { useParams, Link } from 'react-router-dom';
import axios from '../../config/axios';
import localStorageService from '.././services/localStorageService';
import parse from 'html-react-parser';

export default function ReadPage() {
    let { id, chapterId } = useParams()
    const [storyRead, setStory] = useState([]);

    const fetchStory = async (id, chapterId) => {
        const httpResponse = await axios.get(`/chapter/story/${id}/${chapterId}`)
        setStory(httpResponse.data)
        // console.log(httpResponse.data)
    }

    let content = <AppHeader />
    if (localStorageService.getRole() === 'user') {
        content = <AppHeader2 />
    }

    useEffect(() => {
        fetchStory(id, chapterId)
    }, [])
    let a = storyRead.story
    return (
        <div className="main" >
            <Layout className='mainLayout'>
                <Header>
                    {content}
                </Header>
                <Content style={{ backgroundColor: "#F5F5DC", width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' ,height:'100%' }} >

                    <div className='From-box'>
                        <Row justify='start' style={{marginLeft:'5%'}}>
                            <Button type="primary" style={{ width: 'auto' }}><Link to={{ pathname: `/allChapter/${id}` }}>กลับหน้าหลักนิยาย</Link></Button>
                        </Row>
                        <div className='Form'>
                            <Row justify="center" style={{ width: '100%', height: '100%' }}>
                                <Row>
                                    <Col span={24}>
                                        <h3><b> {storyRead.chapterName} </b></h3>
                                    </Col>
                                </Row>
                                <Row style={{ width: '100%', height: '90%', justifyContent: 'center' }}>
                                    <Col span={20} >
                                        <p>{parse(`${storyRead.story}`)}</p>
                                    </Col>
                                </Row>
                            </Row>
                        </div>
                    </div>
                </Content>
                <Footer>
                    <AppFooter />
                </Footer>
            </Layout>
        </div>
    )
}
