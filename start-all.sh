#!/bin/zsh
# Start both backend (Spring Boot) and frontend (Vite) servers

# Start backend in a new terminal window (macOS)
open -a Terminal "$(pwd)/backend" && sleep 2 && osascript -e 'tell application "Terminal" to do script "mvn spring-boot:run" in front window'

# Start frontend in a new terminal window (macOS)
open -a Terminal "$(pwd)/frontend" && sleep 2 && osascript -e 'tell application "Terminal" to do script "npm run dev" in front window'
