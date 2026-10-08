# Invitación de cumpleaños

Invitación estática de dos pantallas para el 16 de octubre en La Embajada, Zaragoza.

## Estructura

```text
dist/
├── index.html
├── assets/
│   ├── sushi-night.png
│   └── dinner-night-v2.png
├── styles/
│   ├── base.css
│   ├── invitation.css
│   ├── rsvp.css
│   └── responsive.css
└── js/
    ├── config.js
    ├── rsvp.js
    └── main.js
```

## Responsabilidades

- `base.css`: variables visuales, estilos globales, botones y animaciones.
- `invitation.css`: composición de las dos pantallas y tarjeta del evento.
- `rsvp.css`: campos, opciones y resultado del formulario.
- `responsive.css`: adaptaciones para tablet, móvil y movimiento reducido.
- `config.js`: datos del evento usados en la confirmación.
- `rsvp.js`: creación, edición y uso compartido de la confirmación.
- `main.js`: arranque seguro de la interfaz.

Para cambiar la fecha, el horario o el lugar del mensaje generado, edita `dist/js/config.js`. El contenido visible equivalente se encuentra en `dist/index.html`.

