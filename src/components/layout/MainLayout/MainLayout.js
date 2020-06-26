import React from 'react';
import PropTypes from 'prop-types';

import Container from '../Container/Container';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => (
    <Container>
        <Header />
            {children}
        <Footer />
    </Container>
  );

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;