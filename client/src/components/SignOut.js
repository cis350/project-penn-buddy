import { Button, TextField } from "@mui/material";
// eslint-disable-next-line import/no-unresolved
import React from "@types/react";

function Signout() {
  const handleConfirmationChoice = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleConfirmationChoice}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        alignItems: 'center',
      }}
      >
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#0096FF', color: 'white', width: '200px' }}
          type="submit"
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#EA3C3C', color: 'white', width: '200px' }}
          type="submit"
        >
          No
        </Button>
      </div>
    </form>

  );
}
export default Signout;
