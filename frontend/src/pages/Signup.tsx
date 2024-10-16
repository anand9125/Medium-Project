import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"
export const Signup=()=>{
    return <div className="grid grid-cols-2">
        <div>
           <Auth></Auth>
        </div>
        <div className="invisible md:visible">
             <Quote></Quote>
        </div>
      

    </div>
}