function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done after ${time}ms`), time);
  });
}

// Bài 7: Promise.race() trả về task xong đầu tiên
function ex7(): Promise<void> {
  return Promise.race([
    simulateTask(2000),
    simulateTask(500), // Task này xong sớm nhất
    simulateTask(1000),
  ]).then((winner) => {
    console.log("Bài 7 (Promise.race winner):", winner);
  });
}
  async function runBai7() {
    console.log("=== BẮT ĐẦU CHẠY Bài 7 ===\n");
  
    // Bài 7
  await ex7();
  }
  
  // Gọi hàm thực thi
  runBai7();