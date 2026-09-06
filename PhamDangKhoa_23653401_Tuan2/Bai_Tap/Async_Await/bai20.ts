function slowApiCall(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("API Data"), 3000)); // Mất 3s
}

async function bai20() {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("API call timed out (> 2s)")), 2000)
  );

  try {
    const data = await Promise.race([slowApiCall(), timeout]);
    console.log(data);
  } catch (error) {
    console.error("Bài 20 Error:", (error as Error).message);
  }
}

bai20();