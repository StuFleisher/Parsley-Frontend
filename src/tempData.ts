const testRecipe:IRecipe = {
  "recipeId": 1,
  "name": "Peanut Butter and Jelly Sandwich",
  description:"An American classic",
  sourceName:"Mom",
  sourceUrl:"https://stufleisher.com",
  "steps": [
    {
      "stepId":1,
      "stepNumber": 1,
      "instructions": "On one slice of bread, spread peanut butter evenly over the bread.",
      "ingredients": [{
          "ingredientId": 1,
          "amount": "2 Tablespoons",
          "description": "Peanut Butter"
        },
        {
          "ingredientId": 1,
          "amount": "1 slice",
          "description": "bread"
        }
      ]
    },
    {
      "stepId":2,
      "stepNumber": 2,
      "instructions": "On the other slice of bread, spread the jelly evenly over the bread.",
      "ingredients": [
        {
          "ingredientId": 1,
          "amount": "2 Tablespoons",
          "description": "Grape Jelly"
        },
        {
          "ingredientId": 1,
          "amount": "1 slice",
          "description": "bread"
        }
      ]
    },
    {
      "stepId":3,
      "stepNumber": 3,
      "instructions": "Put the two slices of bread together with the peanut butter and jelly facing in.",
      "ingredients": [
        {
          "ingredientId": 1,
          "amount": "1",
          "description": "assembled sandwich"
        }
      ]
    },
    {
      "stepId":4,
      "stepNumber": 4,
      "instructions": "Serve and enjoy!",
      "ingredients": []
    },
    {
      "stepId":5,
      "stepNumber": 5,
      "instructions": "Optional: Remove crusts, cut diagonally.",
      "ingredients": []
    }
  ]
}

export default testRecipe;