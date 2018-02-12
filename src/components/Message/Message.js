import React from 'react';
import './Message.css';
import { Card, CardText, CardBody} from 'reactstrap';

const Message = (props) => {
    return (
        <Card className="message-card">
            <CardBody>
                <CardText>{props.message}</CardText>
                <div className="card-bot">
                    <p className="message-author">Author: {props.author}</p>
                    <p className="message-date">Published: {props.datetime}</p>
                </div>
            </CardBody>
        </Card>

    )
};


export default Message;