import { useEffect, useState } from "react";
import ParsleyAPI from "../helpers/api";

type FetchRecipeResult = {
  recipe:Recipe | null,
  setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>,
  loading:boolean,
  error:any,
}

function useFetchRecipe(id: number): FetchRecipeResult {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    async function fetchLarp() {
      try {
        const response = await ParsleyAPI.getRecipeById(id);
        setRecipe(response);
        setLoading(false);
      } catch (err:any) {
        setError(err);
        setLoading(false);
      }
    }

    fetchLarp();
  }, [setRecipe, id]);

  return {recipe, setRecipe, loading, error};
}



export { useFetchRecipe };