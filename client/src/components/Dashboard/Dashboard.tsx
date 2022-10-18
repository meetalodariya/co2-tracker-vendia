import React,{useState,useCallback} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



import { useAuth }from '../../providers/auth';
import { httpPost } from '../../utils/axiosRequests';
import { httpGet } from '../../utils/axiosRequests';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Dashboard = () => {
const auth = useAuth();
const navigate = useNavigate();

const [error, setError] = useState<string>('');

// const handleSubmit = useCallback(
//     async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       console.log("Button")
//     //   const { username, password } = credentials;

//     //   if (!username || !password) {
//     //     setError('Invalid inputs!');
//     //     return;
//     //   }
//         const hptid = '32hvaso2';
//       const { data, error } = await httpPost<{}>({
//         url: '/hpt',
//         data: {
//             hptid
//         },
//       });

//       if (data) {
//         // auth.signin({ token: data.token }, () => {
//         //   navigate('/dashboard');
//         // });
//         // auth.getdatabyHPT(data,()=>{
//         // console.log(JSON.stringify(data)); 
//         // });
//         console.log(JSON.stringify(data)); 
//       } else if (error) {
//         setError('Server error: ' + error.message);
//       }
//     },
//     [data],
//   );

const getHPTDetails = async()=>{
    console.log("button clicked");
    const hptid = '32hvaso2';
      const { data, error } = await httpGet<{}>({
        url: `/hpt/${hptid}`,
        headers: {
            Authorization: "Bearer " + auth.user.token,
          },
      });
      if (data) {
          console.log(JSON.stringify(data)); 
      }
      else if (error) {
        setError('Server error: ' + error.message);
      }
}

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
            <Item>
                <Box
                component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" label="Enter HPT Serial Number" variant="outlined" />
                    <Button variant="contained" onClick={()=>getHPTDetails()}>Get CO2 Details</Button>
                    </Box>
            </Item>
        </Grid>
        <Grid item xs={4}>
            <Item>Motor Supplier</Item>
        </Grid>
        <Grid item xs={4}>
            <Item>Battery Supplier</Item>
        </Grid>
        <Grid item xs={4}>
            <Item>Sea Transport</Item>
        </Grid>
        </Grid>
  </Box>
  )
}

export default Dashboard