# CyberTown: The Glitch Mystery

A top-down pixel escape-room adventure for teams. Explore six indoor rooms in a fixed sequence. Each room has a resident, inspectable clues, a puzzle, a safety note, and a sealed north exit. Complete the challenge, collect the evidence, and physically walk to the exit to proceed.

## Start playing

Extract the entire ZIP, keeping the `assets` folder beside both HTML pages. Open `index.html` or `cybertown-the-glitch-mystery-v6.html` in a current browser. No installation or internet connection is required. For a static website, upload the same folder structure.

Enter a team name to start. Enter the same team name later in the same browser to resume an active mission. Typed answers are not saved between visits. The fifteen-minute timer continues while inspecting evidence, solving puzzles, and while the game is closed.

## Controls

- The game fills the browser viewport. Use **Full screen** for browser fullscreen when supported.
- **Mission** opens the escape-route drawer, **Room info** expands the current-room details, and **Controls** expands or collapses movement and inventory controls.
- Move: WASD or arrow keys.
- Interact: approach a person or object and press E, or use the Interact button.
- Click/tap a person or object to walk to it automatically and interact.
- Mobile: the direction pad opens automatically on touch devices and can still be collapsed.
- Close dialogue: Escape or Close.
- Evidence bag: collected story items. Field notes: discovered safety tips.

## Town friends and pets

Each room has two optional supporting residents as well as its main mission NPC. Chat about festival preparations or ask for a pointer. These conversations never replace the required mission conversation or solve a puzzle.

Meet six original pixel pets: Captain Mochi the dog, Pip the cat, Coco the rabbit, Bolt the turtle, Pixel the cat, and Kiwi the bird. Pet them, play together, or invite one to follow you between rooms. Pets do not block paths. “Point to my mission” briefly highlights the next person or object without revealing an answer. Send a companion home to choose another pet.

Field notes track the 12 residents and six pets you have met. Friends and your chosen companion save with the team across refreshes. Optional interactions do not change scores, hint penalties, room locks, or the running mission timer.

## Mission route

1. Post Office: investigate a photo and unlock a laptop.
2. Cipher Study: talk to Ben, enter his keyword as the Vigenere key, and decode the message with the built-in offline decoder.
3. Cafe: inspect three posters and investigate a suspicious offer.
4. Storage Room 04: read the packing note, combine clues from earlier rooms to open the four-digit cabinet, then choose how to handle the suspicious items.
5. Festival Office: inspect two separate paper records, compare 13 timestamped sign-ins with the official staff badge register, then type the full name of the employee whose badge ID does not match.
6. Town Hall: respond to a suspicious call and reconstruct the incident.

Talk to each room's main resident before solving its challenge at the desk. The Office requires reading both the reception log and official badge register before typing a suspect's full name. The workstation does not repeat the employee lists or offer name choices, and a late arrival alone is not evidence of a fake badge. The cafe requires inspecting all three posters. The Post Office and Cipher Study require examining their main evidence. Later rooms cannot be selected from the progress display.

## Scores and records

Each cleared room earns 100 points and shows a balloon celebration. A room hint deducts 25 points once, even if reopened. Incorrect answers do not deduct points. Using the final exit restores the festival and adds 150 points. Maximum: 750 points.

`scoreboard.html` records team, points, elapsed time, remaining time, rooms, hints, status, and date. It supports team search and CSV export. Active mission progress is saved locally without typed answers. Completed and timed-out mission saves are removed while scoreboard records remain. Records do not automatically synchronize across machines. The in-game scoreboard link transfers a snapshot to the records page to support browsers that isolate storage between local HTML files. Export CSV to collect results from separate machines.

## Files

- `cybertown-the-glitch-mystery-v6.html`: existing game, enhanced with indoor RPG exploration.
- `scoreboard.html`: separate team records page.
- `assets/room-engine.js`: pixel room rendering, character movement, collisions, pathfinding, and touch controls.
- `assets/room-cast.js`: supporting NPCs, pet personalities, and optional dialogue.
- `assets/room-game.css`: responsive game and evidence-dialogue presentation.
- `assets/challenge-1.png` through `assets/challenge-6.png`: previously generated photographic evidence, used as in-room props and full-size inspections.

All application links, scripts, styles, and images use relative paths. The sample web addresses shown in the poster puzzle are fictional text and do not open external websites.
