export const enemies = {
  "Cave of the Past": {
    "name": "Cave of the Past",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 Banshee",
        "parseString": "1 Banshee" },
      { "name": "2 Banshee",
        "parseString": "2 Banshee" },
      { "name": "3 Banshee",
        "parseString": "3 Banshee" },
      { "name": "1 ClayDoll",
        "parseString": "1 ClayDoll" },
      { "name": "2 ClayDoll",
        "parseString": "2 ClayDoll" },
      { "name": "3 ClayDoll",
        "parseString": "3 ClayDoll" },
      { "name": "1 ClayDoll 1 Banshee",
        "parseString": "1 ClayDoll 1 Banshee" },
      { "name": "1 ClayDoll 2 Banshee",
        "parseString": "1 ClayDoll 2 Banshee" },
      { "name": "3 RedElemental 1 ClayDoll",
        "parseString": "3 RedElemental 1 ClayDoll" },
      { "name": "3 RedElemental 1 Banshee",
        "parseString": "3 RedElemental 1 Banshee" },
      { "name": "3 RedElemental 2 Banshee",
        "parseString": "3 RedElemental 2 Banshee" }],
    "enemies": {
      "Banshee": {
        "bits": 2200,
        "drops": [
          {
            "item": "EscapeTalisman",
            "rate": 15
          },
          {
            "item": "Graffiti",
            "rate": 6
          },
          {
            "item": "LandscapePainting",
            "rate": 3
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 120,
          "LUK": 70,
          "MGC": 180,
          "PWR": 270,
          "SKL": 110,
          "SPD": 90,
          "lvl": 41
        }
      },
      "ClayDoll": {
        "bits": 1500,
        "drops": [
          {
            "item": "FullArmor",
            "rate": 5
          },
          {
            "item": "MegaMedicinex3",
            "rate": 7
          }
        ],
        "stats": {
          "DEF": 70,
          "HP": 450,
          "LUK": 35,
          "MGC": 160,
          "PWR": 280,
          "SKL": 35,
          "SPD": 65,
          "lvl": 44
        }
      },
      "RedElemental": {
        "bits": 1300,
        "drops": [
          {
            "item": "SpeedRunePiece",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 80,
          "LUK": 66,
          "MGC": 150,
          "PWR": 250,
          "SKL": 90,
          "SPD": 130,
          "lvl": 42
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Dragon Knights Area": {
    "name": "Dragon Knights Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "1 Ivy",
        "parseString": "1 Ivy" },
      { "name": "2 Ivy",
        "parseString": "2 Ivy" },
      { "name": "3 Ivy",
        "parseString": "3 Ivy" },
      { "name": "1 ShadowMan",
        "parseString": "1 ShadowMan" },
      { "name": "2 ShadowMan",
        "parseString": "2 ShadowMan" },
      { "name": "2 Mirage",
        "parseString": "2 Mirage" },
      { "name": "4 Mirage",
        "parseString": "4 Mirage" },
      { "name": "3 Ivy 1 ShadowMan 1 Mirage",
        "parseString": "3 Ivy 1 ShadowMan 1 Mirage" }],
    "enemies": {
      "Ivy": {
        "bits": 2000,
        "drops": [
          {
            "item": "HexDoll",
            "rate": 6
          },
          {
            "item": "PeeingBoy",
            "rate": 6
          },
          {
            "item": "KnightStatue",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 80,
          "HP": 250,
          "LUK": 25,
          "MGC": 170,
          "PWR": 290,
          "SKL": 70,
          "SPD": 110,
          "lvl": 49
        }
      },
      "Mirage": {
        "bits": 2400,
        "drops": [
          {
            "item": "SpeedRing",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 95,
          "HP": 400,
          "LUK": 70,
          "MGC": 175,
          "PWR": 330,
          "SKL": 130,
          "SPD": 120,
          "lvl": 52
        }
      },
      "ShadowMan": {
        "bits": 2000,
        "drops": [
          {
            "item": "Silverlet",
            "rate": 10
          },
          {
            "item": "RoseBrooch",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 400,
          "LUK": 90,
          "MGC": 60,
          "PWR": 310,
          "SKL": 150,
          "SPD": 130,
          "lvl": 50
        }
      }
    },
    "areaType": "World Map"
  },
  "Dragons Den": {
    "name": "Dragons Den",
    "encounterRate": 3,
    "encounters": [
      { "name": "1 SunshineKing",
        "parseString": "1 SunshineKing" },
      { "name": "1 MagicShield",
        "parseString": "1 MagicShield" },
      { "name": "2 MagicShield",
        "parseString": "2 MagicShield" },
      { "name": "3 MagicShield",
        "parseString": "3 MagicShield" },
      { "name": "1 MagicShield 1 SunshineKing",
        "parseString": "1 MagicShield 1 SunshineKing" },
      { "name": "3 BlackElemental 1 SunshineKing",
        "parseString": "3 BlackElemental 1 SunshineKing" },
      { "name": "3 BlackElemental 2 MagicShield",
        "parseString": "3 BlackElemental 2 MagicShield" }],
    "enemies": {
      "BlackElemental": {
        "bits": 1600,
        "drops": [
          {
            "item": "MagicRunePiece",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 120,
          "LUK": 66,
          "MGC": 240,
          "PWR": 270,
          "SKL": 100,
          "SPD": 140,
          "lvl": 48
        }
      },
      "MagicShield": {
        "bits": 2700,
        "drops": [
          {
            "item": "EarthShield",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 130,
          "HP": 190,
          "LUK": 37,
          "MGC": 230,
          "PWR": 280,
          "SKL": 80,
          "SPD": 100,
          "lvl": 49
        }
      },
      "SunshineKing": {
        "bits": 6000,
        "drops": [
          {
            "item": "WindowSetting#3",
            "rate": 15
          },
          {
            "item": "CycloneRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 100,
          "HP": 1600,
          "LUK": 50,
          "MGC": 280,
          "PWR": 340,
          "SKL": 95,
          "SPD": 95,
          "lvl": 50
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Dwarves Trail": {
    "name": "Dwarves Trail",
    "encounterRate": 2,
    "encounters": [
      { "name": "3 Dwarf 2 EagleMan",
        "parseString": "3 Dwarf 2 EagleMan" },
      { "name": "1 EagleMan",
        "parseString": "1 EagleMan" },
      { "name": "2 EagleMan",
        "parseString": "2 EagleMan" },
      { "name": "3 EagleMan",
        "parseString": "3 EagleMan" },
      { "name": "1 Dwarf",
        "parseString": "1 Dwarf" },
      { "name": "2 Dwarf",
        "parseString": "2 Dwarf" },
      { "name": "3 Dwarf",
        "parseString": "3 Dwarf" },
      { "name": "1 DeathBoar",
        "parseString": "1 DeathBoar" },
      { "name": "2 DeathBoar",
        "parseString": "2 DeathBoar" },
      { "name": "3 DeathBoar",
        "parseString": "3 DeathBoar" },
      { "name": "3 DeathBoar 1 EagleMan",
        "parseString": "3 DeathBoar 1 EagleMan" },
      { "name": "3 DeathBoar 1 Dwarf",
        "parseString": "3 DeathBoar 1 Dwarf" },
      { "name": "3 DeathBoar 2 EagleMan",
        "parseString": "3 DeathBoar 2 EagleMan" },
      { "name": "3 DeathBoar 1 Dwarf 1 EagleMan",
        "parseString": "3 DeathBoar 1 Dwarf 1 EagleMan" }],
    "enemies": {
      "DeathBoar": {
        "bits": 800,
        "drops": [
          {
            "item": "FurCape",
            "rate": 10
          },
          {
            "item": "BoarRune",
            "rate": 4
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 350,
          "LUK": 25,
          "MGC": 10,
          "PWR": 182,
          "SKL": 40,
          "SPD": 35,
          "lvl": 17
        }
      },
      "Dwarf": {
        "bits": 400,
        "drops": [
          {
            "item": "KarateUniform",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 300,
          "LUK": 36,
          "MGC": 25,
          "PWR": 170,
          "SKL": 58,
          "SPD": 56,
          "lvl": 21
        }
      },
      "EagleMan": {
        "bits": 550,
        "drops": [
          {
            "item": "Graffiti",
            "rate": 6
          },
          {
            "item": "FlowerPainting",
            "rate": 6
          },
          {
            "item": "LoversGarden",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 150,
          "LUK": 40,
          "MGC": 40,
          "PWR": 165,
          "SKL": 75,
          "SPD": 68,
          "lvl": 22
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Dwarves Vault": {
    "name": "Dwarves Vault",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 RedMachine",
        "parseString": "1 DeathMachine(sword)" },
      { "name": "2 RedMachine",
        "parseString": "2 DeathMachine(sword)" },
      { "name": "3 RedMachine",
        "parseString": "3 DeathMachine(sword)" },
      { "name": "1 BlueMachine",
        "parseString": "1 DeathMachine(spear)" },
      { "name": "2 BlueMachine",
        "parseString": "2 DeathMachine(spear)" },
      { "name": "3 BlueMachine",
        "parseString": "3 DeathMachine(spear)" },
      { "name": "1 CrimsonDwarf",
        "parseString": "1 CrimsonDwarf" },
      { "name": "2 CrimsonDwarf",
        "parseString": "2 CrimsonDwarf" },
      { "name": "3 CrimsonDwarf",
        "parseString": "3 CrimsonDwarf" },
      { "name": "2 DeathBoar",
        "parseString": "2 DeathBoar" },
      { "name": "3 DeathBoar",
        "parseString": "3 DeathBoar" },
      { "name": "3 CrimsonDwarf 1 RedMachine",
        "parseString": "3 CrimsonDwarf 1 DeathMachine(sword)" },
      { "name": "3 CrimsonDwarf 2 RedMachine",
        "parseString": "3 CrimsonDwarf 2 DeathMachine(sword)" },
      { "name": "3 CrimsonDwarf 3 RedMachine",
        "parseString": "3 CrimsonDwarf 3 DeathMachine(sword)" }],
    "enemies": {
      "CrimsonDwarf": {
        "bits": 600,
        "drops": [
          {
            "item": "Medicinex6",
            "rate": 12
          },
          {
            "item": "EscapeTalisman",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 35,
          "HP": 250,
          "LUK": 38,
          "MGC": 27,
          "PWR": 175,
          "SKL": 45,
          "SPD": 60,
          "lvl": 23
        }
      },
      "DeathBoar": {
        "bits": 800,
        "drops": [
          {
            "item": "FurCape",
            "rate": 10
          },
          {
            "item": "BoarRune",
            "rate": 4
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 350,
          "LUK": 25,
          "MGC": 10,
          "PWR": 182,
          "SKL": 40,
          "SPD": 35,
          "lvl": 17
        }
      },
      "DeathMachine(sword)": {
        "bits": 550,
        "drops": [
          {
            "item": "SteelShield",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 150,
          "LUK": 0,
          "MGC": 0,
          "PWR": 180,
          "SKL": 40,
          "SPD": 55,
          "lvl": 25
        }
      },
      "DeathMachine(spear)": {
        "bits": 400,
        "drops": [
          {
            "item": "SteelShield",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 65,
          "HP": 170,
          "LUK": 0,
          "MGC": 0,
          "PWR": 185,
          "SKL": 45,
          "SPD": 50,
          "lvl": 25
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Gradys Mansion": {
    "name": "Gradys Mansion",
    "encounterRate": 0,
    "encounters": [],
    "enemies": {
      "EmpireCaptain": {
        "bits": 250,
        "drops": [
          {
            "item": "Graffiti",
            "rate": 6
          },
          {
            "item": "FlowerPainting",
            "rate": 6
          },
          {
            "item": "LoversGarden",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 15,
          "HP": 90,
          "LUK": 26,
          "MGC": 15,
          "PWR": 80,
          "SKL": 45,
          "SPD": 10,
          "lvl": 10
        }
      },
      "EmpireSoldier(sabre#1)": {
        "bits": 140,
        "drops": [
          {
            "item": "Headband",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 5,
          "HP": 50,
          "LUK": 25,
          "MGC": 12,
          "PWR": 65,
          "SKL": 55,
          "SPD": 25,
          "lvl": 8
        }
      }
    },
    "areaType": null
  },
  "Great Forest": {
    "name": "Great Forest",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 Kobold",
        "parseString": "1 Kobold(sword)" },
      { "name": "3 Kobold",
        "parseString": "3 Kobold(sword)" },
      { "name": "6 Kobold",
        "parseString": "3 Kobold(sword) 3 Kobold(bow)" },
      { "name": "2 Kobold",
        "parseString": "2 Kobold(bow)" },
      { "name": "2 HollyBoy 1 HollySpirit",
        "parseString": "2 HollyBoy 1 HollySpirit" },
      { "name": "5 HollyBoy 1 HollySpirit",
        "parseString": "5 HollyBoy 1 HollySpirit" },
      { "name": "3 HollyBoy 3 HollySpirit",
        "parseString": "3 HollyBoy 3 HollySpirit" },
      { "name": "6 HollyBoy",
        "parseString": "6 HollyBoy" }],
    "enemies": {
      "HollyBoy": {
        "bits": 150,
        "drops": [
          {
            "item": "Graffiti",
            "rate": 6
          },
          {
            "item": "FlowerPainting",
            "rate": 6
          },
          {
            "item": "LoversGarden",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 80,
          "LUK": 30,
          "MGC": 20,
          "PWR": 100,
          "SKL": 60,
          "SPD": 80,
          "lvl": 5
        }
      },
      "HollySpirit": {
        "bits": 500,
        "drops": [
          {
            "item": "ToeShoes",
            "rate": 10
          },
          {
            "item": "Needlex4",
            "rate": 15
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 350,
          "LUK": 70,
          "MGC": 60,
          "PWR": 150,
          "SKL": 55,
          "SPD": 65,
          "lvl": 21
        }
      },
      "Kobold(sword)": {
        "bits": 200,
        "drops": [
          {
            "item": "WoodenShield",
            "rate": 7
          }
        ],
        "stats": {
          "DEF": 42,
          "HP": 150,
          "LUK": 35,
          "MGC": 20,
          "PWR": 150,
          "SKL": 40,
          "SPD": 43,
          "lvl": 20
        }
      },
      "Kobold(bow)": {
        "bits": 150,
        "drops": [
          {
            "item": "Necklace",
            "rate": 7
          },
          {
            "item": "Medicinex6",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 42,
          "HP": 120,
          "LUK": 35,
          "MGC": 10,
          "PWR": 140,
          "SKL": 35,
          "SPD": 45,
          "lvl": 20
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Gregminster Area 1": {
    "name": "Gregminster Area 1",
    "encounterRate": 8,
    "encounters": [
      { "name": "1 BonBon",
        "parseString": "1 BonBon" },
      { "name": "3 BonBon",
        "parseString": "3 BonBon" },
      { "name": "6 Mosquito",
        "parseString": "6 Mosquito" },
      { "name": "2 Crow",
        "parseString": "2 Crow" },
      { "name": "1 Boar",
        "parseString": "1 WildBoar" },
      { "name": "1 RedSoldierAnt",
        "parseString": "1 RedSoldierAnt" },
      { "name": "2 RedSoldierAnt",
        "parseString": "2 RedSoldierAnt" },
      { "name": "3 Mosquito 1 RedSoldierAnt",
        "parseString": "3 Mosquito 1 RedSoldierAnt" },
      { "name": "2 Crow 1 WildBoar",
        "parseString": "2 Crow 1 WildBoar" }],
    "enemies": {
      "BonBon": {
        "bits": 70,
        "drops": [
          {
            "item": "FailureUrn",
            "rate": 6
          },
          {
            "item": "OctopusUrn",
            "rate": 6
          },
          {
            "item": "CeladonUrn",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 5,
          "HP": 18,
          "LUK": 12,
          "MGC": 9,
          "PWR": 31,
          "SKL": 5,
          "SPD": 16,
          "lvl": 5
        }
      },
      "Crow": {
        "bits": 50,
        "drops": [
          {
            "item": "Bandanna",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 7,
          "HP": 15,
          "LUK": 24,
          "MGC": 5,
          "PWR": 30,
          "SKL": 70,
          "SPD": 27,
          "lvl": 4
        }
      },
      "Mosquito": {
        "bits": 20,
        "drops": [
          {
            "item": "Medicinex6",
            "rate": 5
          },
          {
            "item": "HolyRune",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 6,
          "HP": 17,
          "LUK": 35,
          "MGC": 0,
          "PWR": 30,
          "SKL": 50,
          "SPD": 29,
          "lvl": 4
        }
      },
      "RedSoldierAnt": {
        "bits": 60,
        "drops": [
          {
            "item": "PointedHat",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 10,
          "HP": 28,
          "LUK": 3,
          "MGC": 0,
          "PWR": 48,
          "SKL": 18,
          "SPD": 22,
          "lvl": 8
        }
      },
      "WildBoar": {
        "bits": 300,
        "drops": [
          {
            "item": "WindRunePiece",
            "rate": 4
          }
        ],
        "stats": {
          "DEF": 19,
          "HP": 60,
          "LUK": 14,
          "MGC": 0,
          "PWR": 65,
          "SKL": 15,
          "SPD": 20,
          "lvl": 7
        }
      }
    },
    "areaType": "World Map"
  },
  "Gregminster Area 2": {
    "name": "Gregminster Area 2",
    "encounterRate": 2,
    "encounters": [
      { "name": "3 NinjaMaster 1 Simurgh",
        "parseString": "3 NinjaMaster 1 Simurgh" },
      { "name": "1 NinjaMaster",
        "parseString": "1 NinjaMaster" },
      { "name": "2 NinjaMaster",
        "parseString": "2 NinjaMaster" },
      { "name": "3 NinjaMaster",
        "parseString": "3 NinjaMaster" },
      { "name": "1 Simurgh",
        "parseString": "1 Simurgh" },
      { "name": "2 Simurgh",
        "parseString": "2 Simurgh" },
      { "name": "3 Simurgh",
        "parseString": "3 Simurgh" },
      { "name": "1 Orc",
        "parseString": "1 Orc" },
      { "name": "2 Orc",
        "parseString": "2 Orc" },
      { "name": "3 Orc",
        "parseString": "3 Orc" },
      { "name": "3 NinjaMaster 1 Orc",
        "parseString": "3 NinjaMaster 1 Orc" },
      { "name": "3 NinjaMaster 2 Simurgh",
        "parseString": "3 NinjaMaster 2 Simurgh" },
      { "name": "3 NinjaMaster 2 Orc",
        "parseString": "3 NinjaMaster 2 Orc" }],
    "enemies": {
      "NinjaMaster": {
        "bits": 5500,
        "drops": [
          {
            "item": "CrimsonCape",
            "rate": 12
          }
        ],
        "stats": {
          "DEF": 30,
          "HP": 400,
          "LUK": 60,
          "MGC": 120,
          "PWR": 330,
          "SKL": 140,
          "SPD": 170,
          "lvl": 55
        }
      },
      "Orc": {
        "bits": 7100,
        "drops": [
          {
            "item": "Graffiti",
            "rate": 6
          },
          {
            "item": "LoversGarden",
            "rate": 6
          },
          {
            "item": "BeautiesofNature",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 5,
          "HP": 1500,
          "LUK": 30,
          "MGC": 30,
          "PWR": 340,
          "SKL": 30,
          "SPD": 15,
          "lvl": 57
        }
      },
      "Simurgh": {
        "bits": 6500,
        "drops": [
          {
            "item": "ThunderRune",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 700,
          "LUK": 55,
          "MGC": 160,
          "PWR": 315,
          "SKL": 80,
          "SPD": 130,
          "lvl": 56
        }
      }
    },
    "areaType": "World Map"
  },
  "Gregminster Palace": {
    "name": "Gregminster Palace",
    "encounterRate": 3,
    "encounters": [
      { "name": "1 Colossus",
        "parseString": "1 Colossus" },
      { "name": "2 ImperialGuards(sabre)",
        "parseString": "2 ImperialGuards(sabre)" },
      { "name": "3 ImperialGuards",
        "parseString": "2 ImperialGuards(sabre) 1 ImperialGuards(sword)" },
      { "name": "2 ImperialGuards(sword)",
        "parseString": "2 ImperialGuards(sword)" },
      { "name": "1 Phantom",
        "parseString": "1 Phantom" },
      { "name": "2 Phantom",
        "parseString": "2 Phantom" },
      { "name": "3 Phantom",
        "parseString": "3 Phantom" },
      { "name": "3 ImperialGuards(sabre) 1 Ekidonna",
        "parseString": "3 ImperialGuards(sabre) 1 Ekidonna" },
      { "name": "3 Phantom 1 Ekidonna",
        "parseString": "3 Phantom 1 Ekidonna" },
      { "name": "3 Phantom 1 Colossus",
        "parseString": "3 Phantom 1 Colossus" },
      { "name": "3 ImperialGuards(sabre) 1 Colossus",
        "parseString": "3 ImperialGuards(sabre) 1 Colossus" }],
    "enemies": {
      "Colossus": {
        "bits": 15000,
        "drops": [
          {
            "item": "MotherEarthRune",
            "rate": 6
          },
          {
            "item": "PowerRing",
            "rate": 13
          }
        ],
        "stats": {
          "DEF": 90,
          "HP": 800,
          "LUK": 75,
          "MGC": 100,
          "PWR": 350,
          "SKL": 80,
          "SPD": 60,
          "lvl": 59
        }
      },
      "Ekidonna": {
        "bits": 20000,
        "drops": [
          {
            "item": "WindspunArmor",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 1000,
          "LUK": 60,
          "MGC": 310,
          "PWR": 370,
          "SKL": 100,
          "SPD": 90,
          "lvl": 60
        }
      },
      "ImperialGuards(sabre)": {
        "bits": 5000,
        "drops": [],
        "stats": {
          "DEF": 130,
          "HP": 500,
          "LUK": 115,
          "MGC": 220,
          "PWR": 325,
          "SKL": 110,
          "SPD": 95,
          "lvl": 56
        }
      },
      "ImperialGuards(sword)": {
        "bits": 4500,
        "drops": [
          {
            "item": "MegaMedicinex3",
            "rate": 15
          }
        ],
        "stats": {
          "DEF": 130,
          "HP": 550,
          "LUK": 110,
          "MGC": 200,
          "PWR": 330,
          "SKL": 100,
          "SPD": 90,
          "lvl": 56
        }
      },
      "Phantom": {
        "bits": 6500,
        "drops": [
          {
            "item": "EarthBoots",
            "rate": 12
          }
        ],
        "stats": {
          "DEF": 70,
          "HP": 550,
          "LUK": 95,
          "MGC": 190,
          "PWR": 335,
          "SKL": 150,
          "SPD": 120,
          "lvl": 58
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Kalekka": {
    "name": "Kalekka",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 DemonHound",
        "parseString": "1 DemonHound" },
      { "name": "2 HawkMan",
        "parseString": "2 HawkMan" },
      { "name": "3 HawkMan",
        "parseString": "3 HawkMan" },
      { "name": "4 HawkMan",
        "parseString": "4 HawkMan" },
      { "name": "2 Shadow",
        "parseString": "2 Shadow" },
      { "name": "4 Shadow",
        "parseString": "4 Shadow" },
      { "name": "2 HawkMan 2 Shadow",
        "parseString": "2 HawkMan 2 Shadow" }],
    "enemies": {
      "DemonHound": {
        "bits": 900,
        "drops": [
          {
            "item": "SilverNecklace",
            "rate": 7
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 700,
          "LUK": 45,
          "MGC": 75,
          "PWR": 250,
          "SKL": 70,
          "SPD": 65,
          "lvl": 37
        }
      },
      "HawkMan": {
        "bits": 1300,
        "drops": [
          {
            "item": "FailureUrn",
            "rate": 6
          },
          {
            "item": "WideUrn",
            "rate": 6
          },
          {
            "item": "BlackUrn",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 300,
          "LUK": 55,
          "MGC": 40,
          "PWR": 245,
          "SKL": 90,
          "SPD": 99,
          "lvl": 35
        }
      },
      "Shadow": {
        "bits": 2000,
        "drops": [
          {
            "item": "Silverlet",
            "rate": 10
          },
          {
            "item": "RoseBrooch",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 170,
          "LUK": 90,
          "MGC": 60,
          "PWR": 260,
          "SKL": 120,
          "SPD": 88,
          "lvl": 36
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Kalekka Area": {
    "name": "Kalekka Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "1 Dagon",
        "parseString": "1 Dagon" },
      { "name": "2 Dagon",
        "parseString": "2 Dagon" },
      { "name": "3 Dagon",
        "parseString": "3 Dagon" },
      { "name": "2 GrizzlyBear",
        "parseString": "2 GrizzlyBear" },
      { "name": "3 GrizzlyBear",
        "parseString": "3 GrizzlyBear" },
      { "name": "2 Dagon 1 Siren",
        "parseString": "2 Dagon 1 Siren" },
      { "name": "1 GrizzlyBear",
        "parseString": "1 GrizzlyBear" },
      { "name": "1 Siren",
        "parseString": "1 Siren" },
      { "name": "2 Siren",
        "parseString": "2 Siren" }],
    "enemies": {
      "Dagon": {
        "bits": 1100,
        "drops": [
          {
            "item": "DragonArmor",
            "rate": 9
          },
          {
            "item": "WaterRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 50,
          "HP": 400,
          "LUK": 35,
          "MGC": 80,
          "PWR": 230,
          "SKL": 70,
          "SPD": 75,
          "lvl": 31
        }
      },
      "GrizzlyBear": {
        "bits": 1200,
        "drops": [
          {
            "item": "HeadGear",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 30,
          "HP": 470,
          "LUK": 10,
          "MGC": 35,
          "PWR": 280,
          "SKL": 50,
          "SPD": 50,
          "lvl": 34
        }
      },
      "Siren": {
        "bits": 2000,
        "drops": [
          {
            "item": "ProsperityRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 20,
          "HP": 250,
          "LUK": 40,
          "MGC": 160,
          "PWR": 260,
          "SKL": 60,
          "SPD": 90,
          "lvl": 32
        }
      }
    },
    "areaType": "World Map"
  },
  "Kobold Village": {
    "name": "Kobold Village",
    "encounterRate": 0,
    "encounters": [],
    "enemies": {
      "VeteranSoldier(spear)": {
        "bits": 700,
        "drops": [
          {
            "item": "LeatherArmor",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 270,
          "LUK": 45,
          "MGC": 40,
          "PWR": 190,
          "SKL": 55,
          "SPD": 70,
          "lvl": 26
        }
      }
    },
    "areaType": null
  },
  "Krazes Mansion": {
    "name": "Krazes Mansion",
    "encounterRate": 2,
    "encounters": [],
    "enemies": {
      "EmpireSoldier": {
        "bits": 300,
        "drops": [
          {
            "item": "BrassArmor",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 150,
          "LUK": 40,
          "MGC": 35,
          "PWR": 120,
          "SKL": 60,
          "SPD": 50,
          "lvl": 20
        }
      }
    },
    "areaType": null
  },
  "Lenankamp": {
    "name": "Lenankamp",
    "encounterRate": 0,
    "encounters": [],
    "enemies": {
      "EmpireSoldier": {
        "bits": 140,
        "drops": [],
        "stats": {
          "DEF": 6,
          "HP": 54,
          "LUK": 29,
          "MGC": 9,
          "PWR": 70,
          "SKL": 65,
          "SPD": 33,
          "lvl": 12
        }
      }
    },
    "areaType": null
  },
  "Lepants Mansion": {
    "name": "Lepants Mansion",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 SlotMan",
        "parseString": "1 SlotMan" },
      { "name": "3 RobotSoldier",
        "parseString": "3 RobotSoldier" },
      { "name": "6 RobotSoldier",
        "parseString": "6 RobotSoldier" }],
    "enemies": {
      "RobotSoldier": {
        "bits": 400,
        "drops": [
          {
            "item": "FailureUrn",
            "rate": 6
          },
          {
            "item": "Vase",
            "rate": 6
          },
          {
            "item": "PersianLamp",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 70,
          "HP": 150,
          "LUK": 0,
          "MGC": 0,
          "PWR": 135,
          "SKL": 20,
          "SPD": 45,
          "lvl": 18
        }
      },
      "SlotMan": {
        "bits": 700,
        "drops": [
          {
            "item": "FailureUrn",
            "rate": 6
          },
          {
            "item": "Vase",
            "rate": 6
          },
          {
            "item": "PersianLamp",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 50,
          "HP": 200,
          "LUK": 30,
          "MGC": 110,
          "PWR": 180,
          "SKL": 70,
          "SPD": 80,
          "lvl": 19
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Lorimar Area": {
    "name": "Lorimar Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "3 HellHound 1 WhipWolf ",
        "parseString": "3 HellHound 1 WhipWolf " },
      { "name": "1 GraveMaster",
        "parseString": "1 GraveMaster" },
      { "name": "2 GraveMaster",
        "parseString": "2 GraveMaster" },
      { "name": "1 HellHound",
        "parseString": "1 HellHound" },
      { "name": "2 HellHound",
        "parseString": "2 HellHound" },
      { "name": "3 HellHound",
        "parseString": "3 HellHound" },
      { "name": "1 Sorcerer",
        "parseString": "1 Sorcerer" },
      { "name": "2 Sorcerer",
        "parseString": "2 Sorcerer" },
      { "name": "3 HellHound 1 Sorcerer",
        "parseString": "3 HellHound 1 Sorcerer" },
      { "name": "3 HellHound 1 GraveMaster",
        "parseString": "3 HellHound 1 GraveMaster" },
      { "name": "3 HellHound 2 GraveMaster",
        "parseString": "3 HellHound 2 GraveMaster" }],
    "enemies": {
      "GraveMaster": {
        "bits": 2000,
        "drops": [
          {
            "item": "FullHelmet",
            "rate": 10
          },
          {
            "item": "GuardRing",
            "rate": 7
          }
        ],
        "stats": {
          "DEF": 80,
          "HP": 400,
          "LUK": 55,
          "MGC": 75,
          "PWR": 270,
          "SKL": 30,
          "SPD": 50,
          "lvl": 39
        }
      },
      "HellHound": {
        "bits": 700,
        "drops": [],
        "stats": {
          "DEF": 65,
          "HP": 300,
          "LUK": 40,
          "MGC": 30,
          "PWR": 258,
          "SKL": 70,
          "SPD": 70,
          "lvl": 37
        }
      },
      "Sorcerer": {
        "bits": 3000,
        "drops": [
          {
            "item": "MasterRobe",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 30,
          "HP": 200,
          "LUK": 90,
          "MGC": 190,
          "PWR": 270,
          "SKL": 100,
          "SPD": 90,
          "lvl": 40
        }
      },
      "WhipWolf": {
        "bits": 2500,
        "drops": [
          {
            "item": "ResurrectionRune",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 70,
          "HP": 350,
          "LUK": 55,
          "MGC": 75,
          "PWR": 240,
          "SKL": 90,
          "SPD": 150,
          "lvl": 38
        }
      }
    },
    "areaType": "World Map"
  },
  "Magicians Island": {
    "name": "Magicians Island",
    "encounterRate": 2,
    "encounters": [
      { "name": "4 HollyBoy",
        "parseString": "4 HollyBoy" },
      { "name": "6 HollyBoy",
        "parseString": "4 HollyBoy" },
      { "name": "3 HollyBoy 2 FurFur",
        "parseString": "4 HollyBoy" },
      { "name": "2 FurFur",
        "parseString": "4 HollyBoy" },
      { "name": "4 HollyBoy",
        "parseString": "4 HollyBoy" },
      { "name": "6 HollyBoy",
        "parseString": "4 HollyBoy" },
      { "name": "3 HollyBoy 2 FurFur",
        "parseString": "4 HollyBoy" },
      { "name": "2 FurFur",
        "parseString": "4 HollyBoy" },
      { "name": "3 FurFur",
        "parseString": "4 HollyBoy" }],
    "enemies": {
      "FurFur": {
        "bits": 50,
        "drops": [
          {
            "item": "WoodenShoes",
            "rate": 6
          },
          {
            "item": "Medicinex6",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 5,
          "HP": 18,
          "LUK": 5,
          "MGC": 7,
          "PWR": 31,
          "SKL": 5,
          "SPD": 16,
          "lvl": 4
        }
      },
      "HollyBoy": {
        "bits": 10,
        "drops": [
          {
            "item": "Medicinex6",
            "rate": 8
          },
          {
            "item": "Robe",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 7,
          "HP": 10,
          "LUK": 70,
          "MGC": 10,
          "PWR": 29,
          "SKL": 5,
          "SPD": 15,
          "lvl": 3
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Moravia Area": {
    "name": "Moravia Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "1 RabbitBird",
        "parseString": "1 RabbitBird" },
      { "name": "2 RabbitBird",
        "parseString": "2 RabbitBird" },
      { "name": "3 RabbitBird",
        "parseString": "3 RabbitBird" },
      { "name": "1 Mirage",
        "parseString": "1 Mirage" },
      { "name": "2 Mirage",
        "parseString": "2 Mirage" },
      { "name": "3 Mirage",
        "parseString": "3 Mirage" },
      { "name": "1 EarthGolem",
        "parseString": "1 EarthGolem" },
      { "name": "2 EarthGolem",
        "parseString": "2 EarthGolem" },
      { "name": "3 RabbitBird 1 EarthGolem",
        "parseString": "3 RabbitBird 1 EarthGolem" },
      { "name": "3 Mirage 1 EarthGolem",
        "parseString": "3 Mirage 1 EarthGolem" },
      { "name": "3 RabbitBird 2 EarthGolem",
        "parseString": "3 RabbitBird 2 EarthGolem" },
      { "name": "3 Mirage 2 EarthGolem",
        "parseString": "3 Mirage 2 EarthGolem" }],
    "enemies": {
      "EarthGolem": {
        "bits": 3000,
        "drops": [
          {
            "item": "MasterGarb",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 110,
          "HP": 600,
          "LUK": 35,
          "MGC": 230,
          "PWR": 340,
          "SKL": 70,
          "SPD": 70,
          "lvl": 53
        }
      },
      "Mirage": {
        "bits": 2400,
        "drops": [
          {
            "item": "SpeedRing",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 95,
          "HP": 400,
          "LUK": 70,
          "MGC": 175,
          "PWR": 330,
          "SKL": 130,
          "SPD": 120,
          "lvl": 52
        }
      },
      "RabbitBird": {
        "bits": 2200,
        "drops": [
          {
            "item": "SacrificialBuddha",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 50,
          "HP": 300,
          "LUK": 110,
          "MGC": 160,
          "PWR": 305,
          "SKL": 110,
          "SPD": 60,
          "lvl": 51
        }
      }
    },
    "areaType": "World Map"
  },
  "Moravia Castle": {
    "name": "Moravia Castle",
    "encounterRate": 3,
    "encounters": [
      { "name": "3 HellHound 1 WhipMaster",
        "parseString": "3 HellHound 1 WhipMaster" },
      { "name": "3 HellHound 2 WhipMaster",
        "parseString": "3 HellHound 2 WhipMaster" },
      { "name": "5 HellHound 1 WhipMaster",
        "parseString": "5 HellHound 1 WhipMaster" },
      { "name": "1 Ninja",
        "parseString": "1 Ninja" },
      { "name": "2 Ninja",
        "parseString": "2 Ninja" },
      { "name": "1 Magus",
        "parseString": "1 Magus" },
      { "name": "2 Magus",
        "parseString": "2 Magus" },
      { "name": "1 EliteSoldier",
        "parseString": "1 EliteSoldier" },
      { "name": "2 EliteSoldier",
        "parseString": "2 EliteSoldier" },
      { "name": "3 HellHound 1 Magus 1 WhipMaster",
        "parseString": "3 HellHound 1 Magus 1 WhipMaster" },
      { "name": "3 Ninja 1 Magus",
        "parseString": "3 Ninja 1 Magus" },
      { "name": "3 EliteSoldier 1 Magus",
        "parseString": "3 EliteSoldier 1 Magus" },
      { "name": "3 HellHound 2 Ninja",
        "parseString": "3 HellHound 2 Ninja" },
      { "name": "3 Ninja 2 Magus",
        "parseString": "3 Ninja 2 Magus" },
      { "name": "2 EliteSoldier 1 Ninja 2 Magus",
        "parseString": "2 EliteSoldier 1 Ninja 2 Magus" },
      { "name": "3 HellHound 2 EliteSoldier 1 WhipMaster",
        "parseString": "3 HellHound 2 EliteSoldier 1 WhipMaster" }],
    "enemies": {
      "EliteSoldier": {
        "bits": 2800,
        "drops": [
          {
            "item": "RageRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 120,
          "HP": 400,
          "LUK": 60,
          "MGC": 190,
          "PWR": 340,
          "SKL": 120,
          "SPD": 110,
          "lvl": 52
        }
      },
      "HellHound": {
        "bits": 700,
        "drops": [],
        "stats": {
          "DEF": 80,
          "HP": 300,
          "LUK": 40,
          "MGC": 30,
          "PWR": 335,
          "SKL": 80,
          "SPD": 80,
          "lvl": 50
        }
      },
      "Magus": {
        "bits": 7100,
        "drops": [
          {
            "item": "FortuneRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 50,
          "HP": 300,
          "LUK": 120,
          "MGC": 290,
          "PWR": 270,
          "SKL": 90,
          "SPD": 125,
          "lvl": 54
        }
      },
      "Ninja": {
        "bits": 5500,
        "drops": [
          {
            "item": "CapeOfDarkness",
            "rate": 10
          },
          {
            "item": "WingBoots",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 70,
          "HP": 450,
          "LUK": 90,
          "MGC": 60,
          "PWR": 340,
          "SKL": 140,
          "SPD": 160,
          "lvl": 52
        }
      },
      "WhipMaster": {
        "bits": 8000,
        "drops": [
          {
            "item": "HexDoll",
            "rate": 6
          },
          {
            "item": "Bonsai",
            "rate": 6
          },
          {
            "item": "GoddessStatue",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 90,
          "HP": 700,
          "LUK": 55,
          "MGC": 175,
          "PWR": 320,
          "SKL": 85,
          "SPD": 180,
          "lvl": 51
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Mt Seifu": {
    "name": "Mt Seifu",
    "encounterRate": 2,
    "encounters": [
      { "name": "6 SoldierAnt",
        "parseString": "6 SoldierAnt" },
      { "name": "2 RedBandit",
        "parseString": "2 Bandit(red)" },
      { "name": "3 Bandit",
        "parseString": "1 Bandit(yellow) 2 Bandit(green)" },
      { "name": "2 BlackWildBoar",
        "parseString": "2 BlackWildBoar" },
      { "name": "2 GreenBandit",
        "parseString": "2 Bandit(green)" }],
    "enemies": {
      "Bandit(green)": {
        "bits": 70,
        "drops": [
          {
            "item": "Medicinex6",
            "rate": 7
          },
          {
            "item": "Tunic",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 3,
          "HP": 32,
          "LUK": 22,
          "MGC": 10,
          "PWR": 47,
          "SKL": 19,
          "SPD": 22,
          "lvl": 5
        }
      },
      "Bandit(red)": {
        "bits": 80,
        "drops": [],
        "stats": {
          "DEF": 6,
          "HP": 34,
          "LUK": 18,
          "MGC": 14,
          "PWR": 49,
          "SKL": 15,
          "SPD": 18,
          "lvl": 5
        }
      },
      "Bandit(yellow)": {
        "bits": 150,
        "drops": [
          {
            "item": "ShoulderPads",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 8,
          "HP": 55,
          "LUK": 16,
          "MGC": 12,
          "PWR": 52,
          "SKL": 20,
          "SPD": 15,
          "lvl": 7
        }
      },
      "BlackWildBoar": {
        "bits": 300,
        "drops": [
          {
            "item": "WindRunePiece",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 19,
          "HP": 60,
          "LUK": 20,
          "MGC": 0,
          "PWR": 65,
          "SKL": 15,
          "SPD": 20,
          "lvl": 7
        }
      },
      "SoldierAnt": {
        "bits": 30,
        "drops": [
          {
            "item": "PointedHat",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 10,
          "HP": 28,
          "LUK": 6,
          "MGC": 0,
          "PWR": 48,
          "SKL": 18,
          "SPD": 22,
          "lvl": 4
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Mt Tigerwolf": {
    "name": "Mt Tigerwolf",
    "encounterRate": 3,
    "encounters": [
      { "name": "6 SlasherRabbit",
        "parseString": "6 SlasherRabbit" },
      { "name": "2 GiantSnail",
        "parseString": "2 GiantSnail" },
      { "name": "3 KillerSlime",
        "parseString": "3 KillerSlime" },
      { "name": "3 KillerSlime",
        "parseString": "3 KillerSlime" },
      { "name": "1 GiantSnail",
        "parseString": "1 GiantSnail" }],
    "enemies": {
      "GiantSnail": {
        "bits": 250,
        "drops": [
          {
            "item": "DefenseRunePiece",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 24,
          "HP": 120,
          "LUK": 30,
          "MGC": 18,
          "PWR": 95,
          "SKL": 35,
          "SPD": 22,
          "lvl": 9
        }
      },
      "KillerSlime": {
        "bits": 100,
        "drops": [
          {
            "item": "WaterRunePiece",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 34,
          "HP": 40,
          "LUK": 23,
          "MGC": 55,
          "PWR": 72,
          "SKL": 20,
          "SPD": 22,
          "lvl": 7
        }
      },
      "SlasherRabbit": {
        "bits": 70,
        "drops": [
          {
            "item": "KarateUniform",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 10,
          "HP": 60,
          "LUK": 6,
          "MGC": 6,
          "PWR": 65,
          "SKL": 30,
          "SPD": 29,
          "lvl": 6
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Neclords Castle": {
    "name": "Neclords Castle",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 DemonSorcerer",
        "parseString": "1 DemonSorcerer" },
      { "name": "1 HellUnicorn",
        "parseString": "1 HellUnicorn" },
      { "name": "2 DemonSorcerer",
        "parseString": "2 DemonSorcerer" },
      { "name": "1 Larvae",
        "parseString": "1 Larvae" },
      { "name": "2 Larvae",
        "parseString": "2 Larvae" },
      { "name": "3 Larvae",
        "parseString": "3 Larvae" },
      { "name": "3 Larvae 1 DemonSorcerer",
        "parseString": "3 Larvae 1 DemonSorcerer" },
      { "name": "3 Larvae 1 HellUnicorn",
        "parseString": "3 Larvae 1 HellUnicorn" },
      { "name": "3 Larvae 1 DemonSorcerer 1 HellUnicorn",
        "parseString": "3 Larvae 1 DemonSorcerer 1 HellUnicorn" }],
    "enemies": {
      "DemonSorcerer": {
        "bits": 3500,
        "drops": [
          {
            "item": "WindRune",
            "rate": 6
          },
          {
            "item": "MegaMedicinex3",
            "rate": 15
          }
        ],
        "stats": {
          "DEF": 50,
          "HP": 350,
          "LUK": 60,
          "MGC": 290,
          "PWR": 320,
          "SKL": 70,
          "SPD": 100,
          "lvl": 46
        }
      },
      "HellUnicorn": {
        "bits": 5000,
        "drops": [
          {
            "item": "StarEarrings",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 700,
          "LUK": 100,
          "MGC": 265,
          "PWR": 380,
          "SKL": 85,
          "SPD": 90,
          "lvl": 47
        }
      },
      "Larvae": {
        "bits": 2000,
        "drops": [
          {
            "item": "FailureUrn",
            "rate": 6
          },
          {
            "item": "BlueDragonUrn",
            "rate": 6
          },
          {
            "item": "FineBoneChina",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 80,
          "HP": 180,
          "LUK": 50,
          "MGC": 100,
          "PWR": 260,
          "SKL": 90,
          "SPD": 110,
          "lvl": 45
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Panna Yakuta Area": {
    "name": "Panna Yakuta Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "2 Kobold",
        "parseString": "2 Kobold(bow)" },
      { "name": "3 Kobold",
        "parseString": "3 Kobold(sword)" },
      { "name": "3 Kobold(sword) 1 Kobold(mage)",
        "parseString": "3 Kobold(sword) 1 Kobold(mage)" },
      { "name": "3 Kobold(bow) 1 Kobold(mage)",
        "parseString": "3 Kobold(bow) 1 Kobold(mage)" },
      { "name": "2 Kobold(bow) 1 StrongArm 1 Kobold(mage)",
        "parseString": "2 Kobold(bow) 1 StrongArm 1 Kobold(mage)" },
      { "name": "3 Kobold(sword) 2 Kobold(mage)",
        "parseString": "3 Kobold(sword) 2 Kobold(mage)" },
      { "name": "3 Kobold(bow) 2 Kobold(mage)",
        "parseString": "3 Kobold(bow) 2 Kobold(mage)" },
      { "name": "2 Kobold(sword) 1 StrongArm 2 Kobold(mage)",
        "parseString": "2 Kobold(sword) 1 StrongArm 2 Kobold(mage)" }],
    "enemies": {
      "StrongArm": {
        "bits": 500,
        "drops": [
          {
            "item": "SilverRing",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 300,
          "LUK": 29,
          "MGC": 20,
          "PWR": 200,
          "SKL": 50,
          "SPD": 40,
          "lvl": 21
        }
      },
      "Kobold(mage)": {
        "bits": 250,
        "drops": [
          {
            "item": "GuardRobe",
            "rate": 10
          },
          {
            "item": "FireRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 50,
          "LUK": 37,
          "MGC": 130,
          "PWR": 100,
          "SKL": 70,
          "SPD": 60,
          "lvl": 20
        }
      },
      "Kobold(sword)": {
        "bits": 200,
        "drops": [
          {
            "item": "WoodenShield",
            "rate": 7
          }
        ],
        "stats": {
          "DEF": 42,
          "HP": 150,
          "LUK": 35,
          "MGC": 20,
          "PWR": 150,
          "SKL": 40,
          "SPD": 43,
          "lvl": 20
        }
      },
      "Kobold(bow)": {
        "bits": 150,
        "drops": [
          {
            "item": "Necklace",
            "rate": 7
          },
          {
            "item": "Medicinex6",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 42,
          "HP": 120,
          "LUK": 35,
          "MGC": 10,
          "PWR": 140,
          "SKL": 35,
          "SPD": 45,
          "lvl": 20
        }
      }
    },
    "areaType": "World Map"
  },
  "Panna Yakuta": {
    "name": "Panna Yakuta",
    "encounterRate": 2,
    "encounters": [
      { "name": "3 Soldier(spear)",
        "parseString": "3 VeteranSoldier(spear)" },
      { "name": "1 DevilArmor",
        "parseString": "1 DevilArmor" },
      { "name": "3 DevilShield 1 DevilArmor",
        "parseString": "3 DevilShield 1 DevilArmor" },
      { "name": "2 Soldier(sabre)",
        "parseString": "2 VeteranSoldier(sabre)" },
      { "name": "3 Soldier(sabre)",
        "parseString": "3 VeteranSoldier(sabre)" },
      { "name": "3 Soldier(bow)",
        "parseString": "3 VeteranSoldier(bow)" },
      { "name": "1 Soldier(sabre) 1 Soldier(spear) 2 Soldier(bow)",
        "parseString": "1 VeteranSoldier(sabre) 1 VeteranSoldier(spear) 2 VeteranSoldier(bow)" },
      { "name": "1 Soldier(sabre) 1 Soldier(spear) 3 Soldier(bow)",
        "parseString": "1 VeteranSoldier(sabre) 1 VeteranSoldier(spear) 3 VeteranSoldier(bow)" },
      { "name": "2 DevilShield",
        "parseString": "2 DevilShield" }],
    "enemies": {
      "DevilArmor": {
        "bits": 1100,
        "drops": [
          {
            "item": "Mangosh",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 400,
          "LUK": 40,
          "MGC": 50,
          "PWR": 210,
          "SKL": 40,
          "SPD": 50,
          "lvl": 27
        }
      },
      "DevilShield": {
        "bits": 700,
        "drops": [
          {
            "item": "ChaosShield",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 250,
          "LUK": 30,
          "MGC": 90,
          "PWR": 195,
          "SKL": 56,
          "SPD": 45,
          "lvl": 27
        }
      },
      "VeteranSoldier(spear)": {
        "bits": 700,
        "drops": [
          {
            "item": "Leather Armor",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 270,
          "LUK": 45,
          "MGC": 40,
          "PWR": 190,
          "SKL": 55,
          "SPD": 70,
          "lvl": 26
        }
      },
      "VeteranSoldier(bow)": {
        "bits": 700,
        "drops": [
          {
            "item": "Emblem",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 250,
          "LUK": 47,
          "MGC": 38,
          "PWR": 175,
          "SKL": 50,
          "SPD": 80,
          "lvl": 26
        }
      },
      "VeteranSoldier(sabre)": {
        "bits": 700,
        "drops": [],
        "stats": {
          "DEF": 50,
          "HP": 260,
          "LUK": 44,
          "MGC": 42,
          "PWR": 185,
          "SKL": 53,
          "SPD": 80,
          "lvl": 26
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Rockland": {
    "name": "Rockland",
    "encounterRate": 0,
    "encounters": [],
    "enemies": {
      "EmpireSoldier(bow#1)": {
        "bits": 130,
        "drops": [],
        "stats": {
          "DEF": 5,
          "HP": 44,
          "LUK": 17,
          "MGC": 9,
          "PWR": 60,
          "SKL": 65,
          "SPD": 33,
          "lvl": 8
        }
      },
      "EmpireSoldier(spear#1)": {
        "bits": 100,
        "drops": [],
        "stats": {
          "DEF": 7,
          "HP": 55,
          "LUK": 14,
          "MGC": 8,
          "PWR": 60,
          "SKL": 55,
          "SPD": 15,
          "lvl": 8
        }
      },
      "EmpireSoldier(sword#1)": {
        "bits": 150,
        "drops": [],
        "stats": {
          "DEF": 7,
          "HP": 48,
          "LUK": 12,
          "MGC": 10,
          "PWR": 65,
          "SKL": 40,
          "SPD": 15,
          "lvl": 8
        }
      }
    },
    "areaType": null
  },
  "Scarleticia Area": {
    "name": "Scarleticia Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "1 HollyFairy",
        "parseString": "1 HollyFairy" },
      { "name": "2 HollyFairy",
        "parseString": "2 HollyFairy" },
      { "name": "3 HollyFairy",
        "parseString": "3 HollyFairy" },
      { "name": "1 MadIvy",
        "parseString": "1 MadIvy" },
      { "name": "2 MadIvy",
        "parseString": "2 MadIvy" },
      { "name": "3 MadIvy",
        "parseString": "3 MadIvy" },
      { "name": "1 Creeper",
        "parseString": "1 Creeper" },
      { "name": "2 Creeper",
        "parseString": "2 Creeper" },
      { "name": "3 Creeper",
        "parseString": "3 Creeper" },
      { "name": "3 HollyFairy 1 Creeper",
        "parseString": "3 HollyFairy 1 Creeper" },
      { "name": "3 HollyFairy 1 MadIvy",
        "parseString": "3 HollyFairy 1 MadIvy" },
      { "name": "3 MadIvy 1 Creeper",
        "parseString": "3 MadIvy 1 Creeper" }],
    "enemies": {
      "Creeper": {
        "bits": 600,
        "drops": [
          {
            "item": "EarthRune",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 35,
          "HP": 300,
          "LUK": 25,
          "MGC": 40,
          "PWR": 210,
          "SKL": 90,
          "SPD": 73,
          "lvl": 29
        }
      },
      "HollyFairy": {
        "bits": 800,
        "drops": [
          {
            "item": "NamelessUrn",
            "rate": 13
          },
          {
            "item": "MagicRobe",
            "rate": 7
          },
          {
            "item": "Needlex4",
            "rate": 13
          }
        ],
        "stats": {
          "DEF": 35,
          "HP": 400,
          "LUK": 90,
          "MGC": 75,
          "PWR": 240,
          "SKL": 50,
          "SPD": 80,
          "lvl": 26
        }
      },
      "MadIvy": {
        "bits": 600,
        "drops": [
          {
            "item": "HeadGear",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 25,
          "HP": 600,
          "LUK": 33,
          "MGC": 35,
          "PWR": 235,
          "SKL": 75,
          "SPD": 70,
          "lvl": 28
        }
      }
    },
    "areaType": "World Map"
  },
  "Scarleticia Castle": {
    "name": "Scarleticia Castle",
    "encounterRate": 2,
    "encounters": [
      { "name": "2 MadIvy",
        "parseString": "2 MadIvy" },
      { "name": "2 Creeper",
        "parseString": "2 Creeper" },
      { "name": "3 Creeper",
        "parseString": "3 Creeper" },
      { "name": "6 Creeper",
        "parseString": "6 Creeper" },
      { "name": "1 Nightmare",
        "parseString": "1 Nightmare" }],
    "enemies": {
      "Creeper": {
        "bits": 600,
        "drops": [
          {
            "item": "EarthRune",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 35,
          "HP": 300,
          "LUK": 25,
          "MGC": 40,
          "PWR": 210,
          "SKL": 90,
          "SPD": 73,
          "lvl": 29
        }
      },
      "MadIvy": {
        "bits": 600,
        "drops": [
          {
            "item": "HeadGear",
            "rate": 10
          }
        ],
        "stats": {
          "DEF": 25,
          "HP": 600,
          "LUK": 33,
          "MGC": 35,
          "PWR": 235,
          "SKL": 75,
          "SPD": 70,
          "lvl": 28
        }
      },
      "Nightmare": {
        "bits": 1100,
        "drops": [
          {
            "item": "Opal",
            "rate": 20
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 150,
          "LUK": 70,
          "MGC": 240,
          "PWR": 250,
          "SKL": 60,
          "SPD": 90,
          "lvl": 32
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Seek Valley": {
    "name": "Seek Valley",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 Ivy",
        "parseString": "1 Ivy" },
      { "name": "2 Ivy",
        "parseString": "2 Ivy" },
      { "name": "3 Ivy",
        "parseString": "3 Ivy" },
      { "name": "1 RockBuster",
        "parseString": "1 RockBuster" },
      { "name": "2 RockBuster",
        "parseString": "2 RockBuster" },
      { "name": "3 RockBuster",
        "parseString": "3 RockBuster" },
      { "name": "1 Wyvern",
        "parseString": "1 Wyvern" },
      { "name": "1 QueenAnt",
        "parseString": "1 QueenAnt" },
      { "name": "2 Ivy 1 RockBuster",
        "parseString": "2 Ivy 1 RockBuster" },
      { "name": "2 Ivy 1 Wyvern",
        "parseString": "2 Ivy 1 Wyvern" },
      { "name": "2 RockBuster 1 QueenAnt",
        "parseString": "2 RockBuster 1 QueenAnt" },
      { "name": "2 RockBuster 1 Wyvern",
        "parseString": "2 RockBuster 1 Wyvern" }],
    "enemies": {
      "Ivy": {
        "bits": 2000,
        "drops": [
          {
            "item": "HexDoll",
            "rate": 6
          },
          {
            "item": "PeeingBoy",
            "rate": 6
          },
          {
            "item": "KnightStatue",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 80,
          "HP": 250,
          "LUK": 25,
          "MGC": 170,
          "PWR": 290,
          "SKL": 70,
          "SPD": 110,
          "lvl": 49
        }
      },
      "QueenAnt": {
        "bits": 6500,
        "drops": [
          {
            "item": "SilverHat",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 80,
          "HP": 800,
          "LUK": 60,
          "MGC": 270,
          "PWR": 310,
          "SKL": 60,
          "SPD": 110,
          "lvl": 52
        }
      },
      "RockBuster": {
        "bits": 2500,
        "drops": [
          {
            "item": "TaikiokuWear",
            "rate": 10
          },
          {
            "item": "MegaMedicinex3",
            "rate": 15
          }
        ],
        "stats": {
          "DEF": 90,
          "HP": 600,
          "LUK": 39,
          "MGC": 240,
          "PWR": 300,
          "SKL": 75,
          "SPD": 80,
          "lvl": 51
        }
      },
      "Wyvern": {
        "bits": 5500,
        "drops": [
          {
            "item": "PowerGloves",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 85,
          "HP": 1000,
          "LUK": 75,
          "MGC": 260,
          "PWR": 320,
          "SKL": 110,
          "SPD": 120,
          "lvl": 53
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Seika": {
    "name": "Seika",
    "encounterRate": 0,
    "encounters": [],
    "enemies": {
      "EmpireSoldier": {
        "bits": 200,
        "drops": [
          {
            "item": "FailureUrn",
            "rate": 6
          },
          {
            "item": "Vase",
            "rate": 5
          },
          {
            "item": "BlueDragonUrn",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 11,
          "HP": 68,
          "LUK": 24,
          "MGC": 16,
          "PWR": 70,
          "SKL": 55,
          "SPD": 28,
          "lvl": 13
        }
      }
    },
    "areaType": null
  },
  "Seika Area": {
    "name": "Seika Area",
    "encounterRate": 8,
    "encounters": [
      { "name": "3 FlyingSquirrel 1 BeastCommander ",
        "parseString": "3 FlyingSquirrel 1 BeastCommander " },
      { "name": "2 FlyingSquirrel",
        "parseString": "2 FlyingSquirrel" },
      { "name": "6 FlyingSquirrel",
        "parseString": "6 FlyingSquirrel" },
      { "name": "1 Roc",
        "parseString": "1 Roc" },
      { "name": "6 KillerRabbit",
        "parseString": "6 KillerRabbit" },
      { "name": "2 Roc",
        "parseString": "2 Roc" },
      { "name": "3 KillerRabbit 1 BeastCommander",
        "parseString": "3 KillerRabbit 1 BeastCommander" },
      { "name": "3 FlyingSquirrel 2 KillerRabbit 1 BeastCommander",
        "parseString": "3 FlyingSquirrel 2 KillerRabbit 1 BeastCommander" }],
    "enemies": {
      "BeastCommander": {
        "bits": 200,
        "drops": [
          {
            "item": "BlueRibbon",
            "rate": 9
          },
          {
            "item": "PheroRune",
            "rate": 3
          }
        ],
        "stats": {
          "DEF": 40,
          "HP": 90,
          "LUK": 60,
          "MGC": 35,
          "PWR": 60,
          "SKL": 30,
          "SPD": 70,
          "lvl": 13
        }
      },
      "FlyingSquirrel": {
        "bits": 100,
        "drops": [
          {
            "item": "HolyRune",
            "rate": 5
          }
        ],
        "stats": {
          "DEF": 25,
          "HP": 90,
          "LUK": 30,
          "MGC": 9,
          "PWR": 99,
          "SKL": 40,
          "SPD": 35,
          "lvl": 11
        }
      },
      "KillerRabbit": {
        "bits": 80,
        "drops": [
          {
            "item": "HexDoll",
            "rate": 6
          },
          {
            "item": "JapaneseDish",
            "rate": 6
          },
          {
            "item": "PeeingBoy",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 15,
          "HP": 60,
          "LUK": 7,
          "MGC": 7,
          "PWR": 90,
          "SKL": 30,
          "SPD": 29,
          "lvl": 10
        }
      },
      "Roc": {
        "bits": 70,
        "drops": [
          {
            "item": "Feather",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 110,
          "LUK": 20,
          "MGC": 16,
          "PWR": 125,
          "SKL": 55,
          "SPD": 60,
          "lvl": 14
        }
      }
    },
    "areaType": "World Map"
  },
  "Shasarazade Fortress": {
    "name": "Shasarazade Fortress",
    "encounterRate": 2,
    "encounters": [
      { "name": "4 EliteSoldier",
        "parseString": "4 EliteSoldier" },
      { "name": "2 EliteSoldier",
        "parseString": "2 EliteSoldier" },
      { "name": "3 EliteSoldier",
        "parseString": "3 EliteSoldier" },
      { "name": "2 Siren",
        "parseString": "2 Siren" },
      { "name": "3 Siren",
        "parseString": "3 Siren" },
      { "name": "4 Siren",
        "parseString": "4 Siren" },
      { "name": "1 Kerberos",
        "parseString": "1 Kerberos" }],
    "enemies": {
      "EliteSoldier": {
        "bits": 3500,
        "drops": [
          {
            "item": "HornedHelmet",
            "rate": 10
          },
          {
            "item": "MegaMedicinex3",
            "rate": 12
          }
        ],
        "stats": {
          "DEF": 120,
          "HP": 550,
          "LUK": 100,
          "MGC": 180,
          "PWR": 360,
          "SKL": 130,
          "SPD": 130,
          "lvl": 54
        }
      },
      "Kerberos": {
        "bits": 4000,
        "drops": [
          {
            "item": "GoldNecklace",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 70,
          "HP": 900,
          "LUK": 60,
          "MGC": 160,
          "PWR": 370,
          "SKL": 150,
          "SPD": 180,
          "lvl": 55
        }
      },
      "Siren": {
        "bits": 6000,
        "drops": [
          {
            "item": "SoundSetting#3",
            "rate": 18
          },
          {
            "item": "FlowingRune",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 300,
          "LUK": 80,
          "MGC": 210,
          "PWR": 260,
          "SKL": 70,
          "SPD": 90,
          "lvl": 53
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Soniere Prison": {
    "name": "Soniere Prison",
    "encounterRate": 2,
    "encounters": [
      { "name": "1 Delf 1 Viperman",
        "parseString": "1 Delf 1 Viperman" },
      { "name": "3 Delf 1 Viperman",
        "parseString": "3 Delf 1 Viperman" },
      { "name": "1 RedSlime",
        "parseString": "1 RedSlime" },
      { "name": "3 RedSlime",
        "parseString": "3 RedSlime" },
      { "name": "3 RedSlime 2 Nightmare",
        "parseString": "3 RedSlime 2 Nightmare" },
      { "name": "1 Nightmare",
        "parseString": "1 Nightmare" },
      { "name": "3 Nightmare",
        "parseString": "3 Nightmare" },
      { "name": "3 RedSlime 1 Nightmare",
        "parseString": "3 RedSlime 1 Nightmare" }],
    "enemies": {
      "Delf": {
        "bits": 0,
        "drops": [],
        "stats": {
          "DEF": 85,
          "HP": 150,
          "LUK": 30,
          "MGC": 40,
          "PWR": 180,
          "SKL": 30,
          "SPD": 30,
          "lvl": 25
        }
      },
      "Nightmare": {
        "bits": 1100,
        "drops": [
          {
            "item": "Opal",
            "rate": 20
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 150,
          "LUK": 70,
          "MGC": 240,
          "PWR": 250,
          "SKL": 60,
          "SPD": 90,
          "lvl": 32
        }
      },
      "RedSlime": {
        "bits": 400,
        "drops": [
          {
            "item": "HexDoll",
            "rate": 6
          },
          {
            "item": "ChineseDish",
            "rate": 6
          },
          {
            "item": "Bonsai",
            "rate": 2
          }
        ],
        "stats": {
          "DEF": 55,
          "HP": 150,
          "LUK": 45,
          "MGC": 60,
          "PWR": 225,
          "SKL": 50,
          "SPD": 60,
          "lvl": 27
        }
      },
      "VeteranSoldier(bow)": {
        "bits": 700,
        "drops": [
          {
            "item": "Emblem",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 45,
          "HP": 250,
          "LUK": 47,
          "MGC": 38,
          "PWR": 175,
          "SKL": 50,
          "SPD": 80,
          "lvl": 26
        }
      },
      "Viperman": {
        "bits": 900,
        "drops": [
          {
            "item": "Antitoxinx4",
            "rate": 13
          },
          {
            "item": "NinjaSuit",
            "rate": 9
          }
        ],
        "stats": {
          "DEF": 60,
          "HP": 200,
          "LUK": 56,
          "MGC": 55,
          "PWR": 203,
          "SKL": 45,
          "SPD": 70,
          "lvl": 30
        }
      }
    },
    "areaType": "Dungeon"
  },
  "Toran Lake Castle": {
    "name": "Toran Lake Castle",
    "encounterRate": 2,
    "encounters": [
    { "name": "2 Oannes",
      "parseString": "2 Oannes" },
    { "name": "3 Oannes",
      "parseString": "3 Oannes" },
    { "name": "2 GiantSlug",
      "parseString": "2 GiantSlug" },
    { "name": "3 GiantSlug",
      "parseString": "3 GiantSlug" },
    { "name": "1 GhostArmor",
      "parseString": "1 GhostArmor" },
    { "name": "3 GiantSlug 1 GhostArmor",
      "parseString": "3 GiantSlug 1 GhostArmor" },
    { "name": "3 Oannes 1 GhostArmor",
      "parseString": "3 Oannes 1 GhostArmor" }
    ],
    "enemies": {
      "GhostArmor": {
        "bits": 600,
        "drops": [
          {
            "item": "Brass Armor",
            "rate": 6
          }
        ],
        "stats": {
          "DEF": 30,
          "HP": 250,
          "LUK": 27,
          "MGC": 35,
          "PWR": 110,
          "SKL": 30,
          "SPD": 40,
          "lvl": 17
        }
      },
      "GiantSlug": {
        "bits": 250,
        "drops": [
          {
            "item": "Defense Rune Piece",
            "rate": 6
          },
          {
            "item": "Medicine x6",
            "rate": 8
          }
        ],
        "stats": {
          "DEF": 35,
          "HP": 120,
          "LUK": 26,
          "MGC": 15,
          "PWR": 95,
          "SKL": 35,
          "SPD": 22,
          "lvl": 15
        }
      },
      "Oannes": {
        "bits": 200,
        "drops": [
          {
            "item": "Antitoxin x4",
            "rate": 14
          }
        ],
        "stats": {
          "DEF": 30,
          "HP": 200,
          "LUK": 12,
          "MGC": 17,
          "PWR": 90,
          "SKL": 10,
          "SPD": 45,
          "lvl": 16
        }
      }
    },
    "areaType": "Dungeon"
  }
};
