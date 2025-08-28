let btn = document.querySelector("button");
let search = document.querySelector("#name");
let tbody = document.querySelector("#uni-table");

// Button click event
btn.addEventListener("click", async () => {
  btn.innerText = "Fetching data .... ";
  await getData();
  btn.innerText = "Submit";
});

// Fetch Data Function
async function getData() {
  let country = search.value.trim() || "india";
  let url = `https://universities.hipolabs.com/search?country=${country}`;

 
  tbody.innerHTML = "";

  try {
    let res = await fetch(url);
    let data = await res.json(); // Directly parse JSON (no need for .contents)

    // If no results
    if (data.length === 0) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.colSpan = 6;
      td.innerText = "No universities found!";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;

      
    }

    // Loop through data
    for (let item of data) {
      let tr = document.createElement("tr");

      // Domain
      let td1 = document.createElement("td");
      td1.innerText = item.domains[0] || "N/A";
      tr.appendChild(td1);

      // Website
      let td2 = document.createElement("td");
      td2.innerHTML =
        item.web_pages && item.web_pages[0]
          ? `<a href="${item.web_pages[0]}" target="_blank">${item.web_pages[0]}</a>`
          : "N/A";
      tr.appendChild(td2);

      // Name
      let td3 = document.createElement("td");
      td3.innerText = item.name || "N/A";
      tr.appendChild(td3);

      // Country
      let td4 = document.createElement("td");
      td4.innerText = item.country || "N/A";
      tr.appendChild(td4);

      // Country Code
      let td5 = document.createElement("td");
      td5.innerText = item.alpha_two_code || "N/A";
      tr.appendChild(td5);

      // State/Province
      let td6 = document.createElement("td");
      td6.innerText = item["state-province"] || "N/A";
      tr.appendChild(td6);

      tbody.appendChild(tr);
    }
  } catch (err) {
  

    console.error("Error fetching data:", err);
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.colSpan = 6;
    td.innerText = "Error fetching data!";
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}
