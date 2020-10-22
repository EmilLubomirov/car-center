import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({isOpen, duration, type, message, onClose}) => {

    return (
        <div>
            <Snackbar open={isOpen} autoHideDuration={duration || 5000} onClose={onClose}>
                <Alert onClose={onClose} severity={type || "success"}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Notification;