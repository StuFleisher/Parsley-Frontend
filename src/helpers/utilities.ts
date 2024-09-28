
//Checks if a string is a valid url
export function isURL(string?: string) {
  if (!string) return false;
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}


/**Given an object and a path(string) returns the value from that object at the
 * position indicated in the path
*/

export function getNested(obj: any, path: string): any {
  const keys = path.split(/[.[\]'"]/).filter(p => p);
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

/** Takes a string and a number n.  Returns the first n characters of the string
 * plus the remaining characters in the final word
 *
 *  ("an example of the output",2)=> "an"
 *  ("an example of the output",3)=> "an example"
 *  ("an example of the output",11)=> "an example of"
 */

export function shortenString(str: string, n: number) {
  if (str.length <= n) return str;
  const shortStr = `${str.split(" ")
    .reduce((acc, curr, i) => {
      return (acc.length + i < n)
        ? `${acc} ${curr}`
        : acc;
    })}`;
  return `${shortStr}...`;
}

/** Splits a string by commas, cleans the result, and converts each item to
 *  a Tag object */
export function stringToTags(tagString: string): Partial<Tag>[] {
  if (!tagString || tagString.trim() === "") return [];
  const splitTags = tagString.split(',');
  const filteredTags = splitTags.filter((tag) => tag.trim().length > 0);
  const tags = filteredTags.map((tag) => {
    return { name: tag.trim().toLowerCase() };
  });

  return tags;
}

export function tagsToString(tags: Tag[] | undefined): string | undefined {
  if (!tags || tags.length === 0) return "";

  const tagString = tags.reduce((accumulator, current) => {
    if (accumulator === "") return current.name;
    return `${accumulator}, ${current.name}`;
  }, "");
  return tagString;
}