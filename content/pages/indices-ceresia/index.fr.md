---
title: Indices Ceresia
description: Explication technique des indices Ceresia pour l'analyse des fruits avec la vision par ordinateur
summary: "Analyse de l'état sanitaire en laboratoire"
url: "/fr/indices-ceresia"
---
{{< katex >}}

### Méthodologie d'analyse quantitative par vision artificielle

Chez Ceresia Vision, nous avons développé un système d'analyse objectif de la qualité des fruits basé sur les technologies de **vision par ordinateur** et de **deep learning**. Notre processus transforme une image numérique en données mesurables et exploitables via un modèle de **segmentation sémantique**.

Le processus repose sur deux phases clés :

1. **Entraînement du modèle :** un vaste ensemble d'images de fruits, préalablement étiquetées pixel par pixel par des experts, est utilisé. Chaque pixel est classé dans des catégories d'intérêt (par exemple : fruit sain, fruit avec pourriture, feuille, branche, sol, etc.). Cet ensemble sert à entraîner un **réseau neuronal convolutionnel (CNN)** qui apprend à identifier et différencier ces catégories de façon autonome.
2. **Inférence :** lors de l'exploitation sur les sites du client, le modèle entraîné reçoit une nouvelle image et effectue l'inférence. En quelques millisecondes, il génère un "masque de segmentation" où chaque pixel de l'image originale est classé dans l'une des catégories apprises. Ce masque est la base du calcul de nos indices objectifs.

À partir de cette segmentation, nous avons défini deux métriques principales :

***

## Indice Sanitaire Ceresia (ISC)

L'**Indice Sanitaire Ceresia (ISC)** est une mesure quantitative, sur une échelle normalisée, qui représente l'état phytosanitaire global d'un lot de fruits. Il fournit une valeur numérique unique résumant la santé générale de la matière première.

Le calcul provient directement du masque de segmentation généré par le modèle d'IA. Il se calcule comme la proportion de pixels classés comme « fruit sain » par rapport au total des pixels composant le fruit dans l'image. Les pixels correspondant à des défauts (pourriture, dommages mécaniques, maladies, surmaturation ou immaturité extrême) pénalisent l'indice.

La formule conceptuelle est la suivante :

$$ ISC = \left( 1 - \frac{\sum P_{\text{défauts}}}{\sum P_{\text{fruit total}}} \right) \times 100 $$

Où :
- \(\text{défauts}\) sont les pixels de fruit classés avec un type de défaut.
- \(\text{fruit total}\) représente l'ensemble des pixels classés comme fruit.

Une valeur d'ISC proche de 100 indique un lot d'une excellente santé, tandis qu'une valeur plus basse signale une présence significative de défauts.

***

## Indice de Récolte Ceresia (IRC)

L'**Indice de Qualité de Récolte (IRC)** est une mesure conçue pour évaluer l'efficacité et le soin apporté au processus de récolte. Il quantifie la présence de **corps étrangers** ou Matériel Indésirable dans le lot, tels que feuilles, branches, tiges ou terre. Un IRC faible peut indiquer une récolte trop agressive ou déficiente.

Cet indice se calcule en mettant en relation la quantité de pixels correspondant au fruit avec les pixels classés comme corps étrangers.

La formule conceptuelle est :

$$ IRC = \left( 1 - \frac{\sum P_{\text{corps étrangers}}}{\sum P_{\text{fruit total}} + \sum P_{\text{corps étrangers}}} \right) \times 100 $$

Où :
- \(\text{corps étrangers}\) sont les pixels classés comme feuilles, branches, etc.
- Le dénominateur représente la somme de tout le matériel récolté pertinent.

Un IRC proche de 100 implique une récolte propre et de haute qualité. La surveillance de cet indice permet à nos clients d'évaluer les pratiques de leurs agriculteurs et d'optimiser la qualité de la matière première entrant dans leurs installations.
