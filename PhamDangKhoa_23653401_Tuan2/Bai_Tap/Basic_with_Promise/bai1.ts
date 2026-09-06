// Bài 1: Promise trả về "Hello Async" sau 2 giây
const ex1 = (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Hello Async"), 2000);
    });
  };
  
  async function runBai1() {
    console.log("=== BẮT ĐẦU CHẠY Bài 1 ===\n");
  
    // Bài 1
    const res1 = await ex1();
    console.log("Bài 1:", res1);
  
  }
  
  // Gọi hàm thực thi
  runBai1();