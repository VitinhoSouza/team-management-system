import React, { useEffect } from 'react';
import { useState } from 'react';
import './PopUp.scss';

import {IconClose} from '../../assets/components/iconClose';
import {IconAlert} from '../../assets/components/iconAlert';
import {IconSuccess} from '../../assets/components/iconSuccess';

// import { IconAlert, IconSuccess } from '../../assets/components';

interface IPopUp {
    type: "Success" | "Error"
    message?: string
    status?: "Visible" | "NotVisible"
    submessage?: string
    functionClosePopUp?: () => void
}

const PopUp: React.FC<IPopUp> = (props: IPopUp) => {

    const [popUpVisible, setPopUpVisible] = useState<boolean>(false);

    useEffect(() => {
        if (props.status === "Visible") {
            setPopUpVisible(true)
        }
        else {
            setPopUpVisible(false)
        }
    }, [props.status])

    useEffect(()=>{
        if(props.status === 'Visible'){
            setTimeout(()=>{
                props.functionClosePopUp !== undefined &&
                props.functionClosePopUp()
            },5000)
        }
    },[props.status])


    function showPopUp() {
        return (
            <div className="containerPopUp">
                <div className="popUp">
                    <div >
                        {props.type === "Success"
                            ? <IconSuccess/>
                            : props.type === "Error"
                                ? <IconAlert/>
                                : <IconAlert/>}
                    </div>
                    <div className="text">
                        <span className="message">{props.message}</span>
                        {props.submessage !== undefined && (
                            <span className="submessage">{props.submessage}</span>
                        )}
                    </div>
                    <button className="button-close" onClick={props.functionClosePopUp}>
                            <IconClose/>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {popUpVisible ? showPopUp() : false}
        </>
    )
}

export default PopUp;
