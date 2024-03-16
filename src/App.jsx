import './App.css'
import { TextField } from '@mui/material'
import{ Button }from '@mui/material'
import { useEffect, useState } from 'react'


function App() {
  /* state to store data in input field */
  const [principle,setprinciple] = useState(0);
  const [rate,setRate] = useState(0);
  const [interest,setInterst]=useState(0);
 // const [calculationCompleted, setCalculationCompleted] = useState(false);
  //for condtional rendering
  const [isPrinciple,setIsPrinciple] = useState(true);
  const [isRate,setIsRate] =useState(true);

  const Validate = (e)=>{
    const {name,value} =e.target;
    console.log(name);
    console.log(value);

    console.log(value.match(/^[0-9.]*$/ ));
    /* !!-convert into boolean */
    if(!!value.match(/^[0-9.]*$/ )){
      if (name==='principle') {
        setprinciple(value);
        setIsPrinciple(true);
      }
      else if (name==='rate') {
        setRate(value);
        setIsRate(true);
        
      }

    }
    else{
      if(name==='principle'){
        setIsPrinciple(false);
        setprinciple(value);
      }
      else if(name==='rate'){
        setIsRate(false);
        setRate(value);
      }
    }
  }
  const handleReset=()=>{
    setprinciple(0);
    setRate(0);
    setIsPrinciple(true);
    setIsRate(true);


  }

  const handleCaculate=(e)=>{
    e.preventDefault();
    setInterst(principle/(rate*rate));
   
  }
  useEffect(() => {
    if (interest !== 0) {
      if (interest < 18.5) {
        alert('Under Weight');
      } else if (interest >= 18.5 && interest <= 24.9) {
        alert('Normal weight');
      } else if (interest >= 25 && interest <= 29.9) {
        alert('Over weight');
      } else {
        alert('Obesity Class');
      }
    }
  }, [interest]);

  return (
    <>
      <div style={{height:'100vh'}} className='bg-dark d-flex justify-content-center align-items-center'>
        <div className='bg-light p-5 rounded' style={{width:'500px'}}>
          <h1>BMI App</h1>
          <p>Calculate your BMI Easily</p>
          <div style={{height:'150px'} } className='bg-warning rounded mt-5 d-flex justify-content-center align-items-center flex-column'>
            <h1>{interest}</h1>

          </div>
          <form onSubmit={handleCaculate} >
              <div className='mb-3 mt-5'>
                <TextField id="outlined-basic" label="Weight(kg)" value={principle || ""} name='principle' onChange={(e)=>Validate(e)} variant="outlined"  className='w-100'/>
                {!isPrinciple &&
                  <p className='text-danger'>*Invalid input</p>}
              </div>
              <div className='mb-3'>
                <TextField id="outlined-basic" label="Height(In meter)"  value={rate || ""} name='rate'  onChange={(e)=>Validate(e)} variant="outlined"  className='w-100'/>
                {!isRate &&
                  <p className='text-danger'>*Invalid input</p>}
              </div>
              <div className='mb-3 d-flex justify-content-between'>
              <Button color="success" size='large' type='submit' disabled={isPrinciple && isRate?false:true} variant="contained">Calculate</Button>
              <Button onClick={handleReset} color='primary' size='large' variant="outlined">Reset</Button>
              </div>
          
          </form>


        </div>

      </div>

    </>
  )
}

export default App
