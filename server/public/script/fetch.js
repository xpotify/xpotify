const fetchAPI = async () => {
    const response = await fetch("http://localhost:6969/artist/q/alanwalker", {
        method: "GET", 
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
        });
        
        const data = await response.json();

        console.log(data);
};