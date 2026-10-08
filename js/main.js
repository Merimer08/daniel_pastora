(function bootstrapInvitation(global, document) {
  "use strict";

  function start() {
    const invitation = global.Invitation;
    if (!invitation?.config?.event || !invitation?.rsvp?.init) {
      console.error("No se pudo iniciar el formulario de confirmación.");
      return;
    }

    invitation.rsvp.init(document, invitation.config.event);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})(window, document);

