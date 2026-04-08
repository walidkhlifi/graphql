import { xpsLevel } from "./query.js";
import { img } from "./query.js";
import { info } from "./query.js";
import { skills } from "./query.js";
import { GetUser } from "./query.js";
import { GetIds } from "./query.js";
let Id = 0;

const jwt = localStorage.getItem("jwt");
if (!jwt) {
  localStorage.removeItem("jwt");
  window.location.href = "index.html";
}
//function principal
async function runGraphQLQuery(query) {
  const response = await fetch(
    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );
  const data = await response.json();
  if (!data.data) {
    localStorage.removeItem("jwt");
    window.location.href = "index.html";
  }
  return data.data;
}

// id and login
async function loadUserInfo() {
  const data = await runGraphQLQuery(info);
  if (!data) return;

  Id = data.user[0].id;

  document.getElementById("userLogin").innerText =
    `Username: ${data.user[0].login}`;
  document.getElementById("phone").innerText =
    `Phone: ${data.user[0].attrs.tel}`;
  document.getElementById("ratio").innerText =
    `Total ratio:  ${Math.round(Number(data.user[0].auditRatio) * 10) / 10}`;
  document.getElementById("city").innerText =
    `City: ${data.user[0].attrs.city} `;
  document.getElementById("profile").innerText =
    `Hii: ${data.user[0].attrs.lastName} ${data.user[0].attrs.firstName}!`;
}
// profile photo
async function loadimage() {
  const data = await runGraphQLQuery(img);
  document.getElementById("imgProfile").src = data.user[0].avatarUrl;
}
async function loadxps() {
  const data = await runGraphQLQuery(xpsLevel);
  if (!data) return;

  let totalXP = data.xp.aggregate.sum.amount;
  let displayXP;

  if (totalXP >= 1000000) {
    displayXP = Math.round(totalXP / 1000000) + " MB";
  } else if (totalXP >= 1000) {
    displayXP = Math.round(totalXP / 1000) + " KB";
  } else {
    displayXP = totalXP + " B";
  }

  let xps = document.getElementById("totalXP");
  xps.innerText = displayXP;

  let Level = document.getElementById("Level");
  Level.innerText = data.level[0].amount;
}
// Skills
async function loadskills() {
  const data = await runGraphQLQuery(skills);
  if (!data || !data.user[0].transactions.length) return;
  let div = document.getElementById("Skills");
  let j = 0;
  let d = 700 / data.user[0].transactions.length;
  let t = 150;

  let content = "";
  data.user[0].transactions.forEach((element) => {
    content += `
        <rect x='${j}' y='${t - element.amount}' width='${d - 5}' height='${element.amount}'/>
        <text x='${j + (d - 5) / 2}' y='${t - element.amount - 5}'  text-anchor='middle' font-size='10'> ${element.amount}</text>
        <text x='${j + (d - 5)}' y='${t + 15}' transform='rotate(45 ${j + (d - 5) / 2}, ${t + 15})' text-anchor='middle' font-size='10'> ${element.type || "skill"}</text>
        `;
    j += d;
  });
  div.innerHTML = content;
}

// Logout
function logout() {
  const btn = document.getElementById("logoutBtn");
  if (!btn) {
    return;
  }
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    window.location.href = "index.html";
  });
}


async function getUserTransactions(id, ar) {
  let big = [];
  let name=[]
  const jwtToken = localStorage.getItem("jwt");
  if (!jwtToken) {
    return ;
  }
  try {
    const response = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GetUser,
          variables: {
            user_id: id,
          },
        }),
      },
    );
    if (!response.ok) {
      return ;
    } else {
      let x = 0;
      const data = await response.json();
      if (!data?.data?.user?.length) {
        console.log("no user");
        return;
      }

      data?.data?.user[0]?.transactions.forEach((element) => {
        
        
        ar.forEach((ele) => {
          if (String(ele.id) === String(element.objectId) && element.type === "xp"){
            x += element.amount;
            big.push([element.amount, element.createdAt]);
            name.push(ele.name);
          }
        });
      });

      if (big.length === 0) {
        console.log("no data");
        return;
      }

      const width = 700;
      const height = 500;
      const padding = 0;

      let start = new Date(big[0][1]);
      let end = new Date(big[big.length - 1][1]);
      let p = end - start;

      let circle = "";
      let t = 0;
      let path = "";

      big.forEach((c, i) => {
        t += c[0];
        let xPos = ((new Date(c[1]) - start) / p) * width + padding;
        let yPos = height - (t * height) / x;
        circle += `
          <circle cx="${xPos}" cy="${yPos}" r="5" fill="red">
              <title>
              XP: ${c[0]}
              Date: ${new Date(c[1]).toLocaleDateString()}
              </title>
          </circle>`;

        if (i === 0) {
          path += `M ${xPos} ${yPos}`;
        } else {
          path += ` L ${xPos} ${yPos}`;
        }

      });

      const svg = `
    <svg width="${width}" height="${height}" style="border:1px solid black">
        <!-- X axis -->
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="black" stroke-width="2"/>
        <!-- Y axis -->
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="black" stroke-width="2"/>
      

          <!-- X label -->
    <text 
        x="${width / 2}" 
        y="${height - 5}" 
        text-anchor="middle" 
        font-size="14"
    >
        Date
    </text>

    <!-- Y label -->
    <text 
        x="15" 
        y="${height / 2}" 
        text-anchor="middle" 
        transform="rotate(-90 15, ${height / 2})"
        font-size="14"
    >
        XP
    </text>

    
      <path d="${path}" fill="none" stroke="blue" stroke-width="2"/>
        ${circle}

    </svg>
    `;
    let project=""
    
    name.forEach(n=>{
      project+=`<h5>${n}</h5>`
    })
    

    document.getElementById("xpGraph").innerHTML = svg;
    document.getElementById("projects").innerHTML=project

      return;
    }
  } catch (error) {
    return ;
  }
}

async function getObjectIDs() {
  let arr = [];

  const jwtToken = localStorage.getItem("jwt");
  if (!jwtToken) {
    return ;
  }
  try {
    const response = await fetch(
      "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GetIds,
        }),
      },
    );
    if (!response.ok) {
      return false;
    } else {
      const data = await response.json();
      
      data?.data?.object.forEach((element) => {
        if (!element.name.startsWith("quest")) {
          arr.push(element);
        }
      });

      return arr;
    }
  } catch (error) {
    return false;
  }
}

async function start() {
  await loadUserInfo();

  await Promise.all([
    loadimage(),
    loadxps(),
    loadskills()
  ]);

  logout();

  const ar = await getObjectIDs();
  if (ar && ar.length > 0) {
    await getUserTransactions(Id, ar);
  }
}

start();