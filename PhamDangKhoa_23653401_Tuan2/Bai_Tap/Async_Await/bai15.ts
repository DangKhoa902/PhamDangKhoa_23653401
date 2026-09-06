async function stepTask(name: string, delay: number): Promise<string> {
  await new Promise((r) => setTimeout(r, delay));
  return `Bước ${name} hoàn thành`;
}

async function bai15() {
  console.time("Bài 15 Thời gian chạy");
  const step1 = await stepTask("1", 1000);
  console.log(step1);
  const step2 = await stepTask("2", 1000);
  console.log(step2);
  console.timeEnd("Bài 15 Thời gian chạy"); //Mất khoảng 2s
}

bai15();