import React from 'react';
import AppHero from './hero';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import AppHeader2 from './header2';
import AppFooter from './footer';
import AppFeature from './feature';
function AppHome2() {
    return (
        <div className='main'>
            <Layout className='mainLayout'>
                <Header>
                    <AppHeader2/>
                </Header>
                <Content>
                    <AppHero />
                    <AppFeature/>
                </Content>
                <Footer>
                    <AppFooter />
                </Footer>
            </Layout>
        </div>
    );
}
export default AppHome2;

