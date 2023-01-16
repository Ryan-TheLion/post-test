export const imgLoadEvent = (
  imgElement,
  { activeMaxLatency, maxLatencySecond } = {
    activeMaxLatency: true,
    maxLatencySecond: 8,
  }
) => {
  let imgLoaded;

  imgElement.addEventListener("error", (e) => {
    imgElement.src =
      "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/81c743ed-8171-40b7-9cf1-e739fe138b00/public";

    imgLoaded = true; // defaultImgLoaded
  });

  imgElement.addEventListener("load", (e) => {
    imgLoaded = true; // srcImgLoaded
  });

  if (activeMaxLatency) {
    setTimeout(() => {
      if (!imgLoaded) {
        imgElement.dispatchEvent(new Event("error"));
      }
    }, maxLatencySecond * 1000);
  }
};
