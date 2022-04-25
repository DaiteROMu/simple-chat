import { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';

import { useCurrentUser } from '../CurrentUserContext';

const Lobby = ({ joinRoom }) => {
    const [user, setUser] = useState('');
    const [room, setRoom] = useState('');

    const { setCurrentUser } = useCurrentUser();

    const handleSubmit = (e) => {
        e.preventDefault();

        setCurrentUser(user);

        joinRoom(user, room);
    };

    return (
        <Form className="lobby" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
                <Form.Control
                    value={user}
                    placeholder="Enter name"
                    onChange={(e) => setUser(e.target.value)}
                />
                <Form.Control
                    value={room}
                    placeholder="Enter room"
                    onChange={(e) => setRoom(e.target.value)}
                />
            </FormGroup>

            <Button variant="success" type="submit" disabled={!user || !room}>
                Join
            </Button>
        </Form>
    );
};

export default Lobby;
