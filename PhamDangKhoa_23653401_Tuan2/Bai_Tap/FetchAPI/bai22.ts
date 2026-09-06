async function bai22() {
  const ids = [1, 2, 3, 4];
  const requests = ids.map((id) =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) => res.json())
  );

  const results = await Promise.all(requests);
  console.log("Bài 22 Multiple Todo Results:", results);
}
bai22();