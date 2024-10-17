import { useState } from "react";
import { LabelInput } from "./Label";
import { SignpInput } from "@achaud/medium-blog";
import { Button } from "./Buttom";
import { Link,  useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SignUp = () => {
    const navigate=useNavigate();
  const [postInputs, setPostInputs] = useState<SignpInput>({
    name: "",
    username: "",
    password: "",
  });
  async function sendReqest(){
    try{
        const response =await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
        const jwt=response.data;
        localStorage.setItem("token",jwt)
        navigate("/blogs")
    }
    catch(e){
        alert("Error while Signup")
    }
  }

  return (
    <div>
      <div className="text-4xl font-semibold">Create an account</div>
      <div className="px-8">
           Already have an account?
          <Link className="pl-2 underline" to= "/signin">
           Signin
          </Link>
        </div>
      <div className="pt-7">
        <LabelInput
          label="Name"
          placeholder="Anand Chaudhary"
          onChange={(e) => {
            setPostInputs({ ...postInputs, name: e.target.value });
          }}
        />
      </div>
      <div className="pt-2">
        <LabelInput
          label="Username"
          placeholder="achaudharyskn@gmail.com"
          onChange={(e) => {
            setPostInputs({ ...postInputs, username: e.target.value });
          }}
        />
      </div>
      <div className="pt-2">
        <LabelInput
          label="Password"
          placeholder="**********"
          onChange={(e) => {
            setPostInputs({ ...postInputs, password: e.target.value });
          }}
        />
      </div>
      <div>
        <Button label="Sign up" onClick={sendReqest} />
      </div>
    </div>
  );
};
