import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Stack } from "@mui/material";


function SearchBar() {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newQuery = e.target.value;
        setQuery(() => newQuery);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement | SVGSVGElement>) {
        e.preventDefault();
        navigate(`/recipes?q=${query}`);
    }

    return (
        <form
            className="NavBar-search"
            onSubmit={(e) => handleSubmit(e)}
        >

            <TextField
                id="NavBar-search-box"
                color="primary"
                value={query}
                placeholder="search recipes"
                onChange={(e) => handleChange(e)}
                InputProps={{
                    startAdornment: (
                        <Stack
                            m="0 1rem 0 0"
                            alignItems="center"
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                cursor="pointer"
                                onClick={(e: React.FormEvent<SVGSVGElement>) => handleSubmit(e)} />
                        </Stack>
                    )
                }}
            />

        </form>
    );
}

export default SearchBar;