const API_URL = "https://autocomplete.clearbit.com/v1/companies/suggest?query=";

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const companyName = document.getElementById("searchInput").value.trim();
  if (companyName) {
    fetchCompanies(companyName);
  }
});

async function fetchCompanies(companyName) {
  const response = await fetch(API_URL + companyName);
  const data = await response.json();
  const resultsDiv = document.getElementById("results");
  const noResultsDiv = document.getElementById("noResults");
  resultsDiv.innerHTML = "";
  noResultsDiv.innerHTML = "";

  if(data && data.length > 0){
    data.forEach(company => {
    const article = document.createElement("article");
    const logoUrl = company.logo || `https://logo.clearbit.com/${company.domain}`;
    const careersUrl = `https://${company.domain}/careers`;

    article.innerHTML = `<img src="${logoUrl}" alt="${company.name} Logo" class="company-logo">
    <h3>${company.name}</h3>
      <p>Website: <a href="https://${company.domain}" target="_blank">${company.domain}</a></p>
      <p>Careers: <a href="${careersUrl}" target="_blank">${careersUrl}</a></p>`;
    resultsDiv.appendChild(article);
  });
  } else{
    const h3 = document.createElement("h3");
    h3.innerHTML = "<p>No Companies Found..!</p>";
    noResultsDiv.append(h3);

  }
}