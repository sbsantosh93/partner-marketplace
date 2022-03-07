import { makeStyles } from '@mui/styles';
export const useStyles =makeStyles ((theme) => ({
   mainDiv:{
       marginLeft:"30%",
       marginRight:"30%",
       marginTop:50,
    //    "& .MuiTextField-root":{
    //       height:10
    //    },
       "& .MuiInputBase-input-MuiOutlinedInput-input":{
           height:20
       }
   }
  }));