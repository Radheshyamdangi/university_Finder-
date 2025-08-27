async function getData() {
  let country = search.value.trim() || "india";

  // Use /raw instead of /get
  let url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `http://universities.hipolabs.com/search?country=${country}`
  )}`;

  tbody.innerHTML = "";

  try {
    let res = await fetch(url);
    let data = await res.json();   // directly get JSON

    if (data.length === 0) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.colSpan = 6;
      td.innerText = "No universities found!";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    for (let item of data) {
      let tr = document.createElement("tr");

      // domain
      let td1 = document.createElement("td");
      td1.innerText = item.domains[0] || "N/A";
      tr.appendChild(td1);

      // web_pages
      let td2 = document.createElement("td");
      td2.innerHTML =
        `<a href="${item.web_pages[0]}" target="_blank">${item.web_pages[0]}</a>` ||
        "N/A";
      tr.appendChild(td2);

      // name
      let td3 = document.createElement("td");
      td3.innerText = item.name || "N/A";
      tr.appendChild(td3);

      // country
      let td4 = document.createElement("td");
      td4.innerText = item.country || "N/A";
      tr.appendChild(td4);

      // alpha_two_code
      let td5 = document.createElement("td");
      td5.innerText = item.alpha_two_code || "N/A";
      tr.appendChild(td5);

      // state-province
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
