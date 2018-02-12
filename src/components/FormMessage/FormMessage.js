import React from 'react';
import './FormMessage.css';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const FormMessages = (props) => {
    return (
        <div className="form-block">
            <Form className="form-mes">
                <FormGroup row>
                    <Label sm={4}>Add new message:</Label>
                    <Col sm={8}>
                        <Input type="text"  onChange={(event) => props.changeMes(event)} className="field" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={4}>Add you name:</Label>
                    <Col sm={8}>
                        <Input type="text"  onChange={(event) => props.changeAuth(event)} className="field" />
                    </Col>
                </FormGroup>
                <Row>
                    <Col sm={{ size: 8, offset: 4 }}>
                        <Button  className="w-100" color="primary" onClick={props.click}>Add</Button>
                    </Col>
                </Row>

            </Form>
        </div>
    )
};

export default FormMessages;
