---
title: Indices Ceresia
description: Explicacion Tecnica de los Indices de Ceresia para analisis de fruto con computer vision
summary: "Analiza el estado sanitario en laboratorio"
---
{{< katex >}}

### Metodología de Análisis Cuantitativo mediante Visión Artificial

En Ceresia Vision, hemos desarrollado un sistema de análisis objetivo de la calidad de los frutos basado en tecnologías de **Visión por Computador** y **Deep Learning**. Nuestro proceso transforma una imagen digital en datos medibles y procesables a través de un modelo de **segmentación semántica**.

El proceso se fundamenta en dos fases clave:

1.  **Entrenamiento del Modelo:** Se utiliza un extenso dataset de imágenes de frutos, previamente etiquetadas a nivel de píxel por expertos. Cada píxel es clasificado en categorías de interés (ej: fruto sano, fruto con podredumbre, hoja, rama, suelo, etc.). Este dataset se emplea para entrenar una **Red Neuronal Convolucional (CNN)**, que aprende a identificar y diferenciar estas categorías de forma autónoma.

2.  **Inferencia:** Durante la operativa en las instalaciones del cliente, el modelo entrenado recibe una nueva imagen y realiza la inferencia. En milisegundos, genera una "máscara de segmentación", donde cada píxel de la imagen original queda clasificado en una de las categorías aprendidas. Esta máscara es la base para el cálculo de nuestros índices objetivos.

A partir de esta segmentación, hemos definido dos métricas principales:

***

## Índice Sanitario Ceresia (ISC)

El **Índice Sanitario Ceresia (ISC)** es una métrica cuantitativa, en una escala normalizada, que representa el estado fitosanitario agregado de un lote de frutos. Su objetivo es ofrecer un valor numérico único que resuma la salud general de la materia prima.

El cálculo se deriva directamente de la máscara de segmentación generada por el modelo de IA. Se computa como la proporción de píxeles clasificados como "fruto sano" frente al total de píxeles que componen el fruto en la imagen. Los píxeles correspondientes a defectos (podredumbre, daños mecánicos, enfermedades, estado de sobremaduración o verdor extremo) penalizan el índice.

La fórmula conceptual es la siguiente:

$$ ISC = \left( 1 - \frac{\sum P_{\text{defectos}}}{\sum P_{\text{fruto total}}} \right) \times 100 $$

Donde:
- \(\text{defectos}\)  son los píxeles de fruto clasificados con algún tipo de defecto.
- \(\text{fruto total}\)  es el conjunto total de píxeles clasificados como fruto.

Un valor de ISC cercano a 100 indica un lote de máxima sanidad, mientras que un valor inferior señala una presencia significativa de defectos.

***

## Índice de Recogida Ceresia (IRC)

El **Índice de Calidad de Recogida (IRC)** es una métrica diseñada para evaluar la eficiencia y el cuidado del proceso de recolección. Cuantifica la presencia de **cuerpos extraños** o Material No Deseado (MND) en el lote, como pueden ser hojas, ramas, tallos o tierra. Un ICR bajo puede ser indicativo de una recolección excesivamente agresiva o deficiente.

Este índice se calcula relacionando la cantidad de píxeles correspondientes al fruto con los píxeles clasificados como cuerpos extraños.

La fórmula conceptual es:

$$ IRC = \left( 1 - \frac{\sum P_{\text{cuerpos extraños}}}{\sum P_{\text{fruto total}} + \sum P_{\text{cuerpos extraños}}} \right) \times 100 $$

Donde:
- \(\text{cuerpos extraños}\) son los píxeles clasificados como hojas, ramas, etc.
- El denominador representa la suma de todo el material recolectado relevante.

Un IRC cercano a 100 implica una recogida limpia y de alta calidad. La monitorización de este índice permite a nuestros clientes evaluar las prácticas de sus agricultores y optimizar la calidad de la materia prima que entra en sus instalaciones.