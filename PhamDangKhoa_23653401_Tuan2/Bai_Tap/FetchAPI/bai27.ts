async function fetchWithRetry(url: string, retries: number): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.log(`Lỗi! Thử lại... Số lần còn lại: ${retries}`);
      return await fetchWithRetry(url, retries - 1);
    } else {
      throw new Error(`Đã hết số lần thử lại: ${(error as Error).message}`);
    }
  }
}

async function bai27() {
  try {
    // Thử đường dẫn sai để xem cơ chế Retry chạy
    const data = await fetchWithRetry("https://invalid-domain-123456.com/data", 3);
    console.log(data);
  } catch (err) {
    console.error("Bài 27 Error:", (err as Error).message);
  }
}

bai27();