import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function SearchBar() {

    const [query, setQuery] = useState("")
    const navigate = useNavigate();

    function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const newQuery = e.target.value
        setQuery(()=>newQuery)
    }

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        navigate(`/recipes?q=${query}`)
    }

    return (
        <form className="NavBar-search"

            onSubmit={(e)=>handleSubmit(e)}
        >

        <TextField
            id="NavBar-search-box"
            color="primary"
            value={query}
            placeholder="search recipes"
            onChange={(e)=>handleChange(e)}
            InputProps={{
                endAdornment: (
                    <FontAwesomeIcon icon={faSearch} />
                    ),
                }}
        />

        </form>
    );
}

export default SearchBar;