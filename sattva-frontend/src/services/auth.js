export async function signup(userData){
    const res = await fetch("http://localhost:5000/auth/signup",{
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
   
}

export async function login(userData){
    const res = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(userData),
    });
    return res.json();
}