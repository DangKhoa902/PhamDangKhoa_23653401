// Bài 10: Sử dụng .finally() log "Done" khi kết thúc
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done after ${time}ms`), time);
  });
}

function ex10(): Promise<void> {
  return new Promise((resolve) => {
    simulateTask(1000)
      .then((res) => console.log("Bài 10 (Result):", res))
      .catch((err) => console.error("Bài 10 (Error):", err))
      .finally(() => {
        console.log("Bài 10 (.finally): Done");
        resolve();
      });
  });
}

  async function runBai10() {
    console.log("=== BẮT ĐẦU CHẠY Bài 10 ===\n");
  
    // Bài 10
  await ex10();
  }
  
  // Gọi hàm thực thi
  runBai10();