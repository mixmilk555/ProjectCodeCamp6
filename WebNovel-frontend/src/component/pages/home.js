import React from 'react';
import AppHero from './hero';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppHeader from './header';
import AppHeader2 from './header2';
import AppFooter from './footer';
import AppFeature from './feature';
import localStorageService from '../services/localStorageService';

function AppHome() {
    let content = <AppHeader/>

    if(localStorageService.getRole() === 'user'){
        content = <AppHeader2/>
    }
    return (
        <div className='main'>
            <Layout className='mainLayout'>
                <Header>
                    {content}
                </Header>
                <Content>
                    <AppHero/>
                    <AppFeature/>
                </Content>
                <Footer>
                    <AppFooter />
                </Footer>
            </Layout>
        </div>
    );
}
export default AppHome;

