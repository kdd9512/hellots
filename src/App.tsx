import React, {Component, useEffect, useRef, useState} from 'react';
import {createGlobalStyle} from 'styled-components';
import Number from "./Number";
import {Form, Input} from "./Input";
import {useInput} from "./useInput";
import useAxios from "./useAxios";

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

const useTitle = (initTitle: any) => {
    const [title, setTitle] = useState(initTitle);
    const updateTitle = () => {
        const htmlTitle: any = document.querySelector("title");
        htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
}

const useClick = (onClick: any) => {
    // if (typeof onClick !== "function"){
    //     return ;
    // }
    const element: any = useRef();
    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
        return () => {
            if (element.current) {
                element.current.removeEventListener("click", onClick);
            }
        };
    }, []);
    return element;
};

const useConfirm = (msg: string, callback: any, rejection: any) => {
    if (typeof callback !== "function") {
        return;
    }
    const confirmAction = () => {
        if (window.confirm(msg)) {
            callback();
        } else {
            rejection();
        }
    };
    return confirmAction;
};


const usePreventLeave = () => {
    const listener = (e: any) => {
        e.preventDefault();
        e.returnValue = "";
    }
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () => window.removeEventListener("beforeunload", listener);

    return {enablePrevent, disablePrevent};
}

const useBeforeLeave = (onBefore: any) => {
    useEffect(() => {
        document.addEventListener("mouseleave", handle);
        return () => document.removeEventListener("mouseleave", handle);
    }, []);

    const handle = (e: any) => {
        const {clientY} = e;
        if (clientY <= 0) {
            onBefore();
        }
    }

    if (typeof onBefore !== "function") {
        return;
    }
};

const useFadein = (duration = 1, delay = 0) => {
    const element: any = useRef();
    useEffect(() => {
        if (element.current) {
            const {current} = element;
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`
            current.style.opacity = 1;
        }
    }, []);

    if (typeof duration !== "number" || typeof delay !== "number") {
        return;
    }

    return {ref: element, style: {opacity: 0}};

}

const useNetwork = (onChange: any) => {
    const [status, setStatus] = useState(navigator.onLine);

    const handleChange = () => {
        if (typeof onChange === "function") {
            onChange(navigator.onLine);
        }
        setStatus(navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);
        window.removeEventListener("online", handleChange);
        window.removeEventListener("offline", handleChange);

    }, []);


    return status;
};

const useScroll = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });
    const onScroll = () => {
        setState({y: window.scrollY, x: window.scrollX});
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll);
    }, [])
    return state;
};

const useFullScreen = (callback:any) => {
    const element: any = useRef();
    const triggerFull = () => {
        if (element.current) {
            element.current.requestFullscreen();
            if (callback && typeof callback === "function") {
                callback(true)
            }
        }
    };
    const exitFull = () => {
        document.exitFullscreen();
        if (callback && typeof callback === "function") {
            callback(false)
        }
    }
    return {element, triggerFull, exitFull};
}

const useNotification = (title:any,option:any) => {
    if (!("Notification" in window)){
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title,option);
                } else {
                    return;
                }
            })
        } else {
            new Notification(title,option);
        }
    }
    return fireNotif;
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

    // const { currentItem, changeItem }: any = useTabs(0, content);
    // const titleUpdater = useTitle("Loading...")
    // setTimeout(() => titleUpdater("Home"), 5000)


    // const input = useRef();
    // const sayHello = () => console.log("say Hello");
    // const title = useClick(sayHello);

    // const deleteWorld = () => console.log("Deleting the World...")
    // const abort = () => console.log("Aborted.")
    // const confirmDelete = useConfirm("You want to DELETE?", deleteWorld, abort);

    // const { enablePrevent,disablePrevent } = usePreventLeave();

    // const dontLeave = () => console.log("don't leave");
    // useBeforeLeave(dontLeave);

    // const fadeInH1 = useFadein(2,3);
    // const fadeInP = useFadein(4,5);

    // const handleNetworkChange = (onLine:any) => {
    //     console.log(onLine ? "online.." : "offline...")
    // }
    // const onLine = useNetwork(handleNetworkChange);

    // const { y } = useScroll();

    // const onFullSc = (isFull:boolean) => {
    //     console.log(isFull ? "Full" : "Non")
    // }
    // const {element, triggerFull, exitFull} = useFullScreen(onFullSc);

    // const trigNotif = useNotification("Success!", {body:"Maybe...Success?"});

    const {loading, data, error, refetch}: any = useAxios({
            url:"https://yts.mx/api/v2/list_movies.json"
        });
    console.log(`loading: ${loading},\n data: ${JSON.stringify(data)},\n error: ${error}`)

    return (
        <div className="App" style={{height: "1000vh"}}>
            {/*{count}*/}
            {/*<button onClick={() => setCount(count + 1)}> + </button>*/}
            {/*<button onClick={() => setCount(count - 1)}> - </button>*/}
            {/*<input placeholder="email" value={email} onChange={updateEmail}/>*/}

            {/*<input placeholder="Name" {...name} />*/}

            {/*{content.map(*/}
            {/*    (section ,index) => (*/}
            {/*        <button onClick={() => changeItem(index)}>{section.tab}</button>*/}
            {/*    ))}*/}
            {/*<div>{currentItem.content}</div>*/}

            {/*<h1 ref={title}>HI</h1>*/}

            {/*<button onClick={confirmDelete}>Delete</button>*/}


            {/*<button onClick={enablePrevent}>protect</button>*/}
            {/*<button onClick={disablePrevent}>unprotect</button>*/}

            {/*<h1 {...fadeInH1}>Hello</h1>*/}
            {/*<p {...fadeInP}>asdfsadfasdfsadfsadfsadfsadfs</p>*/}

            {/*<h1>{onLine ? "online" : "offline"}</h1>*/}

            {/*<h1 style={{position:"fixed", color: y > 100? "red" : "blue"}}>Hello</h1>*/}

            {/*<div ref={element}>*/}
            {/*    <img src="https://t1.daumcdn.net/cfile/tistory/996E76485C1F70711B"/>*/}
            {/*    <button onClick={exitFull}>exit fullscreen</button>*/}
            {/*</div>*/}
            {/*<button onClick={triggerFull}>make fullscreen</button>*/}

            {/*<button onClick={trigNotif}>Hello</button>*/}

            <h1>{data && data.status}</h1>
            <h2>{loading && "Loading"}</h2>
            <button onClick={refetch}>refetch</button>
        </div>
    );
}


export default App;
