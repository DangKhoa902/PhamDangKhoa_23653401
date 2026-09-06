function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done after ${time}ms`), time);
  });
}

// Bài 6: Promise.all() chạy 3 task song song
function ex6(): Promise<void> {
  return Promise.all([
    simulateTask(1000),
    simulateTask(2000),
    simulateTask(1500),
  ]).then((results) => {
    console.log("Bài 6 (Promise.all):", results);
  });
}
  async function runBai6() {
    console.log("=== BẮT ĐẦU CHẠY Bài 6 ===\n");
  
    // Bài 6
  await ex6();
  }
  
  // Gọi hàm thực thi
  runBai6();