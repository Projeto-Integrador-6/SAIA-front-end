import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function useSnack() {
  const [snack, setSnack] = useState({
    message: '',
    type: 'success',
    open: false,
  });

  const [severity, setSeverity] = useState(snack.type)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack({ message: '', type: severity, open: false });
  };

  function titleSnack(value){
    if(value === 'success'){
      return 'Sucesso'
    }

    if(value === 'error'){
      return 'Erro'
    }

    if(value === 'warning'){
      return 'Aviso'
    }

    if(value === 'info'){
      return 'Informação'
    }
  }

  const ConfigSnack = () => {
    return (
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        disableWindowBlurListener
      >
        <MuiAlert variant="filled" severity={snack.type} >
          <AlertTitle>{titleSnack(snack.type)}</AlertTitle>
          {snack.message}
        </MuiAlert>
      </Snackbar>

    )

  }

  return { snack, setSnack, setSeverity, handleClose, ConfigSnack };
}