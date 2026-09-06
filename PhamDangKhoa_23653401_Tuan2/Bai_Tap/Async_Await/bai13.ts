function createErrorPromise(): Promise<string> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Something went wrong")), 1000);
  });
}

async function bai13() {
  try {
    const res = await createErrorPromise();
    console.log(res);
  } catch (error) {
    console.error("Bài 13 Bắt lỗi:", (error as Error).message);
  }
}

bai13();