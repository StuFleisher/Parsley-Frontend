import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import SimpleRecipeCard from "./SimpleRecipeCard";
import userContext from "../../helpers/userContext";
import { CookbookProvider } from "../../helpers/cookbookContext";

type props = {
    recipes: SimpleRecipeData[];
    pageLength?: number;
};

function RecipeList({ recipes, pageLength = 10 }: props) {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
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
                    to={`${location.pathname}${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                />
        )}
    />);

    if (recipes.length === 0) {
        return (
            <Box>
                <Typography variant="h2" color="secondary">
                    Sorry, We couldn't find any relevant recipes.
                </Typography>
            </Box>
        );
    }

    return (
        <CookbookProvider username={username!}>
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