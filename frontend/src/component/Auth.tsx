
import { SignIn } from "./signin";
import { SignUp } from "./signup";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="pt-7">
          {type === "signup" ? <SignUp /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

//reusebility badh rhi h type script me and scritness bhi 
//we are going to reuse this whole component in two diffrent pages  .. we are not gonna  rewrite  everthing for two diffrent componente we have a single component which has typs as an input wheather its signup or signin component and the based on type wwe can redner over here
//buttom :This is a ternary operator used to conditionally render text.
//If type equals "signup", it renders "Sign up". Otherwise, it renders "Sign in".
//type is likely a state variable or prop passed into this component that determines whether the user is in signup mode or signin mode.
//Instead of creating separate buttons for "Sign up" and "Sign in," you can use the same button component and simply pass a different
// type to control the behavior and display text. This makes your code more concise and maintainable.
//The type in your example is likely a state variable or prop that determines the mode or context in which the button is being used — in this case,
// whether the user is in "signup" mode or "signin" mode.

{/* <div className="px-12">
{ type=="signin"? "Dont have an account" :"Already have an account?"}
  <Link  className="pl-2  underline " to={"/signin"}>Signin</Link>
</div> */}
//In this snippet, the type is again being used to conditionally render a message based on whether the user is in "signin" or "signup" mode. 
//The purpose of type here is similar to your previous example — to control the text and behavior displayed to the user depending on their current context (signing up or signing in).

// {type === 'signup' && (
//     <LabelInput
//       label="Name"
//       placeholder="Anand Chaudhary"
//       onChange={(e) => {                      {type === 'signup' && ( ... )}:
//         setPostInputs({                    is is a conditional rendering expression in React, which is used to render the <LabelInput> component only when the type is 'signup'.
//           ...postInputs,                  This is using JavaScript's logical && (AND) operator to conditionally render the LabelInput component.
//           name: e.target.value,           The expression checks if the type variable is equal to 'signup'.
                                              //If type is 'signup', the expression evaluates to true, and the <LabelInput> component will be rendered.
//         });
//       }}
//     />
//   )}

