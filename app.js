const ORCID_ID = "0000-0002-9604-8804";

const container = document.getElementById(
  "publications-container"
);

const reloadBtn = document.getElementById(
  "reload-btn"
);

async function fetchPublications(){

  container.innerHTML =
  `<div class="loading">Loading publications...</div>`;

  try{

    const response = await fetch(
      `https://pub.orcid.org/v3.0/${ORCID_ID}/works`,
      {
        headers:{
          Accept:"application/json"
        }
      }
    );

    const data = await response.json();

    const works = data.group || [];

    if(!works.length){

      container.innerHTML =
      `<div class="loading">No publications found.</div>`;

      return;
    }

    const publications = works.map(item => {

      const summary =
      item["work-summary"]?.[0];

      const title =
      summary?.title?.title?.value ||
      "Untitled Publication";

      const year =
      summary?.["publication-date"]?.year?.value ||
      "—";

      const journal =
      summary?.["journal-title"]?.value ||
      "Unknown Journal";

      const externalIds =
      summary?.["external-ids"]?.["external-id"] || [];

      let doiLink = "#";

      const doiObj = externalIds.find(
        id => id["external-id-type"] === "doi"
      );

      if(doiObj){

        doiLink =
        `https://doi.org/${doiObj["external-id-value"]}`;
      }

      return `
        <article class="publication">

          <span class="pub-year">
            ${year}
          </span>

          <a
            href="${doiLink}"
            target="_blank"
            class="pub-title"
          >
            ${title}
          </a>

          <div class="pub-journal">
            ${journal}
          </div>

        </article>
      `;

    });

    publications.sort((a,b) => b.year - a.year);

    container.innerHTML =
    publications.join("");

  }

  catch(error){

    console.error(error);

    container.innerHTML = `
      <div class="loading">
        Failed to load publications.
      </div>
    `;
  }

}

reloadBtn.addEventListener(
  "click",
  fetchPublications
);

fetchPublications();





