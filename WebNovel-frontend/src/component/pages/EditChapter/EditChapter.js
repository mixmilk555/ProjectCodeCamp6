import React, { useEffect, useState } from 'react';
import { Input, Button, Row, Col, Divider, notification, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppHeader2 from '../header2'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from '../footer';
import axios from '../../../config/axios';
import { useParams, withRouter } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

function EditChapter(props) {
    const [chapterName, setChapterName] = useState([])
    const [input, setInput] = useState();
    const [text, setText] = useState('')

    let { id, chapterId } = useParams();

    const onFinish = values => {
        console.log('Success:', values);
    }
    const fetchStory = async () => {
        const httpResponse = await axios.get(`/chapter/${id}/${chapterId}`)
        setInput(httpResponse.data)
    }
    const fetchChapterName = async (id) => {
        const httpResponse = await axios.get(`/chapter/${id}`)
        setChapterName(httpResponse.data.find(item => item.id === +chapterId));
    }

    useEffect(() => {
        fetchStory()
        fetchChapterName(id)
    }, [])

    const createStory = async (id, chapterId) => {
        await axios.put(`/chapter/${id}/${chapterId}`, { story: input })
        fetchStory()
        props.history.push(`/createChapter/${id}`)
        notification.success({
            message: `ทำการสร้างเรียบร้อย`
        })
    }

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }

    const { TextArea } = Input;
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
                                            Chapter {chapterName.chapterName}
                                        </Title>
                                    </Row>
                                    <Divider className="Divider" />
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={input}
                                        onChange={(event, editor) => {
                                            const data = editor.getData()
                                            setText(data)
                                            setInput(data)
                                        }}
                                    />
                                    <br />
                                    <Button style={{ width: "auto" }} className="Button" type="primary" htmlType="submit" onClick={() => createStory(id, chapterId)}>
                                        Create
                                        </Button>
                                    <div>
                                        <h2><u>ตัวอย่าง เนื้อหาที่แสดง</u></h2>
                                        <p>{parse(text)}</p>
                                    </div>
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
export default withRouter(EditChapter);