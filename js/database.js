async function getList() {
  try {
    const response = await fetch('https://rose-firefly-belt.cyclic.app/api/view');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

getList().then((database) => {
  // Sort the database array based on the details.date property in descending order
  database.sort((a, b) => b.details.date - a.details.date);

  for (let i = 0; i < database.length; i++) {
    document.getElementById("list-rege").innerHTML += `<div class="card mb-3 mt-auto">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h5 class="card-title"><b>${database[i].title}</b></h5>
                    <p class="card-text">${database[i].description}</p>
                    ${database[i].details.isBanned ? '<span class="badge bg-danger">Banned</span>' : '<span class="badge bg-success">No Banned</span>'}
                    ${database[i].details.isFFMax ? '<span class="badge bg-primary">FFMAX</span>' : ''}
                    ${database[i].details.isFFBiasa ? '<span class="badge bg-dark">FF BIASA</span>' : ''}
                    <small class="text-muted d-block mt-3">${getTimeDifference(database[i].details.date)}</small>
                </div>
                <div>
                    <a class="btn btn-primary" href="${database[i].download}">Download</a>
                </div>
            </div>
        </div>
    </div>`;
  }
});

function getTimeDifference(timestamp) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - timestamp;

  if (timeDifference < 60000) {
    return Math.floor(timeDifference / 1000) + ' detik yang lalu';
  } else if (timeDifference < 3600000) {
    return Math.floor(timeDifference / 60000) + ' menit yang lalu';
  } else if (timeDifference < 86400000) {
    return Math.floor(timeDifference / 3600000) + ' jam yang lalu';
  } else if (timeDifference < 604800000) {
    return Math.floor(timeDifference / 86400000) + ' hari yang lalu';
  } else if (timeDifference < 2592000000) {
    return Math.floor(timeDifference / 604800000) + ' minggu yang lalu';
  } else if (timeDifference < 31536000000) {
    const monthsAgo = Math.floor(timeDifference / 2592000000);
    return monthsAgo > 1 ? monthsAgo + ' bulan yang lalu' : '1 bulan yang lalu';
  } else if (timeDifference < 31536000000 * 2) {
    return '1 tahun yang lalu';
  } else {
    const yearsAgo = Math.floor(timeDifference / 31536000000);
    return yearsAgo > 1 ? yearsAgo + ' tahun yang lalu' : '1 tahun yang lalu';
  }
}