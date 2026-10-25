# CardIoT

**A gateway-less 12-lead ECG prototype that generates HL7® FHIR® resources on the device**

This repository contains the firmware, the hardware design files, FHIR request examples, and the load-test script of CardIoT, a 12-lead ECG prototype based on the STM32F769I-DISCO board and the TI ADS1198 analog front-end.

> [!WARNING]
> **Research prototype, not a medical device.** CardIoT has not been assessed for electrical safety or for conformity with IEC 60601 standards. Do not use it for diagnosis or patient monitoring, and do not connect it to people outside an ethically approved study with an appropriate safety assessment.

## Repository structure

| Folder | Contents | License |
|---|---|---|
| [`firmware/`](firmware/) | STM32CubeIDE and TouchGFX project (source code) and compiled firmware | MIT |
| [`hardware/`](hardware/) | Acquisition board (schematic, PCB layout, Gerber and drill files, and bill of materials) and 3D-printable enclosure | CERN-OHL-S-2.0 |
| [`fhir-examples/`](fhir-examples/) | Example requests of the FASS-ECG API used by CardIoT (POST, PATCH, and PUT) | CC BY 4.0 |
| [`evaluation/load-test/`](evaluation/load-test/) | k6 script of the concurrent FHIR integration test | MIT |
| [`LICENSES/`](LICENSES/) | License texts | – |

Each folder has its own README.

## Getting started

1. **Hardware.** Manufacture and assemble the acquisition board with the files in [`hardware/`](hardware/), and plug it into the Arduino connectors of the STM32F769I-DISCO.
2. **Firmware.** Flash the compiled firmware or build it from source, as described in [`firmware/README.md`](firmware/README.md).
3. **Test.** Connect a 12-lead ECG cable to a patient simulator and start an exam.

## Demonstration video

[Watch the CardIoT prototype demonstration on YouTube](https://www.youtube.com/watch?v=T0yZsydzl1M)

## Associated article

Morás PAL, Henz D, Nazar GL, Machado JC, Martins ALDM, Itturriet FP. *CardIoT: A Gateway-less Edge 12-Lead ECG Prototype with Native FHIR Interoperability for Point-of-Care Testing.* Medical & Biological Engineering & Computing (under review).

## Licenses

| Content | License |
|---|---|
| Hardware design files ([`hardware/`](hardware/)) | CERN Open Hardware Licence Version 2 – Strongly Reciprocal (CERN-OHL-S-2.0) |
| Firmware and load-test script written by the authors ([`firmware/`](firmware/), [`evaluation/`](evaluation/)) | MIT License |
| Documentation and FHIR examples ([`fhir-examples/`](fhir-examples/)) | Creative Commons Attribution 4.0 International (CC BY 4.0) |
| Third-party components included in the firmware | Their original licenses, provided with each component |

See [`LICENSE.md`](LICENSE.md) for details.

## How to cite

Please cite the associated article. GitHub also offers a **Cite this repository** button, generated from [`CITATION.cff`](CITATION.cff).

## Authors

Patrick Anderson Lacerda Morás (IFSul), Douglas Henz (UTFPR), Gabriel Luca Nazar (UFRGS), Juliano Costa Machado (IFSul), André Luis Del Mestre Martins (IFSul), and Fabio Pires Itturriet (UTFPR).

Contact: Fabio Pires Itturriet, fabioitturriet@utfpr.edu.br.

---

HL7® and FHIR® are registered trademarks of Health Level Seven International.
