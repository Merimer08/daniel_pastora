(function registerInvitationConfig(global) {
  "use strict";

  const event = Object.freeze({
    date: "16 de octubre",
    schedule: "21:00–22:00",
    venue: "La Embajada, Zaragoza",
    confirmationTitle: "Confirmación de asistencia"
  });

  global.Invitation = global.Invitation || {};
  global.Invitation.config = Object.freeze({ event });
})(window);

