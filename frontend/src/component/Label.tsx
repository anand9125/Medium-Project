import { ChangeEvent } from "react"
//In your LabelInputType interface, the onChange property is a function that accepts an event as an argument and returns void
//ChangeEvent<HTMLInputElement>, which represents a change event specifically for an <input> HTML element.
interface LabelInputType{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent <HTMLInputElement>)=>void
}

export const LabelInput=({label,placeholder,onChange}:LabelInputType)=>{

    return <div>
   <div>
    <label className="default-input block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <input onChange={onChange} placeholder={placeholder} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
</div>
    </div>
}