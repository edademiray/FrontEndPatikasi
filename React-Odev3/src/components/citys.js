import React, {useState} from "react";
import Select from "react-select";
import { useCity } from "../context/CityContext"


function Cities(){
    const {setCityName} = useCity();
    const [input, setInput] = useState("")
    
    const onChangeHandler = e =>{
        setInput(e.target.value)
    }

    const handlerSubmit = e =>{
        e.preventDefault();
        setCityName(input)
        setInput('')
    }

    return(
        <div className="container mx-10 sm:mx-auto my-5">
            <form className="form" onSubmit={handleSubmit}>
                <input className="mr-2 mb-1 sm:mb-2 border border-black rounded p-1" value={input} onChange={onChangeHandler} placeholder="Type a City!" />
                <button className="px-5 py-1 border rounded-md bg-blue-100 text-black transition duration-500 ease-in-out hover:bg-yellow-200 hover:text-blue-900 hover:border-blue-900 hover:font-bold" >Find!</button>
            </form>
        </div>
    )

}

export default Cities;