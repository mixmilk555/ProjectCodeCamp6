import { List, Input, Button, Row, Col, Divider, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import AppHeader2 from '../header2';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from '../footer';
import UpdateChapter from './updateChapter';
import axios from '../../../config/axios';
import { useParams } from 'react-router-dom';

const { Text } = Typography;

export default function MyChapter() {
    const [myChapterName, setMyChapterName] = useState([]);
    const [input, setInput] = useState();
    const [novelTitle, setNovelTitle] = useState({});

    let { id } = useParams();

    const fetchNovel = async () => {
        const httpResponse = await axios.get('/novel/mynovel')
        httpResponse.data.find(item => item.id === +id)
        setNovelTitle(httpResponse.data.find(item => item.id === +id));
        // console.log(a)
    }

    const fetchAllChapter = async (id) => {
        const httpResponse = await axios.get(`/chapter/${id}`)
        setMyChapterName(httpResponse.data);
        // console.log(httpResponse.data)
    }

    useEffect(() => {
        fetchNovel()
        fetchAllChapter(id)
    }, [])


    const addChapterName = async (id) => {
        await axios.post(`/chapter/${id}`, { chapterName: input})
        fetchAllChapter(id);
        setInput("");
        
    }

    const deleteNovel = async (id,chapterId) => {
        await axios.delete(`/chapter/${id}/${chapterId}`);
        fetchAllChapter(id);
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
                            <Col xs={18} sm={18} md={14} lg={14} xl={14} xxl={12} >
                                <div className="Form" style={{ width: '100%' }}>
                                    <Row justify="center">
                                        <Col>
                                            <Row justify="center" style={{ fontSize: "1.5em" }} >
                                                <Text > Create Chapter Name</Text>
                                            </Row>
                                            <Row>
                                                <Col span={20}>
                                                    <Input name="input" value={input} onChange={(e) => setInput(e.target.value)} />
                                                </Col>
                                                <Col span={4}>
                                                    <Button style={{ width: "100%" }} onClick={()=>addChapterName(id)}>Add</Button>
                                                </Col>
                                            </Row>
                                            <Divider />
                                            <Row justify="center" style={{ width: '100%' }}>
                                                <List style={{ width: "400px", borderStyle: 'groove', borderRadius: '10px', borderColor: '#EFE1CE', borderWidth: "7px" }}
                                                    header={<div className="List-header"><b><u>{novelTitle.title}</u></b></div>}
                                                    bordered
                                                    dataSource={myChapterName}
                                                    renderItem={item => (
                                                        <List.Item >
                                                            <UpdateChapter data={item} deletes={deleteNovel} fetchData={fetchAllChapter} idNovel={id}/>
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
