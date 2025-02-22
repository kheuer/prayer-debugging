# Prayer Debugging VSCode Extension

Welcome to the Prayer Debugging extension for Visual Studio Code! This extension is designed to support developers in moments of coding frustration by prompting them to pause and recenter through prayer, invoking the intercession of the Blessed Carlo Acutis. 

![Usage Demo](https://raw.githubusercontent.com/kheuer/prayer-debugging/refs/heads/master/usage_demo.gif)


## Features
- Prompts users to pray when they're stuck in their coding tasks.
    - When an error occurs at runtime
    - When the debugger is started or closed
    - When an error is detected in the code
- Offers a powerful reminder for developers to take a step back and seek guidance.
- Prayer text available in three languages: English, Spanish, and German.

## Extension Settings

By default the Prayer will be in English, you can configure your preferred language through the User Settings:


1. Press `CTRL + SHIFT + P` to open the Command Palette.
2. Type `Preferences: Open Settings (JSON)` and select it.
3. Add one of the following line to your settings file:
    * **For English (Enabled by Default)**: "prayer-debugging.language": "en"
    * **Para Español**: "prayer-debugging.language": "es"
    * **Für Deutsch**: "prayer-debugging.language": "de" 
4. If your language is not supported, you can send me a translation of the prayer to admin(at)kheuer.de and i'll add it.

## Release Notes

### 1.0.0

Initial release
