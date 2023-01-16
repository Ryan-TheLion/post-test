import { Modal } from "../components/modal";
import { disableScroll } from "../util/scrollLock";

let modalRef = null;

export const modalEventType = {
  open: "openModal",
  close: "closeModal",
};

export const ModalOpenEvent = (imdbId) => {
  modalRef = new Modal(imdbId);

  return new CustomEvent(modalEventType.open, {
    detail: {
      modalRef,
    },
    bubbles: true,
  });
};

export const ModalCloseEvent = (targetModal) =>
  new CustomEvent(modalEventType.close, {
    detail: {
      modalRef: targetModal || modalRef,
    },
    bubbles: true,
  });

registerModalOpenEvent();
registerModalCloseEvent();

function registerModalOpenEvent() {
  window.addEventListener(modalEventType.open, handleModalOpen);

  function handleModalOpen(e) {
    e.detail?.modalRef.render();
    disableScroll();
  }
}

function registerModalCloseEvent() {
  window.addEventListener(modalEventType.close, handleModalClose);

  function handleModalClose(e) {
    e.detail?.modalRef.unmount();
    modalRef = null;
  }
}
