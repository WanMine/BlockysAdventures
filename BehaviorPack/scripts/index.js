var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { world, system, StructureSaveMode, EntityComponentTypes, Direction, BlockPermutation, ItemStack } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";
function randomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const maxLevelSize = 15;
const levelThemes = {};
const themeList = ["Forest", "Desert"];
function initLevels() {
  levelThemes["Forest"] = new LevelTheme(
    "wan:0_bottom",
    "wan:0_ground_a",
    "wan:0_ground_b",
    "wan:0_wall_a",
    "wan:0_wall_b"
  );
  levelThemes["Desert"] = new LevelTheme(
    "wan:1_bottom",
    "wan:1_ground_a",
    "wan:1_ground_b",
    "wan:1_wall_a",
    "wan:1_wall_b"
  );
}
class LevelTheme {
  constructor(bottomBlockId, groundABlockId, groundBBlockId, wallABlockId, wallBBlockId) {
    __publicField(this, "bottomBlockId");
    __publicField(this, "groundABlockId");
    __publicField(this, "groundBBlockId");
    __publicField(this, "wallABlockId");
    __publicField(this, "wallBBlockId");
    this.bottomBlockId = bottomBlockId;
    this.groundABlockId = groundABlockId;
    this.groundBBlockId = groundBBlockId;
    this.wallABlockId = wallABlockId;
    this.wallBBlockId = wallBBlockId;
  }
}
class Level {
  constructor(name, theme, structureId) {
    __publicField(this, "name");
    __publicField(this, "theme");
    __publicField(this, "structureId");
    this.name = name;
    this.structureId = structureId;
    this.theme = theme;
  }
}
const defaultLevels = [
  "wan:t1",
  "wan:t2",
  "wan:t3",
  "wan:t4",
  "wan:t5",
  "wan:f1",
  "wan:f2",
  "wan:f3",
  "wan:f4",
  "wan:f5",
  "wan:m1",
  "wan:m2",
  "wan:m3",
  "wan:m4",
  "wan:m5"
];
const variantList = {
  "wan:0_ground_a": 0,
  "wan:0_ground_b": 1,
  "wan:1_ground_a": 2,
  "wan:1_ground_b": 3,
  "wan:glass_block": 4,
  "wan:redirect_block_up": 5,
  "wan:redirect_block_down": 6,
  "wan:redirect_block_left": 7,
  "wan:redirect_block_right": 8,
  "wan:spawn_block": 9,
  "wan:win_block": 10,
  "wan:stop_block": 11
};
const markVariantList = {
  "wan:0_wall_a": 0,
  "wan:0_wall_b": 1,
  "wan:1_wall_a": 2,
  "wan:1_wall_b": 3,
  "wan:tnt_u": 4,
  "minecraft:air": 4
};
const tpBackPos = { x: 0.5, y: 31, z: 0.5 };
function createTutorialGame(player) {
  let game = new Game({ x: 16.5, y: -2, z: 47.5 }, tpBackPos, player, `camera "${player.name}" set minecraft:free pos 16 15 57 facing 16 4 47`);
  let playPos = { x: 9, y: 0, z: 40 };
  let playCenterPos = { x: 16, y: 0, z: 47 };
  let templatePos = { x: 9, y: 0, z: 9 };
  let templateCenterPos = { x: 16, y: 0, z: 16 };
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Tutorial 1", "Forest", "wan:t1"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Tutorial 2", "Forest", "wan:t2"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Tutorial 3", "Forest", "wan:t3"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Tutorial 4", "Forest", "wan:t4"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Tutorial 5", "Forest", "wan:t5"));
  game.playLevels();
}
function createForestGame(player) {
  let game = new Game({ x: 16.5, y: -23, z: 47.5 }, tpBackPos, player, `camera "${player.name}" set minecraft:free pos 16 -6 57 facing 16 -17 47`);
  let playPos = { x: 9, y: -21, z: 40 };
  let playCenterPos = { x: 16, y: -21, z: 47 };
  let templatePos = { x: 9, y: -21, z: 9 };
  let templateCenterPos = { x: 16, y: -21, z: 16 };
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Forest 1", "Forest", "wan:f1"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Forest 2", "Forest", "wan:f2"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Forest 3", "Forest", "wan:f3"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Forest 4", "Forest", "wan:f4"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Forest 5", "Forest", "wan:f5"));
  game.playLevels();
}
function createDesertGame(player) {
  let game = new Game({ x: 16.5, y: -44, z: 47.5 }, tpBackPos, player, `camera "${player.name}" set minecraft:free pos 16 -27 57 facing 16 -38 47`);
  let playPos = { x: 9, y: -42, z: 40 };
  let playCenterPos = { x: 16, y: -42, z: 47 };
  let templatePos = { x: 9, y: -42, z: 9 };
  let templateCenterPos = { x: 16, y: -42, z: 16 };
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Desert 1", "Desert", "wan:m1"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Desert 2", "Desert", "wan:m2"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Desert 3", "Desert", "wan:m3"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Desert 4", "Desert", "wan:m4"));
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, new Level("Desert 5", "Desert", "wan:m5"));
  game.playLevels();
}
function createCommunityGame(player, level) {
  let game = new Game({ x: 16.5, y: -63, z: 64.5 }, tpBackPos, player, `camera "${player.name}" set minecraft:free pos 16 -48 57 facing 16 -59 47`);
  let playPos = { x: 9, y: -63, z: 40 };
  let playCenterPos = { x: 16, y: -63, z: 47 };
  let templatePos = { x: 9, y: -63, z: 9 };
  let templateCenterPos = { x: 16, y: -63, z: 16 };
  game.addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, level);
  game.playLevels();
}
let levels = [];
let editorTimerId = -1;
const startLogicEditorPos = { x: -17, y: 29, z: 1998 };
const startDesignEditorPos = { x: 3, y: 28, z: 1998 };
const templateLevelPos = { x: 9, y: -30, z: 1993 };
const templateLevelCenterPos = { x: 16, y: -30, z: 2e3 };
const playLevelPos = { x: 9, y: -9, z: 1993 };
const playLevelCenterPos = { x: 16, y: -9, z: 2e3 };
let themeGrid;
let blockGrid;
function initManager$1() {
  world.afterEvents.playerSpawn.subscribe((data) => {
    data.player.setDynamicProperty("currentlyEditingId", -1);
    data.player.setDynamicProperty("wan:view_area", false);
  });
  world.beforeEvents.playerLeave.subscribe((data) => {
    if (data.player.getDynamicProperty("currentlyEditingId") != -1) {
      stopEditingLevel(data.player, data.player.getDynamicProperty("currentlyEditingId"));
    }
  });
  world.afterEvents.entityLoad.subscribe((data) => {
    if (data.entity.typeId == "wan:theme_selector") {
      themeGrid = data.entity;
    } else if (data.entity.typeId == "wan:grid") {
      blockGrid = data.entity;
    }
  });
  system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
      let editorCenter = { x: -9, y: 31, z: 2018 };
      let previewCenter = { x: 10, y: 31, z: 2018 };
      let playerPos = player.location;
      if (playerPos.x >= editorCenter.x - 1.5 && playerPos.x <= editorCenter.x + 1.5 && playerPos.y >= editorCenter.y - 1.5 && playerPos.y <= editorCenter.y + 1.5 && playerPos.z >= editorCenter.z - 1.5 && playerPos.z <= editorCenter.z + 1.5) {
        if (player.getDynamicProperty("wan:view_area") == false) {
          player.setDynamicProperty("wan:view_area", true);
          player.dimension.runCommand(`camera "${player.name}" set minecraft:free ease 1 in_out_sine pos -10 45 2008 facing -10 28 2005`);
        }
      } else if (playerPos.x >= previewCenter.x - 1.5 && playerPos.x <= previewCenter.x + 1.5 && playerPos.y >= previewCenter.y - 1.5 && playerPos.y <= previewCenter.y + 1.5 && playerPos.z >= previewCenter.z - 1.5 && playerPos.z <= previewCenter.z + 1.5) {
        if (player.getDynamicProperty("wan:view_area") == false) {
          player.setDynamicProperty("wan:view_area", true);
          player.dimension.runCommand(`camera "${player.name}" set minecraft:free ease 1 in_out_sine pos 10 41 2015 facing 10 30 2005`);
        }
      } else {
        if (player.getDynamicProperty("wan:view_area") == true) {
          player.setDynamicProperty("wan:view_area", false);
          player.dimension.runCommand(`camera "${player.name}" clear`);
        }
      }
    });
  }, 1);
}
function saveLevel(player, level, dimension, callback, savePos = startLogicEditorPos, bypassCheck = false) {
  if (!bypassCheck && !canPlayLevel(player)) {
    return;
  }
  system.run(() => {
    if (world.structureManager.get(level.structureId) != void 0) {
      deleteLevel(level.structureId);
    }
    world.structureManager.createFromWorld(
      level.structureId,
      dimension,
      savePos,
      {
        x: savePos.x + maxLevelSize - 1,
        y: savePos.y,
        z: savePos.z + maxLevelSize - 1
      },
      {
        includeBlocks: true,
        includeEntities: true,
        saveMode: StructureSaveMode.World
      }
    );
    player.sendMessage("Level saved!");
    callback();
  });
}
function deleteLevel(levelId) {
  world.structureManager.delete(levelId);
}
function loadLevels() {
  levels = [];
  let ids = world.structureManager.getWorldStructureIds();
  ids.forEach((id) => {
    if (!defaultLevels.includes(id)) {
      let strs = id.replace("wan:", "").split("_");
      for (let i = 0; i < strs.length; i++) {
        let str = strs[i];
        strs[i] = str[0].toUpperCase() + str.substring(1);
      }
      let name = strs[0];
      if (strs.length > 2) {
        for (let i = 1; i < strs.length - 1; i++) {
          name += " " + strs[i];
        }
      }
      let theme = strs[strs.length - 1];
      levels.push(new Level(name, theme, id));
    }
  });
}
function changeTheme$1(player, levelId, newTheme) {
  stopEditingLevel(player, levelId);
  system.runTimeout(() => {
    let level = levels.splice(levelId, 1)[0];
    placeLevelInstant(level.structureId, player.dimension, startLogicEditorPos);
    deleteLevel(level.structureId);
    system.runTimeout(() => {
      let newLevelId = `wan:${level.name.toLowerCase().replaceAll(" ", "_")}_${newTheme.toLowerCase()}`;
      let newLevel = new Level(level.name, newTheme, newLevelId);
      saveLevel(player, newLevel, player.dimension, () => {
        let id = levels.push(newLevel);
        startEditingLevel(player, id - 1);
      });
    }, 2);
  }, 2);
}
function placeDecorationBlocks(dimension, level, logicStartPos, designStartPos) {
  for (let x = 0; x < maxLevelSize; x++) {
    for (let z = 0; z < maxLevelSize; z++) {
      let logicPos = getPositionFromIndex(logicStartPos, x, z);
      let designPos = getPositionFromIndex(designStartPos == void 0 ? { x: logicStartPos.x, y: logicStartPos.y + 2, z: logicStartPos.z } : designStartPos, x, z);
      let logicBlockId = dimension.getBlock(logicPos).typeId;
      let currentFloorBlockId;
      let inverted = z % 2 == 0;
      if (x % 2 == 0 && !inverted || x % 2 != 0 && inverted) {
        currentFloorBlockId = levelThemes[level.theme].groundABlockId;
      } else {
        currentFloorBlockId = levelThemes[level.theme].groundBBlockId;
      }
      let currUnderFloorBlock = levelThemes[level.theme].bottomBlockId;
      let designTopPos = {
        x: designPos.x,
        y: designPos.y + 2,
        z: designPos.z
      };
      if (logicBlockId == "wan:redirect_block_up") {
        placeRotatingColumn(dimension, designPos, Direction.North, "wan:redirect_base_u", "wan:redirect_u", "minecraft:air");
      } else if (logicBlockId == "wan:redirect_block_down") {
        placeRotatingColumn(dimension, designPos, Direction.South, "wan:redirect_base_u", "wan:redirect_u", "minecraft:air");
      } else if (logicBlockId == "wan:redirect_block_left") {
        placeRotatingColumn(dimension, designPos, Direction.West, "wan:redirect_base_u", "wan:redirect_u", "minecraft:air");
      } else if (logicBlockId == "wan:redirect_block_right") {
        placeRotatingColumn(dimension, designPos, Direction.East, "wan:redirect_base_u", "wan:redirect_u", "minecraft:air");
      } else if (logicBlockId == "wan:stop_block") {
        placeColumn(dimension, designPos, "wan:stop_block_base_u", "wan:stop_block_u", "minecraft:air");
      } else if (logicBlockId == "wan:spawn_block") {
        placeColumn(dimension, designPos, "wan:spawn_block_base_u", "wan:spawn_block_u", "minecraft:air");
      } else if (logicBlockId == "wan:wall_block") {
        placeColumn(dimension, designPos, currUnderFloorBlock, currentFloorBlockId);
        let block = dimension.getBlock(designTopPos).typeId;
        let wallId;
        if (randomInterval(0, 1) == 1) {
          wallId = levelThemes[level.theme].wallABlockId;
        } else {
          wallId = levelThemes[level.theme].wallBBlockId;
        }
        if (!block.includes(wallId.replace("_a", "").replace("_b", ""))) {
          dimension.setBlockType(designTopPos, wallId);
        }
      } else if (logicBlockId == "wan:wall_block_1") {
        placeColumn(dimension, designPos, currUnderFloorBlock, currentFloorBlockId);
        dimension.setBlockType(designTopPos, levelThemes[level.theme].wallABlockId);
      } else if (logicBlockId == "wan:wall_block_2") {
        placeColumn(dimension, designPos, currUnderFloorBlock, currentFloorBlockId);
        dimension.setBlockType(designTopPos, levelThemes[level.theme].wallBBlockId);
      } else if (logicBlockId == "wan:win_block") {
        placeColumn(dimension, designPos, "wan:win_block_base_u", "wan:win_block_u", "minecraft:air");
      } else if (logicBlockId == "wan:dynamite_block") {
        placeColumn(dimension, designPos, currUnderFloorBlock, currentFloorBlockId, "wan:tnt_u");
      } else if (logicBlockId == "wan:glass_block") {
        placeColumn(dimension, designPos, "minecraft:air", "wan:glass_block_u", "minecraft:air");
      } else if (logicBlockId == "wan:normal_block") {
        placeColumn(dimension, designPos, currUnderFloorBlock, currentFloorBlockId, "minecraft:air");
      } else {
        placeColumn(dimension, designPos, "minecraft:air", "minecraft:air", "minecraft:air");
      }
    }
  }
}
function startEditingLevel(player, levelId) {
  player.setDynamicProperty("currentlyEditingId", levelId);
  let level = levels[levelId];
  let dimension = world.getDimension("overworld");
  if (world.structureManager.get(level.structureId) != void 0) {
    let structure = world.structureManager.get(level.structureId);
    world.structureManager.place(structure, dimension, startLogicEditorPos);
  }
  let inventory = player.getComponent(
    EntityComponentTypes.Inventory
  );
  inventory.container.clearAll();
  blockGrid.setProperty("wan:page", 0);
  let page = 0;
  switch (level.theme) {
    case "Forest":
      page = 0;
      break;
    case "Desert":
      page = 1;
      break;
  }
  themeGrid.setProperty("wan:page", page);
  editorTimerId = system.runInterval(() => {
    placeDecorationBlocks(dimension, level, startLogicEditorPos, startDesignEditorPos);
  }, 40);
}
function getPositionFromIndex(startPos, indexX, indexZ) {
  return { x: startPos.x + indexX, y: startPos.y, z: startPos.z + indexZ };
}
function placeColumn(dimension, position, typeIdL1, typeIdL2, typeIdL3) {
  dimension.setBlockType(position, typeIdL1);
  dimension.setBlockType(
    { x: position.x, y: position.y + 1, z: position.z },
    typeIdL2
  );
  if (typeIdL3 != void 0) {
    dimension.setBlockType(
      { x: position.x, y: position.y + 2, z: position.z },
      typeIdL3
    );
  }
}
function placeRotatingColumn(dimension, position, rotation, typeIdL1, typeIdL2, typeIdL3) {
  dimension.setBlockType(position, typeIdL1);
  dimension.setBlockPermutation(
    { x: position.x, y: position.y + 1, z: position.z },
    BlockPermutation.resolve(typeIdL2, {
      "minecraft:facing_direction": rotation.toLowerCase()
    })
  );
  {
    dimension.setBlockType(
      { x: position.x, y: position.y + 2, z: position.z },
      typeIdL3
    );
  }
}
function stopEditingLevel(player, levelId) {
  if (editorTimerId != -1) {
    system.clearRun(editorTimerId);
  }
  saveLevel(player, levels[levelId], player.dimension, () => {
    player.dimension.runCommand(`fill ${startLogicEditorPos.x} ${startLogicEditorPos.y} ${startLogicEditorPos.z} ${startLogicEditorPos.x + maxLevelSize - 1} ${startLogicEditorPos.y} ${startLogicEditorPos.z + maxLevelSize - 1} air`);
    player.dimension.runCommand(`fill ${startDesignEditorPos.x} ${startDesignEditorPos.y} ${startDesignEditorPos.z} ${startDesignEditorPos.x + maxLevelSize - 1} ${startDesignEditorPos.y + 2} ${startDesignEditorPos.z + maxLevelSize - 1} air`);
    player.setDynamicProperty("currentlyEditingId", -1);
    let inventory = player.getComponent(
      EntityComponentTypes.Inventory
    );
    if (inventory.container == void 0) {
      return;
    }
    inventory.container.clearAll();
  });
}
function canPlayLevel(player) {
  let spawnBlockCount = 0;
  let winBlockCount = 0;
  for (let x = 0; x < maxLevelSize; x++) {
    for (let z = 0; z < maxLevelSize; z++) {
      let logicPos = getPositionFromIndex(startLogicEditorPos, x, z);
      let logicBlockId = player.dimension.getBlock(logicPos).typeId;
      if (logicBlockId == "wan:spawn_block") {
        spawnBlockCount++;
      } else if (logicBlockId == "wan:win_block") {
        winBlockCount++;
      }
    }
  }
  if (spawnBlockCount == 0) {
    player.sendMessage("Level must have at least one spawn block!");
    return false;
  } else if (spawnBlockCount > 1) {
    player.sendMessage("Level must have only one spawn block!");
    return false;
  } else if (winBlockCount == 0) {
    player.sendMessage("Level must have at least one win block!");
    return false;
  }
  return true;
}
function playLevel(player, levelId) {
  if (player.getDynamicProperty("currentlyEditingId") != -1) {
    let level = levels[levelId];
    let cameraCmd = `camera "${player.name}" set minecraft:free pos 16 6 2010 facing 16 -5 2000`;
    saveLevel(player, level, player.dimension, () => {
    });
    system.runTimeout(() => {
      let game = new Game({ x: 16.5, y: -11, z: 2000.5 }, { x: 16.5, y: 31, z: 2018.5 }, player, cameraCmd);
      game.addGameInstance(playLevelPos, playLevelCenterPos, templateLevelPos, templateLevelCenterPos, level);
      game.playLevels();
    }, 2);
  } else {
    player.sendMessage("You must be editing a level to play it!");
  }
}
function placeLevelInstant(levelId, dimension, pos) {
  world.structureManager.place(levelId, dimension, pos);
}
function tpPlayerToEditor(player, arcadePos) {
  startArcadeCamera(player, arcadePos, () => {
    player.dimension.runCommand(`camera "${player.name}" set minecraft:first_person`);
    player.dimension.runCommand(`effect "${player.name}" clear`);
    player.teleport({ x: 0.5, y: 31, z: 2018.5 }, { keepVelocity: false, rotation: { x: 0, y: 180 } });
  });
}
function tpPlayerToLobby(player, arcadePos) {
  startArcadeCamera(player, arcadePos, () => {
    player.dimension.runCommand(`camera "${player.name}" set minecraft:first_person`);
    player.dimension.runCommand(`effect "${player.name}" clear`);
    player.teleport({ x: 0, y: 31, z: 0 }, { keepVelocity: false, rotation: { x: 0, y: 180 } });
  });
}
function isAnotherPlayerEditing() {
  world.getAllPlayers().forEach((player) => {
    if (player.getDynamicProperty("currentlyEditingId") != -1) {
      return true;
    }
  });
  return false;
}
function openMainMenu(player, arcadePos, playLevelCallback) {
  loadLevels();
  let form = new ActionFormData();
  form.title("Level Menu");
  form.button("Create New");
  form.button("Import");
  form.button("Levels");
  form.show(player).then((r) => {
    if (r.canceled) return;
    let response = r.selection;
    if (response == 0) {
      if (isAnotherPlayerEditing()) ;
      else {
        openLevelCreatorMenu(player, arcadePos);
      }
    } else if (response == 1) {
      if (isAnotherPlayerEditing()) ;
      else {
        openImportMenu(player);
      }
    } else if (response == 2) {
      openLevelsMenu(player, arcadePos, playLevelCallback);
    }
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
function openLevelsMenu(player, arcadePos, playLevelCallback) {
  loadLevels();
  let form = new ActionFormData();
  form.title("Levels");
  form.button("Back");
  levels.forEach((level) => {
    form.button(level.name);
  });
  form.show(player).then((r) => {
    if (r.canceled) return;
    let response = r.selection;
    if (response == 0) {
      openMainMenu(player, arcadePos, playLevelCallback);
    } else {
      openLevelMenu(player, response - 1, arcadePos, playLevelCallback);
    }
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
function openLevelEditorMenu(player, arcadePos) {
  let form = new ActionFormData();
  form.title("Level Editor");
  form.button("Play");
  form.button("Save");
  form.button("Share");
  form.button("Exit Editor");
  form.show(player).then((r) => {
    if (r.canceled) return;
    switch (r.selection) {
      case 0:
        if (canPlayLevel(player)) {
          startArcadeCamera(player, arcadePos, () => {
          }, () => {
            playLevel(player, player.getDynamicProperty("currentlyEditingId"));
          });
        }
        break;
      case 1:
        saveLevel(player, levels[player.getDynamicProperty("currentlyEditingId")], player.dimension, () => {
        });
        break;
      case 2:
        if (canPlayLevel(player)) {
          exportLevel(player);
        }
        break;
      case 3:
        if (canPlayLevel(player)) {
          stopEditingLevel(player, player.getDynamicProperty("currentlyEditingId"));
          tpPlayerToLobby(player, arcadePos);
        }
        break;
    }
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
function openImportMenu(player) {
  let form = new ModalFormData();
  form.title("Import Level");
  form.textField("Level Name", "Level Name", "New Level");
  form.textField("Code Part 1", "Cannot be empty");
  form.textField("Code Part 2", "Can be empty");
  form.textField("Code Part 3", "Can be empty");
  form.dropdown("Level Theme", themeList);
  form.submitButton("Import");
  form.show(player).then((r) => {
    if (r.canceled) return;
    let [levelName, levelCodeP1, levelCodeP2, levelCodeP3, levelThemeId] = r.formValues;
    let levelTheme = themeList[levelThemeId];
    if (levelCodeP1 != "") {
      importLevel(levelName, levelCodeP1 + levelCodeP2 + levelCodeP3, levelTheme, player);
    }
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
const lettersMap = {
  "A": "minecraft:air",
  "B": "wan:spawn_block",
  "C": "wan:win_block",
  "D": "wan:normal_block",
  "E": "wan:wall_block",
  "F": "wan:wall_block_1",
  "G": "wan:wall_block_2",
  "H": "wan:glass_block",
  "I": "wan:dynamite_block",
  "J": "wan:stop_block",
  "K": "wan:redirect_block_up",
  "L": "wan:redirect_block_down",
  "M": "wan:redirect_block_left",
  "N": "wan:redirect_block_right"
};
const blocksMap = Object.fromEntries(
  Object.entries(lettersMap).map(([key, value]) => [value, key])
);
function importLevel(levelName, levelCode, levelTheme, player) {
  let nChar = "";
  let oldJ = 0;
  let savePos = { x: 9, y: 18, z: 9 };
  for (let i = 0; i < levelCode.length; i++) {
    let char = levelCode[i];
    if (!isNaN(parseInt(char))) {
      nChar += char;
    } else {
      let finalNum = nChar == "" ? 1 : parseInt(nChar);
      nChar = "";
      for (let j = oldJ; j < oldJ + finalNum; j++) {
        let blockId = lettersMap[char];
        if (blockId != void 0) {
          let z = j % maxLevelSize;
          let x = Math.floor(j / maxLevelSize);
          if (x < 0) {
            x = j;
          }
          player.dimension.setBlockType(getPositionFromIndex(savePos, x, z), blockId);
        } else {
          player.sendMessage("Invalid code!");
          return;
        }
      }
      oldJ += finalNum;
    }
  }
  let levelId = `wan:${levelName.toLowerCase().replaceAll(" ", "_")}_${levelTheme.toString().toLowerCase()}`;
  let id = levels.push(new Level(levelName, levelTheme, levelId));
  saveLevel(player, levels[id - 1], player.dimension, () => {
  }, savePos, true);
  player.sendMessage("Level imported successfully!");
}
function exportLevel(player) {
  let lastBlockId = "";
  let lastBlockCount = 0;
  let finalCode = "";
  for (let x = 0; x < maxLevelSize; x++) {
    for (let z = 0; z < maxLevelSize; z++) {
      let logicPos = getPositionFromIndex(startLogicEditorPos, x, z);
      let logicBlockId = player.dimension.getBlock(logicPos).typeId;
      if (logicBlockId != lastBlockId) {
        if (lastBlockId != "") {
          let newStr = "";
          if (lastBlockCount > 1) {
            newStr = `${lastBlockCount}`;
          }
          newStr = `${newStr}${blocksMap[lastBlockId]}`;
          finalCode = `${finalCode}${newStr}`;
        }
        lastBlockCount = 1;
        lastBlockId = logicBlockId;
      } else {
        lastBlockCount++;
      }
    }
  }
  let form = new ModalFormData();
  form.title("Share Code");
  form.textField("Code Part 1", "", finalCode.slice(0, 100));
  form.textField("Code Part 2", "", finalCode.slice(100, 200));
  form.textField("Code Part 3", "", finalCode.slice(200));
  form.show(player);
}
function openLevelCreatorMenu(player, arcadePos) {
  let form = new ModalFormData();
  form.title("Level Creation");
  form.textField("Level Name", "Level Name", "New Level");
  form.dropdown("Level Theme", themeList);
  form.submitButton("Create");
  form.show(player).then((r) => {
    if (r.canceled) return;
    let [levelName, levelThemeId] = r.formValues;
    let levelTheme = themeList[levelThemeId];
    let levelId = `wan:${levelName.toLowerCase().replaceAll(" ", "_")}_${levelTheme.toString().toLowerCase()}`;
    let id = levels.push(new Level(levelName, levelTheme, levelId));
    tpPlayerToEditor(player, arcadePos);
    startEditingLevel(player, id - 1);
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
function openLevelMenu(player, id, arcadePos, playLevelCallback) {
  let form = new ActionFormData();
  form.title("Edit Level");
  form.button("Play");
  form.button("Edit");
  form.button("Delete");
  form.show(player).then((r) => {
    if (r.canceled) return;
    let response = r.selection;
    switch (response) {
      case 0:
        playLevelCallback(levels[id]);
        break;
      case 1:
        if (isAnotherPlayerEditing()) ;
        else {
          tpPlayerToEditor(player, arcadePos);
          startEditingLevel(player, id);
        }
        break;
      case 2:
        if (isAnotherPlayerEditing()) ;
        else {
          openDeleteConfirmationMenu(player, id);
        }
        break;
    }
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
function openDeleteConfirmationMenu(player, id) {
  let form = new MessageFormData();
  form.title("Level Delete Confirmation");
  form.body(
    "Are you sure you want to delete this level: " + levels[id].name + "?"
  );
  form.button1("Cancel");
  form.button2("Confirm");
  form.show(player).then((r) => {
    if (r.canceled || r.selection == 0) {
      return;
    }
    deleteLevel(levels[id].structureId);
  }).catch((e) => {
    console.error(e, e.stack);
  });
}
var PlayerMoveDirection = /* @__PURE__ */ ((PlayerMoveDirection2) => {
  PlayerMoveDirection2[PlayerMoveDirection2["UP"] = 0] = "UP";
  PlayerMoveDirection2[PlayerMoveDirection2["DOWN"] = 1] = "DOWN";
  PlayerMoveDirection2[PlayerMoveDirection2["LEFT"] = 2] = "LEFT";
  PlayerMoveDirection2[PlayerMoveDirection2["RIGHT"] = 3] = "RIGHT";
  return PlayerMoveDirection2;
})(PlayerMoveDirection || {});
class GameInstance {
  constructor() {
    //-------------------------------- Game --------------------------------
    __publicField(this, "instanceId", -1);
    __publicField(this, "startLocation", { x: 0, y: 0, z: 0 });
    __publicField(this, "playCenter", { x: 0, y: 0, z: 0 });
    __publicField(this, "templatePos", { x: 0, y: 0, z: 0 });
    __publicField(this, "templateCenter", { x: 0, y: 0, z: 0 });
    __publicField(this, "gameDimension");
    __publicField(this, "startGameInstance");
    __publicField(this, "hasNextLevel", false);
    __publicField(this, "cameraCmd", "");
    __publicField(this, "game");
    //------------------------------- Player -------------------------------
    __publicField(this, "playerSelected");
    // Movement
    __publicField(this, "bufferedMovements", []);
    __publicField(this, "priorityBufferedMovements", []);
    //------------------------------- Entity -------------------------------
    __publicField(this, "pawn");
    // Movement
    __publicField(this, "currentMoveDir");
    // Positions
    __publicField(this, "lasUpdatedPos", { x: 0, y: 0, z: 0 });
    __publicField(this, "stopPos", { x: 0, y: 0, z: 0 });
    // Animations
    __publicField(this, "isMoving", false);
    __publicField(this, "isOnCooldown", false);
    __publicField(this, "isStopped", false);
    __publicField(this, "isSleeping", false);
    __publicField(this, "canStopSleep", false);
    __publicField(this, "shouldPlayHit", false);
    // Timers
    __publicField(this, "idleSleepTimerId", -1);
    __publicField(this, "idleTimerId", -1);
    __publicField(this, "hitTimerId", -1);
    // Callbacks
    __publicField(this, "onDelete");
  }
  //------------------------------- Logic --------------------------------
  init(game, startGameInstance, cameraCmd, player, onDelete, hasNextLevel, isRestarting = false) {
    this.startLocation = startGameInstance.playPos;
    this.playCenter = startGameInstance.playCenterPos;
    this.templatePos = startGameInstance.templatePos;
    this.templateCenter = startGameInstance.templateCenterPos;
    this.gameDimension = player.dimension;
    this.startGameInstance = startGameInstance;
    this.hasNextLevel = hasNextLevel;
    this.cameraCmd = cameraCmd;
    this.game = game;
    this.playerSelected = player;
    this.bufferedMovements = [];
    this.priorityBufferedMovements = [];
    this.pawn = void 0;
    this.currentMoveDir = void 0;
    this.lasUpdatedPos = { x: 0, y: 0, z: 0 };
    this.stopPos = { x: 0, y: 0, z: 0 };
    this.isMoving = false;
    this.isOnCooldown = false;
    this.isStopped = false;
    this.isSleeping = false;
    this.canStopSleep = false;
    this.shouldPlayHit = false;
    this.onDelete = onDelete;
    if (!isRestarting) {
      placeLevelInstant(this.startGameInstance.level.structureId, this.gameDimension, this.templatePos);
      placeDecorationBlocks(this.gameDimension, this.startGameInstance.level, this.templatePos);
      this.gameDimension.runCommand(this.cameraCmd);
      system.runTimeout(() => this.spawnLevel(), 2);
    } else {
      placeLevelInstant(this.startGameInstance.level.structureId, this.gameDimension, this.startLocation);
      placeDecorationBlocks(this.gameDimension, this.startGameInstance.level, this.startLocation);
      system.runTimeout(() => this.postInit(), 2);
    }
  }
  spawnLevel() {
    for (let i = 0; i <= (maxLevelSize - 1) / 2; i++) {
      system.runTimeout(() => {
        let columnList = [];
        for (let x = 0; x < i * 2 + 1; x++) {
          let templatePosUp = { x: this.templateCenter.x + x - i, y: this.templateCenter.y, z: this.templateCenter.z + i };
          let templatePosDown = { x: this.templateCenter.x + x - i, y: this.templateCenter.y, z: this.templateCenter.z - i };
          let playPosUp = { x: this.playCenter.x + x - i, y: this.playCenter.y, z: this.playCenter.z + i };
          let playPosDown = { x: this.playCenter.x + x - i, y: this.playCenter.y, z: this.playCenter.z - i };
          let upEnt = this.summonBlock("wan:spawn_falling_block", templatePosUp, playPosUp);
          if (upEnt) {
            columnList.push(upEnt);
          }
          let downEnt = this.summonBlock("wan:spawn_falling_block", templatePosDown, playPosDown);
          if (downEnt) {
            columnList.push(downEnt);
          }
        }
        for (let z = 1; z < i * 2; z++) {
          let templatePosUp = { x: this.templateCenter.x + i, y: this.templateCenter.y, z: this.templateCenter.z + z - i };
          let templatePosDown = { x: this.templateCenter.x - i, y: this.templateCenter.y, z: this.templateCenter.z + z - i };
          let playPosUp = { x: this.playCenter.x + i, y: this.playCenter.y, z: this.playCenter.z + z - i };
          let playPosDown = { x: this.playCenter.x - i, y: this.playCenter.y, z: this.playCenter.z + z - i };
          let upEnt = this.summonBlock("wan:spawn_falling_block", templatePosUp, playPosUp);
          if (upEnt) {
            columnList.push(upEnt);
          }
          let downEnt = this.summonBlock("wan:spawn_falling_block", templatePosDown, playPosDown);
          if (downEnt) {
            columnList.push(downEnt);
          }
        }
        system.runTimeout(() => {
          this.gameDimension.runCommand(`clone ${this.templateCenter.x - i} ${this.templateCenter.y} ${this.templateCenter.z - i} ${this.templateCenter.x + i} ${this.templateCenter.y + 4} ${this.templateCenter.z - i} ${this.playCenter.x - i} ${this.playCenter.y} ${this.playCenter.z - i}`);
          this.gameDimension.runCommand(`clone ${this.templateCenter.x - i} ${this.templateCenter.y} ${this.templateCenter.z + i} ${this.templateCenter.x + i} ${this.templateCenter.y + 4} ${this.templateCenter.z + i} ${this.playCenter.x - i} ${this.playCenter.y} ${this.playCenter.z + i}`);
          this.gameDimension.runCommand(`clone ${this.templateCenter.x - i} ${this.templateCenter.y} ${this.templateCenter.z - i} ${this.templateCenter.x - i} ${this.templateCenter.y + 4} ${this.templateCenter.z + i} ${this.playCenter.x - i} ${this.playCenter.y} ${this.playCenter.z - i}`);
          this.gameDimension.runCommand(`clone ${this.templateCenter.x + i} ${this.templateCenter.y} ${this.templateCenter.z - i} ${this.templateCenter.x + i} ${this.templateCenter.y + 4} ${this.templateCenter.z + i} ${this.playCenter.x + i} ${this.playCenter.y} ${this.playCenter.z - i}`);
          system.runTimeout(() => {
            columnList.forEach((ent) => {
              ent.remove();
            });
          }, 1);
        }, 14);
        if (i == (maxLevelSize - 1) / 2) {
          system.runTimeout(() => this.postInit(), 15);
        }
      }, i * 2);
    }
  }
  killLevel(endCallback) {
    for (let i = 0; i <= (maxLevelSize - 1) / 2; i++) {
      system.runTimeout(() => {
        let columnList = [];
        for (let x = 0; x < i * 2 + 1; x++) {
          let playPosUp = { x: this.playCenter.x + x - i, y: this.playCenter.y, z: this.playCenter.z + i };
          let playPosDown = { x: this.playCenter.x + x - i, y: this.playCenter.y, z: this.playCenter.z - i };
          let upEnt = this.summonBlock("wan:dead_falling_block", playPosUp, playPosUp);
          if (upEnt) {
            columnList.push(upEnt);
          }
          let downEnt = this.summonBlock("wan:dead_falling_block", playPosDown, playPosDown);
          if (downEnt) {
            columnList.push(downEnt);
          }
        }
        for (let z = 1; z < i * 2; z++) {
          let playPosUp = { x: this.playCenter.x + i, y: this.playCenter.y, z: this.playCenter.z + z - i };
          let playPosDown = { x: this.playCenter.x - i, y: this.playCenter.y, z: this.playCenter.z + z - i };
          let upEnt = this.summonBlock("wan:dead_falling_block", playPosUp, playPosUp);
          if (upEnt) {
            columnList.push(upEnt);
          }
          let downEnt = this.summonBlock("wan:dead_falling_block", playPosDown, playPosDown);
          if (downEnt) {
            columnList.push(downEnt);
          }
        }
        this.gameDimension.runCommand(`fill ${this.playCenter.x - i} ${this.playCenter.y} ${this.playCenter.z - i} ${this.playCenter.x + i} ${this.playCenter.y + 4} ${this.playCenter.z - i} air`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x - i} ${this.playCenter.y} ${this.playCenter.z + i} ${this.playCenter.x + i} ${this.playCenter.y + 4} ${this.playCenter.z + i} air`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x - i} ${this.playCenter.y} ${this.playCenter.z - i} ${this.playCenter.x - i} ${this.playCenter.y + 4} ${this.playCenter.z + i} air`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x + i} ${this.playCenter.y} ${this.playCenter.z - i} ${this.playCenter.x + i} ${this.playCenter.y + 4} ${this.playCenter.z + i} air`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x - i} ${this.playCenter.y + 1} ${this.playCenter.z - i} ${this.playCenter.x + i} ${this.playCenter.y + 1} ${this.playCenter.z - i} wan:black_block_u`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x - i} ${this.playCenter.y + 1} ${this.playCenter.z + i} ${this.playCenter.x + i} ${this.playCenter.y + 1} ${this.playCenter.z + i} wan:black_block_u`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x - i} ${this.playCenter.y + 1} ${this.playCenter.z - i} ${this.playCenter.x - i} ${this.playCenter.y + 1} ${this.playCenter.z + i} wan:black_block_u`);
        this.gameDimension.runCommand(`fill ${this.playCenter.x + i} ${this.playCenter.y + 1} ${this.playCenter.z - i} ${this.playCenter.x + i} ${this.playCenter.y + 1} ${this.playCenter.z + i} wan:black_block_u`);
        system.runTimeout(() => {
          columnList.forEach((ent) => {
            this.gameDimension.runCommand(`fill ${this.templateCenter.x - (maxLevelSize - 1) / 2} ${this.templateCenter.y} ${this.templateCenter.z - (maxLevelSize - 1) / 2} ${this.templateCenter.x + (maxLevelSize - 1) / 2} ${this.templateCenter.y} ${this.templateCenter.z + (maxLevelSize - 1) / 2} air`);
            this.gameDimension.runCommand(`fill ${this.templateCenter.x - (maxLevelSize - 1) / 2} ${this.templateCenter.y + 2} ${this.templateCenter.z - (maxLevelSize - 1) / 2} ${this.templateCenter.x + (maxLevelSize - 1) / 2} ${this.templateCenter.y + 4} ${this.templateCenter.z + (maxLevelSize - 1) / 2} air`);
            ent.remove();
          });
        }, 15);
        if (i == (maxLevelSize - 1) / 2) {
          system.runTimeout(() => {
            endCallback();
          }, 15);
        }
      }, i * 2);
    }
  }
  summonBlock(entityId, templatePos, playPos) {
    let blockId = this.gameDimension.getBlock(templatePos).typeId;
    if (blockId == "minecraft:air") {
      return void 0;
    }
    let entity = this.gameDimension.spawnEntity(entityId, { x: playPos.x + 0.5, y: playPos.y + 2, z: playPos.z + 0.5 });
    let variantId = 0;
    let markVariantId = 0;
    if (blockId.includes("wall") || blockId.includes("normal") || blockId.includes("dynamite")) {
      let localWallBlockId = this.gameDimension.getBlock({ x: templatePos.x, y: templatePos.y + 4, z: templatePos.z }).typeId;
      let localGroundBlockId = this.gameDimension.getBlock({ x: templatePos.x, y: templatePos.y + 3, z: templatePos.z }).typeId;
      variantId = variantList[localGroundBlockId];
      markVariantId = markVariantList[localWallBlockId];
    } else {
      variantId = variantList[blockId];
      markVariantId = markVariantList["minecraft:air"];
    }
    entity.setProperty("wan:pillar_block", variantId);
    entity.setProperty("wan:wall_block", markVariantId);
    return entity;
  }
  postInit() {
    for (var x = 0; x < maxLevelSize; x++) {
      for (var z = 0; z < maxLevelSize; z++) {
        let block = blockTypes[this.getBlockAtGrid({ x, y: z })];
        if (block.isStart) {
          this.pawn = this.gameDimension.spawnEntity("wan:pawn", {
            x: Math.floor(this.startLocation.x + Number.EPSILON) + x + 0.5,
            y: this.startLocation.y + 4,
            z: Math.floor(this.startLocation.z + Number.EPSILON) + z + 0.5
          });
          this.pawn.setRotation({ x: 0, y: 180 });
          this.pawn.setProperty("wan:is_spawning", true);
          this.isOnCooldown = true;
          system.runTimeout(() => {
            this.isOnCooldown = false;
            this.pawn.setProperty("wan:is_spawning", false);
            this.startIdleTimer();
          }, 40);
          continue;
        }
        let vanBlockLocation = {
          x: this.startLocation.x + x,
          y: this.startLocation.y + 4,
          z: this.startLocation.z + z
        };
        if (block instanceof ExplosiveGameBlock) {
          this.gameDimension.setBlockType(vanBlockLocation, "minecraft:air");
          this.gameDimension.spawnEntity("wan:tnt", {
            x: vanBlockLocation.x + 0.5,
            y: vanBlockLocation.y,
            z: vanBlockLocation.z + 0.5
          });
        }
      }
    }
  }
  addInput(moveDir) {
    this.bufferedMovements.push(moveDir);
  }
  checkShouldStop() {
    if (this.pawn != void 0 && this.currentMoveDir != void 0) {
      let pawnX = Math.floor((this.pawn.location.x + Number.EPSILON) * 10) / 10;
      let pawnZ = Math.floor((this.pawn.location.z + Number.EPSILON) * 10) / 10;
      if (this.currentMoveDir == 0) {
        return pawnZ <= this.stopPos.z + 0.15;
      } else if (this.currentMoveDir == 1) {
        return pawnZ >= this.stopPos.z - 0.15;
      } else if (this.currentMoveDir == 3) {
        return pawnX >= this.stopPos.x - 0.15;
      } else if (this.currentMoveDir == 2) {
        return pawnX <= this.stopPos.x + 0.15;
      }
    }
    return true;
  }
  startIdleTimer() {
    if (this.pawn == void 0) {
      return;
    }
    this.startLookIdleTimer();
    this.idleSleepTimerId = system.runTimeout(() => {
      this.startSleep();
    }, 400);
  }
  startLookIdleTimer() {
    if (this.pawn == void 0) {
      return;
    }
    this.idleTimerId = system.runTimeout(
      () => {
        system.runTimeout(() => this.pawn.setProperty("wan:idle_type", 0), 65);
        this.pawn.setProperty("wan:idle_type", 1);
        this.startLookIdleTimer();
      },
      randomInterval(100, 200)
    );
  }
  stopIdleTimer() {
    if (this.idleTimerId != -1) {
      system.clearRun(this.idleTimerId);
    }
    if (this.idleSleepTimerId != -1) {
      system.clearRun(this.idleSleepTimerId);
    }
  }
  startSleep() {
    if (this.pawn == void 0) {
      return;
    }
    if (this.idleTimerId != -1) {
      system.clearRun(this.idleTimerId);
    }
    this.pawn.setProperty("wan:idle_type", 2);
    this.pawn.setProperty("wan:sleep_phase", 0);
    this.isSleeping = true;
    system.runTimeout(() => {
      if (this.pawn == void 0) {
        return;
      }
      this.pawn.setProperty("wan:sleep_phase", 1);
      this.canStopSleep = true;
    }, 20);
  }
  stopSleep() {
    if (this.pawn == void 0) {
      return;
    }
    this.pawn.setProperty("wan:sleep_phase", 2);
    system.runTimeout(() => {
      if (this.pawn == void 0) {
        return;
      }
      this.pawn.setProperty("wan:idle_type", 0);
      this.isSleeping = false;
      this.canStopSleep = false;
    }, 5);
  }
  update(instanceId) {
    this.instanceId = instanceId;
    if (this.pawn != void 0 && !this.isStopped) {
      if (this.isMoving) {
        if (this.checkShouldStop()) {
          this.stopMoving();
          this.pawn.setProperty("wan:is_running", false);
          this.pawn.teleport({
            x: this.stopPos.x,
            y: this.stopPos.y,
            z: this.stopPos.z
          });
          if (this.shouldPlayHit) {
            this.pawn.setProperty("wan:is_walled", true);
            this.hitTimerId = system.runTimeout(
              () => this.pawn.setProperty("wan:is_walled", false),
              85
            );
            this.shouldPlayHit = false;
          }
          this.isOnCooldown = true;
          system.runTimeout(() => this.isOnCooldown = false, 1);
          this.startIdleTimer();
        } else {
          this.pawn.setProperty("wan:is_running", true);
          switch (this.currentMoveDir) {
            case 0:
              this.pawn.applyImpulse({ x: 0, y: 0, z: -0.05 });
              break;
            case 1:
              this.pawn.applyImpulse({ x: 0, y: 0, z: 0.05 });
              break;
            case 2:
              this.pawn.applyImpulse({ x: -0.05, y: 0, z: 0 });
              break;
            case 3:
              this.pawn.applyImpulse({ x: 0.05, y: 0, z: 0 });
              break;
          }
        }
      }
      let currBlockPos = {
        x: Math.floor(this.pawn.location.x + Number.EPSILON),
        y: Math.floor(this.pawn.location.z + Number.EPSILON)
      };
      let currBlock = blockTypes[this.getBlockAt({ x: currBlockPos.x, y: currBlockPos.y })];
      if (!(this.lasUpdatedPos.x == currBlockPos.x && this.lasUpdatedPos.z == currBlockPos.y) || currBlock instanceof GameEndingGameBlock) {
        currBlock.callback(
          {
            x: Math.floor(this.pawn.location.x + Number.EPSILON),
            y: Math.floor(this.pawn.location.y + Number.EPSILON) - 4,
            z: Math.floor(this.pawn.location.z + Number.EPSILON)
          },
          instanceId
        );
        this.lasUpdatedPos = {
          x: currBlockPos.x,
          y: this.pawn.location.y,
          z: currBlockPos.y
        };
      }
      if ((this.priorityBufferedMovements.length > 0 || this.bufferedMovements.length > 0) && this.canStopSleep) {
        this.stopSleep();
      }
      if (!this.isMoving && !(currBlock instanceof GameEndingGameBlock) && !this.isOnCooldown && !this.isSleeping) {
        if (this.priorityBufferedMovements.length > 0) {
          this.isMoving = true;
          this.startMoving(this.priorityBufferedMovements.splice(0, 1)[0]);
        } else if (this.bufferedMovements.length > 0) {
          this.isMoving = true;
          this.startMoving(this.bufferedMovements.splice(0, 1)[0]);
        }
      }
    }
  }
  startMoving(moveDir) {
    if (this.pawn == void 0) return;
    if (this.pawn.getProperty("wan:is_walled")) {
      this.pawn.setProperty("wan:is_walled", false);
      system.clearRun(this.hitTimerId);
    }
    this.stopIdleTimer();
    this.pawn.setProperty("wan:is_running", true);
    switch (moveDir) {
      case 0:
        this.currentMoveDir = 0;
        this.pawn.setRotation({ x: 0, y: 0 });
        this.moveUp();
        break;
      case 1:
        this.currentMoveDir = 1;
        this.pawn.setRotation({ x: 0, y: 180 });
        this.moveDown();
        break;
      case 2:
        this.currentMoveDir = 2;
        this.pawn.setRotation({ x: 0, y: 270 });
        this.moveLeft();
        break;
      case 3:
        this.currentMoveDir = 3;
        this.pawn.setRotation({ x: 0, y: 90 });
        this.moveRight();
        break;
    }
  }
  checkMovement(maxDist, isZ, isInverse) {
    var moveDist = 0;
    for (var currCoord = 0; currCoord < maxDist; currCoord++) {
      var currBlock;
      let currX = this.getXLoc();
      let currZ = this.getZLoc();
      if (isZ) {
        if (isInverse) {
          currBlock = blockTypes[this.getBlockAtGrid({
            x: currX,
            y: currZ - 1 - currCoord
          })];
        } else {
          currBlock = blockTypes[this.getBlockAtGrid({
            x: currX,
            y: currZ + 1 + currCoord
          })];
        }
      } else {
        if (isInverse) {
          currBlock = blockTypes[this.getBlockAtGrid({
            x: currX - 1 - currCoord,
            y: currZ
          })];
        } else {
          currBlock = blockTypes[this.getBlockAtGrid({
            x: currX + 1 + currCoord,
            y: currZ
          })];
        }
      }
      if (currBlock.stopOnMe) {
        moveDist = currCoord + 1;
        break;
      } else if (currBlock.solid) {
        moveDist = currCoord;
        this.shouldPlayHit = true;
        break;
      }
    }
    return moveDist;
  }
  stopMoving() {
    this.isMoving = false;
    this.pawn.clearVelocity();
  }
  moveUp() {
    let maxDist = this.getZLoc();
    var moveDist = this.checkMovement(maxDist, true, true);
    this.stopPos = {
      x: Math.round((this.pawn.location.x + Number.EPSILON) * 10) / 10,
      y: this.pawn.location.y,
      z: Math.round((this.pawn.location.z + Number.EPSILON) * 10) / 10 - moveDist
    };
  }
  moveDown() {
    let maxDist = maxLevelSize - this.getZLoc() - 1;
    var moveDist = this.checkMovement(maxDist, true, false);
    this.stopPos = {
      x: Math.round((this.pawn.location.x + Number.EPSILON) * 10) / 10,
      y: this.pawn.location.y,
      z: Math.round((this.pawn.location.z + Number.EPSILON) * 10) / 10 + moveDist
    };
  }
  moveLeft() {
    let maxDist = this.getXLoc();
    var moveDist = this.checkMovement(maxDist, false, true);
    this.stopPos = {
      x: Math.round((this.pawn.location.x + Number.EPSILON) * 10) / 10 - moveDist,
      y: this.pawn.location.y,
      z: Math.round((this.pawn.location.z + Number.EPSILON) * 10) / 10
    };
  }
  moveRight() {
    let maxDist = maxLevelSize - this.getXLoc() - 1;
    var moveDist = this.checkMovement(maxDist, false, false);
    this.stopPos = {
      x: Math.round((this.pawn.location.x + Number.EPSILON) * 10) / 10 + moveDist,
      y: this.pawn.location.y,
      z: Math.round((this.pawn.location.z + Number.EPSILON) * 10) / 10
    };
  }
  getXLoc() {
    return this.pawn.location.x - this.startLocation.x;
  }
  getZLoc() {
    return this.pawn.location.z - this.startLocation.z;
  }
  delete(won = false, isStop = false) {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this.stopSleep();
    if (won) {
      this.pawn.setRotation({ x: 0, y: 180 });
      this.pawn.setProperty("wan:has_won", true);
    } else {
      this.pawn.setProperty("wan:is_death", true);
    }
    system.runTimeout(() => {
      system.runTimeout(() => {
        this.killPawn();
      }, 3);
      this.killLevel(() => {
        if (won || isStop) {
          if (!this.hasNextLevel || isStop) {
            removeGameInstance(this.instanceId);
          }
          this.onDelete(isStop);
        } else {
          this.init(this.game, this.startGameInstance, this.cameraCmd, this.playerSelected, this.onDelete, this.hasNextLevel, false);
        }
      });
    }, 60);
  }
  playerLeave() {
    this.killPawn();
    this.killLevel(() => {
    });
  }
  killPawn() {
    this.gameDimension.getEntities({
      location: {
        x: this.startLocation.x + maxLevelSize / 2,
        y: this.startLocation.y,
        z: this.startLocation.z + maxLevelSize / 2
      },
      maxDistance: maxLevelSize
    }).forEach((entity) => {
      if (entity.typeId != "wan:pawn" && entity.typeId != "minecraft:player" && entity.typeId != "wan:spawn_falling_block" && entity.typeId != "wan:dead_falling_block") {
        entity.remove();
      }
    });
    this.stopIdleTimer();
    this.pawn.remove();
    this.pawn = void 0;
  }
  restart() {
    this.isStopped = true;
    system.runTimeout(() => {
      this.killPawn();
      this.playerSelected.sendMessage("Game restarted!");
      this.init(this.game, this.startGameInstance, this.cameraCmd, this.playerSelected, this.onDelete, this.hasNextLevel, true);
    }, 3);
  }
  getBlockAtGrid(position) {
    return this.gameDimension.getBlock({
      x: this.startLocation.x + position.x,
      y: this.startLocation.y,
      z: this.startLocation.z + position.y
    }).typeId;
  }
  getBlockAt(position) {
    return this.gameDimension.getBlock({
      x: position.x,
      y: this.startLocation.y,
      z: position.y
    }).typeId;
  }
}
class GameBlock {
  constructor(isStart, stopOnMe, solid, callback) {
    __publicField(this, "isStart");
    __publicField(this, "stopOnMe");
    __publicField(this, "solid");
    __publicField(this, "callback");
    this.isStart = isStart;
    this.stopOnMe = stopOnMe;
    this.solid = solid;
    this.callback = callback;
  }
}
class ExplosiveGameBlock extends GameBlock {
  constructor(blastRange, fuseTime) {
    super(false, false, false, (blockPos, gameInstanceId) => {
      let gameInstance = activeGameInstances[gameInstanceId];
      var selectedTnt = void 0;
      gameInstance.gameDimension.getEntitiesAtBlockLocation({
        x: blockPos.x,
        y: blockPos.y + 4,
        z: blockPos.z
      }).forEach((entity) => {
        if (entity.typeId == "wan:tnt") {
          selectedTnt = entity;
        }
      });
      selectedTnt.playAnimation("animation.tnt.explode");
      system.runTimeout(() => {
        gameInstance.gameDimension.getEntities({ location: blockPos, maxDistance: blastRange }).forEach((entity) => entity.remove());
        for (var x = -blastRange; x <= blastRange; x++) {
          for (var z = -blastRange; z <= blastRange; z++) {
            gameInstance.gameDimension.getEntitiesAtBlockLocation({
              x: blockPos.x + x,
              y: blockPos.y + 4,
              z: blockPos.z + z
            }).forEach((entity) => {
              if (entity.typeId == "wan:tnt") {
                entity.remove();
              }
            });
            for (var y = 0; y < 5; y++) {
              if (y != 1) {
                gameInstance.gameDimension.getBlock({
                  x: blockPos.x + x,
                  y: blockPos.y + y,
                  z: blockPos.z + z
                }).setType("minecraft:air");
              }
            }
          }
        }
        selectedTnt.remove();
      }, fuseTime);
    });
  }
}
class SelfDestructGameBlock extends GameBlock {
  constructor(selfDestructTime) {
    super(false, false, false, (blockPos, gameInstanceId) => {
      let gameInstance = activeGameInstances[gameInstanceId];
      system.runTimeout(() => {
        var entity = gameInstance.gameDimension.spawnEntity(
          "wan:falling_glass",
          {
            x: blockPos.x + 0.5,
            y: blockPos.y + 3,
            z: blockPos.z + 0.5
          }
        );
        for (var y = 0; y < 4; y++) {
          if (y != 1) {
            const actualBlockLoc = {
              x: blockPos.x,
              y: blockPos.y + y,
              z: blockPos.z
            };
            gameInstance.gameDimension.getBlock(actualBlockLoc).setType("minecraft:air");
          }
        }
        system.runTimeout(() => {
          entity.remove();
        }, 20);
      }, selfDestructTime);
    });
  }
}
class GameEndingGameBlock extends GameBlock {
  constructor(isDeath) {
    super(false, true, false, (blockPos, gameInstanceId) => {
      system.run(() => {
        let gameInstance = activeGameInstances[gameInstanceId];
        gameInstance.delete(!isDeath);
      });
    });
  }
}
class RedirectGameBlock extends GameBlock {
  constructor(direction) {
    super(false, true, false, (_, gameInstanceId) => {
      let gameInstance = activeGameInstances[gameInstanceId];
      gameInstance.priorityBufferedMovements.push(direction);
    });
  }
}
const blockTypes = {};
function initBlocks() {
  blockTypes["minecraft:air"] = new GameEndingGameBlock(true);
  blockTypes["wan:spawn_block"] = new GameBlock(true, false, false, () => {
  });
  blockTypes["wan:win_block"] = new GameEndingGameBlock(false);
  blockTypes["wan:redirect_block_up"] = new RedirectGameBlock(
    PlayerMoveDirection.UP
  );
  blockTypes["wan:redirect_block_down"] = new RedirectGameBlock(
    PlayerMoveDirection.DOWN
  );
  blockTypes["wan:redirect_block_left"] = new RedirectGameBlock(
    PlayerMoveDirection.LEFT
  );
  blockTypes["wan:redirect_block_right"] = new RedirectGameBlock(
    PlayerMoveDirection.RIGHT
  );
  blockTypes["wan:stop_block"] = new GameBlock(false, true, false, () => {
  });
  blockTypes["wan:wall_block"] = new GameBlock(false, false, true, () => {
  });
  blockTypes["wan:wall_block_1"] = new GameBlock(false, false, true, () => {
  });
  blockTypes["wan:wall_block_2"] = new GameBlock(false, false, true, () => {
  });
  blockTypes["wan:glass_block"] = new SelfDestructGameBlock(40);
  blockTypes["wan:dynamite_block"] = new ExplosiveGameBlock(1, 60);
  blockTypes["wan:normal_block"] = new GameBlock(false, false, false, () => {
  });
}
class Game {
  constructor(movementPos, tpBackPos2, player, cameraCmd) {
    __publicField(this, "movementPos");
    __publicField(this, "tpBackPos");
    __publicField(this, "gameInstances");
    __publicField(this, "player");
    __publicField(this, "cameraCmd");
    __publicField(this, "currId", 0);
    __publicField(this, "shouldRunMoveTimer", true);
    __publicField(this, "shouldSetGUI", true);
    __publicField(this, "wasMovePressed", false);
    __publicField(this, "wasHomePressed", false);
    __publicField(this, "wasResetPressed", false);
    __publicField(this, "movementCooldown", 0);
    this.movementPos = movementPos;
    this.tpBackPos = tpBackPos2;
    this.gameInstances = [];
    this.player = player;
    this.cameraCmd = cameraCmd;
  }
  addGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, level) {
    this.gameInstances.push(new StartGameInstance(playPos, playCenterPos, templatePos, templateCenterPos, level));
  }
  resetCooldown(override = 6) {
    this.movementCooldown = override;
  }
  updateMove(newInstance, instanceId) {
    let xChange = this.player.location.x - this.movementPos.x;
    let zChange = this.player.location.z - this.movementPos.z;
    this.movementCooldown = Math.max(0, this.movementCooldown - 5);
    if (this.movementCooldown == 0 && this.shouldSetGUI) {
      system.runTimeout(() => {
        if (this.wasMovePressed) {
          this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick1`);
          this.wasMovePressed = false;
        } else if (this.wasHomePressed) {
          this.player.dimension.runCommand(`title "${this.player.name}" title hidehome1`);
          this.wasHomePressed = false;
        } else if (this.wasResetPressed) {
          this.player.dimension.runCommand(`title "${this.player.name}" title hidereset1`);
          this.wasResetPressed = false;
        }
      }, 1);
      if (this.player.isSneaking) {
        newInstance.delete(false, true);
        removeGameInstance(instanceId);
        this.player.dimension.runCommand(`title "${this.player.name}" title hidehome2`);
        this.resetCooldown(100);
        this.wasHomePressed = true;
      } else if (this.player.isJumping) {
        newInstance.restart();
        this.player.dimension.runCommand(`title "${this.player.name}" title hidereset2`);
        this.resetCooldown(60);
        this.wasResetPressed = true;
      }
      if (Math.abs(xChange) > Math.abs(zChange)) {
        if (xChange > 0) {
          newInstance.addInput(PlayerMoveDirection.RIGHT);
          this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick5`);
          this.wasMovePressed = true;
        } else {
          newInstance.addInput(PlayerMoveDirection.LEFT);
          this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick4`);
          this.wasMovePressed = true;
        }
      } else if (Math.abs(xChange) < Math.abs(zChange)) {
        if (zChange > 0) {
          newInstance.addInput(PlayerMoveDirection.DOWN);
          this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick3`);
          this.wasMovePressed = true;
        } else {
          newInstance.addInput(PlayerMoveDirection.UP);
          this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick2`);
          this.wasMovePressed = true;
        }
      }
    }
    this.player.teleport(this.movementPos, { keepVelocity: false, rotation: { x: 0, y: 180 } });
    if (this.shouldRunMoveTimer) {
      system.runTimeout(() => {
        this.updateMove(newInstance, instanceId);
      }, 5);
    }
  }
  playLevels() {
    this.currId = 0;
    let newInstance = new GameInstance();
    let instanceId = activeGameInstances.push(newInstance);
    this.player.teleport(this.movementPos, { keepVelocity: false, rotation: { x: 0, y: 180 } });
    this.player.dimension.runCommand(`hud "${this.player.name}" hide`);
    system.runTimeout(() => {
      this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick1`);
    }, 1);
    system.runTimeout(() => {
      this.player.dimension.runCommand(`title "${this.player.name}" title hidehome1`);
    }, 2);
    system.runTimeout(() => {
      this.player.dimension.runCommand(`title "${this.player.name}" title hidereset1`);
    }, 3);
    system.runTimeout(() => {
      this.updateMove(newInstance, instanceId);
    }, 1);
    let onDelete = (isStop) => {
      this.player.inputPermissions.cameraEnabled = false;
      let subid = this.gameInstances.length - this.currId;
      let hasnNext = subid > 1;
      if (subid > 0 && !isStop) {
        newInstance.init(this, this.gameInstances[this.currId], this.cameraCmd, this.player, onDelete, hasnNext);
      } else {
        this.shouldRunMoveTimer = false;
        system.runTimeout(() => {
          this.player.dimension.runCommand(`title "${this.player.name}" title hidejoystick`);
          this.player.dimension.runCommand(`camera "${this.player.name}" clear`);
          this.player.inputPermissions.cameraEnabled = true;
          this.player.dimension.runCommand(`hud "${this.player.name}" reset`);
          this.player.dimension.runCommand(`effect "${this.player.name}" clear`);
          this.player.teleport(this.tpBackPos, { keepVelocity: false, rotation: { x: 0, y: 180 } });
        }, 9);
        system.runTimeout(() => {
          this.player.dimension.runCommand(`title "${this.player.name}" title hidehome`);
        }, 10);
        system.runTimeout(() => {
          this.player.dimension.runCommand(`title "${this.player.name}" title hidereset`);
        }, 11);
        system.runTimeout(() => {
          if (!isStop) {
            this.player.dimension.runCommand(`title "${this.player.name}" title §1§kaaa§r§6You Won!§r§1§kaaa`);
          }
        }, 12);
      }
      this.currId++;
    };
    onDelete(false);
  }
}
class StartGameInstance {
  constructor(playPos, playCenterPos, templatePos, templateCenterPos, level) {
    __publicField(this, "playPos");
    __publicField(this, "playCenterPos");
    __publicField(this, "templatePos");
    __publicField(this, "templateCenterPos");
    __publicField(this, "level");
    this.playPos = playPos;
    this.playCenterPos = playCenterPos;
    this.templatePos = templatePos;
    this.templateCenterPos = templateCenterPos;
    this.level = level;
  }
}
var activeGameInstances = [];
function initManager() {
  initBlocks();
  world.beforeEvents.playerLeave.subscribe((data) => {
    var instanceId = 0;
    activeGameInstances.forEach((gameInstance) => {
      if (data.player.name == gameInstance.playerSelected.name) {
        gameInstance.playerSelected = void 0;
        gameInstance.playerLeave();
        removeGameInstance(instanceId);
      }
      instanceId++;
    });
  });
  world.afterEvents.playerJoin.subscribe((data) => {
    world.getDimension("overworld").runCommand(`title "${data.playerName}" title hide`);
  });
  world.afterEvents.entityHitEntity.subscribe((data) => {
    let entityId = data.hitEntity.typeId;
    let player = data.damagingEntity;
    let arcadePos = data.hitEntity.location;
    arcadePos = { x: arcadePos.x, y: arcadePos.y + 1.5, z: arcadePos.z };
    if (entityId == "wan:arcade0") {
      startArcadeCamera(player, arcadePos, () => {
      }, () => {
        createTutorialGame(player);
      });
    } else if (entityId == "wan:arcade1") {
      startArcadeCamera(player, arcadePos, () => {
      }, () => {
        createForestGame(player);
      });
    } else if (entityId == "wan:arcade2") {
      startArcadeCamera(player, arcadePos, () => {
      }, () => {
        createDesertGame(player);
      });
    } else if (entityId == "wan:arcade3") {
      openMainMenu(player, arcadePos, (level) => {
        startArcadeCamera(player, arcadePos, () => {
        }, () => {
          createCommunityGame(player, level);
        });
      });
    } else if (entityId == "wan:arcade4") {
      openLevelEditorMenu(player, arcadePos);
    }
  });
  system.runInterval(() => {
    var instanceId = 0;
    activeGameInstances.forEach((gameInstance) => {
      gameInstance.update(instanceId);
      instanceId++;
    });
  }, 1);
}
function startArcadeCamera(player, arcadePos, teleportCallback, onMiddleCallback) {
  player.dimension.runCommand(`effect "${player.name}" invisibility infinite 255 true`);
  player.dimension.runCommand(`camerashake add "${player.name}" 0.1 2.5 positional`);
  player.dimension.runCommand(`camera "${player.name}" fade time 1.5 1 1.5 color 0 0 0`);
  player.dimension.runCommand(`camera "${player.name}" set minecraft:free pos ${arcadePos.x} ${arcadePos.y} ${arcadePos.z + 1} facing ${arcadePos.x} ${arcadePos.y} ${arcadePos.z - 5}`);
  player.dimension.runCommand(`camera "${player.name}" set minecraft:free ease 0.5 in_out_sine pos ${arcadePos.x} ${arcadePos.y} ${arcadePos.z + 2} facing ${arcadePos.x} ${arcadePos.y} ${arcadePos.z - 5}`);
  system.runTimeout(() => {
    player.dimension.runCommand(`camera "${player.name}" set minecraft:free ease 1 in_out_sine pos ${arcadePos.x} ${arcadePos.y} ${arcadePos.z} facing ${arcadePos.x} ${arcadePos.y} ${arcadePos.z - 5}`);
    system.runTimeout(() => {
      if (onMiddleCallback == void 0) {
        teleportCallback();
      }
      system.runTimeout(() => {
        if (onMiddleCallback == void 0) {
          player.dimension.runCommand(`camera "${player.name}" clear`);
        }
      }, 50);
      system.runTimeout(() => {
        if (onMiddleCallback != void 0) {
          onMiddleCallback();
        }
      }, 20);
    }, 20);
  }, 10);
}
function removeGameInstance(instanceId) {
  activeGameInstances.splice(instanceId, 1);
}
const pageDim = 4;
const blockIndex = [
  "spawn_block",
  "win_block",
  "normal_block",
  "wall_block",
  "redirect_block_up",
  "redirect_block_down",
  "redirect_block_left",
  "redirect_block_right",
  "glass_block",
  "dynamite_block",
  "stop_block",
  "",
  "wall_block_1",
  "wall_block_2",
  "",
  ""
];
function initGrids() {
  world.afterEvents.entitySpawn.subscribe((data) => {
    const entity = data.entity;
    if (entity.typeId != "wan:grid" && entity.typeId != "wan:theme_selector") {
      return;
    }
    const location = entity.location;
    const n = entity.getComponent(EntityComponentTypes.Rideable).getSeats().length;
    for (let i = 0; i < n; i++) {
      let rider = void 0;
      if (i > 1) {
        rider = entity.dimension.spawnEntity("wan:grid_block", location);
        rider.setDynamicProperty("wan:id", `block_${i - 2}`);
      } else {
        rider = entity.dimension.spawnEntity("wan:grid_arrow", location);
        if (i == 0) {
          rider.setDynamicProperty("wan:id", "right_arrow");
        } else if (i == 1) {
          rider.setDynamicProperty("wan:id", "left_arrow");
        }
      }
      entity.getComponent(EntityComponentTypes.Rideable).addRider(rider);
    }
  });
  world.afterEvents.entityHitEntity.subscribe((data) => {
    const rider = data.hitEntity;
    const player = data.damagingEntity;
    if (!rider.matches({ families: ["grid"] }) || player.typeId != "minecraft:player") {
      return;
    }
    let ride = rider;
    if (rider.typeId != "wan:theme_selector") {
      ride = rider.getComponent(EntityComponentTypes.Riding).entityRidingOn;
    }
    const page = ride.getProperty("wan:page");
    switch (rider.typeId) {
      case "wan:grid_block":
        const index = rider.getDynamicProperty("wan:id").split("_")[1];
        giveBlock(page, parseInt(index), player);
        ride.playAnimation("animation.grid.select_" + index);
        break;
      case "wan:theme_selector":
        changeTheme(page, player);
        rider.playAnimation("animation.theme_selector.select");
        break;
      case "wan:grid_arrow":
        changePage(ride, page, rider.getDynamicProperty("wan:id"));
        break;
    }
  });
}
function giveBlock(page, index, player) {
  const block = blockIndex[page * pageDim + index];
  if (block == "") {
    return;
  }
  const inv = player.getComponent(EntityComponentTypes.Inventory).container;
  inv.addItem(new ItemStack(`wan:${block}`, 64));
}
function changeTheme(page, player) {
  changeTheme$1(player, player.getDynamicProperty("currentlyEditingId"), themeList[page]);
  player.sendMessage(`Theme changed to ${themeList[page]}`);
}
function changePage(entity, page, arrowType) {
  switch (arrowType) {
    case "left_arrow":
      if (page == 0) {
        return;
      }
      page--;
      break;
    case "right_arrow":
      if (entity.typeId == "wan:grid") {
        if (page == blockIndex.length / pageDim - 1) {
          return;
        }
      } else if (entity.typeId == "wan:theme_selector") {
        if (page == 1) {
          return;
        }
      }
      page++;
      break;
  }
  entity.setProperty("wan:page", page);
}
initManager();
initLevels();
initManager$1();
initGrids();
