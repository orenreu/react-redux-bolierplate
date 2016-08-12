/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 26/07/2016
 * Time: 22:28
 */
import React from 'react'
import Snackbar from 'material-ui/Snackbar'


class Message extends React.Component {

    render(){
        const {messageOpen, message} = this.props.message
        const {toggleMessage} = this.props

        return (
            <Snackbar
                open={messageOpen}
                message={message || ""}
                action={"OK"}
                autoHideDuration={4000}
                onActionTouchTap={toggleMessage.bind(null, "")}
                onRequestClose={toggleMessage}
            />
        )
    }
}

export default Message