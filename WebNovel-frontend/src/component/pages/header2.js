import { Button, Menu, Drawer } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import localStorageService from '../../component/services/localStorageService'

function AppHeader2() {
    const logout = () => {
        localStorageService.removeToken();
        document.location.reload(true)
    };
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    return (
        <div className="container-fluid">
            <div className="header">
                <div className="logo" >
                    <Link to='/'>
                        <img src="https://sv1.picz.in.th/images/2021/02/22/os99JZ.png" alt="web novel"></img>
                    </Link>
                </div>
                <div className="mobileHidden">
                    <Menu mode="horizontal" >
                        <Menu.Item key="home"><Link to='/'> Home</Link></Menu.Item>
                        <Menu.Item key="writenovel"><Link to='/writing'>Write Novel</Link></Menu.Item>
                        <Menu.Item key="myNovel"><Link to='/myNovel'> My Novel </Link> </Menu.Item>
                        <Menu.Item key="login"><Button type="primary" onClick={logout}>Logout</Button> </Menu.Item>
                    </Menu>
                </div>
                <div className="mobileVisible">
                    <Button type="primary" onClick={showDrawer}>
                        <i class="fas fa-bars"></i>
                    </Button>
                    <Drawer
                        title="Menu"
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <p><Link to='/'> Home</Link></p>
                        <p><Link to='/writing'>Write Novel</Link></p>
                        <p><Link to='/myNovel'> My Novel </Link> </p>
                        <p><Button type="primary" onClick={logout}>Logout</Button> </p>
                    </Drawer>
                </div>

            </div>
        </div>
    );
}

export default AppHeader2;