function simulateTask(time: number): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Task done after ${time}ms`), time);
    });
}

async function bai12() {
    const result = await simulateTask(2000);
    console.log("Bài 12 Result:", result);
}

bai12();