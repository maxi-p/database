import { useEffect, useState } from "react";

const SelectTime = props => {
    const arr = [8,9,10,11,12,13,14,15,16,17,18]
    const [day, setDay] = useState(1);
    const [month, setMonth] = useState('');
    const [dayMonth, setDayMonth] = useState(1704067200000);
    const [allEvents, setAllEvents] = useState([]);
    const [inputTimestamp, setInputTimestamp] = useState(0);
    // console.log(allEvents);
    useEffect(() => {
        const getAllEvents = async () => {
            const json = JSON.stringify({public: true,private: true,rso: true,username: 'max'});
            const response = await fetch('api/getEvents', {method:'POST',body:json,headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());
            // console.log(res)
            if(res.message === ''){
                const newAllEvents = [...res.public_event,...res.private_event,...res.rso_event]
                setAllEvents(newAllEvents)
                
            }
            else{
            }
        };
        
        getAllEvents();
        
    },[])

    useEffect(()=>{
        // console.log("day",day)
        // console.log("month",month)
        var monthEpoch = 1704067200000;
        if (month === '1' ){
            monthEpoch = 1704067200000;
        }
        else if (month === '2'){
            console.log("feb")
            monthEpoch = 1706745600000;
        }
        else if (month === '3'){
            monthEpoch = 1709251200000;
        }
        else if (month === '4'){
            monthEpoch = 1711929600000; 
        }
        else if (month === '5'){
            monthEpoch = 1714521600000;            
        }
        else if (month === '6'){
            monthEpoch = 1717200000000;            
        }
        else if (month === '7'){
            monthEpoch = 1719792000000;
        }
        else if (month === '8'){
            monthEpoch = 1722470400000;           
        }
        else if (month === '9'){
            monthEpoch = 1725148800000;        
        }
        else if (month === '10'){
            monthEpoch = 1727740800000;            
        }
        else if (month === '11'){
            monthEpoch = 1730419200000;      
        }
        else if (month === '12'){
            monthEpoch = 1733011200000;
        }

        const newDayMonth = monthEpoch + (day-1) * 86400000;
        setDayMonth(newDayMonth)
    },[day, month]);

    const isEpochReserved = epoch => {
        for(var i=0; i< allEvents.length; i++){
            if(allEvents[i].timestamp === epoch){
                return true;
            }
        }
        return false;
    }

    var options = arr.map(hour => {
            const epoch = dayMonth + hour * 60 * 60 * 1000;
            return (
                <option 
                    value={hour}
                    disabled={isEpochReserved(epoch)}
                >{hour} : 00
                </option>
            )
        })

    
    

        // const jan = 1704067200000;
        // const feb = 1706745600000;
        // const mar = 1709251200000;
        // const apr = 1711929600000;
        // const may = 1714521600000;
        // const jun = 1717200000000;
        // const jul = 1719792000000;
        // const aug = 1722470400000;
        // const sep = 1725148800000;
        // const oct = 1727740800000;
        // const nov = 1730419200000;
        // const dec = 1733011200000;
        // const day1 = 86400000;

        const handleDay = event => {
            setDay(event.target.value)
        }

        const handleMonth = event => {
            setMonth(event.target.value)
        }

        const handleHour = event => {
            console.log("hour", dayMonth+event.target.value * 60 * 60 * 1000)
            props.setTimestamp((dayMonth+event.target.value * 60 * 60 * 1000),props.kind)
        }

        console.log("dayMonth", dayMonth);
  return (
    <div>
        
        <select
            id="hour"
            // value={props.formRso.category}
            // onChange={props.setFormRso}
            name="hour"
            onChange={handleHour}
            >
            {options}
        </select>
        <select
            id="day"
            // value={props.formRso.category}
            // onChange={props.setFormRso}
            name="day"
            onChange={handleDay}
            value={day}
            >  
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
            <option value={16}>16</option>
            <option value={17}>17</option>
            <option value={18}>18</option>
            <option value={19}>19</option>
            <option value={20}>20</option>
            <option value={21}>21</option>
            <option value={22}>22</option>
            <option value={23}>23</option>
            <option value={24}>24</option>
            <option value={25}>25</option>
            <option value={26}>26</option>
            <option value={27}>27</option>
            <option value={28}>28</option>
            <option value={29}>29</option>
            <option value={30}>30</option>
        </select>
        <select
            id="month"
            // value={props.formRso.category}
            // onChange={props.setFormRso}
            name="month"
            onChange={handleMonth}
            value={month}
            >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
        <input
            hidden
            type="text"
            placeholder="Timestamp"
            onChange={props.setForm}
            name="timestamp"
            value={inputTimestamp}
        />
    </div>
  )
}


export  default SelectTime;