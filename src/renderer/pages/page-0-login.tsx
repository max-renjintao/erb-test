import { AccountCircle } from '@mui/icons-material';
import { Box, ButtonGroup, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'renderer/store/Store';

const PageLogin = () => {
  const { app, imApp } = useStore();
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const setUser = (usr: number, usrTeamIdx = 0) =>
    imApp((a) => {
      a.usr = usr;
      a.usrTeamIdx = usrTeamIdx;
    });
  useEffect(() => {
    switch (pass) {
      case 'admin':
        setUser(5);
        navigate('/works');
        break;
      case '```':
        setUser(2);
        navigate('/new');
        break;
      case '111':
        setUser(3, 1);
        navigate('/job');
        break;
      case '222':
        setUser(3, 2);
        navigate('/job');
        break;
      case '333':
        setUser(3, 3);
        navigate('/job');
        break;
      case 'aaa':
        setUser(4);
        navigate('/bill');
        break;
      default:
    }
    // if (pass === 'admin')
  });
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <ButtonGroup>
        <TextField
          // variant="standard"
          type="password"
          // focused
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
            // endAdornment: <Button />,
          }}
          autoFocus
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </ButtonGroup>
    </Box>
  );
};

export default PageLogin;
