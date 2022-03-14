import React, { useEffect } from 'react';
import { useState } from 'react';
import './PopUp.scss';

import {IconClose} from '../../assets/components/iconClose';
import {IconAlert} from '../../assets/components/iconAlert';
import {IconSuccess} from '../../assets/components/iconSuccess';

// import { IconAlert, IconSuccess } from '../../assets/components';

interface IPopUp {
    isVisible: true | false
    type: "Success" | "Error"
    message: string
    submessage?: string
    functionClosePopUp?: () => void
}

const PopUp: React.FC<IPopUp> = ({isVisible,functionClosePopUp,type,message,submessage}: IPopUp) => {

    /* const [popUpVisible, setPopUpVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isVisible)
            setPopUpVisible(true)
        else
            setPopUpVisible(false)
    }, [isVisible]) */

    useEffect(()=>{
        if(isVisible){
            setTimeout(()=>{
                functionClosePopUp !== undefined &&
                functionClosePopUp()
            },8000)
        }
    },[isVisible])


    function showPopUp() {
        return (
            <div className="containerPopUp">
                <div className="popUp">
                    <div className="icons-text">
                        <div className="iconBase">
                            {type === "Success"
                                ? <IconSuccess/>
                                : type === "Error"
                                    ? <IconAlert/>
                                    : <IconAlert/>}
                        </div>
                        <span className="message">{message}</span>
                        <button className="iconClose" onClick={functionClosePopUp}>
                                <IconClose/>
                        </button>
                    </div>
                    {submessage !== undefined && (
                            <span className="submessage">{submessage}</span>
                        )}
                </div>
            </div>
        )
    }

    return (
        <>
            {isVisible ? showPopUp() : false}
        </>
    )
}

export default PopUp;
