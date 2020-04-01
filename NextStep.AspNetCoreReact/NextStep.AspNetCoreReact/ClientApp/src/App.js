import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import PositionList from './components/PositionList';

export default () => (
    <Layout>
        <Route exact path='/' component={PositionList} />
    </Layout>
);