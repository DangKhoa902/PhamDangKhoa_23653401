async function stepTask(name: string, delay: number): Promise<string> {
  await new Promise((r) => setTimeout(r, delay));
  return `Task ${name} xong`;
}

async function bai16() {
  console.time("Bài 16 Thời gian chạy");
  const results = await Promise.all([
    stepTask("A", 1000),
    stepTask("B", 1000),
    stepTask("C", 1000),
  ]);
  console.log("Bài 16 Results:", results);
  console.timeEnd("Bài 16 Thời gian chạy"); // Chỉ mất khoảng 1s
}

bai16();