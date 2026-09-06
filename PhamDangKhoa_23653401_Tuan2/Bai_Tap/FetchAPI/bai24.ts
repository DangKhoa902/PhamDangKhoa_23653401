async function postData() {
    const payload = {
    title: "TypeScript Async Exercise",
    body: "Learning Async/Await in TS",
    userId: 1,
  };
 const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log("Bài 24 POST Result:", data);
  
}

postData();