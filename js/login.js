function login() {
  let form = document.getElementById("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username.length == 0 || password.length == 0) {
      let divError = document.getElementById("error");
      divError.innerText = "errr";
      divError.style.color = "red";
      return;
    }
    checklogin(username, password);
  });
}
async function checklogin(usernameOrEmail, password) {
  try {
    const basicToken = btoa(`${usernameOrEmail}:${password}`);

    const response = await fetch(
      "https://learn.zone01oujda.ma/api/auth/signin",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("invalid email or password");
    }

    const jwt = await response.json();
    
console.log(jwt);

    localStorage.setItem("jwt", jwt);
    window.location.href = "profile.html";

    return jwt;
  } catch (err) {
    let divError = document.getElementById("error");
    divError.innerText = err.message;
    divError.style.color = "red";
  }
}
login();
