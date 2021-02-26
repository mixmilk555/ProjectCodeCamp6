import React, { useEffect, useState } from 'react';
import { Input, Button, Row, Col, Divider, notification, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppHeader2 from '../header2'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppFooter from '../footer';
import axios from '../../../config/axios';
import { useParams, withRouter } from 'react-router-dom';
// import { Editor } from '@tinymce/tinymce-react';

function EditChapter(props) {
    const [chapterName, setChapterName] = useState([])
    const [input, setInput] = useState();

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
                                    {/* <Editor
                                        apiKey='akdhudnhvns6ykb3fxrew4hueejci6310tmn1foyyu3yyzzn'
                                        initialValue="<p>This is the initial content of the editor</p>"
                                        value={input}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic backcolor | \
                                                 alignleft aligncenter alignright alignjustify | \
                                                 bullist numlist outdent indent | removeformat | help'
                                        }}
                                        onEditorChange={handleEditorChange}
                                        onClick={() => createStory(id, chapterId)}
                                    /> */}
                                    <Form onFinish={onFinish}>
                                        <Form.Item label="Story">
                                            <TextArea className="textarea" bordered={true} name='description' value={input} style={{ height: '20vh' }}
                                                onChange={(e) => setInput(e.target.value)} />
                                        </Form.Item>
                                        <Button style={{ width: "20%" }} className="Button" type="primary" htmlType="submit" onClick={() => createStory(id, chapterId)}>
                                            Create
                                        </Button>
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
export default withRouter(EditChapter);