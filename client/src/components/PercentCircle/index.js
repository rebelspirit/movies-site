import React, {useCallback} from 'react'
import './index.css'
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const PercentCircle = (props) => {
    const vote = props.vote;
    const percent = vote * 10;
    const text = percent ? `${percent}%` : 'NR';

    const switchColor = useCallback((percent) => {
        if (percent <= 40) {
            return "rgba(252, 98, 98, 1)"
        } else if (percent <= 70) {
            return "rgba(255, 216, 111, 1)"
        } else {
            return "rgba(33,208,122, 1)"
        }
    }, []);

    return (
        <CircularProgressbar
            value={percent}
            text={text}
            background
            backgroundPadding={6}
            strokeWidth={5}
            styles={buildStyles({
                backgroundColor: "rgba(25,25,25, 1)",
                textColor: "#dedede",
                pathColor: switchColor(percent),
                trailColor: "transparent"
            })}
        />
    )
};