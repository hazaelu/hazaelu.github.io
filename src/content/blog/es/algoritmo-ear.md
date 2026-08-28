---
title: "Biometría en Tiempo Real: El Algoritmo EAR"
pubDate: 2026-08-28
description: "Análisis matemático y desarrollo en Python con Google MediaPipe para la detección de fatiga visual mediante el Eye Aspect Ratio."
author: "Hazael Urriola"
tags: ["Python", "Computer Vision", "MediaPipe", "EAR"]
---

# Medición de Fatiga Visual con Inteligencia Artificial

En el desarrollo de software orientado a la salud laboral digital, la detección pasiva del cansancio es un reto crítico. No basta con saber si un usuario está frente a la pantalla; necesitamos medir su estado biométrico. Para resolver esto en mi **IA Ocular Preventiva**, implementé el algoritmo **EAR (Eye Aspect Ratio)**.

## 🧠 La Matemática detrás del EAR

A diferencia de los detectores rígidos tradicionales, el algoritmo EAR utiliza **Puntos de Referencia Faciales (Facial Landmarks)**. Mediante la malla facial de **Google MediaPipe**, localizamos 6 coordenadas específicas alrededor del ojo humano: desde los extremos horizontales hasta los párpados superiores e inferiores.

La fórmula matemática calcula la distancia vertical dividida entre la distancia horizontal:

```text
       (||p2 - p6|| + ||p3 - p5||)
EAR = ─────────────────────────────
             2 * ||p1 - p4||
```

Cuando el ojo está completamente abierto, el ratio se mantiene en un valor nominal alto (entre `0.28` y `0.32`). En el momento en que los párpados se cierran, la distancia vertical cae instantáneamente a cero, provocando un descenso del EAR por debajo de `0.22`.

## 🛠️ Optimización y Segmentación Lógica

Para procesar este flujo a más de 30 fotogramas por segundo (FPS) sin saturar la CPU de la computadora, el script ejecuta una **conversión matricial** obligatoria. OpenCV transforma el flujo de video en color (BGR) a una matriz unidimensional de escala de grises con **NumPy**. 

Posteriormente, evaluamos una regla de negocio estricta: si el EAR cae por debajo del umbral de manera continua durante 15 cuadros consecutivos (aproximadamente 1.5 segundos de parpadeo lento o letargo), el sistema activa un hilo de **Alerta Crítica de Fatiga** en color rojo brillante, sentando las bases para modular de forma automatizada los parámetros del monitor y proteger la vista del usuario.
