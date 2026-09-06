async function bai30() {
  const requests = [
    fetch("https://jsonplaceholder.typicode.com/todos/1").then((r) => r.json()),
    fetch("https://invalid-url-domain-xyz.com").then((r) => r.json()), // Sẽ bị Reject/Lỗi
    fetch("https://jsonplaceholder.typicode.com/todos/2").then((r) => r.json()),
  ];

  console.log("Đang thực thi các API calls...");
  const results = await Promise.allSettled(requests);

  results.forEach((res, index) => {
    if (res.status === "fulfilled") {
      console.log(`API ${index + 1} Success:`, res.value);
    } else {
      console.error(`API ${index + 1} Failed:`, res.reason.message);
    }
  });
}

bai30();