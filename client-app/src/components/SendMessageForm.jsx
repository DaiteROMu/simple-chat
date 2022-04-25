import { useState } from 'react';

import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    const handleMessageControlChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup className="my-1">
                <FormControl
                    value={message}
                    placeholder="Enter message"
                    onChange={handleMessageControlChange}
                />

                <Button variant="primary" type="submit" disabled={!message}>
                    Send
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SendMessageForm;
