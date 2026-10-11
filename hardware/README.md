# Hardware

Design files of the CardIoT acquisition board (front-end V4.0). The board is a shield in the Arduino Uno R3 format: it carries the ADS1198 analog front-end and plugs into the Arduino connectors of the STM32F769I-DISCO host board.

## Contents

| Path | Description |
|---|---|
| `schematic_V4.0.pdf` | Schematic |
| `pcb-layout_V4.0.pdf` | PCB layout |
| `bom_V4.0.csv` | Bill of materials: designators, values, footprints, and manufacturer and LCSC part numbers |
| `fabrication/gerber_V4.0.zip` | Gerber and drill files for manufacturing |
| `enclosure/case_v1_top.stl` and `enclosure/case_v1_bottom.stl` | 3D-printable enclosure (version 1), top and bottom parts |

## Board overview

| Item | Description |
|---|---|
| Design tool | EasyEDA (Standard Edition) |
| PCB | 2 layers, 74.7 mm × 64.8 mm |
| Electrode connector | DB-15 connector (U1) for the 10 electrodes: RA, LA, LL, RL, and V1–V6 |
| Input protection | On each electrode line: series resistors (22.1 kΩ and 10 kΩ), 47 pF capacitors, and 1N4148WS clamping diodes |
| Analog front-end | TI ADS1198 (8 channels, 16 bits) |
| Input configuration | Leads I and II use fully differential inputs. V1–V6 use single-ended inputs referenced to the Wilson central terminal (WCT), which the ADS1198 generates internally as (RA + LA + LL)/3. Table 2 of the article gives the channel mapping |
| Common-mode reduction | Right-leg drive (RLD) feedback loop derived from the WCT |
| Power | Battery connector JST-XH (JP1). Switch S2 selects the supply: the battery, through the LP2985A-50 (5 V analog supply) and LP2985A-33 (3.3 V digital supply) regulators, or the 5 V supply of the host board, for debugging. The battery also powers the host board through the VIN pin. Ferrite beads filter the supply lines, the analog and digital grounds are separate, and LED1 indicates the analog supply |
| Not mounted | U5 (external crystal) and C27 |

## Connection to the host board

The board plugs into the Arduino Uno R3–compatible connectors of the STM32F769I-DISCO. The ADS1198 communicates through the SPI5 interface of the STM32F769NI.

| ADS1198 signal | Arduino pin | STM32F769NI pin |
|---|---|---|
| DRDY | D3 | PF6 |
| CS | D4 | PJ0 |
| DAISY_IN | D5 | PC8 |
| SCLK | D6 | PF7 (SPI5_SCK) |
| CLKSEL | D12 | PB14 |
| PWDN | A1 | PA4 |
| RESET | A2 | PC2 |
| DOUT | A4 | PF8 (SPI5_MISO) |
| DIN | A5 | PF9 (SPI5_MOSI) |
| Battery (+Vbat) | VIN | – |
| 5 V from the host board | 5V | – |
| Ground | GND | – |

The ESP-01 (ESP8266) Wi-Fi module is not on this board: it connects to the ESP-01 connector of the STM32F769I-DISCO.

## Bill of materials

`bom_V4.0.csv` is the bill of materials exported by EasyEDA, converted to UTF-8. The supplier part numbers refer to LCSC.

> [!NOTE]
> Select components by the value in the **Name** column, which matches the schematic. In this export, some manufacturer and LCSC part numbers do not correspond to the listed value: R1–R10, R14, R16–R25, C14, C20, C25, C41, and C42. L1–L3 are ferrite beads.

## Manufacturing

The Gerber package was exported by EasyEDA and can be uploaded directly to a PCB manufacturer.

## Assembly and connection

1. Assemble the components listed in the bill of materials (surface-mount 0805 passives, the ADS1198 in TQFP-64, and the connectors).
2. Plug the acquisition board into the Arduino connectors of the STM32F769I-DISCO.
3. Connect the ESP-01 module to the ESP-01 connector of the STM32F769I-DISCO.
4. Connect the 11.1 V lithium-polymer battery to JP1 (pin 1: ground; pin 2: positive) and set switch S2 to battery operation.
5. Connect the 12-lead ECG cable to the DB-15 connector. The electrode assignment of each DB-15 pin is shown in the schematic.

## Safety notice

> [!WARNING]
> This board was not evaluated for electrical safety, patient isolation, IEC 60601-1 conformity, or Type CF classification. Use it with a patient simulator. Do not connect it to people outside an ethically approved study with an appropriate safety assessment. In the article, the device was always powered by its battery, without a connection to the mains supply.

## License

The hardware design files, including the enclosure, are licensed under the [CERN Open Hardware Licence Version 2 – Strongly Reciprocal](../LICENSES/CERN-OHL-S-2.0.txt) (CERN-OHL-S-2.0). The license notice and the address of this repository should also appear on the schematic title block and on the PCB silkscreen.
