export const headerScrollEvent = (headerElement) => {
  window.addEventListener("scroll", (e) => {
    const viewportHeight = window.innerHeight;
    const isClosetSearchArea = window.scrollY >= viewportHeight;

    headerElement.classList.toggle("searchMode", isClosetSearchArea);
  });
};
