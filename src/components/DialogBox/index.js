import React from 'react';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';

import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow
    ref={ref} {...props}
  />;
});

export default function DialogBox({ title, children, footer, ...props }) {
  return (
    <Dialog
      {...props}
      fullWidth
      TransitionComponent={Transition}
      maxWidth="sm"
    >
      <div className="modal">
        <div className="modal-title">
          <h4>{title}</h4>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {footer}
        </div>
      </div>

    </Dialog>
  );
}