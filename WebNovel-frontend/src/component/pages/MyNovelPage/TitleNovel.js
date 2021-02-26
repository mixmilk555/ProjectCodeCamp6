import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import axios from '../../../config/axios';
import { Link } from 'react-router-dom';

export default function TitleNovel(props) {
    const [changeInput, setChangeInput] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const { data, deletes } = props;
    const updateNovel = async (id) => {
        await axios.put(`/novel/createnovel/${id}`, { title: changeInput });
        props.fetchData();
        setIsEdit(false)
    }

    const toggleEdit = () => {
        setChangeInput(data.title)
        setIsEdit(true)
    }


    let contents = (
        <Row style={{ width: "100%" }}>
            <Col xs={24} sm={24} md={20} lg={20} xl={20} xxl={20}>
                <Input value={changeInput} onChange={(e) => setChangeInput(e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={4} lg={4} xl={4} xxl={4}>
                <Button type="primary" onClick={() => updateNovel(data.id)} >Done</Button>
            </Col>
        </Row>
    );

    if (!isEdit) {
        contents = (
            <Row style={{ width: "100%" }}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                    <Row justify='start'><Link to={{pathname :`/createChapter/${data.id}`}}>{data.title}</Link></Row>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Button style={{ backgroundColor: 'orange' }} onClick={() => toggleEdit()}> Edit</Button>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Button type="danger" onClick={() => deletes(data.id)}> Delete</Button>
                </Col>
            </Row>)
    }
    return (
        <div style={{ width: '100%' }}>
            {contents}
        </div >
    )
}
