import React from 'react';
import MuiButton from '@mui/material/Button';

export type Props = {
  children: React.ReactNode;
  btnClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  color:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
  variant: 'text' | 'outlined' | 'contained';
};

const Button = (props: Props) => {
  return (
    <>
      <MuiButton
        color={props.color}
        variant={props.variant}
        onClick={props.btnClickHandler}
      >
        {props.children}
      </MuiButton>
    </>
  );
};

export default Button;
