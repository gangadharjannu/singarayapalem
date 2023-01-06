var r = new XMLHttpRequest();
r.addEventListener("load", function () {
  const count = parseInt(JSON.parse(this.responseText).count, 10);
  if (count) {
    document.querySelector("#pageViewCount").innerText = count;
  }
});
r.open(
  "GET",
  "https://singarayapalem.goatcounter.com/counter/" +
    encodeURIComponent(location.pathname) +
    ".json"
);
r.send();
