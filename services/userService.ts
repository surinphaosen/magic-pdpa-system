export async function getUsers() {
  try {
    const res = await fetch("/api/proxy-users")
    if (!res.ok) {
      // log status and statusText for easier debugging
      // fallback for environments where statusText may be undefined
      console.error(`getUsers error: ${res.status} ${res.statusText || ""}`)
      return []
    }
    return await res.json()
  } catch (error) {
    console.error("getUsers error:", error)
    return []
  }
}

export async function updateUser(user: {
  username: string
  password?: string
  fullName: string
  email: string
  role: string
}) {
  try {
    const res = await fetch("/api/proxy-update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password ?? "",
        fullName: user.fullName, // ต้องใช้ fullName (PascalCase)
        email: user.email,
        role: user.role,
      }),
    })
    if (!res.ok) {
      console.error(`updateUser error: ${res.status} ${res.statusText || ""}`)
      return { success: false }
    }
    return { success: true }
  } catch (error) {
    console.error("updateUser error:", error)
    return { success: false }
  }
}



