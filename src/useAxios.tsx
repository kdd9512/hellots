import defaultAxios, { AxiosResponse } from "axios";
import {useEffect, useState} from "react";

const useAxios = (opts: any, axiosInstance = defaultAxios) => {
    const [state, setState]:any = useState({
        loading: true,
        error: null,
        data: null
    });

    const [trigger, setTrigger]:any = useState(0);
    const refetch = () => {
        setState({
            ...state, loading: true
        });
        setTrigger(Date.now())
    }

    if (!opts.url) {
        return;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        axiosInstance(opts).then(data => {
            setState({...state, loading: false, data});
        }).catch(error => {
            setState({...state, loading: false, error})
        });
    }, [trigger]);
    return {...state, refetch};
};

export default useAxios;