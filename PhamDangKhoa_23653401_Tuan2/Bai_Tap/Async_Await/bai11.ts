function delayHello(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("Hello Async"), 2000));
}

async function bai11() {
    console.log("Đang chờ 2 giây...");
    const result = await delayHello();
    console.log("Bài 11 Result:", result);
}
  
  bai11();