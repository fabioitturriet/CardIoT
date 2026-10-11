# Firmware

Firmware of CardIoT for the STM32F769I-DISCO board (STM32F769NI microcontroller, Arm Cortex-M7), based on FreeRTOS and TouchGFX.

## Contents

| Path | Description |
|---|---|
| `ECG/` | STM32CubeIDE and TouchGFX project (STM32CubeMX 6.5.0, STM32Cube FW_F7 V1.16.2) |
| `ECG/Core/` | Application entry point and FreeRTOS tasks (`main.c`) |
| `ECG/STM32CubeIDE/Application/User/` | Libraries written for CardIoT: ADS1198 driver, digital filters, QRS detection, ESP8266 (Wi-Fi) driver, and MicroSD storage |
| `ECG/TouchGFX/` | Graphical interface (TouchGFX Designer project `ECG.touchgfx`) |
| `bin/` | Compiled firmware (`STM32F769I_DISCO.hex` and `.elf`, Debug configuration) |

## Requirements

| Tool | Version |
|---|---|
| STM32CubeIDE | 1.9.0 |
| STM32Cube FW_F7 firmware package | V1.16.2 |
| TouchGFX Designer (only to edit the interface) | 4.19.0 |
| STM32CubeProgrammer (only to flash the compiled firmware) | Any recent version |

## Flash the compiled firmware

The interface images and fonts are stored in the external QSPI Flash, so the external loader of the board is required.

1. Connect the STM32F769I-DISCO through its ST-LINK USB connector.
2. In STM32CubeProgrammer, select **ST-LINK** and click **Connect**.
3. In the **External loaders** tab, select the loader of the STM32F769I-DISCO.
4. Open `bin/STM32F769I_DISCO.hex` and click **Download**.

## Build from source

1. Copy the `ECG` folder to a path without spaces, for example `C:\STM32Workspace\ECG`.
2. In STM32CubeIDE, select **File > Import > Existing Projects into Workspace** and choose the `ECG` folder.
3. In **Project > Properties > C/C++ General > Paths and Symbols > Library Paths**, update the TouchGFX library path to `ECG/Middlewares/ST/touchgfx/lib/core/cortex_m7/gcc` in your workspace.
4. In **Run > Debug Configurations > Debugger**, enable **External Loader**, click **Scan**, and select the STM32F769I-DISCO.
5. Build the project and run it on the board.

## Configuration

The Wi-Fi network is selected on the device, and the password is entered on the touch keyboard. The server address is defined in `ECG/Core/Src/main.c`.

> [!CAUTION]
> Never commit Wi-Fi passwords, credentials, or private keys to this repository.

## Third-party components

| Component | Origin |
|---|---|
| STM32Cube HAL and BSP drivers, CMSIS, and TouchGFX | STMicroelectronics and Arm; licenses provided with each component |
| FreeRTOS, FatFs, and LibJPEG | Licenses provided with each component in `ECG/Middlewares/Third_Party/` |
| Pan-Tompkins QRS detector | Rafael de Moura Moreira, MIT License (see the file headers) |
| ADS1298 driver (`biblioteca_ADS1198/`) | Kravchenko S., based on the OpenBCI ADS1299 library (see the file headers) |
| UART ring buffer (`UartRingBuffer/`) | Controllerstech (see the file headers) |

The remaining code written by the CardIoT authors is licensed under the [MIT License](../LICENSES/MIT.txt).
