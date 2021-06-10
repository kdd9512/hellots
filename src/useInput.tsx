import {useState} from "react";

export const useInput = (initVal:any, validator:any) => {
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