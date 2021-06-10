import React, {Component, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import Number from "./Number";
import {Form, Input} from "./Input";

// interface IState {
//     counter: number
// }
//
// class App extends Component<{}, IState> {
//     state = {
//         counter: 0,
//         name: ""
//     }
//
//     render() {
//         const {name, counter} = this.state;
//         return (
//             <div>
//                 <Form onFormSubmit={this.onFormSubmit}>
//                     <Input value={name} onChange={this.onChange}/>
//                 </Form>
//                 <Number count={counter}/>
//                 <button onClick={this.add}>ADD</button>
//             </div>
//         );
//     }
//
//
//     onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//         console.log(event.target);
//     }
//
//     onFormSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//     }
//
//     add = () => {
//         this.setState(prev => {
//             return {
//                 counter: prev.counter + 1
//             }
//         });
//     }
// }

const useInput = (initVal:any, validator:any) => {
    const [value, setValue] = useState(initVal);
    const onChange = (e: { target: { value:any } }) => {
        const {
            target: {value}
        } = e;
        let isUpdate = true;
        if (typeof validator === "function") {
            isUpdate = validator(value);
        }
        if (isUpdate) {
            setValue(value)
            console.log(value)
        }
    }
    return { value, onChange };
}

const App = () => {
    {/*const [count, setCount] = useState(0);*/}
    // const [email, setEmail] = useState("");
    //
    {/*const updateEmail = (e: { target: { value: string; }; }) => {*/}
    {/*    const {*/}
    {/*        target: {value}*/}
    //     } = e;
    {/*    setEmail(value);*/}
    {/*    console.log(value);*/}
    {/*};*/}
    const maxlength = (value:any) => value.length <= 10 &&
        !value.includes("@") && !value.includes("#");
        // ,"$","%","^","&","*","(",")","_","+","-","=","`","~","!",",","<",".",">",";",":","'","\"","\\","|","[","]","{","}"
    const name = useInput("Mr.",maxlength)


    return (
        <div className="App">
            {/*{count}*/}
            {/*<button onClick={() => setCount(count + 1)}> + </button>*/}
            {/*<button onClick={() => setCount(count - 1)}> - </button>*/}
            {/*<input placeholder="email" value={email} onChange={updateEmail}/>*/}

            <input placeholder="Name" {...name} />
        </div>
    );
}


export default App;
