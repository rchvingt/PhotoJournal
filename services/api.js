// fetch data from API
export const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      return data.slice(0, 10);  // get the first 10 posts
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
