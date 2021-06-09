import React, {Component} from 'react';
import {createGlobalStyle} from 'styled-components';
import Number from "./Number";
import {Form, Input} from "./Input";

interface IState {
    counter: number
}

class App extends Component<{}, IState> {
    state = {
        counter: 0,
        name:""
    }

    render() {
        const {name, counter} = this.state;
        return (
            <div>
                <Form onFormSubmit={this.onFormSubmit}>
                    <Input value={name} onChange={this.onChange}/>
                </Form>
                <Number count={counter}/>
                <button onClick={this.add}>ADD</button>
            </div>
        );
    }


    onChange = (event:React.SyntheticEvent<HTMLInputElement>) => {
        console.log(event.target);
    }

    onFormSubmit = (event:React.FormEvent) => {
        event.preventDefault();
    }

    add = () => {
        this
            .setState(prev => {
                return {
                    counter: prev.counter
                        +
                        1
                }
            });
    }
}

export default App;
