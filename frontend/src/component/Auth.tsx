import { Link } from "react-router-dom"
import { useState } from "react"
import { LabelInput } from "./Label"
import {SignpInput} from  "@achaud/medium-blog"
//this is short of type means which type is used in backend whi forntend me used hoga if not then it will give error thats how we know ki backend kya use h
// we set the state variable this specfic type  if we change anything type script will complain  fayda of type Script 
export const Auth=({type}:{type:"signup" | "signin"})=>{
    // The Auth component accepts a prop named type.
    //{ type: "signup" | "signin" } defines the shape of the prop,
    // specifying that type can only be either "signup" or "signin".
    const postInputs =useState<SignpInput>({
        name:"",
        username:"",
        password:""

    })
    return <div>
        <div className=" h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                     <div className="text-4xl font-semibold">
                       Create an account 
                     </div>  
                     <div>
                          Already have an account?
                          <Link  className="pl-2  underline " to={"/signin"}>Signin</Link>
                     </div>
                     <div>
                     <LabelInput label="Name" placeholder="Anand chaudhary" onChange={(e)=>{

                     }}></LabelInput>
                     </div>
                     
               </div>
            </div>
        </div>
    </div>
}