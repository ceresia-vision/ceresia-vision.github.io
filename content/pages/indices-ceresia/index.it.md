---
title: Indici Ceresia
description: Spiegazione tecnica degli Indici Ceresia per l'analisi del frutto con visione artificiale
summary: "Analizza lo stato sanitario in laboratorio"
url: "/it/indici-ceresia"
---
{{< katex >}}

### Metodologia di Analisi Quantitativa mediante Visione Artificiale

In Ceresia Vision abbiamo sviluppato un sistema di analisi oggettiva della qualità dei frutti basato su tecnologie di **Visione Computazionale** e **Deep Learning**. Il nostro processo trasforma un'immagine digitale in dati misurabili e processabili attraverso un modello di **segmentazione semantica**.

Il processo si fonda su due fasi chiave:

1. **Addestramento del Modello:** Si utilizza un ampio dataset di immagini di frutti, previamente etichettate a livello di pixel da esperti. Ogni pixel è classificato in categorie di interesse (es: frutto sano, frutto con marciume, foglia, ramo, suolo, ecc.). Questo dataset viene impiegato per addestrare una **Rete Neurale Convoluzionale (CNN)**, che impara a identificare e differenziare queste categorie in modo autonomo.
2. **Inferenza:** Durante l'operatività nelle installazioni del cliente, il modello addestrato riceve una nuova immagine ed esegue l'inferenza. In millisecondi genera una "maschera di segmentazione", dove ogni pixel dell'immagine originale viene classificato in una delle categorie apprese. Questa maschera è la base per il calcolo dei nostri indici oggettivi.

A partire da questa segmentazione, abbiamo definito due metriche principali:

***

## Indice Sanitario Ceresia (ISC)

L'**Indice Sanitario Ceresia (ISC)** è una metrica quantitativa, su una scala normalizzata, che rappresenta lo stato fitosanitario aggregato di un lotto di frutti. Il suo obiettivo è offrire un valore numerico unico che riassuma la salute generale della materia prima.

Il calcolo deriva direttamente dalla maschera di segmentazione generata dal modello di IA. Si computa come la proporzione di pixel classificati come "frutto sano" rispetto al totale dei pixel che compongono il frutto nell'immagine. I pixel corrispondenti a difetti (marciume, danni meccanici, malattie, sovramaturazione o eccessiva immaturità) penalizzano l'indice.

La formula concettuale è la seguente:

$$ ISC = \left( 1 - \frac{\sum P_{\text{difetti}}}{\sum P_{\text{frutto totale}}} \right) \times 100 $$

Dove:
- \(\text{difetti}\)  sono i pixel del frutto classificati con qualche tipo di difetto.
- \(\text{frutto totale}\)  è l'insieme totale di pixel classificati come frutto.

Un valore di ISC vicino a 100 indica un lotto di massima sanità, mentre un valore inferiore segnala una presenza significativa di difetti.

***

## Indice di Raccolta Ceresia (IRC)

L'**Indice di Qualità di Raccolta (IRC)** è una metrica progettata per valutare l'efficienza e la cura del processo di raccolta. Quantifica la presenza di **corpi estranei** o Materiale Indesiderato (MI) nel lotto, come foglie, rami, steli o terra. Un IRC basso può essere indicativo di una raccolta eccessivamente aggressiva o carente.

Questo indice si calcola relazionando la quantità di pixel corrispondenti al frutto con i pixel classificati come corpi estranei.

La formula concettuale è:

$$ IRC = \left( 1 - \frac{\sum P_{\text{corpi estranei}}}{\sum P_{\text{frutto totale}} + \sum P_{\text{corpi estranei}}} \right) \times 100 $$

Dove:
- \(\text{corpi estranei}\) sono i pixel classificati come foglie, rami, ecc.
- Il denominatore rappresenta la somma di tutto il materiale raccolto rilevante.

Un IRC vicino a 100 implica una raccolta pulita e di alta qualità. Il monitoraggio di questo indice permette ai nostri clienti di valutare le pratiche dei loro coltivatori e ottimizzare la qualità della materia prima che entra nelle loro installazioni.
