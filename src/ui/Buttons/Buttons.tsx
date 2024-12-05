
// type ButtonActionProps<T = void> = {
//     text: string,
//     action: (arg: T) => void,
// }
//
// export const ButtonAction = <T,>({ text, action }: ButtonActionProps<T>) => {
//     return (
//         <div onClick={() => action()}>{text}</div>
//     );
// };


import React from "react";
import styles from "./Buttons.module.css";

type ButtonActionProps = {
    text: string,
    action: any,
}

export const ButtonAction:React.FC<ButtonActionProps> = ({ text, action }) => {
    return (
        <div className={styles.buttonAction} onClick={() => action()}>{text}</div>
    );
};
