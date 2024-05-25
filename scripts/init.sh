#!/bin/bash

git clone https://github.com/felipepimentab/sofia.git ~/.sofia
cd ~/.sofia
chmod +x deps.sh
sh deps.sh
npm run script