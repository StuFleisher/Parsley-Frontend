import { useRef, useEffect, useState, ChangeEvent } from "react";
import "./AutoResizeInput.scss";
import { TextField,Box } from "@mui/material";

type Props = {
    value: string,
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    extraWidth?:number,
    className?:string,
    placeholder?:string
};


function AutoResizeInput({
    value,
    name,
    onChange,
    extraWidth=10,
    className="",
    placeholder="",
}: Props) {
    const spanRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState<number>(80);


    function handleChange(e:ChangeEvent<HTMLInputElement>){
        onChange(e)
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

    return (
        <Box className="AutoResizeInput">
            <span
                className={`className AutoResizeInput-clone`}
                ref={spanRef}
            >{value==="" ? placeholder : value}
            </span>
            <TextField
                className={className}
                placeholder={placeholder}
                size="small"
                variant="filled"
                label="description"
                ref={inputRef}
                value={value}
                name={name}
                onChange={handleChange}
                sx={{ width: inputWidth ? `${inputWidth}px` : 'auto' }}
            >
            </TextField>
        </Box>
    );
}

export default AutoResizeInput;