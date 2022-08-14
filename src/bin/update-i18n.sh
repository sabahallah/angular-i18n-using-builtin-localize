#!/bin/bash
pwd
./src/bin/xliff-to-json/xliff-to-json.js src/locale/
mv src/locale/*.json src/assets/i18n/
