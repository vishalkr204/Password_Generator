import { useState, useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("")

const passwordRef = useRef(null)

const passwordgenerator = useCallback(() =>{
  let pass= ""
  let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeghijklmnopqrstuvwxyz"

  if (numberAllowed) str += "0123456789"
  if (characterAllowed) str += "@#$%^&*[]{}"
  
  for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    
  }
 setPassword(pass)


}, [length, numberAllowed, characterAllowed, setPassword])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(Password)

},[Password])

  useEffect(() =>{
    passwordgenerator()
  }, [length, numberAllowed, characterAllowed, passwordgenerator])
  return (
    <>
    <div className='w-full max-w-md  mx-auto shadow-md rounded-lg
    px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text " 
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700  text-white px-3 py-0.5 shrink-0'
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>

      <input 
      type="range" 
      min={6}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e) => {setLength(e.target.value)}}
      />
      <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input 
          type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() =>
            {setnumberAllowed((prev) => !prev)}}
            
      />
      <label htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'> 
          <input 
          type='checkbox'
          defaultChecked={characterAllowed}
          id='characterInput'
          onChange={() =>{
            setcharAllowed((prev) => !prev)
          }}
          />
          <label htmlFor='characterInput'>Characters</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
