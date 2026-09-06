// Bài 8: Promise chain (Bình phương 2 -> Nhân đôi -> Cộng 5)
function ex8(): Promise<void> {
  return Promise.resolve(2)
    .then((val) => val * val) // 2 * 2 = 4
    .then((val) => val * 2)   // 4 * 2 = 8
    .then((val) => val + 5)   // 8 + 5 = 13
    .then((res) => {
      console.log("Bài 8 (Promise chain result):", res);
    });
}

  async function runBai8() {
    console.log("=== BẮT ĐẦU CHẠY Bài 8 ===\n");
  
    // Bài 8
  await ex8();
  }
  
  // Gọi hàm thực thi
  runBai8();