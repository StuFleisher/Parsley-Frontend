import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";

import SimpleRecipeCard from "./SimpleRecipeCard";
import userContext from "../../helpers/userContext";
import { CookbookProvider } from "../../helpers/cookbookContext";
import "./RecipeList.scss"

type props = {
    recipes: SimpleRecipeData[];
    pageLength?: number;
};

function RecipeList({ recipes, pageLength = 10 }: props) {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const q = query.get('q');
    const page = parseInt(query.get('page') || '1', 10);
    const pageStart = (page - 1) * pageLength;
    const pageEnd = (page) * pageLength;
    const pageCount = Math.ceil(recipes.length / pageLength);

    const { username } = useContext(userContext);

    const pagination = (<Pagination
        count={pageCount}
        page={page}
        sx={{
            '& > .MuiPagination-ul': {
                justifyContent: 'center',
            },
        }}
        renderItem={(item) => (
            <PaginationItem
                className="RecipeList-pagelink"
                component={Link}
                to={`${location.pathname}${`?page=${item.page}`}${q ? `&q=${q}` : ""}`}
                {...item}
            />
        )}
    />);

    if (recipes.length === 0) {
        return (
            <Box className="RecipeList-empty">
                <FontAwesomeIcon icon={faKitchenSet} size="lg"/>
                <Typography variant="body1" color="charcoal" align="center">
                    There are no recipes to display.
                </Typography>
            </Box>
        );
    }

    return (
        <CookbookProvider cookbookOwner={username!}>
            <Box justifyContent="center">

                {pagination}

                {recipes.slice(pageStart, pageEnd).map((recipe, i) => {
                    return (
                        <SimpleRecipeCard
                            recipe={recipe}
                            key={i} />);
                })}

                {pagination}

            </Box>
        </CookbookProvider>
    );
}

export default RecipeList;