## Suikoden RNG Generator
This is a RNG calculator for the PS1 game Suikoden. It can predict RNG based
events, such as future encounters and enemy drops(coming later).

## Known Mechanics
This is all pseudocode. There is actual code in the repo.
#### RNG call
```
// Since PS1 is a 32 bit system multiplication and division
// sets registers mflo and mhi with the results
// The & 0xFFFFFFFF simulates that
// In some languages proper multiplication without loss of precision
// requires custom implementation
rng = ((rng * 0x41c64e6d) & 0xFFFFFFFF) + 0x3039;
// This register is used in quite a few RNG based subroutines
// and is calculated in the RNG call
r2 = (rng >> 16) & 0x7FFF;
```

#### Run Success
```
// On run attempt RNG call is made
// r2 is set in RNG call
if (r2 % 100 > 50)
  return true;
return false;
```

#### isBattle(World Map)
```
// r2 is set in RNG call
r2 = r2 - (r2 & 0xFFFFFF00);
if (r2 < 8)
  return true;
return false;
```

#### isBattle(Dungeon)
```
// r2 is set in RNG call
r3 = 0x7F;
// Division works like multiplication in that it uses mflo and mhi registers
// mflo = quotient
// mhi = remainder
// The below won't need the Math.floor if language doesn't autoconvert integers
// when doing integer division
r2 = Math.floor(r2/r3) & 0xFF;
// This value is loaded from memory
// From my testing it always(?) = 2
r3 = 2;
if (r2 < r3)
  return true;
return false;
```

#### determineEncounter
```
// Once the game determines that you are getting a battle
// It calls RNG again
// r2 is set from RNG call

// The game references the encounter table for this function
// The encounter table is essentially an array of possible groups of enemies
// for every area with random battles
// it starts at 1 with the first battle

r5 = encounterTable.length;
// Reference division comment earlier
r3 = Math.floor(r3/0xFFFF);
return Math.floor(r2/r3) + 1;
```

#### Champion's Rune
```
// The way this works is
// 1: if(isBattle)
// 2: determineEncounter
// 3: If below false no battle
r17 = Math.floor(((sumOfEnemyLevels << 4) - sumOfEnemyLevels) / 0xa);
r16 = sumOfPartyLevels;
if (r16 < r17)
  return true;
return false;
```

## Other Sources
[All things Suikoden](http://www.suikosource.com/)
[Google Sheet with useful technical data and links](https://docs.google.com/spreadsheets/d/1W8mEcTqByBVljRmb6CSyWFFkM-l3QIoeBds1c2qjGWs/edit?usp=sharing)
[Google Doc Sheet with explanation of how the game uses
RNG](https://docs.google.com/document/d/1ORCe1okh8RIpOGH8WegaFMKsi_aFC3QN5OZ96w3019Y/edit?usp=sharing)

