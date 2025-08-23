"use client"
const { useState } = require("react");
const { useFormState } = require("react-dom");
const { toast } = require("sonner");

const useFetch = (cb)=>{

    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async(...args)=>{
        setLoading(true);
        setError(null);
        // In JavaScript, ...args collects all arguments into an array.
        try{
            const res = await cb(...args);
            setData(res);
            setError(false);
        }
        catch(error){
            setError(true);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {data, loading, error, setData, fn};
}

export default useFetch;