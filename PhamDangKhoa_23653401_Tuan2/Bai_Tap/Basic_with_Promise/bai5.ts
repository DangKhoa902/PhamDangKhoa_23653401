// Bài 5: Hàm simulateTask(time)
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done after ${time}ms`), time);
  });
}
  async function runBai5() {
    console.log("=== BẮT ĐẦU CHẠY Bài 5 ===\n");
  
    // Bài 5
    const res5 = await simulateTask(1200);
    console.log("Bài 5:", res5);
  }
  
  // Gọi hàm thực thi
  runBai5();