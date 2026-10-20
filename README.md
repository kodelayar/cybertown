# CyberTown: The Glitch Mystery

**[Play CyberTown online — Kodelayar GitHub Pages](https://kodelayar.github.io/cybertown/)**

A top-down pixel cybersecurity adventure for teams. The Glitch has used a fake voucher, counterfeit badge, and malicious USB to compromise Town Hall. Follow the evidence through six rooms, help the residents, contain the infected workstation, and restore Cybertown. Each room has inspectable clues, a safety note, and a sealed north exit.

## Start playing

Extract the entire ZIP, keeping the `assets` folder beside both HTML pages. Open `index.html` or `cybertown-the-glitch-mystery-v6.html` in a current browser. No installation or internet connection is required. For a static website, upload the same folder structure.

Enter a team name and select **Hear mission briefing**. Aisha and the residents explain the story, all six challenges, and the controls in a voiced, player-paced introduction. Use Next, Back, or Replay voice, and adjust sound and volume within the briefing. The timer stays at 15:00 until you select **Start 15-minute mission** on the last page. You can return to the team screen without starting a run.

Enter the same team name later in the same browser to resume an active mission directly. Typed answers are not saved between visits. The fifteen-minute timer pauses while a main NPC's challenge briefing or completion instructions are open, and resumes when you close that window or select Start investigating. The pause lasts as long as you need to read, even after the voice finishes. The panel shows **Paused while you read**.

Exploration, evidence inspection, optional chats, and puzzles use mission time. An active timer continues while the game is closed; a saved NPC briefing remains paused and reopens when you resume. Scoreboard elapsed time excludes briefing and completion pauses.

## Controls

- The game fills the browser viewport. Use **Full screen** for browser fullscreen when supported.
- **Mission** opens the escape-route drawer, **Room info** expands the current-room details, and **Controls** expands or collapses movement and inventory controls.
- Move: WASD or arrow keys.
- Interact: approach a person or object and press E, or use the Interact button.
- Click/tap a person or object to walk to it automatically and interact.
- Mobile: the direction pad opens automatically on touch devices and can still be collapsed.
- Close dialogue: Escape or Close.
- Evidence bag: collected story items. Field notes: discovered safety tips.

## Mission NPCs and pets

Only the six main mission NPCs have voices: Maya, Ben, Lina, Mr. Tan, Sam, and Aisha. Supporting residents can be approached for optional text-only chats and advice. They do not block paths. Each main NPC welcomes you with the challenge number, task, cleared-challenge count, and score. The welcome panel shows live remaining time and progress.

Challenge welcomes show the challenge heading once, with one row for progress, score, and time. Speech highlights the existing dialogue instead of repeating it in a separate subtitle bar. If you close a completion window while its instructions are still playing, subtitles move to the bottom so you can keep following them while walking.

Meet six original pixel pets: Captain Mochi the dog, Pip the cat, Coco the rabbit, Bolt the turtle, Pixel the cat, and Kiwi the bird. Pet them, play together, or invite one to follow you between rooms. Pets do not block paths. “Point to my mission” briefly highlights the next person or object without revealing an answer. Send a companion home to choose another pet.

Field notes track the 12 supporting residents and six pets you have met. Friends and your chosen companion save with the team across refreshes. Optional interactions do not change scores, hint penalties, room locks, or the running mission timer.

## Mission route

1. Post Office: investigate a photo and unlock a laptop.
2. Cipher Study: talk to Ben, enter his keyword as the Vigenere key, and decode the message with the built-in offline decoder.
3. Cafe: inspect three posters and investigate a suspicious offer.
4. Storage Room 04: read the packing note, combine clues from earlier rooms to open the four-digit cabinet, then choose how to handle the suspicious items.
5. Festival Office: inspect two separate paper records, compare 13 timestamped sign-ins with the official staff badge register, then type the full name of the employee whose badge ID does not match.
6. Town Hall: inspect three workstations, identify the infected host, isolate it, preserve evidence, and alert the response team.

The main NPC introduces each room before you solve its desk challenge. Completing a challenge immediately displays and voices the result and the next step, including how to use the north exit. Closing this success window keeps its instructions playing; **Replay instructions** repeats them. Unlocking a room plays a latch sound, and walking through its exit plays a distinct opening sound before the next NPC speaks. The Office requires reading both the reception log and official badge register before typing a suspect's full name. The workstation does not repeat the employee lists or offer name choices, and a late arrival alone is not evidence of a fake badge. The cafe requires inspecting all three posters. The Post Office and Cipher Study require examining their main evidence. Later rooms cannot be selected from the progress display.

## Scores and records

Each cleared room earns 15 main points and shows a balloon celebration. A room hint deducts 3 points once. Incorrect answers do not deduct points. After the sixth room, the optional Bonus Room offers five security mistakes worth 2 points each. Final Score = min(100, Main Challenge Score + Bonus Points). A perfect main run scores 90; the bonus can raise it to 100. Skipping the bonus preserves the main victory.

`scoreboard.html` records team, points, elapsed time, remaining time, rooms, hints, status, and date. It supports team search and CSV export. Active mission progress is saved locally without typed answers. Completed and timed-out mission saves are removed while scoreboard records remain. Bonus findings update the saved scoreboard result. Records do not automatically synchronize across machines. The in-game scoreboard link transfers a snapshot to the records page to support browsers that isolate storage between local HTML files. Export CSV to collect results from separate machines.

## Files

- `cybertown-the-glitch-mystery-v6.html`: existing game, enhanced with indoor RPG exploration.
- `scoreboard.html`: separate team records page.
- `assets/room-engine.js`: pixel room rendering, character movement, collisions, pathfinding, and touch controls.
- `assets/room-cast.js`: supporting NPCs, pet personalities, and optional dialogue.
- `assets/room-game.css` and `assets/adventure.css`: responsive game, dialogue, console, and bonus-room presentation.
- `assets/adventure-audio.js`: browser speech synthesis with synchronized text captions, background music, and procedural action sound effects. Use the Audio on/off and volume controls in the game header. Available spoken voices depend on the browser and operating system.
- `assets/subway-surfers.mp3`: audio from the [Myinstants embed supplied by the user](https://www.myinstants.com/en/instant/subway-surfers-48885/), uploaded there by supertoine. The track loops locally at 0.8× speed and 5.5% of the selected volume; during speech it drops to 1.1%. NPC voices retain the selected volume. Music pauses when the tab is hidden, audio is muted, or the mission ends.
- `assets/mission-briefing.js` and `assets/mission-briefing.css`: untimed opening conversation, challenge introductions, and mission instructions. Narration uses a slower, neutral voice and lowers other audio while speaking.
- `assets/challenge-1.png` through `assets/challenge-5.png`: existing photographic evidence.
- `assets/challenge-6.svg`: new Town Hall workstation illustration.

All application links, scripts, styles, and images use relative paths. The sample web addresses shown in the poster puzzle are fictional text and do not open external websites.
