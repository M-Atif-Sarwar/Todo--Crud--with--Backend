
export const dateConversion = (taskDate) => {
    const date = new Date(taskDate);

    //making utc cordinated universal Time

    //The padStart() method  is used to pad (add characters to) the beginning of a string until it reaches a desired length

    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate()).padStart(2, '0');

    const formattedDate = `${mm}/${dd}/${yyyy}`;
    return formattedDate
  
}

