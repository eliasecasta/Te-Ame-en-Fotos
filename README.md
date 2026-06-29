# Nuestra Historia · 2014 — ∞

Una página web creada con cariño, para recordar los momentos más bonitos que vivimos juntos.

## 📂 Estructura

```
Nuestro-Final-Bonito/
├── web/
│   ├── index.html     ← Abre este archivo en tu navegador
│   ├── style.css      ← Estilos y animaciones
│   └── script.js      ← Interactividad, música y efectos
├── assets/
│   ├── img/           ← Todas las fotos
│   ├── vid/           ← Videos
│   └── music/         ← Canciones de fondo (MP3, OGG, WAV, M4A, FLAC)
└── README.md
```

## 🚀 Cómo abrir la página

### Opción 1: Doble click
Simplemente haz doble click en `web/index.html` y se abrirá en tu navegador predeterminado.

### Opción 2: Servidor local (recomendado para ver todas las animaciones y música)
Si tienes Python instalado, abre una terminal en la carpeta `web/` y ejecuta:

```bash
# Python 3
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

### Opción 3: VS Code
Si usas VS Code, instala la extensión "Live Server", haz click derecho en `index.html` y selecciona "Open with Live Server".

## 🎵 Música de fondo

La página incluye un **reproductor de música elegante** con crossfade de 5 segundos entre canciones.

### Cómo agregar tus canciones:

1. Copia tus archivos de música a la carpeta `assets/music/`
2. Edita el archivo `web/script.js` y busca la sección `PLAYLIST DE MÚSICA`
3. Agrega cada canción con el siguiente formato:

```javascript
const playlist = [
    { file: 'cancion1.mp3', title: 'Nombre de la canción', artist: 'Artista' },
    { file: 'cancion2.mp3', title: 'Otra canción', artist: 'Otro artista' },
    { file: 'cancion3.mp3', title: 'Tercera canción', artist: 'Otro artista' },
];
```

**Formatos soportados:** MP3, OGG, WAV, M4A, FLAC

### Características del reproductor:
- 🎶 **Loop infinito** — cuando termina la última canción, vuelve a la primera
- 🔄 **Crossfade de 5 segundos** — transición suave entre canciones
- ▶️ **Play/Pause** con botón flotante
- ⏮⏭ **Anterior/Siguiente** canción
- 🔊 **Control de volumen** integrado
- 💫 **Diseño elegante** con glass morphism y animaciones suaves
- 📱 **Responsive** — se adapta a móvil y desktop

## ✨ Características

- 🎨 **Diseño elegante** con tipografías serif y paleta dorada/melancólica
- ✨ **Animaciones suaves** al hacer scroll (reveal, parallax, fade)
- 🌟 **Partículas flotantes** en la pantalla de inicio
- 📱 **Totalmente responsive** (se ve bien en móvil, tablet y desktop)
- 🗺️ **Navegación flotante** para saltar entre secciones
- 📜 **Datos históricos curiosos** de los lugares visitados (Torre Eiffel, castillos, etc.)
- 💌 **Carta interactiva** al final para invitarla a platicar
- 🎮 **Easter egg** secreto (código Konami)

## 💡 Notas técnicas

- Las imágenes se cargan con un filtro sepia sutil que se desvanece al hacer hover
- Las fotos tienen aspect-ratio 4:5 para mantener consistencia visual
- La navegación lateral muestra la sección activa mientras haces scroll
- Hay una barra de progreso dorada en la navegación

## 📝 Secciones

1. **Inicio** - Hero con dedicatoria y partículas
2. **2014** - El día que se conocieron (playera azul marino, mariposas)
3. **Momentos** - Cotidianidad (Uber Eats, albercas, cenas)
4. **El Mar** - Nuevo Vallarta, playa, cocodrilos
5. **París** - Torre Eiffel, Louvre, Arco del Triunfo, cumpleaños
6. **Castillos** - Carcasona, Mont Saint-Michel, Versalles
7. **Especial** - Graduación, bodas, antro
8. **Continuar** - Mensaje final invitándola a platicar

---

Hecho con ♡ · 2014 — ∞
