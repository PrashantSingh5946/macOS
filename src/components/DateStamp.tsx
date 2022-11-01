import { useEffect, useState } from "react";

const DateStamp = () =>
{
    const [date,setDate] = useState<Date>();

    useEffect(()=>{
        let date = new Date();
        setDate(date);
        let identifier = setInterval(()=>{
            setDate(new Date());
        },500);

        return ()=>{
            clearInterval(identifier);
        }
    },[]);
    
    

    return(
        <div>
            {
                date?.toDateString()
            }
        </div>
    )
}

export default DateStamp;