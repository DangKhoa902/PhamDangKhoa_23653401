// Bài 9: Đọc mảng sau 1 giây và lọc số chẵn
function ex9(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const evenNumbers = arr.filter((num) => num % 2 === 0);
      resolve(evenNumbers);
    }, 1000);
  });
}

  async function runBai9() {
    console.log("=== BẮT ĐẦU CHẠY Bài 9 ===\n");
  
    // Bài 9
  const res9 = await ex9([1, 2, 3, 4, 5, 6, 7, 8]);
  console.log("Bài 9 (Filtered even numbers):", res9);
  }
  
  // Gọi hàm thực thi
  runBai9();