// Bài 3: Hàm reject Promise với lỗi "Something went wrong" sau 1 giây
function promise(): Promise<string> {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Something went wrong")), 1000);
    });
  }
  
  async function runBai3() {
    console.log("=== BẮT ĐẦU CHẠY Bài 3 ===\n");
  
    // Bài 3
    try {
        await promise();
      } catch (error) {
        console.log("Bài 3 (Catch error):", (error as Error).message);
      }
  }
  
  // Gọi hàm thực thi
  runBai3();