---
title: Índexs Ceresia
description: Explicació tècnica dels índexs de Ceresia per a l'anàlisi de fruita amb visió per computador
summary: "Analitza l'estat sanitari al laboratori"
url: "/ca/indices-ceresia"
---
{{< katex >}}

### Metodologia d'Anàlisi Quantitativa mitjançant Visió Artificial

A Ceresia Vision hem desenvolupat un sistema d'anàlisi objectiu de la qualitat dels fruits basat en tecnologies de **Visió per Computador** i **Deep Learning**. El nostre procés transforma una imatge digital en dades mesurables i processables a través d'un model de **segmentació semàntica**.

El procés es fonamenta en dues fases clau:

1.  **Entrenament del Model:** S'utilitza un extens conjunt de dades d'imatges de fruits, prèviament etiquetades a nivell de píxel per experts. Cada píxel és classificat en categories d'interès (ex.: fruit sa, fruit amb podridura, fulla, branca, sòl, etc.). Aquest conjunt s'empra per entrenar una **Xarxa Neuronal Convolucional (CNN)** que aprèn a identificar i diferenciar aquestes categories de manera autònoma.

2.  **Inferència:** Durant l'operativa a les instal·lacions del client, el model entrenat rep una nova imatge i realitza la inferència. En mil·lisegons genera una "màscara de segmentació" on cada píxel de la imatge original queda classificat en una de les categories apreses. Aquesta màscara és la base per al càlcul dels nostres índexs objectius.

A partir d'aquesta segmentació, hem definit dues mètriques principals:

***

## Índex Sanitari Ceresia (ISC)

L'**Índex Sanitari Ceresia (ISC)** és una mètrica quantitativa, en una escala normalitzada, que representa l'estat fitosanitari agregat d'un lot de fruits. El seu objectiu és oferir un valor numèric únic que resumeixi la salut general de la matèria primera.

El càlcul es deriva directament de la màscara de segmentació generada pel model d'IA. Es computa com la proporció de píxels classificats com a "fruit sa" enfront del total de píxels que componen el fruit a la imatge. Els píxels corresponents a defectes (podridura, danys mecànics, malalties, estat de sobremaduració o verdor extrem) penalitzen l'índex.

La fórmula conceptual és la següent:

$$ ISC = \left( 1 - \frac{\sum P_{\text{defectos}}}{\sum P_{\text{fruto total}}} \right) \times 100 $$

On:
- \(\text{defectes}\) són els píxels de fruit classificats amb algun tipus de defecte.
- \(\text{fruit total}\) és el conjunt total de píxels classificats com a fruit.

Un valor d'ISC proper a 100 indica un lot de màxima sanitat, mentre que un valor inferior assenyala una presència significativa de defectes.

***

## Índex de Recollida Ceresia (IRC)

L'**Índex de Qualitat de Recollida (IRC)** és una mètrica dissenyada per avaluar l'eficiència i la cura del procés de recol·lecció. Quantifica la presència de **cossos estranys** o Material No Desitjat (MND) en el lot, com poden ser fulles, branques, tiges o terra. Un IRC baix pot ser indicatiu d'una recol·lecció excessivament agressiva o deficient.

Aquesta mètrica es calcula relacionant la quantitat de píxels corresponents al fruit amb els píxels classificats com a cossos estranys.

La fórmula conceptual és:

$$ IRC = \left( 1 - \frac{\sum P_{\text{cuerpos extraños}}}{\sum P_{\text{fruto total}} + \sum P_{\text{cuerpos extraños}}} \right) \times 100 $$

On:
- \(\text{cossos estranys}\) són els píxels classificats com a fulles, branques, etc.
- El denominador representa la suma de tot el material recollit rellevant.

Un IRC proper a 100 implica una recollida neta i d'alta qualitat. El seguiment d'aquest índex permet als nostres clients avaluar les pràctiques dels seus agricultors i optimitzar la qualitat de la matèria primera que entra a les seves instal·lacions.
