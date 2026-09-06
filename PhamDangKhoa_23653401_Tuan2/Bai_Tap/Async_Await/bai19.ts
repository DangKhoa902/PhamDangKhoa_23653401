interface User {
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, name: `User_${id}` }), 1000)
  );
}

async function fetchUsers(ids: number[]): Promise<User[]> {
  const promises = ids.map((id) => fetchUser(id));
  return await Promise.all(promises);
}

async function bai19() {
  const users = await fetchUsers([1, 2, 3, 4]);
  console.log("Bài 19 Danh sách Users:", users);
}

bai19();