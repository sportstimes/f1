
## Localization

F1 Calendar can now be localized. Localization files live within the locales directory. We rely on community contributions to add additional languages to the calendar. 


### Adding a new language

Languages are housed in folders using the [ISO 639-1 two-letter language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). So English is "en".

To get started copy the "en" directory and create a new directory with the two letter code for the new locale you want to add.

Go through each of the json files and translate the English to your chosen language. Feel free to create an issue if you require more context for a string.

Once completed feel free to submit a PR, we will be happy to configure the rest of the app to make use of the new strings.
