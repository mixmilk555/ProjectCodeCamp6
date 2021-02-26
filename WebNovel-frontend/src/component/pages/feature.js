import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';
import { Row, Col, List } from 'antd';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function AppFeature() {
    const [novel, setNovel] = useState([]);


    const fetchAllMyNovel = async () => {
        const httpResponse = await axios.get('/novel/allNovel')
        setNovel(httpResponse.data);
    }
    useEffect(() => {
        fetchAllMyNovel()
    }, [])

    return (
        <div className="block featureBlock bgGray" >
            <div className="container-fluid" >
                <div className="titleHolder">
                    <h2>นิยายทั้งหมด</h2>
                </div>
                <Row style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <List
                        grid={{ gutter: 16, column: 3, md: 2 ,sm:2 ,xs:1}}
                        style={{ width: '100%' }}
                        dataSource={novel}
                        renderItem={item => (
                            <List.Item >
                                <Link to={{ pathname: `/allChapter/${item.id}` }}>
                                    <Card hoverable >
                                        <Meta title={item.title} />
                                    </Card>
                                </Link>
                            </List.Item>
                        )}>
                    </List>
                </Row>
            </div>

        </div>
    )
}
