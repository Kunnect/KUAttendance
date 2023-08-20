import React from "react";

const VisualizeOfficeIn = ({dispatch, id})=>{
    // let time_data = date.split(" ");

    return (
        <div>
            <button
                onClick={()=>{
                    dispatch({type: 'diposit-out', payload: { id } })}
                } style={{
                width: "90px",height: "36px",fontSize: "24px" }}>
                퇴근
            </button>
        </div>
    )
}

export default VisualizeOfficeIn;