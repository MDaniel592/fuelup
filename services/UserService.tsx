  
  interface jsonData {
    userId: string;
    userData: any;
}

export async function getUserData(userId: string): Promise<any> {
    const rawResponse = await fetch(`/api/user?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!rawResponse.ok) return Promise.resolve(null);
    const jsonResponse = await rawResponse.json();
    return Promise.resolve(jsonResponse);
  }


export async function saveUserData(jsonData: jsonData): Promise<Response> {
    return fetch(`/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    });
  }