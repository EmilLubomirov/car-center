import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styles from "./index.module.css";

function Alert(props) {
    return <MuiAlert className={styles.notification} elevation={6} variant="filled" {...props} />

}

const Notification = ({isOpen, duration, type, message, size, onClose}) => {

    return (
        <div>
            <Snackbar open={isOpen} autoHideDuration={duration || 5000} onClose={onClose}>
                <Alert size={size} onClose={onClose} severity={type || "success"}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Notification;