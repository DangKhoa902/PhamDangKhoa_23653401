// Bài 2: Hàm trả về Promise resolve số 10 sau 1 giây
function promise(): Promise<number> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(10), 1000);
    });
  }
  
  async function runBai2() {
    console.log("=== BẮT ĐẦU CHẠY Bài 2 ===\n");
  
    // Bài 2
    const res1 = await promise();
    console.log("Bài 2:", res1);
  
  }
  
  // Gọi hàm thực thi
  runBai2();