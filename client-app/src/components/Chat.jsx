import { useEffect, useRef } from 'react';

import { Button } from 'react-bootstrap';

import ConnectedUserList from './ConnectedUserList';
import Message from './Message';
import SendMessageForm from './SendMessageForm';

const Chat = ({ users, messages, sendMessage, leaveRoom }) => {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;

            messageRef.current.scrollTo({
                left: 0,
                top: scrollHeight - clientHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const leaveRoomHandler = (e) => {
        leaveRoom();
    };

    return (
        <div className="chat m-5">
            <div className="leave-room mb-2">
                <Button variant="danger" onClick={leaveRoomHandler}>
                    Leave Room
                </Button>
            </div>

            <div>
                <ConnectedUserList users={users} />

                <div>
                    <div ref={messageRef} className="message-container">
                        {messages.map((message, index) => (
                            <Message key={index} {...message} />
                        ))}
                    </div>

                    <SendMessageForm sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
