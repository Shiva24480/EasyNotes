import React from 'react'
import './MainScreen.css'   
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Header from '../../components/header/Header'

function MainScreen({ title, children }) {
    return (
        <div className='mainscreen'>
            <Header />
            <Container>
                <Row>
                    <div className="page">
                        {title && (
                            <>
                                <h1 className='page-title'>{title}</h1>
                                <hr />
                            </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default MainScreen