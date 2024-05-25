#!/bin/bash

git clone https://github.com/felipepimentab/sofia.git ~/.sofia
cd ~/.sofia
chmod +x ./scripts/deps.sh
sh ./scripts/deps.sh
npm run script