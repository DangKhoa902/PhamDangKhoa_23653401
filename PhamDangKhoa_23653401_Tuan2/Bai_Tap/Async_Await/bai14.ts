async function multiplyByThree(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

async function bai14() {
  const result = await multiplyByThree(5);
  console.log("Bài 14 Result (5 * 3):", result);
}

bai14();