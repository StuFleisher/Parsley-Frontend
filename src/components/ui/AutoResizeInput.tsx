import { useRef, useEffect, useState, ChangeEvent } from "react";
import "./AutoResizeInput.scss";

type Props = {
    value: string,
    name: string,
    updateValue: Function,
    extraWidth?:number,
    className?:string,
    placeholder?:string
};


function AutoResizeInput({
    value,
    name,
    updateValue,
    extraWidth=10,
    className="",
    placeholder="",
}: Props) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState<number>(30);


    function handleChange(e:ChangeEvent<HTMLInputElement>){
        updateValue(e)
    }

    //Update the width to match an invisible span
    useEffect(function updateInputWidth() {
        if (inputRef.current && spanRef.current) {
            const spanWidth = spanRef.current.getBoundingClientRect().width;
            setInputWidth(spanWidth);
        } else {
            setTimeout(updateInputWidth,10)
        }
    }, [value, extraWidth]);

    useEffect(function matchStyles() {
        if (inputRef.current && spanRef.current) {
            const sourceStyles = window.getComputedStyle(inputRef.current);

            spanRef.current.style.fontFamily = sourceStyles.fontFamily;
            spanRef.current.style.fontSize = sourceStyles.fontSize;
            spanRef.current.style.fontWeight = sourceStyles.fontWeight;
            spanRef.current.style.padding = sourceStyles.padding;
        }
    }, [inputRef]);

    return (
        <div className="AutoResizeInput">
            <span
                className={className}
                ref={spanRef}
            >{value==="" ? placeholder : value}
            </span>
            <input
                className={className}
                placeholder={placeholder}
                ref={inputRef}
                value={value}
                name={name}
                onChange={handleChange}
                style={{ width: inputWidth ? `${inputWidth}px` : 'auto' }}
            >
            </input>
        </div>
    );
}

export default AutoResizeInput;