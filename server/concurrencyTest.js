const jobId = "3060cbdf-2aa1-4f7c-a132-6c23d965b6b1";

const request = (status) =>
  fetch(`http://localhost:3000/jobs/${jobId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  }).then(async (response) => ({
    requestedStatus: status,
    status: response.status,
    body: await response.json(),
  }));

Promise.all([
  request("completed"),
  request("failed"),
]).then((results) => {
  console.log(results);
});