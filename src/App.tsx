import React, {Component, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import Number from "./Number";
import {Form, Input} from "./Input";
import {useInput} from "./useInput";

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

// const useInput = (initVal:any, validator:any) => {
//     const [value, setValue] = useState(initVal);
//     const onChange = (e: { target: { value:any } }) => {
//         const {
//             target: {value}
//         } = e;
//         let isUpdate = true;
//         if (typeof validator === "function") {
//             isUpdate = validator(value);
//         }
//         if (isUpdate) {
//             setValue(value)
//             console.log(value)
//         }
//     }
//     return { value, onChange };
// }

const content = [
    {
        tab: "Section 1",
        content: "I'm the content of the Section 1"
    },
    {
        tab: "Section 2",
        content: "I'm the content of the Section 2"
    }
]

const useTabs = (initTab: any, allTabs: any) => {
    const [currentIndex, setCurrentIndex] = useState(initTab)

    if (!allTabs || !Array.isArray(allTabs)) {
        return;
    }
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex
    }
}

const App = () => {
    //
    // const [count, setCount] = useState(0);
    // const [email, setEmail] = useState("");
    //
    // const updateEmail = (e: { target: { value: string; }; }) => {
    //     const {
    //         target: {value}
    //     } = e;
    //
    //     setEmail(value);
    //     console.log(value);
    // };
    //
    // const maxlength = (value: any) => value.length <= 10 &&
    //     !value.includes("@") && !value.includes("#");
    // const name = useInput("Mr.", maxlength)

    const { currentItem, changeItem }: any = useTabs(0, content);

    return (
        <div className="App">
            {/*{count}*/}
            {/*<button onClick={() => setCount(count + 1)}> + </button>*/}
            {/*<button onClick={() => setCount(count - 1)}> - </button>*/}
            {/*<input placeholder="email" value={email} onChange={updateEmail}/>*/}

            {/*<input placeholder="Name" {...name} />*/}

            {content.map(
                (section ,index) => (
                    <button onClick={() => changeItem(index)}>{section.tab}</button>
                ))}
            <div>{currentItem.content}</div>
        </div>
    );
}


export default App;
