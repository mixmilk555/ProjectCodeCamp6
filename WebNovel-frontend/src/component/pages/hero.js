import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Carousel } from 'antd';
import axios from '../../config/axios';
import { Link } from 'react-router-dom';
function AppHero() {
  const [novel, setNovel] = useState([]);

  const fetchAllMyNovel = async () => {
    const httpResponse = await axios.get('/novel/randomNovel')
    setNovel(httpResponse.data);
  }

  useEffect(() => {
    fetchAllMyNovel()
  }, [])

  return (
    <div id="hero" className="heroBlock">
      <Carousel style={{ height: '100%' }}>
        {novel.map(item => {
          return (
            <div key={item.id} className="container-fluid">
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.plot}</p>
                <div className="btnHolder">
                  <Button type="primary" size="large" ><Link to={{pathname: `/allChapter/${item.id}`}}>Read more</Link></Button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
export default AppHero;