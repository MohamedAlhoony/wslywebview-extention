import React from 'react'
import { Container, Alert, Row, Col } from 'react-bootstrap'
const Success = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Alert variant="success">تمت عملية الطلب بنجاح!</Alert>
                </Col>
            </Row>
        </Container>
    )
}

export default Success
