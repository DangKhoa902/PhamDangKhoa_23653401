// Bài 4: Sử dụng .then() và .catch() với số ngẫu nhiên
function promise(): Promise<void> {
    return new Promise((resolve) => {
      const randomNumberPromise = new Promise<number>((res, rej) => {
        const num = Math.random();
        if (num >= 0.5) res(num);
        else rej("Số ngẫu nhiên nhỏ hơn 0.5!");
      });
  
      randomNumberPromise
        .then((num) => console.log("Bài 4 (Thành công):", num))
        .catch((err) => console.log("Bài 4 (Thất bại):", err))
        .finally(() => resolve()); // Hoàn thành để chạy tiếp bài sau
    });
  }
  
  async function runBai4() {
    console.log("=== BẮT ĐẦU CHẠY Bài 4 ===\n");
  
    // Bài 4
    await promise();
  }
  
  // Gọi hàm thực thi
  runBai4();