function createPromise(id: number, delay: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`Item ${id}`), delay));
}

async function bai17() {
  const promises = [
    createPromise(1, 1000),
    createPromise(2, 500),
    createPromise(3, 1500),
  ];

  console.log("Bài 17 Bắt đầu lặp...");
  for await (const item of promises) {
    console.log("Đã xử lý:", item);
  }
}

bai17();