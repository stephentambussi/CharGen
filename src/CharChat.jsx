import React from 'react';

const divStyle = {
    color:'black'
};

class CharChat extends React.Component {
    render() {
        return (
            <div style={divStyle}>
                <h2>Character Chat</h2>
                <main>
                    <p>This section will be a conversation simulator for the generated character.</p>
                </main>
            </div>
        );
    }
}

export default CharChat;