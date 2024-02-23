
//Checks if a string is a valid url
export function isURL(string?:string){
  if(!string) return false;
  try{
    new URL(string);
    return true
  } catch(err){
    return false;
  }
}