# GastoFácil

Aplicación móvil hecha con [Expo](https://expo.dev) y React Native para registrar, consultar y eliminar gastos de forma sencilla.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm (viene con Node.js)
- App **Expo Go** en el teléfono (opcional, para probar en dispositivo real)

## Cómo instalar y ejecutar

1. Abre una terminal en la carpeta del proyecto.

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación:

   ```bash
   npx expo start
   ```

4. Cuando aparezca el menú de Expo, elige cómo abrirla:

| Opción | Qué hacer |
|--------|-----------|
| **Teléfono (Expo Go)** | Instala Expo Go, conecta el teléfono a la misma Wi‑Fi que la PC y escanea el código QR |
| **Android** | Presiona `a` (necesitas un emulador de Android Studio) |
| **iOS** | Presiona `i` (solo en Mac con Xcode) |
| **Web** | Presiona `w` para abrirla en el navegador |

También puedes usar estos comandos:

```bash
npm start          # Inicia Expo
npm run android    # Abre en Android
npm run ios        # Abre en iOS (solo Mac)
npm run web        # Abre en el navegador
```

## Cómo se usa la app

La app tiene estas pantallas en la barra de pestañas:

| Pestaña | Para qué sirve |
|---------|----------------|
| **Inicio** | Pantalla principal de GastoFácil |
| **Registrar** | Crear un gasto nuevo (descripción, monto y categoría) |
| **Historial** | Ver la lista de gastos (“Mis gastos”) |
| **Resumen** | Ver el total y los gastos por categoría |
| **Eliminar** | Quitar gastos de la lista |

### Flujo básico

1. Entra a **Registrar**, completa los campos y guarda el gasto.
2. Revisa tus registros en **Historial**.
3. Consulta totales en **Resumen**.
4. Si necesitas borrar un gasto, usa **Eliminar** (o el botón Eliminar en Historial, si está disponible).

Los archivos de pantallas están en la carpeta `src/app/`. Este proyecto usa [enrutamiento por archivos](https://docs.expo.dev/router/introduction/) de Expo Router.

## Estructura principal

```
src/app/
  index.tsx                    → Inicio
  registrar.tsx                → Registrar gasto
  historial.tsx                → Historial / Mis gastos
  resumen.tsx                  → Resumen por categorías
  editar-eliminar-gastos.tsx   → Eliminar gastos
  _layout.tsx                  → Layout general
```

## Recursos

- [Documentación de Expo](https://docs.expo.dev/)
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/)
- [Expo Go](https://expo.dev/go)
