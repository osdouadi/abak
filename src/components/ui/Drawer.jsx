import { Drawer, Box, Typography, IconButton, List } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 250px;
    background-color: #fff;
  }
  .MuiTypography-h6 {
  }

  .MuiList-root {
    .MuiListItem-root {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
    }
  }
`;

const MuiDrawer = ({ buttonLabel, title, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsDrawerOpen(true)}> {buttonLabel} </button>
      <StyledDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <List>{children}</List>
        </Box>
      </StyledDrawer>
    </>
  );
};

export default MuiDrawer;
