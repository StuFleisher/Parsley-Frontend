
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


/**Given an object and a path(string) returns the value from that object at the
 * position indicated in the path
*/

export function getNested(obj: any, path: string): any {
  const keys = path.split(/[\.\[\]\'\"]/).filter(p => p);
  return keys.reduce((accumulator: any, currentKey: string) => {
    // Using type assertion to indicate that accumulator is indexable
    if (accumulator && typeof accumulator === 'object' && currentKey in accumulator) {
      return accumulator[currentKey];
    } else {
      // Return undefined or throw an error if the path does not exist
      return undefined;
    }
  }, obj);
}