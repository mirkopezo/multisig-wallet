import React from 'react';

// we wil define function, and pass data that we are interested in with props
function Header({approvers, quorum}) {
    // we will return html
    // approvers is array so we need to join this into string. and after that we will render quroum
    return (
        <header>
            <ul>
                <li>Approvers: {approvers.join(', ')}</li>
                <li>Quorum: {quorum}</li>
            </ul>
        </header>
    )
}

export default Header;