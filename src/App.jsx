import { useState , useCallback , useEffect, useRef } from 'react'


// Usecallback is used for optimization and useeffect is used to run if we load it

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberallowed] = useState(false)
  const [charallowed, setCharallowed] = useState(false)
  const [PassWord, setPassWord] = useState()

  //UseRef hook

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
     
    if (numberallowed) str += "0123456789"
    if (charallowed) str += "!@#$%^&*(){}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassWord(pass)

  } ,[length, numberallowed, charallowed, setPassWord]) 

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(PassWord)
  }, [PassWord])
  
  useEffect(()=>{
    PasswordGenerator()
  } ,[length, numberallowed, charallowed, PasswordGenerator])
 
  return (
    <>

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 mt-10 text-orange bg-gray-700'>
      <h1 className='text-white text-center text-lg '>PassWord Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-5 mt-5'>
        <input type="text" 
        value={PassWord}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        
        />
        <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}}
           />
           <label className='text-orange-500'> Length: {length} </label>
          
        </div>

        <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={()=>{
            setNumberallowed((prev)=> !prev)
          }}
           />
              <label className='text-orange-500' htmlFor='numberInput'> Numbers </label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
          defaultChecked={charallowed}
          id="numberInput"
          onChange={()=>{
            setCharallowed((prev)=> !prev)
          }}
           />
              <label className='text-orange-500' htmlFor='characterInput'> Characters </label>
        </div>
        
      </div>
    </div>
   
    </>
  )
}

export default App
