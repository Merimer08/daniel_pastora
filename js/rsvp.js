(function registerRsvpModule(global) {
  "use strict";

  const SELECTORS = Object.freeze({
    form: "#rsvp-form",
    result: "#confirmation-result",
    copy: "#confirmation-copy",
    share: "#share-confirmation",
    edit: "#edit-confirmation",
    status: "#share-status",
    name: "#guest-name"
  });

  function getElements(root) {
    return Object.fromEntries(
      Object.entries(SELECTORS).map(([key, selector]) => [key, root.querySelector(selector)])
    );
  }

  function hasRequiredElements(elements) {
    return Object.values(elements).every(Boolean);
  }

  function createConfirmationMessage(formData, eventDetails) {
    const name = String(formData.get("guestName") || "").trim();
    const attendance = String(formData.get("attendance") || "");
    const note = String(formData.get("guestNote") || "").trim();

    return [
      eventDetails.confirmationTitle,
      `Nombre: ${name}`,
      `Respuesta: ${attendance}`,
      `Fecha: ${eventDetails.date}`,
      `Horario: ${eventDetails.schedule}`,
      `Lugar: ${eventDetails.venue}`,
      note ? `Mensaje: ${note}` : ""
    ].filter(Boolean).join("\n");
  }

  async function shareConfirmation(text, eventDetails, statusElement) {
    statusElement.textContent = "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: eventDetails.confirmationTitle,
          text
        });
        statusElement.textContent = "Confirmación compartida.";
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        statusElement.textContent = "Confirmación copiada. Ya puedes pegarla en tu mensaje.";
        return;
      }

      throw new Error("Sharing is unavailable");
    } catch (error) {
      if (error.name !== "AbortError") {
        statusElement.textContent = "Selecciona el texto de arriba para copiarlo y enviarlo.";
      }
    }
  }

  function init(root, eventDetails) {
    const elements = getElements(root);
    if (!hasRequiredElements(elements)) return;

    let confirmationText = "";

    elements.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!elements.form.reportValidity()) return;

      confirmationText = createConfirmationMessage(
        new FormData(elements.form),
        eventDetails
      );

      elements.copy.textContent = confirmationText;
      elements.form.hidden = true;
      elements.result.hidden = false;
      elements.status.textContent = "";
      elements.result.focus();
    });

    elements.share.addEventListener("click", () => {
      shareConfirmation(confirmationText, eventDetails, elements.status);
    });

    elements.edit.addEventListener("click", () => {
      elements.result.hidden = true;
      elements.form.hidden = false;
      elements.name.focus();
    });
  }

  global.Invitation = global.Invitation || {};
  global.Invitation.rsvp = Object.freeze({
    init,
    createConfirmationMessage
  });
})(window);

