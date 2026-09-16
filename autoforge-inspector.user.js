// ==UserScript==
// @name         AutoForge Read-only Inspector
// @namespace    local.shaaheen.autoforge
// @version      1.0.0
// @description  Standalone AutoForge trainer and save inspector. Paste this entire file into Tampermonkey.
// @match        https://autoforgegame-j101p8-0-0-19-webview.devvit.net/index.html*
// @run-at       document-start
// @sandbox      raw
// @grant        none
// @updateURL    none
// @downloadURL  none
// ==/UserScript==

window.__autoForgeCatalog = {"build":"1788851099","skills":{"100":{"name":"Heal","grade":1},"200":{"name":"Wave","grade":1},"300":{"name":"Big","grade":1},"500":{"name":"Arrows","grade":2},"600":{"name":"Gas","grade":2},"700":{"name":"Aoe_passive","grade":2},"800":{"name":"Rage","grade":3},"900":{"name":"Cloning","grade":3},"1000":{"name":"Lightning","grade":3},"1100":{"name":"Meteor","grade":4},"1200":{"name":"Shield","grade":4},"1300":{"name":"Mastery","grade":4},"1400":{"name":"SnowStrike","grade":5},"1500":{"name":"SpaceStrike","grade":5},"1600":{"name":"Shuriken","grade":5},"1700":{"name":"EnergyStrike","grade":6},"1800":{"name":"AirBombing","grade":6},"1900":{"name":"Tentacle","grade":6}},"items":{"1001":{"name":"rockage_Head1","slot":1,"age":1,"label":"Caveman Forelock","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1002":{"name":"rockage_Armor1","slot":2,"age":1,"label":"Primitive Leaf","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1003":{"name":"rockage_Legs1","slot":3,"age":1,"label":"Wooden Sandals","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1004":{"name":"rockage_Hands1","slot":4,"age":1,"label":"Leaf Wraps","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1005":{"name":"rockage_Weapon1","slot":5,"age":1,"label":"Club","hp":0,"damage":8,"ranged":false,"animation":null,"interval":1.1},"1006":{"name":"rockage_Ring1","slot":6,"age":1,"label":"Wooden Ring","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1007":{"name":"rockage_Necklace1","slot":7,"age":1,"label":"Leaf Necklace","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1008":{"name":"rockage_Belt1","slot":8,"age":1,"label":"Leaf Belt","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1009":{"name":"rockage_Head2","slot":1,"age":1,"label":"Bone Helmet","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1010":{"name":"rockage_Armor2","slot":2,"age":1,"label":"Stone Age Cloak","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1011":{"name":"rockage_Legs2","slot":3,"age":1,"label":"Leather Boots","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1012":{"name":"rockage_Hands2","slot":4,"age":1,"label":"Leather Wraps","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1013":{"name":"rockage_Weapon2","slot":5,"age":1,"label":"Mammoth Bone","hp":0,"damage":8,"ranged":false,"animation":"two_hand","interval":1.1},"1014":{"name":"rockage_Ring2","slot":6,"age":1,"label":"Beast Bone Ring","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1015":{"name":"rockage_Necklace2","slot":7,"age":1,"label":"Bone Necklace","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1016":{"name":"rockage_Belt2","slot":8,"age":1,"label":"Stone Age Belt","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1017":{"name":"rockage_Head3","slot":1,"age":1,"label":"Bear Head","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1018":{"name":"rockage_Armor3","slot":2,"age":1,"label":"Bear Chief Armor","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1019":{"name":"rockage_Legs3","slot":3,"age":1,"label":"Fur Boots","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1020":{"name":"rockage_Hands3","slot":4,"age":1,"label":"Bear Paws","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1021":{"name":"rockage_Weapon3","slot":5,"age":1,"label":"Chief's Axe","hp":0,"damage":8,"ranged":false,"animation":null,"interval":1.1},"1022":{"name":"rockage_Weapon5","slot":5,"age":1,"label":"Warrior axes","hp":0,"damage":8,"ranged":false,"animation":null,"interval":1.1},"1023":{"name":"rockage_Ring3","slot":6,"age":1,"label":"Beast Fang Ring","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1024":{"name":"rockage_Necklace3","slot":7,"age":1,"label":"Dinosaur Teeth Amulet","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1025":{"name":"rockage_Belt3","slot":8,"age":1,"label":"Chief's Belt","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1026":{"name":"rockage_Head4","slot":1,"age":1,"label":"Coconut Helmet","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1027":{"name":"rockage_Armor4","slot":2,"age":1,"label":"Turtle Shell","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1028":{"name":"rockage_Legs4","slot":3,"age":1,"label":"Leaf Boots","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"1029":{"name":"rockage_Hands4","slot":4,"age":1,"label":"Dinosaur Claws","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1030":{"name":"rockage_Weapon4","slot":5,"age":1,"label":"Banana","hp":0,"damage":5,"ranged":true,"animation":"grenade","interval":1.5},"1031":{"name":"rockage_Ring4","slot":6,"age":1,"label":"Beast Bone Ring","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1032":{"name":"rockage_Necklace4","slot":7,"age":1,"label":"Spider Amulet","hp":0,"damage":5,"ranged":false,"animation":null,"interval":1},"1033":{"name":"rockage_Belt4","slot":8,"age":1,"label":"Stone Belt","hp":40,"damage":0,"ranged":false,"animation":null,"interval":1},"2001":{"name":"antiquityage_Head1","slot":1,"age":2,"label":"Ritual mask","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2002":{"name":"antiquityage_Armor1","slot":2,"age":2,"label":"Cursed bandages","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2003":{"name":"antiquityage_Legs1","slot":3,"age":2,"label":"Decayed wrappings","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2004":{"name":"antiquityage_Hands1","slot":4,"age":2,"label":"Mummy hands","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2005":{"name":"antiquityage_Weapon1","slot":5,"age":2,"label":"Buried blade","hp":80,"damage":27,"ranged":false,"animation":"sword","interval":1.1},"2006":{"name":"antiquityage_Ring1","slot":6,"age":2,"label":"Sarcophagus ring","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2007":{"name":"antiquityage_Necklace1","slot":7,"age":2,"label":"Afterlife amulet","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2008":{"name":"antiquityage_Belt1","slot":8,"age":2,"label":"Cult belt","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2009":{"name":"antiquityage_Head2","slot":1,"age":2,"label":"Blazing sun helmet","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2010":{"name":"antiquityage_Armor2","slot":2,"age":2,"label":"Golden armor of Ra","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2011":{"name":"antiquityage_Legs2","slot":3,"age":2,"label":"Scorched sandals","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2012":{"name":"antiquityage_Hands2","slot":4,"age":2,"label":"Fire gloves","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2013":{"name":"antiquityage_Weapon2","slot":5,"age":2,"label":"Sun blade","hp":0,"damage":32,"ranged":false,"animation":null,"interval":1.1},"2014":{"name":"antiquityage_Ring2","slot":6,"age":2,"label":"Dawn ring","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2015":{"name":"antiquityage_Necklace2","slot":7,"age":2,"label":"Heart of the sun","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2016":{"name":"antiquityage_Belt2","slot":8,"age":2,"label":"Belt of light","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2017":{"name":"antiquityage_Head3","slot":1,"age":2,"label":"Serpent hood","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2018":{"name":"antiquityage_Armor3","slot":2,"age":2,"label":"Scaled garment","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2019":{"name":"antiquityage_Legs3","slot":3,"age":2,"label":"Crawling sandals","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2020":{"name":"antiquityage_Hands3","slot":4,"age":2,"label":"Basilisk claws","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2021":{"name":"antiquityage_Weapon3","slot":5,"age":2,"label":"Venom staff","hp":0,"damage":25,"ranged":true,"animation":"magic_stick","interval":1.5},"2022":{"name":"antiquityage_Ring3","slot":6,"age":2,"label":"Venom ring","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2023":{"name":"antiquityage_Necklace3","slot":7,"age":2,"label":"Serpent amulet","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2024":{"name":"antiquityage_Belt3","slot":8,"age":2,"label":"Leather belt","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2025":{"name":"antiquityage_Head4","slot":1,"age":2,"label":"Anubis mask","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2026":{"name":"antiquityage_Armor4","slot":2,"age":2,"label":"Guardian armor","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2027":{"name":"antiquityage_Legs4","slot":3,"age":2,"label":"Judgment sandals","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2028":{"name":"antiquityage_Hands4","slot":4,"age":2,"label":"Judge hands","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2029":{"name":"antiquityage_Weapon4","slot":5,"age":2,"label":"Judgment staff","hp":0,"damage":32,"ranged":false,"animation":null,"interval":1.1},"2030":{"name":"antiquityage_Ring4","slot":6,"age":2,"label":"Balance ring","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2031":{"name":"antiquityage_Necklace4","slot":7,"age":2,"label":"Scales of Osiris","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2032":{"name":"antiquityage_Belt4","slot":8,"age":2,"label":"Cycle belt","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2033":{"name":"antiquityage_Head5","slot":1,"age":2,"label":"Victory wreath","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2034":{"name":"antiquityage_Armor5","slot":2,"age":2,"label":"White robes","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2035":{"name":"antiquityage_Legs5","slot":3,"age":2,"label":"Sandals of speed","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"2036":{"name":"antiquityage_Hands5","slot":4,"age":2,"label":"Divine gloves","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2037":{"name":"antiquityage_Weapon5","slot":5,"age":2,"label":"Spear","hp":0,"damage":32,"ranged":false,"animation":"spear","interval":1.1},"2038":{"name":"antiquityage_Ring5","slot":6,"age":2,"label":"God ring","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2039":{"name":"antiquityage_Necklace5","slot":7,"age":2,"label":"Ancient necklace","hp":0,"damage":20,"ranged":false,"animation":null,"interval":1},"2040":{"name":"antiquityage_Belt5","slot":8,"age":2,"label":"Divine belt","hp":160,"damage":0,"ranged":false,"animation":null,"interval":1},"3001":{"name":"romeage_Head1","slot":1,"age":3,"label":"Roman hood","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3002":{"name":"romeage_Armor1","slot":2,"age":3,"label":"Roman armor","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3003":{"name":"romeage_Legs1","slot":3,"age":3,"label":"Legionary sandals","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3004":{"name":"romeage_Hands1","slot":4,"age":3,"label":"Gladiator gloves","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3005":{"name":"romeage_Weapon1","slot":5,"age":3,"label":"Gladiator bow","hp":0,"damage":50,"ranged":true,"animation":"bow","interval":1.5},"3006":{"name":"romeage_Ring1","slot":6,"age":3,"label":"Roman ring","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3007":{"name":"romeage_Necklace1","slot":7,"age":3,"label":"Legionary pendant","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3008":{"name":"romeage_Belt1","slot":8,"age":3,"label":"Gladiator belt","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3009":{"name":"romeage_Head2","slot":1,"age":3,"label":"Gladiator helmet","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3010":{"name":"romeage_Armor2","slot":2,"age":3,"label":"Legionary armor","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3011":{"name":"romeage_Legs2","slot":3,"age":3,"label":"Gladiator footwear","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3012":{"name":"romeage_Hands2","slot":4,"age":3,"label":"Combat gloves","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3013":{"name":"romeage_Weapon2","slot":5,"age":3,"label":"Roman sword & shield","hp":60,"damage":128,"ranged":false,"animation":"shield","interval":1.1},"3014":{"name":"romeage_Ring2","slot":6,"age":3,"label":"Maximus rings","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3015":{"name":"romeage_Necklace2","slot":7,"age":3,"label":"Gladiator pendant","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3016":{"name":"romeage_Belt2","slot":8,"age":3,"label":"Rome belt","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3017":{"name":"romeage_Head3","slot":1,"age":3,"label":"Maximus helmet","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3018":{"name":"romeage_Armor3","slot":2,"age":3,"label":"Caesar cloak","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3019":{"name":"romeage_Legs3","slot":3,"age":3,"label":"Legionary boots","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3020":{"name":"romeage_Hands3","slot":4,"age":3,"label":"Maximus gloves","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3021":{"name":"romeage_Weapon3","slot":5,"age":3,"label":"Maximus blade","hp":0,"damage":128,"ranged":false,"animation":"two_hand","interval":1.1},"3022":{"name":"romeage_Ring3","slot":6,"age":3,"label":"Caesar ring","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3023":{"name":"romeage_Necklace3","slot":7,"age":3,"label":"Caesar necklace","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3024":{"name":"romeage_Belt3","slot":8,"age":3,"label":"Legionary belt","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3025":{"name":"romeage_Head4","slot":1,"age":3,"label":"Centurion helmet","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3026":{"name":"romeage_Armor4","slot":2,"age":3,"label":"Centurion armor","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3027":{"name":"romeage_Legs4","slot":3,"age":3,"label":"Centurion boots","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3028":{"name":"romeage_Hands4","slot":4,"age":3,"label":"Centurion gloves","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3029":{"name":"romeage_Weapon4","slot":5,"age":3,"label":"Centurion sword","hp":0,"damage":128,"ranged":false,"animation":"sword","interval":1.1},"3030":{"name":"romeage_Ring4","slot":6,"age":3,"label":"General ring","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3031":{"name":"romeage_Necklace4","slot":7,"age":3,"label":"Centurion pendant","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3032":{"name":"romeage_Belt4","slot":8,"age":3,"label":"Centurion belt","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3033":{"name":"romeage_Head5","slot":1,"age":3,"label":"Champion helmet","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3034":{"name":"romeage_Armor5","slot":2,"age":3,"label":"Champion armor","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3035":{"name":"romeage_Legs5","slot":3,"age":3,"label":"Champion footwear","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"3036":{"name":"romeage_Hands5","slot":4,"age":3,"label":"General gloves","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3037":{"name":"romeage_Weapon5","slot":5,"age":3,"label":"Trident","hp":0,"damage":128,"ranged":false,"animation":"spear","interval":1.1},"3038":{"name":"romeage_Ring5","slot":6,"age":3,"label":"General ring","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3039":{"name":"romeage_Necklace5","slot":7,"age":3,"label":"General necklace","hp":0,"damage":80,"ranged":false,"animation":null,"interval":1},"3040":{"name":"romeage_Belt5","slot":8,"age":3,"label":"General belt","hp":640,"damage":0,"ranged":false,"animation":null,"interval":1},"4001":{"name":"normanage_Head1","slot":1,"age":4,"label":"Herring hat","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4002":{"name":"normanage_Armor1","slot":2,"age":4,"label":"Barrel armor","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4003":{"name":"normanage_Legs1","slot":3,"age":4,"label":"Sailor boots","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4004":{"name":"normanage_Hands1","slot":4,"age":4,"label":"Fisherman gloves","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4005":{"name":"normanage_Weapon1","slot":5,"age":4,"label":"Paddle club","hp":0,"damage":512,"ranged":false,"animation":"two_hand","interval":1.1},"4006":{"name":"normanage_Ring1","slot":6,"age":4,"label":"Cod ring","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4007":{"name":"normanage_Necklace1","slot":7,"age":4,"label":"Storm amulet","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4008":{"name":"normanage_Belt1","slot":8,"age":4,"label":"Hooked belt","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4009":{"name":"normanage_Head2","slot":1,"age":4,"label":"Northern warrior helmet","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4010":{"name":"normanage_Armor2","slot":2,"age":4,"label":"Jarl armor","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4011":{"name":"normanage_Legs2","slot":3,"age":4,"label":"Jarl boots","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4012":{"name":"normanage_Hands2","slot":4,"age":4,"label":"Jarl gloves","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4013":{"name":"normanage_Weapon2","slot":5,"age":4,"label":"Jarl axe","hp":0,"damage":512,"ranged":false,"animation":null,"interval":1.1},"4014":{"name":"normanage_Ring2","slot":6,"age":4,"label":"Jarl ring","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4015":{"name":"normanage_Necklace2","slot":7,"age":4,"label":"Odin amulet","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4016":{"name":"normanage_Belt2","slot":8,"age":4,"label":"Jarl belt","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4017":{"name":"normanage_Head3","slot":1,"age":4,"label":"Berserker beard","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4018":{"name":"normanage_Armor3","slot":2,"age":4,"label":"Berserker hide","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4019":{"name":"normanage_Legs3","slot":3,"age":4,"label":"Berserker boots","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4020":{"name":"normanage_Hands3","slot":4,"age":4,"label":"Berserker claws","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4021":{"name":"normanage_Weapon3","slot":5,"age":4,"label":"Berserker axes","hp":0,"damage":512,"ranged":false,"animation":null,"interval":1.1},"4022":{"name":"normanage_Ring3","slot":6,"age":4,"label":"Ring of fury","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4023":{"name":"normanage_Necklace3","slot":7,"age":4,"label":"Amulet of fury","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4024":{"name":"normanage_Belt3","slot":8,"age":4,"label":"Belt of fury","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4025":{"name":"normanage_Head4","slot":1,"age":4,"label":"Konung helmet","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4026":{"name":"normanage_Armor4","slot":2,"age":4,"label":"Konung armor","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4027":{"name":"normanage_Legs4","slot":3,"age":4,"label":"Konung boots","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4028":{"name":"normanage_Hands4","slot":4,"age":4,"label":"Konung gloves","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4029":{"name":"normanage_Weapon4","slot":5,"age":4,"label":"God hammer","hp":0,"damage":512,"ranged":false,"animation":null,"interval":1.1},"4030":{"name":"normanage_Ring4","slot":6,"age":4,"label":"Konung ring","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4031":{"name":"normanage_Necklace4","slot":7,"age":4,"label":"Valhalla amulet","hp":0,"damage":320,"ranged":false,"animation":null,"interval":1},"4032":{"name":"normanage_Belt4","slot":8,"age":4,"label":"Konung belt","hp":2560,"damage":0,"ranged":false,"animation":null,"interval":1},"4033":{"name":"normanage_Weapon5","slot":5,"age":4,"label":"Jarl fish","hp":0,"damage":320,"ranged":true,"animation":"grenade","interval":1.5},"5001":{"name":"kingdomage_Head1","slot":1,"age":5,"label":"Helmet of the Crossbowman","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5002":{"name":"kingdomage_Armor1","slot":2,"age":5,"label":"Armor","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5003":{"name":"kingdomage_Legs1","slot":3,"age":5,"label":"Boots of the Crossbowman","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5004":{"name":"kingdomage_Hands1","slot":4,"age":5,"label":"Gloves of the Archer","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5005":{"name":"kingdomage_Weapon1","slot":5,"age":5,"label":"Crossbow","hp":0,"damage":1280,"ranged":true,"animation":"bow","interval":1.5},"5006":{"name":"kingdomage_Ring1","slot":6,"age":5,"label":"Steel Ring","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5007":{"name":"kingdomage_Necklace1","slot":7,"age":5,"label":"Knight's Cross","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5008":{"name":"kingdomage_Belt1","slot":8,"age":5,"label":"Belt of the Crossbowman","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5009":{"name":"kingdomage_Head2","slot":1,"age":5,"label":"Knight's Helmet","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5010":{"name":"kingdomage_Armor2","slot":2,"age":5,"label":"Knight's Armor","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5011":{"name":"kingdomage_Legs2","slot":3,"age":5,"label":"Knight's Boots","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5012":{"name":"kingdomage_Hands2","slot":4,"age":5,"label":"Knight's Gloves","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5013":{"name":"kingdomage_Weapon2","slot":5,"age":5,"label":"Knight's Sword","hp":0,"damage":2040,"ranged":false,"animation":"sword","interval":1.1},"5014":{"name":"kingdomage_Ring2","slot":6,"age":5,"label":"King's Ring","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5015":{"name":"kingdomage_Necklace2","slot":7,"age":5,"label":"Paladin's Necklace","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5016":{"name":"kingdomage_Belt2","slot":8,"age":5,"label":"Knight's Belt","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5017":{"name":"kingdomage_Head3","slot":1,"age":5,"label":"Paladin's Helmet","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5018":{"name":"kingdomage_Armor3","slot":2,"age":5,"label":"Paladin's Armor","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5019":{"name":"kingdomage_Legs3","slot":3,"age":5,"label":"Paladin's Boots","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5020":{"name":"kingdomage_Hands3","slot":4,"age":5,"label":"Paladin's Gloves","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5021":{"name":"kingdomage_Weapon3","slot":5,"age":5,"label":"Paladin's Sword and Shield","hp":0,"damage":2040,"ranged":false,"animation":"shield","interval":1.1},"5022":{"name":"kingdomage_Ring3","slot":6,"age":5,"label":"Paladin's Ring","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5023":{"name":"kingdomage_Necklace3","slot":7,"age":5,"label":"King's Necklaces","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5024":{"name":"kingdomage_Belt3","slot":8,"age":5,"label":"King's Belt","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5025":{"name":"kingdomage_Head4","slot":1,"age":5,"label":"Jester Hat","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5026":{"name":"kingdomage_Armor4","slot":2,"age":5,"label":"Jester Outfit","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5027":{"name":"kingdomage_Legs4","slot":3,"age":5,"label":"Jester Boots","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5028":{"name":"kingdomage_Hands4","slot":4,"age":5,"label":"Jester Gloves","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5029":{"name":"kingdomage_Weapon4","slot":5,"age":5,"label":"Daisy Lute","hp":0,"damage":2040,"ranged":false,"animation":null,"interval":1.1},"5030":{"name":"kingdomage_Ring4","slot":6,"age":5,"label":"Jester Ring","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5031":{"name":"kingdomage_Necklace4","slot":7,"age":5,"label":"Jester Necklace","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5032":{"name":"kingdomage_Belt4","slot":8,"age":5,"label":"Jester Belt","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5033":{"name":"kingdomage_Head5","slot":1,"age":5,"label":"Executioner Hood","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5034":{"name":"kingdomage_Armor5","slot":2,"age":5,"label":"Executioner Outfit","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5035":{"name":"kingdomage_Legs5","slot":3,"age":5,"label":"Executioner Boots","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"5036":{"name":"kingdomage_Hands5","slot":4,"age":5,"label":"Executioner Gloves","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5037":{"name":"kingdomage_Weapon5","slot":5,"age":5,"label":"Executioner Axe","hp":0,"damage":2040,"ranged":false,"animation":null,"interval":1.1},"5038":{"name":"kingdomage_Ring5","slot":6,"age":5,"label":"Ring of Death","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5039":{"name":"kingdomage_Necklace5","slot":7,"age":5,"label":"Executioner Necklace","hp":0,"damage":1280,"ranged":false,"animation":null,"interval":1},"5040":{"name":"kingdomage_Belt5","slot":8,"age":5,"label":"Executioner Chain","hp":10200,"damage":0,"ranged":false,"animation":null,"interval":1},"6001":{"name":"renaissanceage_Head1","slot":1,"age":6,"label":"Steel Helmet","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6002":{"name":"renaissanceage_Armor1","slot":2,"age":6,"label":"Mercenary Cuirass","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6003":{"name":"renaissanceage_Legs1","slot":3,"age":6,"label":"Soldier Boots","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6004":{"name":"renaissanceage_Hands1","slot":4,"age":6,"label":"Fighter Gloves","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6005":{"name":"renaissanceage_Weapon1","slot":5,"age":6,"label":"Landsknecht Axe","hp":0,"damage":8190,"ranged":false,"animation":"spear","interval":1.1},"6006":{"name":"renaissanceage_Ring1","slot":6,"age":6,"label":"Soldier Ring","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6007":{"name":"renaissanceage_Necklace1","slot":7,"age":6,"label":"Shield Pendant","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6008":{"name":"renaissanceage_Belt1","slot":8,"age":6,"label":"Mercenary Belt","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6009":{"name":"renaissanceage_Head2","slot":1,"age":6,"label":"Musketeer Hat","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6010":{"name":"renaissanceage_Armor2","slot":2,"age":6,"label":"Templar Tabard","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6011":{"name":"renaissanceage_Legs2","slot":3,"age":6,"label":"Rose Boot","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6012":{"name":"renaissanceage_Hands2","slot":4,"age":6,"label":"Marksman Glove","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6013":{"name":"renaissanceage_Weapon2","slot":5,"age":6,"label":"Musket Pistol","hp":0,"damage":5120,"ranged":true,"animation":"gun","interval":1.5},"6014":{"name":"renaissanceage_Ring2","slot":6,"age":6,"label":"Fleur-de-Lis Ring","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6015":{"name":"renaissanceage_Necklace2","slot":7,"age":6,"label":"Sapphire Pendant","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6016":{"name":"renaissanceage_Belt2","slot":8,"age":6,"label":"Musketeer Belt","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6017":{"name":"renaissanceage_Head3","slot":1,"age":6,"label":"Pirate Hat","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6018":{"name":"renaissanceage_Armor3","slot":2,"age":6,"label":"Corsair Coat","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6019":{"name":"renaissanceage_Legs3","slot":3,"age":6,"label":"Fighter Greaves","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6020":{"name":"renaissanceage_Hands3","slot":4,"age":6,"label":"Pirate Hook","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6021":{"name":"renaissanceage_Weapon3","slot":5,"age":6,"label":"Boarding Sabre","hp":0,"damage":8190,"ranged":false,"animation":"sword","interval":1.1},"6022":{"name":"renaissanceage_Ring3","slot":6,"age":6,"label":"Twisted Ring","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6023":{"name":"renaissanceage_Necklace3","slot":7,"age":6,"label":"Anchor Pendant","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6024":{"name":"renaissanceage_Belt3","slot":8,"age":6,"label":"Pirate Belt","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6025":{"name":"renaissanceage_Head4","slot":1,"age":6,"label":"Painter Beret","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6026":{"name":"renaissanceage_Armor4","slot":2,"age":6,"label":"Hidalgo Doublet","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6027":{"name":"renaissanceage_Legs4","slot":3,"age":6,"label":"Hidalgo Boot","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6028":{"name":"renaissanceage_Hands4","slot":4,"age":6,"label":"Noble Glove","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6029":{"name":"renaissanceage_Weapon4","slot":5,"age":6,"label":"Sniper Musket","hp":0,"damage":5120,"ranged":true,"animation":"shotgun","interval":1.5},"6030":{"name":"renaissanceage_Ring4","slot":6,"age":6,"label":"Templar Ring","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6031":{"name":"renaissanceage_Necklace4","slot":7,"age":6,"label":"Amber Beads","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6032":{"name":"renaissanceage_Belt4","slot":8,"age":6,"label":"Conquistador Belt","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6033":{"name":"renaissanceage_Head5","slot":1,"age":6,"label":"Mage Hood","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6034":{"name":"renaissanceage_Armor5","slot":2,"age":6,"label":"Alchemist Robe","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6035":{"name":"renaissanceage_Legs5","slot":3,"age":6,"label":"Harlequin Shoe","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"6036":{"name":"renaissanceage_Hands5","slot":4,"age":6,"label":"Alchemist Glove","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6037":{"name":"renaissanceage_Weapon5","slot":5,"age":6,"label":"Staff of Light","hp":0,"damage":8190,"ranged":false,"animation":null,"interval":1.1},"6038":{"name":"renaissanceage_Ring5","slot":6,"age":6,"label":"Ruby Ring","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6039":{"name":"renaissanceage_Necklace5","slot":7,"age":6,"label":"Coral Beads","hp":0,"damage":5120,"ranged":false,"animation":null,"interval":1},"6040":{"name":"renaissanceage_Belt5","slot":8,"age":6,"label":"Harlequin Belt","hp":40900,"damage":0,"ranged":false,"animation":null,"interval":1},"7001":{"name":"industrialage_Head1","slot":1,"age":7,"label":"Miner Helmet","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7002":{"name":"industrialage_Armor1","slot":2,"age":7,"label":"Mechanic Jumpsuit","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7003":{"name":"industrialage_Legs1","slot":3,"age":7,"label":"Riveter Boots","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7004":{"name":"industrialage_Hands1","slot":4,"age":7,"label":"Worker Glove","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7005":{"name":"industrialage_Weapon1","slot":5,"age":7,"label":"Wrench","hp":0,"damage":32700,"ranged":false,"animation":null,"interval":1.1},"7006":{"name":"industrialage_Ring1","slot":6,"age":7,"label":"Nut Ring","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7007":{"name":"industrialage_Necklace1","slot":7,"age":7,"label":"Foreman Token","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7008":{"name":"industrialage_Belt1","slot":8,"age":7,"label":"Tool Belt","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7009":{"name":"industrialage_Head2","slot":1,"age":7,"label":"Magnate Top Hat","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7010":{"name":"industrialage_Armor2","slot":2,"age":7,"label":"Industrialist Coat","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7011":{"name":"industrialage_Legs2","slot":3,"age":7,"label":"Patent Shoes","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7012":{"name":"industrialage_Hands2","slot":4,"age":7,"label":"Gentleman Glove","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7013":{"name":"industrialage_Weapon2","slot":5,"age":7,"label":"Magnate Cane","hp":0,"damage":32700,"ranged":false,"animation":null,"interval":1.1},"7014":{"name":"industrialage_Ring2","slot":6,"age":7,"label":"Emerald Ring","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7015":{"name":"industrialage_Necklace2","slot":7,"age":7,"label":"Emerald Chain","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7016":{"name":"industrialage_Belt2","slot":8,"age":7,"label":"Banker Belt","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7017":{"name":"industrialage_Head3","slot":1,"age":7,"label":"Officer Cap","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7018":{"name":"industrialage_Armor3","slot":2,"age":7,"label":"Officer Uniform","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7019":{"name":"industrialage_Legs3","slot":3,"age":7,"label":"Patrol Boots","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7020":{"name":"industrialage_Hands3","slot":4,"age":7,"label":"Shooter Gloves","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7021":{"name":"industrialage_Weapon3","slot":5,"age":7,"label":"Service Rifle","hp":0,"damage":20400,"ranged":true,"animation":"shotgun","interval":1.5},"7022":{"name":"industrialage_Ring3","slot":6,"age":7,"label":"Officer Signet Ring","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7023":{"name":"industrialage_Necklace3","slot":7,"age":7,"label":"Bullet Pendant","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7024":{"name":"industrialage_Belt3","slot":8,"age":7,"label":"Bandolier","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7025":{"name":"industrialage_Head4","slot":1,"age":7,"label":"Admiral Tricorn","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7026":{"name":"industrialage_Armor4","slot":2,"age":7,"label":"Admiral Uniform","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7027":{"name":"industrialage_Legs4","slot":3,"age":7,"label":"Admiral Boots","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7028":{"name":"industrialage_Hands4","slot":4,"age":7,"label":"Ceremonial Glove","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7029":{"name":"industrialage_Weapon4","slot":5,"age":7,"label":"Officer Sabre","hp":0,"damage":32700,"ranged":false,"animation":"sword","interval":1.1},"7030":{"name":"industrialage_Ring4","slot":6,"age":7,"label":"Ruby Signet Ring","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7031":{"name":"industrialage_Necklace4","slot":7,"age":7,"label":"Order of Valor","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7032":{"name":"industrialage_Belt4","slot":8,"age":7,"label":"Ceremonial Belt","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7033":{"name":"industrialage_Head5","slot":1,"age":7,"label":"Inventor Goggles","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7034":{"name":"industrialage_Armor5","slot":2,"age":7,"label":"Chemist Robe","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7035":{"name":"industrialage_Legs5","slot":3,"age":7,"label":"Laboratory Boot","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"7036":{"name":"industrialage_Hands5","slot":4,"age":7,"label":"Acid Glove","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7037":{"name":"industrialage_Weapon5","slot":5,"age":7,"label":"Radium Charge","hp":0,"damage":20400,"ranged":true,"animation":"grenade","interval":1.5},"7038":{"name":"industrialage_Ring5","slot":6,"age":7,"label":"Spark Ring","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7039":{"name":"industrialage_Necklace5","slot":7,"age":7,"label":"Radium Pendant","hp":0,"damage":20400,"ranged":false,"animation":null,"interval":1},"7040":{"name":"industrialage_Belt5","slot":8,"age":7,"label":"Magnetic Belt","hp":163000,"damage":0,"ranged":false,"animation":null,"interval":1},"8001":{"name":"modernage_Head1","slot":1,"age":8,"label":"Ranger Cap","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8002":{"name":"modernage_Armor1","slot":2,"age":8,"label":"Ranger Tactical Vest","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8003":{"name":"modernage_Legs1","slot":3,"age":8,"label":"Ranger Boots","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8004":{"name":"modernage_Hands1","slot":4,"age":8,"label":"Ranger Gloves","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8005":{"name":"modernage_Weapon1","slot":5,"age":8,"label":"Pump-Action Shotgun","hp":0,"damage":81900,"ranged":true,"animation":"shotgun","interval":1.5},"8006":{"name":"modernage_Ring1","slot":6,"age":8,"label":"Ranger Ring","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8007":{"name":"modernage_Necklace1","slot":7,"age":8,"label":"Dog Tag","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8008":{"name":"modernage_Belt1","slot":8,"age":8,"label":"Tactical Belt","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8009":{"name":"modernage_Head2","slot":1,"age":8,"label":"Agent Glasses","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8010":{"name":"modernage_Armor2","slot":2,"age":8,"label":"Agent Suit","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8011":{"name":"modernage_Legs2","slot":3,"age":8,"label":"Agent Shoes","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8012":{"name":"modernage_Hands2","slot":4,"age":8,"label":"Agent Gloves","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8013":{"name":"modernage_Weapon2","slot":5,"age":8,"label":"Agent Pistol","hp":0,"damage":81900,"ranged":true,"animation":"gun","interval":1.5},"8014":{"name":"modernage_Ring2","slot":6,"age":8,"label":"Golden Ring","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8015":{"name":"modernage_Necklace2","slot":7,"age":8,"label":"Dollar Pendant","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8016":{"name":"modernage_Belt2","slot":8,"age":8,"label":"Agent Belt","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8017":{"name":"modernage_Head3","slot":1,"age":8,"label":"Special Forces Helmet","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8018":{"name":"modernage_Armor3","slot":2,"age":8,"label":"Special Forces Vest","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8019":{"name":"modernage_Legs3","slot":3,"age":8,"label":"Special Forces Boots","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8020":{"name":"modernage_Hands3","slot":4,"age":8,"label":"Special Forces Gloves","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8021":{"name":"modernage_Weapon3","slot":5,"age":8,"label":"Assault Rifle","hp":0,"damage":81900,"ranged":true,"animation":"gun","interval":1.5},"8022":{"name":"modernage_Ring3","slot":6,"age":8,"label":"Scope Ring","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8023":{"name":"modernage_Necklace3","slot":7,"age":8,"label":"Special Forces Tag","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8024":{"name":"modernage_Belt3","slot":8,"age":8,"label":"Special Forces Belt","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8025":{"name":"modernage_Head4","slot":1,"age":8,"label":"Construction Helmet","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8026":{"name":"modernage_Armor4","slot":2,"age":8,"label":"Safety Vest","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8027":{"name":"modernage_Legs4","slot":3,"age":8,"label":"Installer Sneakers","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8028":{"name":"modernage_Hands4","slot":4,"age":8,"label":"Installer Glove","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8029":{"name":"modernage_Weapon4","slot":5,"age":8,"label":"Baseball Bat","hp":0,"damage":131000,"ranged":false,"animation":null,"interval":1.1},"8030":{"name":"modernage_Ring4","slot":6,"age":8,"label":"Spiked Ring","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8031":{"name":"modernage_Necklace4","slot":7,"age":8,"label":"Gold Chain","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8032":{"name":"modernage_Belt4","slot":8,"age":8,"label":"Studded Belt","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8033":{"name":"modernage_Head5","slot":1,"age":8,"label":"Gaming Headset","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8034":{"name":"modernage_Armor5","slot":2,"age":8,"label":"Gamer Jacket","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8035":{"name":"modernage_Legs5","slot":3,"age":8,"label":"Gamer Sneakers","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8036":{"name":"modernage_Hands5","slot":4,"age":8,"label":"Cyber Glove","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8037":{"name":"modernage_Weapon5","slot":5,"age":8,"label":"Smartphone","hp":0,"damage":81900,"ranged":true,"animation":"grenade","interval":1.5},"8038":{"name":"modernage_Ring5","slot":6,"age":8,"label":"Neon Ring","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8039":{"name":"modernage_Necklace5","slot":7,"age":8,"label":"Gamepad Pendant","hp":0,"damage":81900,"ranged":false,"animation":null,"interval":1},"8040":{"name":"modernage_Belt5","slot":8,"age":8,"label":"Smart Belt","hp":655000,"damage":0,"ranged":false,"animation":null,"interval":1},"8041":{"name":"modernage_Weapon6","slot":5,"age":8,"label":"Knife","hp":0,"damage":131000,"ranged":false,"animation":"sword","interval":1.1},"8042":{"name":"modernage_Weapon7","slot":5,"age":8,"label":"Hammer","hp":0,"damage":131000,"ranged":false,"animation":"two_hand","interval":1.1},"9001":{"name":"digitalage_Head1","slot":1,"age":9,"label":"Hacker Visor","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9002":{"name":"digitalage_Armor1","slot":2,"age":9,"label":"Hacker Hoodie","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9003":{"name":"digitalage_Legs1","slot":3,"age":9,"label":"Hacker Sneakers","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9004":{"name":"digitalage_Hands1","slot":4,"age":9,"label":"Hacker Gloves","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9005":{"name":"digitalage_Weapon1","slot":5,"age":9,"label":"Cyber Katana","hp":0,"damage":524000,"ranged":false,"animation":"sword","interval":1.1},"9006":{"name":"digitalage_Ring1","slot":6,"age":9,"label":"Hacker Ring","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9007":{"name":"digitalage_Necklace1","slot":7,"age":9,"label":"Chip Pendant","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9008":{"name":"digitalage_Belt1","slot":8,"age":9,"label":"Hacker Belt","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9009":{"name":"digitalage_Head2","slot":1,"age":9,"label":"Crypto Dreads","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9010":{"name":"digitalage_Armor2","slot":2,"age":9,"label":"Crypto Jacket","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9011":{"name":"digitalage_Legs2","slot":3,"age":9,"label":"Crypto Sneakers","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9012":{"name":"digitalage_Hands2","slot":4,"age":9,"label":"Crypto Gloves","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9013":{"name":"digitalage_Weapon2","slot":5,"age":9,"label":"Cyber Bomb","hp":0,"damage":327000,"ranged":true,"animation":"grenade","interval":1.5},"9014":{"name":"digitalage_Ring2","slot":6,"age":9,"label":"Crypto Ring","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9015":{"name":"digitalage_Necklace2","slot":7,"age":9,"label":"Cyber Pendant","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9016":{"name":"digitalage_Belt2","slot":8,"age":9,"label":"Crypto Belt","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9017":{"name":"digitalage_Head3","slot":1,"age":9,"label":"Cyber Helmet","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9018":{"name":"digitalage_Armor3","slot":2,"age":9,"label":"Cyber Jacket","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9019":{"name":"digitalage_Legs3","slot":3,"age":9,"label":"Cyber Boots","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9020":{"name":"digitalage_Hands3","slot":4,"age":9,"label":"Cyber Gloves","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9021":{"name":"digitalage_Weapon3","slot":5,"age":9,"label":"Neon Blaster","hp":0,"damage":327000,"ranged":true,"animation":"gun","interval":1.5},"9022":{"name":"digitalage_Ring3","slot":6,"age":9,"label":"Cyber Ring","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9023":{"name":"digitalage_Necklace3","slot":7,"age":9,"label":"Cyber Pendant","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9024":{"name":"digitalage_Belt3","slot":8,"age":9,"label":"Cyber Belt","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9025":{"name":"digitalage_Head4","slot":1,"age":9,"label":"Cyber Eye","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9026":{"name":"digitalage_Armor4","slot":2,"age":9,"label":"Cyborg Armor","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9027":{"name":"digitalage_Legs4","slot":3,"age":9,"label":"Cyborg Boots","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9028":{"name":"digitalage_Hands4","slot":4,"age":9,"label":"Cyborg Gloves","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9029":{"name":"digitalage_Weapon4","slot":5,"age":9,"label":"Power Fist","hp":0,"damage":524000,"ranged":false,"animation":"empty","interval":1.1},"9030":{"name":"digitalage_Ring4","slot":6,"age":9,"label":"Cyborg Ring","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9031":{"name":"digitalage_Necklace4","slot":7,"age":9,"label":"Energy Core","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9032":{"name":"digitalage_Belt4","slot":8,"age":9,"label":"Cyborg Belt","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9033":{"name":"digitalage_Head5","slot":1,"age":9,"label":"Neon Hair","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9034":{"name":"digitalage_Armor5","slot":2,"age":9,"label":"Neon Jacket","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9035":{"name":"digitalage_Legs5","slot":3,"age":9,"label":"Neon Sneakers","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9036":{"name":"digitalage_Hands5","slot":4,"age":9,"label":"Neon Gloves","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9037":{"name":"digitalage_Weapon5","slot":5,"age":9,"label":"Neon Blaster","hp":0,"damage":327000,"ranged":true,"animation":"minigun","interval":1.5},"9038":{"name":"digitalage_Ring5","slot":6,"age":9,"label":"Neon Ring","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9039":{"name":"digitalage_Necklace5","slot":7,"age":9,"label":"Power Bank","hp":0,"damage":327000,"ranged":false,"animation":null,"interval":1},"9040":{"name":"digitalage_Belt5","slot":8,"age":9,"label":"Neon Belt","hp":2620000,"damage":0,"ranged":false,"animation":null,"interval":1},"9041":{"name":"digitalage_Weapon6","slot":5,"age":9,"label":"Cyber Axe","hp":0,"damage":524000,"ranged":false,"animation":"two_hand","interval":1.1},"9042":{"name":"digitalage_Weapon7","slot":5,"age":9,"label":"Neon Bat","hp":0,"damage":524000,"ranged":false,"animation":null,"interval":1.1},"10001":{"name":"spaceage_Head1","slot":1,"age":10,"label":"Astronaut Helmet","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10002":{"name":"spaceage_Armor1","slot":2,"age":10,"label":"Spacesuit","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10003":{"name":"spaceage_Legs1","slot":3,"age":10,"label":"Moon Boots","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10004":{"name":"spaceage_Hands1","slot":4,"age":10,"label":"Astronaut Gloves","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10005":{"name":"spaceage_Weapon1","slot":5,"age":10,"label":"Ray Gun","hp":0,"damage":1310000,"ranged":true,"animation":"gun","interval":1.5},"10006":{"name":"spaceage_Ring1","slot":6,"age":10,"label":"Astronaut Ring","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10007":{"name":"spaceage_Necklace1","slot":7,"age":10,"label":"Saturn Pendant","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10008":{"name":"spaceage_Belt1","slot":8,"age":10,"label":"Astronaut Belt","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10009":{"name":"spaceage_Head2","slot":1,"age":10,"label":"Colonist Helmet","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10010":{"name":"spaceage_Armor2","slot":2,"age":10,"label":"Colonist Armor","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10011":{"name":"spaceage_Legs2","slot":3,"age":10,"label":"Colonist Boots","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10012":{"name":"spaceage_Hands2","slot":4,"age":10,"label":"Colonist Gloves","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10013":{"name":"spaceage_Weapon2","slot":5,"age":10,"label":"Star Blaster","hp":0,"damage":1310000,"ranged":true,"animation":"gun","interval":1.5},"10014":{"name":"spaceage_Ring2","slot":6,"age":10,"label":"Colonist Ring","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10015":{"name":"spaceage_Necklace2","slot":7,"age":10,"label":"Rocket Pendant","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10016":{"name":"spaceage_Belt2","slot":8,"age":10,"label":"Colonist Belt","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10017":{"name":"spaceage_Head3","slot":1,"age":10,"label":"Pilot Visor","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10018":{"name":"spaceage_Armor3","slot":2,"age":10,"label":"Pilot Suit","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10019":{"name":"spaceage_Legs3","slot":3,"age":10,"label":"Pilot Boots","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10020":{"name":"spaceage_Hands3","slot":4,"age":10,"label":"Pilot Gloves","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10021":{"name":"spaceage_Weapon3","slot":5,"age":10,"label":"Laser Rifle","hp":0,"damage":1310000,"ranged":true,"animation":"minigun","interval":1.5},"10022":{"name":"spaceage_Ring3","slot":6,"age":10,"label":"Pilot Ring","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10023":{"name":"spaceage_Necklace3","slot":7,"age":10,"label":"Comet Pendant","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10024":{"name":"spaceage_Belt3","slot":8,"age":10,"label":"Pilot Belt","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10025":{"name":"spaceage_Head4","slot":1,"age":10,"label":"Marine Helmet","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10026":{"name":"spaceage_Armor4","slot":2,"age":10,"label":"Marine Armor","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10027":{"name":"spaceage_Legs4","slot":3,"age":10,"label":"Marine Boots","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10028":{"name":"spaceage_Hands4","slot":4,"age":10,"label":"Marine Gloves","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10029":{"name":"spaceage_Weapon4","slot":5,"age":10,"label":"Plasma Cannon","hp":0,"damage":1310000,"ranged":true,"animation":"gun","interval":1.5},"10030":{"name":"spaceage_Ring4","slot":6,"age":10,"label":"Marine Ring","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10031":{"name":"spaceage_Necklace4","slot":7,"age":10,"label":"Fang Pendant","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10032":{"name":"spaceage_Belt4","slot":8,"age":10,"label":"Marine Belt","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10033":{"name":"spaceage_Head5","slot":1,"age":10,"label":"Hunter Helmet","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10034":{"name":"spaceage_Armor5","slot":2,"age":10,"label":"Hunter Armor","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10035":{"name":"spaceage_Legs5","slot":3,"age":10,"label":"Hunter Boots","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10036":{"name":"spaceage_Hands5","slot":4,"age":10,"label":"Hunter Gloves","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10037":{"name":"spaceage_Weapon5","slot":5,"age":10,"label":"Ion Rifle","hp":0,"damage":1310000,"ranged":true,"animation":"minigun","interval":1.5},"10038":{"name":"spaceage_Ring5","slot":6,"age":10,"label":"Hunter Ring","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10039":{"name":"spaceage_Necklace5","slot":7,"age":10,"label":"Moon Pendant","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10040":{"name":"spaceage_Belt5","slot":8,"age":10,"label":"Hunter Belt","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10041":{"name":"spaceage_Head6","slot":1,"age":10,"label":"Space Warden Beard","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10042":{"name":"spaceage_Armor6","slot":2,"age":10,"label":"Space Warden Robe","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10043":{"name":"spaceage_Legs6","slot":3,"age":10,"label":"Space Warden Boots","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10044":{"name":"spaceage_Hands6","slot":4,"age":10,"label":"Space Warden Gloves","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10045":{"name":"spaceage_Weapon6","slot":5,"age":10,"label":"Sword of Light","hp":0,"damage":2100000,"ranged":false,"animation":"sword","interval":1.1},"10046":{"name":"spaceage_Ring6","slot":6,"age":10,"label":"Space Warden Ring","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10047":{"name":"spaceage_Necklace6","slot":7,"age":10,"label":"Crystal Pendant","hp":0,"damage":1310000,"ranged":false,"animation":null,"interval":1},"10048":{"name":"spaceage_Belt6","slot":8,"age":10,"label":"Space Warden Belt","hp":10400000,"damage":0,"ranged":false,"animation":null,"interval":1},"10049":{"name":"spaceage_Weapon7","slot":5,"age":10,"label":"Cyber Cutter","hp":0,"damage":2100000,"ranged":false,"animation":"sword","interval":1.1},"10050":{"name":"spaceage_Weapon8","slot":5,"age":10,"label":"Cosmic Scythe","hp":0,"damage":2100000,"ranged":false,"animation":"two_hand","interval":1.1}},"pets":{"1":{"name":"rat","grade":1},"2":{"name":"turtle","grade":1},"3":{"name":"scarab","grade":2},"4":{"name":"dog","grade":2},"5":{"name":"boar","grade":3},"6":{"name":"mastiff","grade":3},"7":{"name":"bull","grade":4},"8":{"name":"jaguar","grade":5},"9":{"name":"astro","grade":6},"10":{"name":"leon","grade":1},"11":{"name":"cat","grade":1},"12":{"name":"goose","grade":2},"13":{"name":"monkey","grade":2},"14":{"name":"owl","grade":2},"15":{"name":"snail","grade":2},"16":{"name":"battleship","grade":3},"17":{"name":"spider","grade":3},"18":{"name":"goat","grade":4},"19":{"name":"mause","grade":4},"20":{"name":"panda","grade":4},"21":{"name":"capybara","grade":4},"22":{"name":"crow","grade":5},"23":{"name":"fish","grade":5},"24":{"name":"griffin","grade":5},"25":{"name":"hamster","grade":5},"26":{"name":"pig","grade":6},"27":{"name":"rabbit","grade":6},"28":{"name":"worm","grade":6}},"eggChances":[[99,1],[98,2],[95,5],[89.95,10,0.05],[88.54,11.4,0.06],[86.93,13,0.07],[85.1,14.82,0.08],[83,16.89,0.11],[80.61,19.25,0.14],[77.88,21.95,0.17],[74.76,25.03,0.21],[71.21,28.52,0.27],[67.14,32.52,0.34],[62.51,37.07,0.42],[57.21,42.27,0.52],[51.17,48.17,0.66],[44.26,54.92,0.82],[36.36,62.62,1.02],[27.34,71.38,1.28],[17.5,80.9,1.6],[17.5,80.48,2,0.02],[17.5,80.07,2.4,0.03],[17.5,79.58,2.88,0.04],[17.5,79,3.45,0.05],[17.5,78.31,4.13,0.06],[17.5,77.47,4.96,0.07],[17.5,76.47,5.94,0.09],[17.5,75.27,7.12,0.11],[17.5,73.82,8.54,0.14],[17.5,72.09,10.24,0.17],[17.5,70,12.29,0.21],[17.5,67.51,14.72,0.27],[17.5,64.51,17.65,0.34],[17.5,60.91,21.17,0.42],[17.5,56.6,25.38,0.52],[17.5,51.41,30.43,0.66],[17.5,45.19,36.49,0.82],[17.5,37.73,43.75,1.02],[17.5,28.77,52.45,1.28],[17.5,18.01,62.89,1.6],[17.5,16.5,63.98,2,0.02],[17.5,16.5,63.61,2.36,0.03],[17.5,16.5,63.18,2.78,0.04],[17.5,16.5,62.67,3.28,0.05],[17.5,16.5,62.07,3.87,0.06],[17.5,16.5,61.35,4.58,0.07],[17.5,16.5,60.51,5.4,0.09],[17.5,16.5,59.52,6.37,0.11],[17.5,16.5,58.34,7.52,0.14],[17.5,16.5,56.96,8.87,0.17],[17.5,16.5,55.32,10.47,0.21],[17.5,16.5,53.38,12.35,0.27],[17.5,16.5,51.09,14.57,0.34],[17.5,16.5,48.38,17.2,0.42],[17.5,16.5,45.18,20.3,0.52],[17.5,16.5,41.4,23.94,0.66],[17.5,16.5,36.92,28.26,0.82],[17.5,16.5,31.63,33.35,1.02],[17.5,16.5,25.37,39.35,1.28],[17.5,16.5,17.97,46.43,1.6],[17.5,16.5,16.5,47.48,2,0.02],[17.5,16.5,16.5,47.17,2.3,0.03],[17.5,16.5,16.5,46.81,2.65,0.04],[17.5,16.5,16.5,46.41,3.04,0.05],[17.5,16.5,16.5,45.94,3.5,0.06],[17.5,16.5,16.5,45.41,4.02,0.07],[17.5,16.5,16.5,44.78,4.63,0.09],[17.5,16.5,16.5,44.07,5.32,0.11],[17.5,16.5,16.5,43.24,6.12,0.14],[17.5,16.5,16.5,42.29,7.04,0.17],[17.5,16.5,16.5,41.19,8.1,0.21],[17.5,16.5,16.5,39.93,9.3,0.27],[17.5,16.5,16.5,38.46,10.7,0.34],[17.5,16.5,16.5,36.77,12.31,0.42],[17.5,16.5,16.5,34.82,14.16,0.52],[17.5,16.5,16.5,32.57,16.27,0.66],[17.5,16.5,16.5,29.97,18.71,0.82],[17.5,16.5,16.5,26.95,21.53,1.02],[17.5,16.5,16.5,23.47,24.75,1.28],[17.5,16.5,16.5,19.44,28.46,1.6],[17.5,16.5,16.5,16.5,31,2],[17.5,16.5,16.5,16.5,30.76,2.24],[17.5,16.5,16.5,16.5,30.49,2.51],[17.5,16.5,16.5,16.5,30.19,2.81],[17.5,16.5,16.5,16.5,29.85,3.15],[17.5,16.5,16.5,16.5,29.48,3.52],[17.5,16.5,16.5,16.5,29.05,3.95],[17.5,16.5,16.5,16.5,28.58,4.42],[17.5,16.5,16.5,16.5,28.05,4.95],[17.5,16.5,16.5,16.5,27.45,5.55],[17.5,16.5,16.5,16.5,26.79,6.21],[17.5,16.5,16.5,16.5,26.04,6.96],[17.5,16.5,16.5,16.5,25.21,7.79],[17.5,16.5,16.5,16.5,24.27,8.73],[17.5,16.5,16.5,16.5,23.23,9.77],[17.5,16.5,16.5,16.5,22.05,10.95],[17.5,16.5,16.5,16.5,20.74,12.26],[17.5,16.5,16.5,16.5,19.27,13.73],[17.5,16.5,16.5,16.5,17.62,15.38],[17.5,16.5,16.5,16.5,16.5,16.5]],"eggDungeonMax":130,"mounts":{"1":{"name":"horse1","grade":1},"2":{"name":"boar","grade":1},"3":{"name":"mammoth","grade":1},"200":{"name":"camel","grade":2},"201":{"name":"horse2","grade":2},"300":{"name":"bull","grade":3},"301":{"name":"horse3","grade":3},"400":{"name":"crock","grade":4},"500":{"name":"tiger","grade":5},"600":{"name":"rhino","grade":6}},"mountSummonMax":40,"skillSummonMax":40,"mountLevelMax":100,"petLevelMax":100,"research":{"forge":{"1":{"stat":"upgrade_cost","levels":5,"layer":0,"reqs":[],"name":"Efficient Forging"},"2":{"stat":"timer_speed","levels":5,"layer":0,"reqs":[],"name":"Rapid Forging"},"3":{"stat":"item_sell_price","levels":5,"layer":1,"reqs":["1","2"],"name":"Trade Mastery"},"4":{"stat":"free_chance","levels":5,"layer":2,"reqs":["3"],"name":"Lucky Craft"},"5":{"stat":"timer_speed","levels":5,"layer":2,"reqs":["3"],"name":"Rapid Forging"},"6":{"stat":"auto_hammer_increase","levels":1,"layer":3,"reqs":["4","5"],"name":"Auto-forge"},"7":{"stat":"offline_hammers_boost","levels":5,"layer":4,"reqs":["6"],"name":"Idle Hammers"},"8":{"stat":"offline_coin_boost","levels":5,"layer":4,"reqs":["6"],"name":"Idle Income"},"9":{"stat":"upgrade_cost","levels":5,"layer":5,"reqs":["7","8"],"name":"Efficient Forging"},"10":{"stat":"free_chance","levels":5,"layer":6,"reqs":["9"],"name":"Lucky Craft"},"11":{"stat":"hammer_dungeon_boost","levels":5,"layer":6,"reqs":["9"],"name":"Hammer Yield"},"12":{"stat":"item_sell_price","levels":5,"layer":7,"reqs":["10","11"],"name":"Trade Mastery"},"13":{"stat":"offline_hammers_boost","levels":5,"layer":8,"reqs":["12"],"name":"Idle Hammers"},"14":{"stat":"free_chance","levels":5,"layer":8,"reqs":["12"],"name":"Lucky Craft"},"15":{"stat":"offline_coin_boost","levels":5,"layer":8,"reqs":["12"],"name":"Idle Income"},"16":{"stat":"auto_hammer_increase","levels":1,"layer":9,"reqs":["13","14","15"],"name":"Auto-forge"},"17":{"stat":"upgrade_cost","levels":5,"layer":10,"reqs":["16"],"name":"Efficient Forging"},"18":{"stat":"timer_speed","levels":5,"layer":10,"reqs":["16"],"name":"Rapid Forging"},"19":{"stat":"offline_max_time_boost","levels":5,"layer":11,"reqs":["17","18"],"name":"Extended Idle"}},"power":{"1":{"stat":"atk_weapon","levels":5,"layer":0,"reqs":[],"name":"Weapon Power"},"2":{"stat":"hp_helmet","levels":5,"layer":0,"reqs":[],"name":"Helmet Vitality"},"3":{"stat":"atk_glove","levels":5,"layer":1,"reqs":["1"],"name":"Glove Power"},"4":{"stat":"hp_armor","levels":5,"layer":1,"reqs":["2"],"name":"Armor Vitality"},"5":{"stat":"atk_necklace","levels":5,"layer":2,"reqs":["3"],"name":"Necklace Power"},"6":{"stat":"hp_shoe","levels":5,"layer":2,"reqs":["4"],"name":"Boots Vitality"},"7":{"stat":"atk_ring","levels":5,"layer":3,"reqs":["5"],"name":"Ring Power"},"8":{"stat":"hp_belt","levels":5,"layer":3,"reqs":["6"],"name":"Belt Vitality"},"9":{"stat":"tech_dungeon_boost","levels":5,"layer":4,"reqs":["7","8"],"name":"Tech Yield"},"10":{"stat":"boss_pressure","levels":5,"layer":5,"reqs":["9"],"name":"Boss Pressure"},"11":{"stat":"backline_punisher","levels":5,"layer":5,"reqs":["9"],"name":"Backline Punisher"},"12":{"stat":"tech_boost","levels":5,"layer":6,"reqs":["10","11"],"name":"Tech Speed"},"13":{"stat":"atk_weapon","levels":5,"layer":7,"reqs":["12"],"name":"Weapon Power"},"14":{"stat":"hp_armor","levels":5,"layer":7,"reqs":["12"],"name":"Armor Vitality"},"15":{"stat":"tech_dungeon_boost","levels":5,"layer":8,"reqs":["13","14"],"name":"Tech Yield"},"16":{"stat":"atk_weapon","levels":5,"layer":9,"reqs":["15"],"name":"Weapon Power"},"17":{"stat":"hp_helmet","levels":5,"layer":9,"reqs":["15"],"name":"Helmet Vitality"},"18":{"stat":"atk_glove","levels":5,"layer":10,"reqs":["16"],"name":"Glove Power"},"19":{"stat":"hp_armor","levels":5,"layer":10,"reqs":["17"],"name":"Armor Vitality"},"20":{"stat":"atk_necklace","levels":5,"layer":11,"reqs":["18"],"name":"Necklace Power"},"21":{"stat":"hp_shoe","levels":5,"layer":11,"reqs":["19"],"name":"Boots Vitality"},"22":{"stat":"atk_ring","levels":5,"layer":12,"reqs":["20"],"name":"Ring Power"},"23":{"stat":"hp_belt","levels":5,"layer":12,"reqs":["21"],"name":"Belt Vitality"},"24":{"stat":"tech_boost","levels":5,"layer":13,"reqs":["22","23"],"name":"Tech Speed"}},"skills":{"1":{"stat":"tech_cost_reduction","levels":5,"layer":0,"reqs":[],"name":"Tech Efficiency"},"2":{"stat":"adaptive_element_common","levels":5,"layer":0,"reqs":[],"name":"Common Mastery"},"3":{"stat":"skill_dungeon_boost","levels":5,"layer":1,"reqs":["1","2"],"name":"Skill Yield"},"4":{"stat":"skill_passive_damage","levels":5,"layer":2,"reqs":["3"],"name":"Passive Power"},"5":{"stat":"skill_passive_hp","levels":5,"layer":2,"reqs":["3"],"name":"Passive Vitality"},"6":{"stat":"tech_cost_reduction","levels":1,"layer":3,"reqs":["4","5"],"name":"Tech Efficiency"},"7":{"stat":"adaptive_element_common","levels":5,"layer":4,"reqs":["6"],"name":"Common Mastery"},"8":{"stat":"adaptive_element_rare","levels":5,"layer":4,"reqs":["6"],"name":"Rare Mastery"},"9":{"stat":"skill_dungeon_boost","levels":5,"layer":5,"reqs":["7","8"],"name":"Skill Yield"},"10":{"stat":"skill_passive_damage","levels":5,"layer":6,"reqs":["9"],"name":"Passive Power"},"11":{"stat":"skill_passive_hp","levels":5,"layer":6,"reqs":["9"],"name":"Passive Vitality"},"12":{"stat":"tech_cost_reduction","levels":5,"layer":7,"reqs":["10","11"],"name":"Tech Efficiency"},"13":{"stat":"skill_passive_damage","levels":5,"layer":8,"reqs":["12"],"name":"Passive Power"},"14":{"stat":"adaptive_element_epic","levels":5,"layer":8,"reqs":["12"],"name":"Epic Mastery"},"15":{"stat":"adaptive_element_legendary","levels":5,"layer":8,"reqs":["12"],"name":"Legendary Mastery"},"16":{"stat":"adaptive_element_ultimate","levels":1,"layer":9,"reqs":["13","14","15"],"name":"Ultimate Mastery"},"17":{"stat":"adaptive_element_mythic","levels":5,"layer":10,"reqs":["16"],"name":"Mythic Mastery"},"18":{"stat":"cooldown_reset","levels":5,"layer":10,"reqs":["16"],"name":"Reset Chance"},"19":{"stat":"skill_cooldown_mastery","levels":5,"layer":10,"reqs":["16"],"name":"Cooldown Mastery"}},"pets":{"1":{"stat":"pet_bonus_damage_mastery","levels":5,"layer":0,"reqs":[],"name":"Pet Power"},"2":{"stat":"pet_bonus_health_mastery","levels":5,"layer":0,"reqs":[],"name":"Pet Vitality"},"3":{"stat":"extra_egg_chance_mastery","levels":5,"layer":1,"reqs":["1","2"],"name":"Egg Luck"},"4":{"stat":"egg_timer_mastery_common","levels":5,"layer":2,"reqs":["3"],"name":"Common Incubation"},"5":{"stat":"egg_timer_mastery_rare","levels":5,"layer":2,"reqs":["3"],"name":"Rare Incubation"},"6":{"stat":"dual_archetype_bonus","levels":5,"layer":3,"reqs":["4","5"],"name":"Dual Synergy"},"7":{"stat":"pet_bonus_damage_mastery","levels":5,"layer":4,"reqs":["6"],"name":"Pet Power"},"8":{"stat":"pet_bonus_health_mastery","levels":5,"layer":4,"reqs":["6"],"name":"Pet Vitality"},"9":{"stat":"extra_egg_chance_mastery","levels":5,"layer":5,"reqs":["7","8"],"name":"Egg Luck"},"10":{"stat":"egg_timer_mastery_common","levels":5,"layer":6,"reqs":["9"],"name":"Common Incubation"},"11":{"stat":"egg_timer_mastery_rare","levels":5,"layer":6,"reqs":["9"],"name":"Rare Incubation"},"12":{"stat":"dual_archetype_bonus","levels":5,"layer":7,"reqs":["10","11"],"name":"Dual Synergy"},"13":{"stat":"egg_timer_mastery_rare","levels":5,"layer":8,"reqs":["12"],"name":"Rare Incubation"},"14":{"stat":"egg_timer_mastery_epic","levels":5,"layer":8,"reqs":["12"],"name":"Epic Incubation"},"15":{"stat":"egg_timer_mastery_legendary","levels":5,"layer":8,"reqs":["12"],"name":"Legendary Incubation"},"16":{"stat":"extra_egg_chance_mastery","levels":5,"layer":9,"reqs":["13","14","15"],"name":"Egg Luck"},"17":{"stat":"pet_bonus_damage_mastery","levels":5,"layer":10,"reqs":["16"],"name":"Pet Power"},"18":{"stat":"pet_bonus_health_mastery","levels":5,"layer":11,"reqs":["17"],"name":"Pet Vitality"},"19":{"stat":"damage_archetype_bonus","levels":5,"layer":12,"reqs":["18"],"name":"Attackers"},"20":{"stat":"hp_archetype_bonus","levels":5,"layer":13,"reqs":["19"],"name":"Passive"},"21":{"stat":"egg_timer_mastery_ultimate","levels":5,"layer":14,"reqs":["20"],"name":"Ultimate Incubation"},"22":{"stat":"egg_timer_mastery_mythic","levels":5,"layer":15,"reqs":["21"],"name":"Mythic Incubation"},"23":{"stat":"egg_merge_price_boost_common","levels":5,"layer":16,"reqs":["22"],"name":"Common Merge"},"24":{"stat":"egg_merge_price_boost_rare","levels":5,"layer":17,"reqs":["23"],"name":"Rare Merge"},"25":{"stat":"egg_merge_price_boost_epic","levels":5,"layer":18,"reqs":["24"],"name":"Epic Merge"},"26":{"stat":"egg_merge_price_boost_legendary","levels":5,"layer":19,"reqs":["25"],"name":"Legendary Merge"},"27":{"stat":"egg_merge_price_boost_ultimate","levels":5,"layer":20,"reqs":["26"],"name":"Ultimate Merge"},"28":{"stat":"egg_merge_price_boost_mythic","levels":5,"layer":21,"reqs":["27"],"name":"Mythic Merge"}}},"dungeons":{"a":[10,10,10,10,10],"b":[10,10,10,10,10],"c":[130],"d":[10,10,10,10,10]},"mountProgressionMax":100,"arenaLeagues":[{"name":"Bronze 3","points":100},{"name":"Bronze 2","points":200},{"name":"Bronze 1","points":300},{"name":"Silver 3","points":500},{"name":"Silver 2","points":700},{"name":"Silver 1","points":900},{"name":"Gold 3","points":1200},{"name":"Gold 2","points":1500},{"name":"Gold 1","points":2000},{"name":"Platinum 3","points":2500},{"name":"Platinum 2","points":3000},{"name":"Platinum 1","points":3500},{"name":"Diamond 3","points":5000},{"name":"Diamond 2","points":7000},{"name":"Diamond 1","points":9000},{"name":"Master","points":15000},{"name":"Grandmaster","points":20000}],"campaignLevels":[20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20],"forgeMax":34,"skins":{"1":{"slot":1,"set":"1","name":"sets.vampire.head"},"2":{"slot":2,"set":"1","name":"sets.vampire.armor"},"3":{"slot":5,"set":"1","name":"sets.vampire.weapon"},"4":{"slot":9,"set":"1","name":"sets.vampire.mount"},"5":{"slot":1,"set":"2","name":"sets.shadow.head"},"6":{"slot":2,"set":"2","name":"sets.shadow.armor"},"7":{"slot":5,"set":"2","name":"sets.shadow.weapon"},"8":{"slot":9,"set":"2","name":"sets.shadow.mount"},"9":{"slot":3,"set":"2","name":"sets.shadow.legs"},"10":{"slot":4,"set":"2","name":"sets.shadow.hands"},"11":{"slot":6,"set":"2","name":"sets.shadow.ring"},"12":{"slot":7,"set":"2","name":"sets.shadow.neck"},"13":{"slot":8,"set":"2","name":"sets.shadow.belt"},"14":{"slot":1,"set":"3","name":"sets.robobot.head"},"15":{"slot":2,"set":"3","name":"sets.robobot.armor"},"16":{"slot":5,"set":"3","name":"sets.robobot.weapon"},"17":{"slot":9,"set":"3","name":"sets.robobot.mount"},"18":{"slot":3,"set":"3","name":"sets.robobot.legs"},"19":{"slot":4,"set":"3","name":"sets.robobot.hands"},"20":{"slot":6,"set":"3","name":"sets.robobot.ring"},"21":{"slot":7,"set":"3","name":"sets.robobot.neck"},"22":{"slot":8,"set":"3","name":"sets.robobot.belt"},"23":{"slot":1,"set":"4","name":"sets.lemon.head"},"24":{"slot":2,"set":"4","name":"sets.lemon.armor"},"25":{"slot":5,"set":"4","name":"sets.lemon.weapon"},"26":{"slot":9,"set":"4","name":"sets.lemon.mount"},"27":{"slot":3,"set":"4","name":"sets.lemon.legs"},"28":{"slot":4,"set":"4","name":"sets.lemon.hands"},"29":{"slot":6,"set":"4","name":"sets.lemon.ring"},"30":{"slot":7,"set":"4","name":"sets.lemon.neck"},"31":{"slot":8,"set":"4","name":"sets.lemon.belt"}},"gearLevelMax":100,"gearEras":["Primitive Age","Ancient Age","Antiquity Age","Norman Age","Middle Ages","Renaissance Age","Industrial Age","Modern Age","Digital Age","Space Age"],"gearSlots":["Helmet","Armor","Boots","Gloves","Weapon","Ring","Necklace","Belt"],"stashMax":4,"gearAffixOrder":["base_dmg","base_hp","speed","attack_speed","crit_chance","crit_dmg","block_chance","double_chance","lifesteal","regen_hp","attack_range","melee_dmg","range_dmg","skill_dmg","skill_cooldown","aoe_dmg"],"gearAffixes":{"base_dmg":[{"min":0.02,"max":0.05,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1}],"base_hp":[{"min":0.02,"max":0.05,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1}],"melee_dmg":[{"min":0,"max":0,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1}],"range_dmg":[{"min":0,"max":0,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1},{"min":0.05,"max":0.1,"chance":1}],"speed":[{"min":0,"max":0,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1}],"attack_speed":[{"min":0.01,"max":0.03,"chance":1},{"min":0.01,"max":0.03,"chance":1},{"min":0.01,"max":0.03,"chance":1},{"min":0.01,"max":0.03,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1},{"min":0.01,"max":0.05,"chance":1}],"crit_chance":[{"min":0.02,"max":0.05,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1},{"min":0.02,"max":0.03,"chance":1}],"crit_dmg":[{"min":0,"max":0,"chance":1},{"min":0.3,"max":0.5,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1},{"min":0.5,"max":0.75,"chance":1}],"block_chance":[{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1},{"min":0.01,"max":0.01,"chance":1}],"double_chance":[{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1}],"lifesteal":[{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1}],"skill_dmg":[{"min":0,"max":0,"chance":1},{"min":0.1,"max":0.2,"chance":1},{"min":0.1,"max":0.2,"chance":1},{"min":0.1,"max":0.2,"chance":1},{"min":0.1,"max":0.2,"chance":1},{"min":0.1,"max":0.2,"chance":1},{"min":0.1,"max":0.2,"chance":1},{"min":0.12,"max":0.2,"chance":1},{"min":0.12,"max":0.2,"chance":1},{"min":0.12,"max":0.3,"chance":1}],"skill_cooldown":[{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0.01,"chance":1},{"min":0,"max":0.02,"chance":1},{"min":0,"max":0.025,"chance":1}],"regen_hp":[{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1},{"min":0,"max":0,"chance":1}]},"gearAffixLabels":{"base_dmg":"Damage","base_hp":"Health","speed":"Movement speed","attack_speed":"Attack speed","crit_chance":"Critical chance","crit_dmg":"Critical damage","block_chance":"Block chance","double_chance":"Double hit","lifesteal":"Lifesteal","regen_hp":"Health regeneration","attack_range":"Attack range","melee_dmg":"Melee damage","range_dmg":"Ranged damage","skill_dmg":"Skill damage","skill_cooldown":"Cooldown reduction","aoe_dmg":"Area damage"},"gearBonusSeeds":{"1":{"attack_speed":-100741131,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"2":{"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"3":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"4":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"5":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"6":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"7":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"8":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"skill_cooldown":-1275617362,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"9":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"skill_cooldown":-1275617362,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219},"10":{"block_chance":-201351169,"skill_dmg":-1560307714,"speed":-75523075,"range_dmg":-1547747846,"attack_speed":-100741131,"melee_dmg":-1589745166,"crit_dmg":-264347149,"skill_cooldown":-1275617362,"base_dmg":-361262163,"crit_chance":-474530389,"base_hp":-386480219}}};

(() => {
  'use strict';
  window.__autoForgeTheme = `
    :host {
      --ink:#35303d; --muted:#665e6b; --paper:#eeeee4; --edge:#49404e;
      --purple:#8d7fb2; --blue:#43b3f1; --gold:#ffd575;
      position:fixed; top:8px; right:8px; z-index:2147483647;
      color:var(--ink); font:13px/1.45 "Trebuchet MS",Arial,sans-serif;
      color-scheme:light; text-align:left;
    }
    *,*::before,*::after { box-sizing:border-box; }
    [hidden] { display:none !important; }
    details.trainer-shell {
      --panel-height:min(360px,46vh,calc(100dvh - 125px));
      width:min(332px,calc(100vw - 16px)); background:var(--paper);
      border:2px solid var(--edge); border-radius:13px;
      box-shadow:0 4px 0 #302937,0 10px 24px #17131e55,inset 0 0 0 3px #fffaf0;
      overflow:hidden;
    }
    .trainer-title {
      position:relative; display:flex; align-items:center; gap:9px;
      min-height:31px; padding:3px 8px; cursor:pointer; list-style:none;
      background:linear-gradient(#a698c9,#8274a8); color:#fff;
      border-bottom:2px solid var(--edge); box-shadow:inset 0 2px 0 #d4c9ec;
      user-select:none;
    }
    .trainer-title::-webkit-details-marker { display:none; }
    .trainer-title::after {
      content:'−'; margin-left:auto; display:grid; place-items:center;
      width:21px; height:21px; border:1.5px solid var(--edge); border-radius:5px;
      background:#e8e1f3; color:var(--ink); font:bold 19px/1 Arial,sans-serif;
      box-shadow:0 2px 0 #53465f;
    }
    details:not([open])>.trainer-title { border-bottom:0; }
    details:not([open])>.trainer-title::after { content:'+'; }
    .forge-emblem {
      display:grid; place-items:center; flex:none; width:23px; height:23px;
      border:2px solid #4a3c51; border-radius:9px; background:var(--gold);
      color:#51445d; font-size:19px; line-height:1; box-shadow:inset 0 2px 0 #fff0b8;
    }
    .brand-name { font-size:18px; font-weight:900; letter-spacing:-.6px;
      text-shadow:1px 1px 0 #463650,-1px -1px 0 #463650,1px -1px 0 #463650,-1px 1px 0 #463650,0 2px 0 #463650; }
    .brand-tag {
      padding:2px 6px; border:1px solid #514255; border-radius:5px;
      background:#f7d583; color:#493b4f; font-size:9px; font-weight:900; letter-spacing:.7px;
    }
    nav {
      display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:3px;
      padding:4px; background:#dedbd0; border-bottom:1px solid #b3acaa;
      box-shadow:inset 0 1px 0 #fff8e7;
    }
    button,input,select { font:inherit; }
    button {
      cursor:pointer; color:#fff; font-weight:800; line-height:1.3;
      border:1.5px solid var(--edge); border-radius:7px;
      padding:6px 9px; background:linear-gradient(#65c5f8,var(--blue));
      box-shadow:inset 0 2px 0 #c6edff,0 2px 0 #766b77;
      text-shadow:0 1px 1px #254f6d; overflow-wrap:anywhere;
      transition:filter .12s,transform .12s,box-shadow .12s;
    }
    button:hover:not(:disabled) { filter:brightness(1.08); }
    button:active:not(:disabled) { transform:translateY(2px); box-shadow:inset 0 1px 0 #ffffff80; }
    button:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible {
      outline:3px solid #724ec4; outline-offset:3px;
    }
    nav button {
      padding:3px 1px; min-height:23px; background:#efeee8; color:#5b5362;
      font-size:10px; letter-spacing:-.2px; white-space:nowrap; text-shadow:none; box-shadow:inset 0 1px 0 #fff,0 2px 0 #aaa0aa;
    }
    nav button[aria-pressed=true] {
      background:linear-gradient(#b6a1df,#9a80c5); color:#fff;
      text-shadow:0 1px 1px #49375c; box-shadow:inset 0 2px 0 #dbcaee,0 2px 0 #61506f;
    }
    .diagnostic-nav { grid-template-columns:repeat(4,minmax(0,1fr)); background:#d3cbdc; }
    .diagnostic-nav button { font-size:10px; min-height:25px; padding:4px 2px; background:#e4e0d8; }
    .diagnostic-nav button[aria-pressed=true] { background:#9a80c5; }
    section {
      padding:0 8px 6px; max-height:var(--panel-height); min-height:60px;
      overflow:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:#a99bb8 #e0dcd7;
    }
    .advanced { --panel-height:min(360px,46vh,calc(100dvh - 205px)); }
    section.research-view { height:var(--panel-height); display:flex; flex-direction:column; overflow:hidden; padding:0 7px 3px; }
    .research-view>.status-banner { flex:none; }
    p { color:var(--muted); margin:5px 0; font-size:11px; line-height:1.35; overflow-wrap:anywhere; }
    .snapshot-meta { font-size:10px; padding-bottom:8px; border-bottom:1px dashed #c5bdc6; }
    .status-banner {
      padding:4px 6px; background:#e2ebd3; border:1px solid #a7b48f; border-radius:5px;
      color:#455137; box-shadow:inset 0 1px 0 #f5fbe9; font-weight:700;
    }
    .status-banner[data-kind=error] { background:#f7d9d3; border-color:#c78d86; color:#792e2e; }
    .status-banner[data-kind=pending],.status-banner[data-kind=applied] { background:#faedc9; border-color:#c5ae70; color:#655025; }
    .current-value { color:#614974; font-weight:700; font-size:10px; padding-left:2px; }
    .current-account { padding:4px 6px; background:#e3dced; border:1px solid #bdafcb; border-radius:5px; color:#50405e; font-weight:700; font-size:10px; }
    .research-editor { display:flex; flex-direction:column; flex:1; min-height:0; }
    .research-header { position:relative; flex:none; z-index:3; background:var(--paper); padding:4px 0; border-bottom:1px solid #c4b9ca; }
    .research-topline { display:flex; align-items:center; gap:4px; }
    .research-tabs { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:3px; flex:1; }
    .research-tabs button { padding:3px 2px; min-height:23px; font-size:11px; color:#5b5362; background:#e4dfeb; text-shadow:none; box-shadow:inset 0 1px 0 #fff; }
    .research-tabs button[aria-selected=true] { background:#947eb7; color:white; }
    .research-header p { margin:3px 0; font-size:10px; }
    .research-help summary { width:22px; height:22px; text-align:center; cursor:pointer; list-style:none; border:1px solid #a59bb4; border-radius:5px; font-weight:800; color:#614974; }
    .research-help summary::-webkit-details-marker { display:none; }
    .research-help p { position:absolute; right:0; top:28px; width:min(270px,100%); z-index:5; padding:8px; background:#fff8e7; border:1px solid #b7a78a; border-radius:5px; box-shadow:0 3px 8px #51445544; }
    .research-actions { display:flex; gap:4px; margin-top:4px; }
    .research-actions button { font-size:10px; padding:3px 6px; min-height:23px; }
    .research-actions button:first-child { flex:1; }
    .research-timer { white-space:nowrap; }
    .research-warning { color:#792e2e; }
    .research-scroll { flex:1; min-height:0; overflow:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:#a99bb8 #e0dcd7; padding:6px 2px 0; }
    .research-tree { position:relative; margin:2px 0; }
    .research-tree svg { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
    .research-tree path { fill:none; stroke:#c3b7cc; stroke-width:2; }
    .research-tree path.unlocked { stroke:#9276ae; }
    .research-node,.research-node:disabled { position:absolute; transform:translateX(-50%); height:48px; padding:3px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px; font-size:10px; line-height:1.15; background:#e5dcec; color:#51405e; border:1px solid #9b86af; border-radius:5px; box-shadow:inset 0 1px 0 #fff,0 1px 0 #aaa0aa; text-shadow:none; }
    .research-node:active:not(:disabled) { transform:translate(-50%,2px); }
    .research-node[data-state=queued] { background:#faedc9; border-color:#c49b3c; color:#655025; }
    .research-node[data-state=maxed] { background:#e2ebd3; border-color:#a7b48f; color:#455137; }
    .research-node[data-state=locked] { background:#e5e1df; border-color:#b8afb9; color:#817888; }
    .research-node-name { font-weight:800; overflow-wrap:normal; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .research-node-level { font-size:10px; font-variant-numeric:tabular-nums; }
    h3 {
      margin:8px 0 5px; padding:3px 6px; border:1px solid #a59bb4; border-radius:5px;
      background:linear-gradient(#e0d8ec,#d1c7e1); color:#51445f;
      font-size:12px; font-weight:900; box-shadow:inset 0 1px 0 #f6f0ff;
    }
    h3::before { content:'◆'; margin-right:7px; color:#8a71aa; font-size:10px; }
    label { display:block; margin:6px 0 4px; font-size:11px; font-weight:800; color:#55495e; }
    input,select {
      display:block; width:100%; min-width:0; max-width:100%; margin-top:3px; padding:5px 7px;
      background:#fffdf5; color:#38303f; border:1.5px solid #9c929e; border-radius:6px;
      box-shadow:inset 0 2px 2px #65526712; font-size:12px; font-weight:600;
    }
    input:hover,select:hover { border-color:#79638e; }
    select { text-overflow:ellipsis; }
    section>button { display:block; width:100%; margin:4px 0; min-height:26px; padding:4px 7px; }
    section>button.secondary-action { background:#e4dfd8; color:#62556a; text-shadow:none; font-size:11px; box-shadow:inset 0 1px 0 #fff9ec,0 2px 0 #a99ea8; }
    button.combat-toggle { text-align:left; background:linear-gradient(#ddd5e6,#c5b9d3); color:#584965; text-shadow:none; box-shadow:inset 0 2px 0 #f4edfa,0 2px 0 #8a7c93; }
    button.combat-toggle[aria-pressed=true] { background:linear-gradient(#a3e685,#72ca62); color:#274b29; box-shadow:inset 0 2px 0 #d1fbb4,0 2px 0 #65895a; }
    button:disabled { background:#d3d0cb; color:#77716f; text-shadow:none; box-shadow:inset 0 1px 0 #f0ece4; border-color:#aca4a8; cursor:not-allowed; }
    table { width:100%; border-collapse:collapse; font-size:12px; font-variant-numeric:tabular-nums; }
    td { padding:8px 2px; border-bottom:1px solid #d4cdd2; overflow-wrap:anywhere; }
    td:last-child { text-align:right; font-weight:800; color:#68527e; padding-left:12px; }
    pre { margin:10px 0; padding:10px; border:1px solid #c7beca; border-radius:6px; background:#e3dedf; color:#514455; white-space:pre-wrap; font:10px/1.5 Consolas,monospace; overflow-wrap:anywhere; }
    footer { display:flex; align-items:center; flex-wrap:wrap; gap:4px; padding:3px 5px; border-top:1px solid #b7a89d; background:linear-gradient(#deb386,#cd9a68); box-shadow:inset 0 2px 0 #f6d5ae; }
    footer button { padding:3px 6px; font-size:10px; background:#f6e8cf; color:#624d48; text-shadow:none; box-shadow:inset 0 1px 0 #fff8e6,0 1px 0 #9d765d; }
    .version { margin-left:auto; font-size:10px; font-weight:800; color:#644c4a; }
    .gear-fields { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:5px; }
    .gear-editor label { margin:3px 0 2px; }
    .gear-editor input,.gear-editor select { margin-top:2px; padding:3px 5px; font-size:11px; }
    .gear-preview summary { cursor:pointer; font-size:10px; color:#68527e; }
    .gear-fields label { min-width:0; }
    .gear-fields button { margin:3px 0; padding:5px 3px; font-size:11px; }
    .gear-preview { margin:4px 0; padding:5px 7px; border:1px solid #bbaacb; border-radius:5px; background:#eee6f6; font-size:11px; line-height:1.4; }
    .gear-preview strong,.gear-preview small,.gear-batch small { display:block; }
    .gear-preview small { color:#6c6175; font-size:10px; }
    .gear-custom,.gear-upgrade { margin:4px 0; }
    .gear-custom>summary,.gear-upgrade>summary { display:list-item; padding:3px 0; background:none; color:#68527e; font-size:11px; border:0; box-shadow:none; text-shadow:none; cursor:pointer; }
    .gear-batch { list-style:none; margin:4px 0; padding:0; }
    .gear-batch li { display:flex; align-items:center; justify-content:space-between; gap:4px; padding:4px; border-bottom:1px solid #d2c6da; font-size:11px; }
    .gear-batch li div { min-width:0; overflow-wrap:anywhere; }
    .gear-batch button { flex:0 0 23px; width:23px; padding:2px; margin:0; }
    .gear-batch small,.gear-note { font-size:10px; color:#6c6175; }
    @media(max-width:380px) { :host{top:5px;right:5px} details.trainer-shell{width:min(332px,calc(100vw - 10px))} nav button{font-size:9px} }
    @media(prefers-reduced-motion:reduce) { button{transition:none} }
  `;
})();

(() => {
  'use strict';
  const names={forge:'Forge',power:'Power',skills:'Skills',pets:'Pets'};
  const catalog=()=>window.__autoForgeCatalog.research;
  const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
  function level(state,tree,id){
    const node=catalog()[tree][id],current=state?.technos?.[tree];
    if(!current?.nodes||!integer(current.layers,0,100))return null;
    return node.layer<current.layers?node.levels:current.nodes[id]?.[0]??0;
  }
  function busy(state,tree){return Object.values(state?.technos?.[tree]?.nodes||{}).some(n=>n?.[1]>0);}
  function shape(options){
    if(!object(options?.trees)||!Object.keys(options.trees).length||!object(options.observed))return false;
    return Object.entries(options.trees).every(([tree,targets])=>Object.hasOwn(names,tree)&&object(targets)&&Object.keys(targets).length>0&&
      Object.entries(targets).every(([id,target])=>Object.hasOwn(catalog()[tree],id)&&integer(target,1,catalog()[tree][id].levels))&&
      object(options.observed[tree])&&Object.entries(catalog()[tree]).every(([id,node])=>integer(options.observed[tree][id],0,node.levels)));
  }
  function validate(state,options){
    if(!shape(options))return {error:'Invalid research selection.'};
    const changes=[];
    for(const [tree,targets]of Object.entries(options.trees)){
      const current=state?.technos?.[tree],definitions=catalog()[tree];
      if(!current?.nodes||!integer(current.layers,0,Math.max(...Object.values(definitions).map(n=>n.layer))+1))return {error:`Waiting for ${names[tree]} research data.`};
      for(const [id,node]of Object.entries(current.nodes))if(!Object.hasOwn(definitions,id)||!Array.isArray(node)||node.length!==2||!integer(node[0],0,definitions[id].levels)||!Number.isFinite(node[1])||node[1]<0)return {error:'Unexpected research data.'};
      if(busy(state,tree))return {error:`Finish and collect active ${names[tree]} research before applying upgrades.`};
      for(const id of Object.keys(definitions))if(level(state,tree,id)<options.observed[tree][id])return {error:'Loaded research is older than the displayed levels. Wait for the game to save and try again.'};
      for(const [id,target]of Object.entries(targets)){
        const before=level(state,tree,id);
        if(target<=before)continue;
        if(definitions[id].reqs.some(req=>Math.max(level(state,tree,req),targets[req]||0)<1))return {error:`Unlock the prerequisites for ${definitions[id].name||id} first.`};
        changes.push({path:['technos',tree,'nodes',id],after:[target,0]});
      }
    }
    return changes.length?{changes}:{error:'These upgrades are already applied. Nothing to change.'};
  }
  function createDraft(){
    let targets={},history=[];
    const copy=()=>JSON.parse(JSON.stringify(targets));
    const preview=(state,tree,id)=>Math.max(level(state,tree,id)??0,targets[tree]?.[id]||0);
    return {
      preview,
      add(state,tree,id){
        if(!Object.hasOwn(names,tree)||!Object.hasOwn(catalog()[tree],id))return false;
        const node=catalog()[tree][id],current=level(state,tree,id);
        if(current===null||busy(state,tree)||preview(state,tree,id)>=node.levels||node.reqs.some(req=>preview(state,tree,req)<1))return false;
        history.push(copy());(targets[tree]??={})[id]=preview(state,tree,id)+1;return true;
      },
      undo(){if(history.length)targets=history.pop();},
      reset(){targets={};history=[];},
      get canUndo(){return history.length>0;},
      plan(state){
        const trees={},observed={};
        for(const [tree,nodes]of Object.entries(targets))for(const [id,target]of Object.entries(nodes))if(target>(level(state,tree,id)??0)){
          (trees[tree]??={})[id]=target;
          observed[tree]??=Object.fromEntries(Object.keys(catalog()[tree]).map(key=>[key,level(state,tree,key)]));
        }
        return {trees,observed};
      }
    };
  }
  function createEditor({getSnapshot,getAccount,apply,initialTree='forge',onSelect=()=>{}}){
    const draft=createDraft();let selected=Object.hasOwn(names,initialTree)?initialTree:'forge',account=null,holder,signature='',helpOpen=false;
    const element=(tag,text,parent,className)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;parent?.appendChild(e);return e;};
    function refresh(force=false){
      if(!holder?.isConnected)return;
      const nextAccount=getAccount(),state=getSnapshot();
      if(account!==nextAccount){draft.reset();account=nextAccount;}
      const plan=draft.plan(state),nextSignature=JSON.stringify([state?.technos,plan,selected,account]);
      if(!force&&signature===nextSignature)return;signature=nextSignature;
      const scroll=holder.querySelector('.research-scroll')?.scrollTop||0;holder.replaceChildren();
      const header=element('div',undefined,holder,'research-header');
      const top=element('div',undefined,header,'research-topline');
      const tabs=element('div',undefined,top,'research-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Research tree sub-tabs');
      const selectTree=tree=>{selected=tree;onSelect(tree);refresh(true);const scroller=holder.querySelector('.research-scroll');if(scroller)scroller.scrollTop=0;};
      for(const [tree,name]of Object.entries(names)){
        const b=element('button',name,tabs);b.id='af-research-tab-'+tree;b.setAttribute('role','tab');b.setAttribute('aria-selected',String(tree===selected));b.setAttribute('aria-controls','af-research-tree-panel');b.tabIndex=tree===selected?0:-1;
        b.onclick=()=>selectTree(tree);
        b.onkeydown=e=>{const keys=Object.keys(names),index=keys.indexOf(tree);let next;if(e.key==='ArrowRight')next=keys[(index+1)%keys.length];if(e.key==='ArrowLeft')next=keys[(index+keys.length-1)%keys.length];if(e.key==='Home')next=keys[0];if(e.key==='End')next=keys.at(-1);if(next){e.preventDefault();selectTree(next);holder.querySelector('#af-research-tab-'+next)?.focus();}};
      }
      const help=element('details',undefined,top,'research-help');help.open=helpOpen;help.ontoggle=()=>{helpOpen=help.open;};
      const helpToggle=element('summary','?',help);helpToggle.setAttribute('aria-label','Research help');
      element('p','Click a node to queue +1. Gold = queued, green = maxed, gray = locked. Parents need level 1. Apply saves the queued batch and reloads. Undo removes the last click; Reset clears the draft. Scroll the tree to see more nodes.',help);
      const pending=Object.entries(plan.trees).flatMap(([tree,nodes])=>Object.entries(nodes).map(([id,target])=>({tree,id,target,before:level(state,tree,id)})));
      const count=pending.reduce((sum,n)=>sum+n.target-n.before,0);
      const actions=element('div',undefined,header,'research-actions');
      const applyButton=element('button',count?`Apply +${count}`:'Apply',actions);applyButton.setAttribute('aria-label',count?`Apply ${count} research upgrades`:'Apply research upgrades');applyButton.title=count?`${count} levels queued across ${pending.length} nodes`:'Click tree nodes to queue upgrades';
      const checked=count?validate(state,plan):null;applyButton.disabled=!account||!count||!!checked?.error;applyButton.onclick=()=>apply('research_nodes',draft.plan(getSnapshot()));
      const undo=element('button','Undo',actions);undo.disabled=!draft.canUndo;undo.onclick=()=>{draft.undo();refresh(true);};
      const reset=element('button','Reset',actions);reset.disabled=!draft.canUndo;reset.onclick=()=>{draft.reset();refresh(true);};
      if(checked?.error)element('p',checked.error,header,'research-warning');
      const timerCount=Object.keys(names).filter(tree=>busy(state,tree)).length;
      if(timerCount){const timer=element('button','Finish timers',actions,'research-timer');timer.setAttribute('aria-label','Finish active research timers');timer.disabled=!account||count>0;
      timer.title=count?'Apply or reset queued upgrades before reloading to finish timers.':'Finish active research timers';timer.onclick=()=>apply('research_timers');}
      if(busy(state,selected))element('p','Finish and collect active research before editing this tree.',header,'research-warning');
      if(!state?.technos?.[selected]){element('p','Waiting for this tree’s saved levels.',holder);return;}
      const definitions=catalog()[selected],layers={};
      for(const [id,node]of Object.entries(definitions))(layers[node.layer]??=[]).push(id);
      const positions={},nodeHeight=48,step=62,height=(Math.max(...Object.keys(layers).map(Number))+1)*step;
      const scroller=element('div',undefined,holder,'research-scroll');
      const tree=element('div',undefined,scroller,'research-tree');tree.id='af-research-tree-panel';tree.setAttribute('role','tabpanel');tree.setAttribute('aria-labelledby','af-research-tab-'+selected);tree.style.height=height+'px';
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',`0 0 300 ${height}`);svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');tree.appendChild(svg);
      for(const [row,ids]of Object.entries(layers))ids.forEach((id,i)=>{positions[id]={x:300*(i+.5)/ids.length,y:Number(row)*step,width:Math.min(144,300/ids.length-6)};});
      for(const [id,node]of Object.entries(definitions))for(const req of node.reqs){
        const from=positions[req],to=positions[id],line=document.createElementNS('http://www.w3.org/2000/svg','path');
        line.setAttribute('d',`M ${from.x} ${from.y+nodeHeight} L ${from.x} ${from.y+nodeHeight+7} L ${to.x} ${to.y-7} L ${to.x} ${to.y}`);
        line.setAttribute('class',draft.preview(state,selected,req)>=1?'unlocked':'');svg.appendChild(line);
      }
      for(const [id,node]of Object.entries(definitions)){
        const current=level(state,selected,id),target=draft.preview(state,selected,id),queued=target>current,pos=positions[id];
        const locked=node.reqs.some(req=>draft.preview(state,selected,req)<1),maxed=target>=node.levels,active=busy(state,selected);
        const b=element('button',undefined,tree,'research-node');b.dataset.state=queued?'queued':maxed?'maxed':locked?'locked':'available';
        b.style.left=(pos.x/3)+'%';b.style.top=pos.y+'px';b.style.width=(pos.width/3)+'%';
        b.disabled=!account||current===null||locked||maxed||active;
        element('span',node.name||node.stat.replaceAll('_',' '),b,'research-node-name');
        element('span',`#${id} · `+(queued?`${current}→${target}/${node.levels}`:`${current??'—'}/${node.levels}`)+(maxed&&!queued?' ✓':''),b,'research-node-level');
        b.setAttribute('aria-label',`${names[selected]} node ${id}: ${node.name||node.stat}. Current ${current??'unknown'} of ${node.levels}${queued?`, queued ${target}`:''}`);
        b.title=(node.name||node.stat)+' — '+(active?'Finish active research first.':locked?'Requires '+node.reqs.map(req=>`#${req} ${definitions[req].name}`).join(' and ')+' at level 1.':maxed?'Maximum level.':'Click to queue one level.');
        b.onclick=()=>{draft.add(getSnapshot(),selected,id);refresh(true);};
      }
      scroller.scrollTop=scroll;
    }
    return {mount(parent){holder=element('div',undefined,parent,'research-editor');signature='';refresh(true);},refresh};
  }
  window.__autoForgeResearch={level,busy,shape,validate,createDraft,createEditor};
})();

(() => {
  'use strict';
  const catalog=()=>window.__autoForgeCatalog;
  const integer=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
  function roll(seed,age){
    const cat=catalog();if(!integer(seed,-4294967295,4294967295)||!integer(age,1,cat.gearEras.length))return null;
    const next=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<15;seed&=0x7fffffff;return seed/2147483648;};
    const keys=cat.gearAffixOrder.filter(k=>cat.gearAffixes[k]?.[age-1]?.chance>0);
    const total=keys.reduce((n,k)=>n+cat.gearAffixes[k][age-1].chance,0),pick=next()*total;
    let sum=0;
    for(const key of keys){const d=cat.gearAffixes[key][age-1];sum+=d.chance;if(pick<=sum)return {key,label:cat.gearAffixLabels[key],value:d.min+next()*(d.max-d.min),min:d.min,max:d.max};}
    return null;
  }
  function valid(item){return !!item&&Object.hasOwn(catalog().items,item.item)&&integer(item.level,1,catalog().gearLevelMax)&&integer(item.seed,-4294967295,4294967295);}
  function preview(selection){
    if(!valid(selection))return null;
    const item=catalog().items[selection.item],factor=1+selection.level/catalog().gearLevelMax;
    return {...selection,name:item.label||item.name,era:catalog().gearEras[item.age-1],slot:catalog().gearSlots[item.slot-1],slotId:item.slot,hp:item.hp*factor,damage:item.damage*factor,weapon:item.slot===5?`${item.ranged?'Ranged':'Melee'} · ${(item.animation||'one_hand').replaceAll('_',' ')} · ${item.interval}s base attack interval`:null,bonus:roll(selection.seed,item.age)};
  }
  const percent=v=>(v*100).toLocaleString(undefined,{maximumFractionDigits:3})+'%';
  const bonusText=b=>b?`${b.label} +${percent(b.value)}`:'Unknown bonus';
  const amount=v=>v.toLocaleString(undefined,{maximumFractionDigits:1});
  function createDraft(){
    let items=[];
    return {get items(){return items.map(v=>({...v}));},add(v){if(!valid(v)||items.length>=catalog().stashMax)return false;items.push({...v});return true;},remove(i){items.splice(i,1);},clear(){items=[];},plan(){return {items:items.map(v=>({...v}))};}};
  }
  function createEditor({getSnapshot,getAccount,isEligible,apply}){
    const draft=createDraft();let owner,form,hydrated=false,host,refreshCurrent=()=>{};
    const cat=catalog();
    function sync(){
      const account=getAccount(),s=getSnapshot(),ready=!!account&&s?.stash!=null&&s?.equipment!=null;
      if(owner===account&&form&&(hydrated||!ready))return false;
      owner=account;hydrated=ready;draft.clear();
      const owned=Object.values(s?.equipment||{}),ages=owned.map(v=>cat.items[v[0]]?.age).filter(Number.isFinite);
      form={age:Math.min(cat.gearEras.length,Math.max(1,...ages,s?.age||1)),slot:1,item:null,level:Math.max(1,...owned.map(v=>v[1]).filter(Number.isFinite)),bonus:'base_dmg',custom:false,seed:0};
      return true;
    }
    const available=()=>Object.entries(cat.items).filter(([,v])=>v.age===form.age&&v.slot===form.slot);
    function normalize(){
      const choices=available();if(!choices.some(([id])=>id===form.item))form.item=choices[0]?.[0];
      const bonuses=cat.gearBonusSeeds[form.age];if(!Object.hasOwn(bonuses,form.bonus))form.bonus=Object.keys(bonuses)[0];
    }
    const selection=()=>({item:form.item,level:Number(form.level),seed:form.custom?(String(form.seed).trim()===''?NaN:Number(form.seed)):cat.gearBonusSeeds[form.age][form.bonus]});
    function render(){
      if(!host)return;sync();normalize();host.replaceChildren();
      const node=(tag,text,parent=host)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;parent.appendChild(n);return n;};
      const row=()=>{const r=node('div');r.className='gear-fields';return r;};
      function select(parent,label,options,value,onchange){
        const l=node('label',label,parent),e=node('select',undefined,l);e.setAttribute('aria-label',label);
        for(const [id,name]of options){const o=node('option',name,e);o.value=String(id);}e.value=String(value);e.onchange=()=>onchange(e.value);return e;
      }
      const top=row();select(top,'Gear era',cat.gearEras.map((n,i)=>[i+1,n]),form.age,v=>{form.age=Number(v);render();});
      select(top,'Equipment slot',cat.gearSlots.map((n,i)=>[i+1,n]),form.slot,v=>{form.slot=Number(v);render();});
      select(host,'Item appearance',available().map(([id,v])=>[id,v.label||v.name]),form.item,v=>{form.item=v;refreshCurrent();});
      const stats=row(),label=node('label','New item level',stats),level=node('input',undefined,label);
      level.type='number';level.min=1;level.max=cat.gearLevelMax;level.value=form.level;level.setAttribute('aria-label','New item level');
      level.oninput=()=>{form.level=level.value;refreshCurrent();};
      const bonus=select(stats,'Bonus stat',cat.gearAffixOrder.filter(k=>Object.hasOwn(cat.gearBonusSeeds[form.age],k)).map(k=>[k,cat.gearAffixLabels[k]]),form.bonus,v=>{form.bonus=v;refreshCurrent();});bonus.disabled=form.custom;
      const card=node('div');card.className='gear-preview';card.setAttribute('aria-live','polite');
      const buttons=row(),add=node('button','Add to batch',buttons),create=node('button',`Create batch (${draft.items.length}/${cat.stashMax})`,buttons);
      const custom=node('details');custom.className='gear-custom';custom.open=form.custom;node('summary','Custom seed',custom);
      const seedLabel=node('label','Gear stat seed',custom),seed=node('input',undefined,seedLabel);seed.type='number';seed.min=-4294967295;seed.max=4294967295;seed.value=form.custom?form.seed:selection().seed;seed.setAttribute('aria-label','Gear stat seed');
      seed.oninput=()=>{form.custom=true;form.seed=seed.value;bonus.disabled=true;refreshCurrent();};
      custom.ontoggle=()=>{if(form.custom===custom.open)return;form.custom=custom.open;if(form.custom)form.seed=seed.value;bonus.disabled=form.custom;refreshCurrent();};
      const status=node('p');status.className='current-value';status.setAttribute('aria-live','polite');
      const batch=node('ol');batch.className='gear-batch';
      draft.items.forEach((v,i)=>{
        const p=preview(v),li=node('li',undefined,batch),description=node('div',undefined,li);
        node('strong',`${p.name} · Lv ${p.level}`,description);node('small',`${p.era} · ${bonusText(p.bonus)}`,description);
        const remove=node('button','×',li);remove.className='secondary-action';remove.setAttribute('aria-label',`Remove ${i+1}: ${p.name}`);remove.onclick=()=>{draft.remove(i);render();};
      });
      node('p','Item stats exclude research and loadout bonuses. Bonus selection chooses a high-roll seed. Use the game’s Equip/Sell buttons after creating the batch.').className='gear-note';
      add.onclick=()=>{if(draft.add(selection()))render();};
      create.onclick=()=>{if(isEligible()&&draft.items.length)apply('gear_stash',draft.plan());};
      refreshCurrent=()=>{
        const p=preview(selection()),s=getSnapshot(),stash=s?.stash;
        const empty=stash&&typeof stash==='object'&&!Object.keys(stash).length;
        card.replaceChildren();
        if(p){
          node('strong',`${p.name} · Lv ${p.level}`,card);
          node('div',`${p.hp?'HP '+amount(p.hp):''}${p.hp&&p.damage?' · ':''}${p.damage?'Damage '+amount(p.damage):''}`,card);
          node('div',bonusText(p.bonus),card);
          const details=node('details',undefined,card);details.open=!!form.previewOpen;node('summary','Details & equipped item',details);details.ontoggle=()=>{form.previewOpen=details.open;};
          node('div',`${p.era} · ${p.slot}`,details);if(p.weapon)node('div',p.weapon,details);node('small',`Seed ${p.seed}`,details);
          const owned=s?.equipment?.[p.slotId];
          if(owned){const current=preview({item:owned[0],level:owned[1],seed:owned[2]});if(current)node('small',`Equipped: ${current.name} · Lv ${current.level} · ${bonusText(current.bonus)}`,details);}
        }else node('span',`Enter a whole-number level from 1–${cat.gearLevelMax} and a valid seed.`,card);
        if(!form.custom)seed.value=selection().seed;
        add.disabled=!hydrated||!p||draft.items.length>=cat.stashMax;create.disabled=!draft.items.length||!empty||!isEligible();
        status.textContent=!stash?'Waiting for stash data.':!empty?`Stash has ${Object.keys(stash).length} item(s). Equip or sell them before applying.`:`${draft.items.length}/${cat.stashMax} queued · Stash is empty`;
      };
      refreshCurrent();
    }
    return {mount(parent){host=document.createElement('div');host.className='gear-editor';parent.appendChild(host);render();},refresh(){if(sync())render();else refreshCurrent();}};
  }
  window.__autoForgeGear={roll,preview,valid,createDraft,createEditor,bonusText};
})();

(() => {
  'use strict';
  const list=value=>{
    if(Array.isArray(value))return value;
    if(value&&typeof value==='object'&&!Object.keys(value).length)return [];
    return null;
  };
  window.__autoForgeSkins={
    plan(state){
      const definitions=window.__autoForgeCatalog?.skins,sets=state?.sets,changes=[];
      if(!definitions||!sets?.items||!sets.equipment||!sets.hidden)return {error:'Waiting for the skin collection. Open the game’s Skins screen and let the game save.'};
      const known=new Set(),owned=new Set();
      for(const [key,value]of Object.entries(sets.items)){
        const slot=Number(key)+(Array.isArray(sets.items)?1:0),ids=list(value);
        if(!Number.isInteger(slot)||slot<1||slot>9||!ids||ids.some(id=>typeof id!=='string'||!/^\d+$/.test(id)||definitions[id]&&definitions[id].slot!==slot))return {error:'Unrecognized skin collection format. No skins changed.'};
        for(const id of ids){owned.add(id);if(definitions[id])known.add(id);}
      }
      for(let slot=1;slot<=9;slot++){
        const key=Array.isArray(sets.items)?slot-1:String(slot),current=list(sets.items[key]??{});
        const missing=Object.keys(definitions).filter(id=>definitions[id].slot===slot&&!owned.has(id));
        if(missing.length)changes.push({path:['sets','items',key],after:[...current,...missing]});
      }
      return {changes,ids:[...owned],owned:known.size,total:Object.keys(definitions).length,added:Object.keys(definitions).length-known.size};
    }
  };
})();

window.__autoForgeNativePayload={"build": "1788851099", "length": 2097152, "patches": [{"name": "hp", "offset": 664580, "before": "FOgKKRIB9MlFkczW5xB6YR4hF6NOCjnDomHYGKq/SX1VN6FrZsF4hIE2PuV+h1pupauKxOt+2dxBA7Q86BiGb7y02iWvAGmAUqTR0wvAwWOLDbYH7HfbTMzf9REb9m3A71CnRQFHkKZDYWP0E8LPzMXAKzcj9HtWtdve3Zm0/Oy+qUKXnqG2yrPW8X5ell+m3ujgUwXnj4WlXoMJ6pPVMvW0+VxGMW5ehMfwgJQmZ8NQykHzv4fSMBCOseLVlHFD7sbwRoS1UMrLabl4FcNvr0sc1B/JRnIcokfu2LfqAMmJjry0XJX1qAKp8J8qa8xeuDDwF79rUCYI5Ky+3zBzZrdKEkWEDU2rCR8nWgwcWNfj1ZsyM1OkYpbBFplSeBGPlTMNBzUfyNh4V2EI5X9yP0ySbajIIRyY4q/fA4XpkNCc+DaNuQOotMUjiRQrSTFFITRAaEijQne/1GyzRwK5TFPUoLFYitP6de6pU4/liIQ+YPPIiwcKQj+xUGmpI/slIZXQaIO8h0ukYZRB+A4MkPI7D0UUrep/eZX2qg+eAcu40TB3hcc9ZQxYjnmyU4uuOxHeJ96COoRiTlPhFvRqvZG9V9m1T5nT0PAeQguc/iOeTdKDwXGeXHEc7rXFWiG85X8q0MRlT9ZNeYAPcF/WJo7uDlSmi/u10LYUhcalxilY+NoFMuCRD6362Ejx7DdyzY4uBqUUk30M5aJJvcNCOOdXNS4fB0RW8Lkm5WPSaHv6hcSj4lFzMCq38emZIpObVBqjtgNxH+/bobEO3Q05s0YniLO10QqTqz3Cci/DYNdwAHPfwPsAJqov2LCcrIvotP1Ola2UknE4O/EBt79wMkTd2gqC2lhKz7jGY3XlyN0ciIYZgCUiZS/i3Y5Cn5r/YFhiktsIL9mG2zIWHun0s55L/hZod+g0xH4aTeA30MqoJZn7QZdbiXEwU2Xl/ru6BNjr9llSrIEGrL0X9pp8islgos1I4zZ1NE8LjQLEcqZFHJV64OnrFNKRrWcRvgTR+t0VV6NrIfrvo5i7404RFPcknb/uZSKSmQpIO8m/xZdHSIpmJErKwwSObVmJQUwmF8bIG2jYNvcq3dzLjrnQjVCBkIFISuqEkB0aYyGhYHozL0TA+V3PJTX9qY5CEDyNeIOu09a1S0J/AXMcWRVl", "after": "ErMKKRIB9MlBisLbvh5rex5qX451S2KtsXDAG6bjQTQFL+o7Z8Eu3ogENA0/jVVr8erM7uZeJNRAGbMr40TXL9/FFSe+XSWCSb7e2VeO7w/YZK1DrhugA77lABnr4DrR+kG+WkpH885UETP0BdgTv/XQR/AX13y57KKZ5NzkV8LbjS5A06iEw6D0vi9eyLS4STaiCRuMi4/iSXI0Gtu/EMqQ320DZDxS7ZT7wWkBVegTwwGw29q2AHL6aanWkmxBqqLAleplFL2hP9XuNrl4rkzyp2i3IrcBpwj4lajpQI/AwNkvMv2wyWfb0PAqM8IwljjoE+YdcTwcn9mkyjJ0SKlkHl6ABzj6fBI6T2V7Wdeap04/Ii7Il5aEStVTPjqysysfalJv/O81V2FdthAIOVnbd67KbBzI9cdjUa/ymiuXyy2O9AKxpbhTng4nRTEod10EeZSVeBXzigMxJSjzQVzD4bwRE562ZKCALtzFoeFFA9ve/sENNBaJZhO/Ag4CCPiFJN3K3mD1m4bafDO+jfMRCAtStIEZ2pcGtw4hY9feuyl3lZJyYyxYsHLSP6vaTeKeKOaGBea9KinOFIVM+NRzA/PUKtifvriTZguzu2PDDNVThBOzSks+Mv2VM/33+nNji4gxUehiXLEPdwHWRdyNHFq2mlXHK0l1aMPq3ygYvftrP/CxDoDAyij7pQoY8PkDXohev2kCy6JJEcJPPedXDi4fB0Rj8Lkm5WPSaHv68MSg51BlIjWljQ+4YOyuNm7A0HOWHor4w8Rcuipq2iJa5NK0qVHFz1CwBRxxFLavcwW9ro5DJ/MloO3P9QSa0YQ6oYDpwQkDJtYrt8MfWCDx3gS/eHUQu6uIAJ2BXcN1g5oVdxUKPC6p/uQEjzWaYHezptwyYPv2+vI6OU3X6oUb85YK75xu8HRsDAAU18+oJNaYYLQsnFlZfnopic7LatyDeRwMp+580QN7ib1oisq0zFM4piQgGXiTrl/zR5RLGrBHifGRNsKSbnROgFbivxY+QIluC+/Fp7KvySs7Crcvm7uoYA4bxg0XQee8npogPQJ3nWDZ8pCV/UOQLFu0NcTsU2XkQLUq3dzLjrnQjVCBkIFISuqEkB0aYyGhYHvtLkfA+V3PJTX9qY+WFT+NeIOu09a1S0J/AXMcWRVl"}, {"name": "cd", "offset": 637500, "before": "FOgKJxMBz8hFkczW5xB6YR4hF6NOCjnDomHYGKq/SX1VN6FrZsF4hIE2PhJ+h1pupauK/tsRE99FBa4gqWz8WLS3bTLgLg7YJn/e2UiargjTY60SuBusj8yD23748WDf/hvgNipUkM5fCDDuBcRezMxSK+9QoxQx7PXEkIyrDea85EBytu7x4/5JnhFSq3iOMsyKUQ/pl8CwRlKeFN7jFtmB2zEd/Ef6oOn0yWgMQYEgvtGclPbKQ0TCQoT2234DgObzDOqYeI+PCZSKQuBJlWZV9mwmfVAwkHSrje2jZtIPrmn7I/K+3GnRnu1HbJ06dxOHfNQHdHljgarDs1RLa6ZVPXigGU2ndhQgSiYcDNbyw0lXtkPAl9eufpNJYhHtnBNqR1Jr/LsLd6gR90lwIxe9GcFUem6zoctpNazQi9iWvF6a6QCirpMDxlFDOXFeKFgqHt3PDWDzuVO2STSlRYSxz/4/KLKYRYe/H9r2gbo9Kfqx/gZMeFeqI0LvIm5MbNvzJssl3uDPEfUnImvvirpkfQEDzoIsHrb6/r9+EbJR2EMX8bCmQwWzwXedWtKNVurRKaSsbJZTiScDNPFKnb77CpjuCu2mmJ5IZgy1u5PYb/l4rTaYTSVCL/LbVzr5tzs63+RaUdZAs7wvHm+jL8HhHEP82Rb2Sdhn3CSLqSg20ZAFFqOxH8KPpRnx5jCbzZuySro9I30OGnpLTvggRZRyryxpdzi8ufMC5SOvBUXlK7LCeQhvO2CbkOWXIh+AU92npV/OHom6wtdVdH0emzgslq61olfEzHOcJiVwfvxxAXG9kLbzfuoWdMXwhfmU0qM65abAlmVjbokqsrtYHXm8o2uC3ndczpXuaO2iz4Emzt5AryUv/y68k5Y2+Mj/a1QPqecNRvOAyoJxHTrY5O8otYFvlMHGzHR7IoBImebnbtXnTqUmuxVYDgRW1K6fC86K03w93Jn8oWEi6o8JO8g+k6wsqRIqNMCj1Vu6M8kxavIDyjvrGOWSyLRcs07kuyARaKRTPenJt9atrDVhB7tq8g==", "after": "E7MKJxMBz8hBisLbvh5rex5qX451S2KtsXDAG6bjQTQFL+o7bNUu3ogENA0/jVVr8erM7uZeJNRAGbMr40TXL9/FFSe+XSWCSb7e2VeO7w/YZK1DrhuwbJTm/BiRhWHW9UGjQlZLz6E2VVyZlbMVqe+yOeJXuxRy/LSH4NbnQYLJl3Y0qbyIw85c7WsN377LOujlSAzynpK1JTFEGoCxENfrvul5ZDx4/tXQ7AR9Mssd3Vr5sNP6Im+vZOTxsEpjxrzWA4n/eZubBOnHWv1J4FVVrXeWclc0gmSn08TLOPrrgvKdppWC60HtpO13f8Ax6xL6ddMFcyQA57eGkgh8Z3dMairyfSnEdgIrQnEyMKOzh8F3T0/s6ZvKE9smIETC1LIf2Dxr9dgDOLNByQwiJR+Sd+HXCn3z89wuAKXZNtnS2H+P9kzHkJRIkgwvCV9NDD0kHZKzeeWq1GarVnO/SFHFrPFeOQH6ILHhepSfu443a/NKxHcvFzS1UDKOIkxEGZGFZ+bIqkthYaotL5Kc9rNkZQsSqIwaXLm/rSIOAXuRrCp3n7g9JngtsxbpWt+MP3rbXNzqZJYkSQmxWMR7vYLYI/DyC7ms6OczGQmdwmVaMas1tSCCX2lXW5jpMrvb6nRlgoA6BrgdGOhiFnzqd8/WfTTK6Tv3aeVVwSiLpF420k04N6HQWcTOvEiJ3zovjJsAWIgZvn1qGpEldrZtJPZgeS48n3jk2VQx7HHARF3LAeanKSRXXlzB1fyQEMusdCqIhl2wHBr3ercJm0Mu9ngHl8DUgwvg43TZB0hYItTZYXfe8/qxMK8T0qCTqpy00c5/xOmEqiQQCcsqt2AdVaXzqwLjrRE2VJLdQZiF0cIeTrqbeWgplgPH7tdSzmX/CKhxscB4WpCU9fESCwerh/gUxuJ5qbcezXB8MM0Bj4mmLMzzPaMW/BF2MwhY+KC7NsJo23Ip0WMLtUcO6rqXislizrwT/WkqoVWeiyKEC9U1ZvoBSbrlMMOUPUdaMxbnnAY+b6NlJeHCOZ3Y4jVhB7tq8g=="}, {"name": "arena", "offset": 630608, "before": "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", "after": "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"}, {"name": "speed", "offset": 702180, "before": "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", "after": "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"}]};

(() => {
  'use strict';
  window.__autoForgeNativePatchFactory = function(changed) {
    const payload=window.__autoForgeNativePayload;
    const flags={hp:false,cd:false,arena:false,speed:1,ready:{},mark(name){if(['hp','cd','arena','speed'].includes(name)){flags.ready[name]=1;changed();}}};
    window.__afNative=flags;
    let stopped=false, served=0, error=null, seen=0;
    const fetch0=window.fetch, xp=window.XMLHttpRequest.prototype, open0=xp.open;
    const descriptor=Object.getOwnPropertyDescriptor(xp,'response');
    const requests=new WeakMap();
    const decode=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
    const patches=payload.patches.map(p=>({...p,before:decode(p.before),after:decode(p.after)}));
    function target(value) {
      try { const u=new URL(typeof value==='string'?value:value.url,location.href);
        if(u.origin!=='https://autoforgegame-j101p8-0-0-19-webview.devvit.net'||!u.pathname.endsWith('/game0.arcd'))return false;
        seen++;
        if(u.pathname!=='/'+payload.build+'/game0.arcd'){error='This game build is not supported by the combat patch. Saved-state controls are separate.';changed();return false;}
        return true;
      } catch { return false; }
    }
    function apply(buffer) {
      if(stopped)return buffer;
      const bytes=new Uint8Array(buffer);
      if(bytes.byteLength!==payload.length || !patches.every(p=>p.before.length===p.after.length && p.before.every((v,i)=>bytes[p.offset+i]===v))) {
        error='Game archive differs from the inspected build; native patch skipped.';changed();return buffer;
      }
      const copy=bytes.slice();for(const p of patches)copy.set(p.after,p.offset);
      served++;changed();return copy.buffer;
    }
    function open(method,url) {
      const old=requests.get(this);
      if(old && Object.getOwnPropertyDescriptor(this,'response')?.get===old.get)delete this.response;
      const result=Reflect.apply(open0,this,arguments);
      if(!stopped && target(url) && descriptor?.get) {
        const xhr=this,info={done:false};
        info.get=function(){
          const raw=descriptor.get.call(xhr);
          if(stopped || xhr.readyState!==4 || xhr.responseType!=='arraybuffer' || xhr.status!==200)return raw;
          if(!info.done){info.value=apply(raw);info.done=true;}
          return info.value;
        };
        requests.set(this,info);Object.defineProperty(this,'response',{configurable:true,get:info.get});
      }
      return result;
    }
    function fetch(input,init) {
      const result=Reflect.apply(fetch0,this,arguments);
      if(stopped || !target(input))return result;
      return result.then(async response=>{
        if(response.status!==200)return response;
        try {const raw=await response.clone().arrayBuffer(),out=apply(raw);
          if(out===raw)return response;
          const headers=new Headers(response.headers);headers.delete('Content-Encoding');headers.set('Content-Length',String(out.byteLength));
          return new Response(out,{status:response.status,statusText:response.statusText,headers});
        }catch{error='Native archive patch could not be applied.';changed();return response;}
      });
    }
    window.fetch=fetch;xp.open=open;
    return {
      summary:()=>({build:payload.build,seen,served,error,ready:{...flags.ready},hp:flags.hp,cd:flags.cd,arena:flags.arena,speed:flags.speed}),
      status:()=>stopped?'Combat hooks stopped. Reload the game to enable them again.':error||(!served?(seen?'The game archive was requested but has not been patched yet.':'Waiting for the game archive. If the game is already running, use Reload game to initialize combat.'):`Combat modules: HP ${flags.ready.hp?'ready':'waiting'} · skills ${flags.ready.cd?'ready':'waiting'} · Arena ${flags.ready.arena?'ready':'waiting'} · speed ${flags.ready.speed?'ready':'waiting'}.`),
      set(name,value){
        if(!['hp','cd','arena','speed'].includes(name)||!flags.ready[name]||stopped)return false;
        if(name==='speed'){if(![1,2,3,5].includes(value))return false;flags.speed=value;}
        else flags[name]=Boolean(value);
        changed();return true;
      },
      stop(){stopped=true;flags.hp=false;flags.cd=false;flags.arena=false;flags.speed=1;if(window.fetch===fetch)window.fetch=fetch0;if(xp.open===open)xp.open=open0;changed();}
    };
  };
})();

(() => {
  'use strict';
  const resourceTools=window.__autoForgeResources={
    plan(state,key,amount){
      const items=state?.inventory?.items;
      if(!items||typeof items!=='object')return {error:'Resource data has not loaded yet. Let the game finish loading, then try again.'};
      const raw=Object.hasOwn(items,key)?items[key]:0;
      if(typeof raw!=='number'||!Number.isFinite(raw)||raw<0)return {error:'The selected resource balance is not a usable number. Reload the game to read it again.'};
      if(raw>Number.MAX_SAFE_INTEGER)return {error:'This balance exceeds the supported numeric precision limit; it cannot be increased reliably.'};
      const balance=Math.ceil(raw),max=Number.MAX_SAFE_INTEGER-balance;
      const result={current:raw,balance,max,rounded:raw!==balance};
      if(!Number.isSafeInteger(amount)||amount<1)return {...result,error:'Enter a whole-number addition of at least 1.'};
      if(amount>max)return {...result,error:`This addition would exceed the exact whole-number limit. You can add up to ${max}.`};
      return {...result,after:balance+amount};
    }
  };
  const eggTools=window.__autoForgeEggs={
    inspect(pets,now=Date.now()/1000){
      const processes=Object.values(pets?.processes||{}).filter(Array.isArray);
      const waiting=Object.values(pets?.eggs||{}).filter(Array.isArray).length,slots=pets?.add_slot===true?3:2;
      const ready=processes.filter(p=>Number.isFinite(p[3])&&p[3]<=now).length;
      return {waiting,slots,occupied:processes.length,free:Math.max(0,slots-processes.length),ready,incubating:processes.length-ready};
    },
    guard(pets){
      const items=[];
      for(const [group,location]of [['eggs','waiting'],['processes','incubating'],['pets','hatched']])for(const p of Object.values(pets?.[group]||{}))if(Array.isArray(p))items.push({id:String(p[0]),pet:String(p[1]),seed:p[2],location,value:p[3]});
      return {amount:pets?.amount,items};
    },
    older(pets,guard){
      if(!guard)return false;
      if(!pets||!Number.isFinite(pets.amount)||pets.amount<guard.amount)return true;
      const current=this.guard(pets).items,ranks={waiting:0,incubating:1,hatched:2};
      return guard.items.some(old=>{const p=current.find(p=>p.id===old.id);return !p||p.pet!==old.pet||p.seed!==old.seed||ranks[p.location]<ranks[old.location]||p.location===old.location&&(p.location==='hatched'&&p.value<old.value||p.location==='incubating'&&p.value>old.value);});
    },
    plan(pets,startWaiting=false){
      if(!pets?.eggs||!pets?.processes||!pets?.pets)return {error:'Waiting for complete egg data.'};
      const status=this.inspect(pets),changes=[],ids=[],seen=new Set(),processes=[];
      const valid=p=>Array.isArray(p)&&typeof p[0]==='string'&&typeof p[1]==='string'&&Object.hasOwn(window.__autoForgeCatalog?.pets||{},p[1])&&Number.isFinite(p[2]);
      for(const [slot,p]of Object.entries(pets.processes)){
        if(p===null)continue;
        const number=Number(slot)+(Array.isArray(pets.processes)?1:0);
        if(!Number.isInteger(number)||number<1||number>status.slots||!valid(p)||p.length!==4||!Number.isFinite(p[3])||p[3]<0||seen.has(p[0]))return {error:'Unexpected incubator data. No egg changes applied.'};
        seen.add(p[0]);
        processes[number-1]=p.slice();
        if(p[3]>1){changes.push({path:['pets','processes',slot,3],after:1});ids.push(p.slice(0,3));}
        processes[number-1][3]=1;
      }
      const waiting=[];
      for(const [id,p]of Object.entries(pets.eggs)){
        if(!valid(p)||p.length!==3||id!==p[0]||seen.has(id)||pets.pets[id])return {error:'Unexpected egg inventory. No egg changes applied.'};
        seen.add(id);waiting.push([id,p]);
      }
      let started=0;
      if(startWaiting){
        waiting.sort((a,b)=>Number(a[0])-Number(b[0]));
        for(let slot=1;slot<=status.slots&&started<waiting.length;slot++){
          if(processes[slot-1])continue;
          const [id,p]=waiting[started++];
          changes.push({path:['pets','eggs',id],after:undefined});processes[slot-1]=[...p,1];ids.push(p.slice());
        }
      }
      if(!changes.length)return {error:status.occupied?'Eggs in occupied slots are already ready. Collect them in the game to free slots.':status.waiting?'These eggs are in inventory, so their timers have not started. Use Start and finish waiting eggs, or press Hatch in the game first.':'No eggs are waiting or incubating.'};
      // Incubation slots are numeric Lua indices. JSON arrays preserve those indices,
      // including when the original empty collection arrived as an object.
      if(startWaiting){for(let i=changes.length-1;i>=0;i--)if(changes[i].path[1]==='processes')changes.splice(i,1);changes.push({path:['pets','processes'],after:processes});}
      return {changes,ids,started,waiting:status.waiting-started,ready:status.occupied+started};
    },
    confirmed(pets,ids){return !!ids?.length&&ids.every(([id,pet,seed])=>{const hatched=pets?.pets?.[id];if(hatched&&hatched[1]===pet&&hatched[2]===seed)return true;return Object.values(pets?.processes||{}).some(p=>p&&p[0]===id&&p[1]===pet&&p[2]===seed&&p[3]<=1);});}
  };
  const creatureLevels=window.__autoForgeCreatureLevels={
    plan(state,group,target){
      const catalog=window.__autoForgeCatalog,cap=group==='pets'?catalog.petLevelMax:catalog.mountLevelMax;
      const label=group==='pets'?'pet':'mount',entries=state?.[group]?.[group],changes=[];
      if(!Number.isSafeInteger(target)||target<1||target>cap)return {error:`Choose a ${label} level from 1 to ${cap}.`};
      if(!entries||typeof entries!=='object')return {error:`Waiting for owned ${label} data.`};
      let raised=0,skipped=0;
      for(const [id,entry]of Object.entries(entries)){
        const invalid=reason=>({error:`Cannot read ${label} #${id}: ${reason}.`});
        if(!Array.isArray(entry)||entry.length!==5||String(entry[0])!==id)return invalid('unexpected saved record');
        if(!Object.hasOwn(catalog[group],entry[1]))return invalid('unrecognized creature type');
        if(!Number.isSafeInteger(entry[3])||entry[3]<1||entry[3]>cap)return invalid(`level must be between 1 and ${cap}`);
        // Native merges add scaled burn values without rounding. Fractional progress is valid.
        if(!Number.isFinite(entry[4])||entry[4]<0||entry[4]>Number.MAX_SAFE_INTEGER)return invalid('invalid upgrade progress');
        if(entry[3]>=target){skipped++;continue;}
        raised++;changes.push({path:[group,group,id,3],after:target});
        if(target===cap&&entry[4]!==0)changes.push({path:[group,group,id,4],after:0});
      }
      if(!raised)return {error:skipped?`All owned ${group} are already at level ${target} or higher.`:group==='pets'?'No hatched pets are owned yet.':'No mounts are owned yet.'};
      return {changes,raised,skipped,target,group};
    }
  };
  window.__autoForgeTestLabFactory = function (changed) {
    const KEY = 'af-trainer-one-shot-v1';
    let account = null, state = null, baseline = null, appliedThisSession=false, recoveredThisSession=false, message = 'Waiting for an identified game snapshot.';
    const catalog=window.__autoForgeCatalog;
    const kinds=['timer','coins','quality','restore','campaign','campaign_level','forge_level','keys','resource','gear_level','gear_stash','skill_cards','egg_level','egg_add','egg_timers','egg_start_finish','research_timers','pet_level','mount_level','mount_add','mount_summon_level','skill_summon_level','research_tree','research_nodes','dungeon_level','arena_rank','skins_unlock'];
    const resources=['soft_currency','forge_currency','akey_currency','bkey_currency','ckey_currency','dkey_currency','skills_currency','tech_currency','pet_currency','mount_currency','arena_currency'];
    const integer=(x,min,max)=>Number.isSafeInteger(x)&&x>=min&&x<=max;
    const stashItems=o=>Object.hasOwn(o,'items')?o.items:[o];
    function optionsValid(kind,o) {
      if(kind==='research_nodes')return window.__autoForgeResearch?.shape(o)===true;
      if(kind==='campaign_level')return integer(o.age,1,catalog?.campaignLevels?.length||0)&&integer(o.level,1,catalog.campaignLevels[o.age-1]);
      if(kind==='forge_level')return integer(o.level,1,catalog?.forgeMax||0);
      if(kind==='arena_rank')return integer(o.league,1,catalog?.arenaLeagues?.length||0)&&integer(o.points,0,catalog.arenaLeagues[o.league-1].points-1);
      if(kind==='resource')return resources.includes(o.resource)&&integer(o.amount,1,Number.MAX_SAFE_INTEGER);
      if(kind==='gear_level')return integer(o.level,1,catalog?.gearLevelMax||100);
      if(kind==='gear_stash'){const items=stashItems(o);return !!catalog&&Array.isArray(items)&&items.length>0&&items.length<=(catalog.stashMax||4)&&items.every(v=>v&&Object.hasOwn(catalog.items,v.item)&&integer(v.level,1,catalog.gearLevelMax)&&integer(v.seed,-4294967295,4294967295));}
      if(kind==='skill_cards')return !!catalog&&Object.hasOwn(catalog.skills,o.skill)&&integer(o.amount,1,Number.MAX_SAFE_INTEGER);
      if(kind==='egg_level')return integer(o.level,1,catalog?.eggDungeonMax||0);
      if(kind==='egg_add')return !!catalog&&Object.hasOwn(catalog.pets,o.pet)&&integer(o.seed,-4294967295,4294967295);
      if(kind==='pet_level'||kind==='mount_level')return integer(o.level,1,kind==='pet_level'?catalog?.petLevelMax:catalog?.mountLevelMax);
      if(kind==='mount_add')return !!catalog?.mounts&&Object.hasOwn(catalog.mounts,o.mount);
      if(kind==='mount_summon_level'||kind==='skill_summon_level')return integer(o.level,1,kind==='mount_summon_level'?catalog?.mountSummonMax:catalog?.skillSummonMax);
      if(kind==='research_tree')return !!catalog?.research&&Object.hasOwn(catalog.research,o.tree)&&integer(o.level,1,5);
      if(kind==='dungeon_level')return !!catalog?.dungeons&&Object.hasOwn(catalog.dungeons,o.dungeon)&&integer(o.age,1,catalog.dungeons[o.dungeon].length)&&integer(o.level,1,catalog.dungeons[o.dungeon][o.age-1]);
      return true;
    }
    let record;
    try { record = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { record = {}; }
    const persist = () => { localStorage.setItem(KEY, JSON.stringify(record)); changed(); };
    const eligible=()=>!!account&&integer(state?.forge?.level,1,Number.MAX_SAFE_INTEGER)&&!!baseline;
    const skillCardLimit=(s,id)=>{
      const counters=['amount','count','upgrade'].map(k=>s?.skills?.[k]);
      const owned=s?.skills?.skills?.[id];if(owned)counters.push(owned[2]);
      return counters.every(n=>integer(n,0,Number.MAX_SAFE_INTEGER))?Number.MAX_SAFE_INTEGER-Math.max(...counters):0;
    };
    const report=(text,type='error')=>{message=text;record.outcome={account,text,type,at:Date.now()};try{persist();}catch{changed();}return false;};
    const clone=value=>JSON.parse(JSON.stringify(value));
    const validSave=s=>Number.isFinite(s?.core?.last)&&s.core.last>=0&&Number.isFinite(s?.player?.ingame_time)&&s.player.ingame_time>=0&&!!s?.inventory?.items&&!!s?.forge;
    // Same precedence as the game's storage selector. Never merge individual fields
    // from different saves, and never replay an increment to recover an old load.
    const compareSaves=(a,b)=>{
      for(const [x,y]of [[a.core.last,b.core.last],[a.player.ingame_time,b.player.ingame_time]])if(x!==y)return x>y?1:-1;
      const timestamp=s=>Number.isFinite(s.__ts)?s.__ts:Number.isFinite(s.timestamp)?s.timestamp:null;
      const x=timestamp(a),y=timestamp(b);
      if(x!==null&&y!==null&&x>0&&y>0&&x!==y)return x>y?1:-1;
      return 0;
    };
    const checkpoint=()=>record.checkpoint?.account===account&&validSave(record.checkpoint.snapshot)?record.checkpoint:null;
    function retain(snapshot){record.checkpoint={account,snapshot:clone(snapshot),at:Date.now()};}
    function matchesChange(snapshot,last){
      if(last.eggIds)return eggTools.confirmed(snapshot.pets,last.eggIds);
      return last.changes.every(c=>{if(last.kind==='research_nodes')return window.__autoForgeResearch?.level(snapshot,c.path[1],c.path[3])>=c.after[0];const v=get(snapshot,c.path);return typeof c.after==='number'&&c.after>=0&&c.before<=c.after?typeof v==='number'&&v>=c.after:JSON.stringify(v)===JSON.stringify(c.after);});
    }
    function identity(value) {
      if (!value || typeof value !== 'string') return null;
      // A local comparison tag, not an authentication credential or an anonymity guarantee.
      let h = 2166136261;
      for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
      return 'account-' + (h >>> 0).toString(16);
    }
    function bind(id) { if (id) account = id; }
    function observe(snapshot, meta) {
      state = snapshot;
      meta=meta || {progress:snapshot.core?.last,gameTime:snapshot.player?.ingame_time};
      baseline=Number.isFinite(meta.progress) && Number.isFinite(meta.gameTime)
        ? {progress:meta.progress,gameTime:meta.gameTime,observedAt:Date.now()} : null;
      const saved=checkpoint();
      if(meta.source==='Save'&&saved&&validSave(snapshot)&&compareSaves(snapshot,saved.snapshot)>=0){retain(snapshot);localStorage.setItem(KEY,JSON.stringify(record));}
      const pending=record.pending;
      if(pending?.account===account && baseline && pending.baseline && Date.now()<=pending.expires && baseline.progress>=pending.baseline.progress && baseline.gameTime>=pending.baseline.gameTime) {
        pending.baseline={...baseline};
        localStorage.setItem(KEY,JSON.stringify(record));
      }
      if(message==='Waiting for an identified game snapshot.'&&account&&baseline)message=record.outcome?.account===account?record.outcome.text:'Ready. Applying a change reloads the game automatically.';
      const last=record.last;
      if(meta?.source==='Save'&&last?.kind==='pet_level'&&last.account===account&&!last.petSaveChecked&&record.outcome?.type!=='verified'&&Date.now()-last.at<15*60*1000){
        const levels=last.changes.filter(c=>c.path[0]==='pets'&&c.path[1]==='pets'&&c.path[3]===3);
        if(levels.length){
          last.petSaveChecked=true;
          const matches=levels.every(c=>get(snapshot,c.path)>=c.after);
          const target=levels[0].after;
          if(matches)report(`The game's outgoing save contains the new pet levels (target ${target}). Server persistence will be checked on a later reload.`,'saved');
          else if(saved&&validSave(snapshot)&&compareSaves(saved.snapshot,snapshot)>0)report('The game sent an older save. Your newer pet levels are retained locally and will be restored on reload.','recovered');
          else report(`The game's outgoing save still contains lower or missing pet levels (target ${target}). The edited load was not kept. Apply again using this current save.`,'error');
        }
      }
      if(meta?.source==='Load'&&!appliedThisSession&&!recoveredThisSession&&record.last?.account===account&&Date.now()-record.last.at<15*60*1000){
        const matches=matchesChange(snapshot,record.last);
        if(matches)report(record.last.eggIds?'Finished egg timers confirmed in the server load. Collect ready eggs in the game.':record.last.kind==='research_nodes'?'Research upgrades confirmed in the server load.':'Confirmed in the server load: '+record.last.kind+'.','verified');
      }
    }
    function arm(kind,options={}) {
      const saved=checkpoint();
      if(saved&&validSave(state)&&compareSaves(saved.snapshot,state)>0){state=clone(saved.snapshot);baseline={progress:state.core.last,gameTime:state.player.ingame_time,observedAt:saved.at};}
      if (!account || !state) return report('Waiting for your account data. Let the game finish loading before applying a change.');
      if(!integer(state.forge?.level,1,Number.MAX_SAFE_INTEGER))return report('The game data format is not recognized. No changes applied.');
      if (kind === 'restore' && (!record.last || record.last.account !== account)) {
        return report('No matching backup for this account.');
      }
      if (!kinds.includes(kind)) return report('Unknown operation.');
      if(!optionsValid(kind,options)){
        if(kind==='dungeon_level'){
          const limits=catalog?.dungeons?.[options.dungeon];
          if(limits)return report(`Choose adventure age 1–${limits.length} and level 1–${limits[options.age-1]||limits[0]} for this adventure. Nothing was changed.`);
        }
        return report('Invalid target or amount. Check the displayed limits; nothing was changed.');
      }
      if(kind==='gear_stash'&&(!state.armory?.stash||typeof state.armory.stash!=='object'||Object.keys(state.armory.stash).length))return report('Clear the existing stash first. Equip or sell its items in the game.');
      if(kind==='resource'){
        const checked=resourceTools.plan(state,options.resource,options.amount);
        if(checked.error)return report(checked.error+' No changes applied.');
      }
      if(kind==='dungeon_level'){
        const current=state.dungs?.[options.dungeon];
        if(!current)return report('Adventure data has not loaded yet. Open Adventures in the game, then try again.');
        if(current.age>options.age||current.age===options.age&&current.level>=options.level)return report('Choose an adventure stage above your current progress. Lower targets are blocked.');
      }
      if(kind==='quality'&&state.forge.level>=(catalog?.forgeMax||5))return report('Forge is already at the maximum level.');
      if(!baseline)return report('Waiting for save metadata. Let the game save before trying again.');
      if(kind==='campaign_level'&&(options.age*100+options.level<=Math.max(state.core?.last||0,(state.core?.age||0)*100+(state.core?.level||0))))return report('Choose a campaign stage above your current progress. Lower targets are blocked.');
      if(kind==='forge_level'&&options.level<=state.forge.level)return report('Choose a forge level above your current level.');
      if(kind==='arena_rank'&&state.arena&&(options.league<state.arena.league||options.league===state.arena.league&&options.points<=state.arena.points))return report('Choose an Arena rank above your current rank. Lower targets are blocked.');
      if(kind==='research_nodes'){const checked=window.__autoForgeResearch.validate(state,options);if(checked.error)return report(checked.error);}
      if(kind==='skins_unlock'){const checked=window.__autoForgeSkins.plan(state);if(checked.error)return report(checked.error);if(!checked.added)return report('All available skin pieces are already unlocked.','info');}
      if(kind==='skill_cards'&&options.amount>skillCardLimit(state,options.skill))return report(`You can add up to ${skillCardLimit(state,options.skill)} cards without exceeding the exact whole-number limit. No changes applied.`);
      if(kind==='egg_timers'||kind==='egg_start_finish'){const checked=eggTools.plan(state.pets,kind==='egg_start_finish');if(checked.error)return report(checked.error);}
      if(kind==='pet_level'||kind==='mount_level'){const checked=creatureLevels.plan(state,kind==='pet_level'?'pets':'mounts',options.level);if(checked.error)return report(checked.error+' No changes applied.');}
      const beforeArm=clone(record);
      record.pending = { kind, options, account, baseline, expires: Date.now() + 5 * 60 * 1000 };
      record.pending.guard={forge:state.forge.level,arena:state.arena?{league:state.arena.league,points:state.arena.points}:null,balance:kind==='resource'?state.inventory?.items?.[options.resource]:null};
      if(kind==='skins_unlock')record.pending.guard.skinItems=window.__autoForgeSkins.plan(state).ids;
      if(['egg_add','egg_timers','egg_start_finish'].includes(kind))record.pending.guard.eggs=eggTools.guard(state.pets);
      retain(state);
      message = `${kind} armed for the next game load; expires in 5 minutes.`;
      record.outcome={account,text:'Change queued. Reloading the game…',type:'pending',at:Date.now()};
      try{persist();}catch{record=beforeArm;delete record.pending;return report('Browser storage could not save the operation. Allow storage for the game and try again.');}
      return true;
    }
    function cancel() { delete record.pending; report('Pending operation cancelled.','info'); }
    function get(obj, path) { return path.reduce((o,k) => o?.[k], obj); }
    function set(obj, path, value) {
      const target = path.slice(0,-1).reduce((o,k) => o?.[k], obj);
      if (!target || typeof target !== 'object') throw Error('State field missing');
      if (value === undefined) delete target[path.at(-1)]; else target[path.at(-1)] = value;
    }
    function transform(text, id) {
      bind(id);
      let plan = record.pending;
      if(!id)return text;
      let body; try { body = JSON.parse(text); } catch { return text; }
      let s = body?.data?.data;
      if (body.status !== 0 || !s?.forge || !s.inventory?.items) return text;
      const saved=checkpoint();
      if(saved&&validSave(s)){
        if(compareSaves(saved.snapshot,s)>0){
          s=body.data.data=clone(saved.snapshot);text=JSON.stringify(body);recoveredThisSession=true;
          if(!plan||plan.account!==id)report('Kept your newer local progress because the server returned an older save. Waiting for the game to save it.','recovered');
        }else{
          // The server has caught up, or has genuinely newer play on this account.
          delete record.checkpoint;try{localStorage.setItem(KEY,JSON.stringify(record));}catch{}
        }
      }
      if (!plan || plan.account !== id) return text;
      if (Date.now() > plan.expires) { cancel(); return text; }
      const opts=plan.options||{};
      if(!kinds.includes(plan.kind)||!optionsValid(plan.kind,opts)){cancel();return text;}
      if (!plan.baseline || !Number.isFinite(s.core?.last) || !Number.isFinite(s.player?.ingame_time)) {
        delete record.pending;message='Save-selection metadata missing; cancelled without changes.';persist();return text;
      }
      const stale=reason=>{delete record.pending;report(reason+' Wait for the game to save, then apply again. No changes applied.');return text;};
      const newerLoad=saved&&validSave(s)&&compareSaves(s,saved.snapshot)>0;
      if(!newerLoad&&s.core.last < plan.baseline.progress)return stale('The loaded campaign progress is older than your current progress.');
      if(!newerLoad&&s.player.ingame_time < plan.baseline.gameTime)return stale('The server returned an older save.');
      const guard=plan.guard;
      if(!newerLoad&&guard&&(s.forge.level<guard.forge||guard.arena&&(s.arena?.league<guard.arena.league||s.arena?.league===guard.arena.league&&s.arena?.points<guard.arena.points)))return stale('The loaded progression is behind your latest snapshot.');
      if(!newerLoad&&guard&&plan.kind==='resource'&&Number.isFinite(guard.balance)&&(s.inventory.items[opts.resource]??0)<guard.balance)return stale('The loaded balance is lower than the balance shown before Apply.');
      if(!newerLoad&&eggTools.older(s.pets,guard?.eggs))return stale('The loaded eggs are behind your latest snapshot.');
      const changes = [];
      let eggResult,creatureResult,skinResult;
      function change(path, value) { changes.push({ path, before: get(s,path), after:value }); }
      const reject=reason=>{delete record.pending;report(reason+' No changes applied.');return text;};
      const increase=(path,amount)=>{
        const before=get(s,path);
        if(!integer(before,0,Number.MAX_SAFE_INTEGER-amount))throw Error('Invalid counter');
        change(path,before+amount);
      };
      const increaseResource=(key,amount)=>{
        const checked=resourceTools.plan(s,key,amount);
        if(checked.error)return checked.error;
        change(['inventory','items',key],checked.after);
      };
      if(!integer(s.forge.level,1,Number.MAX_SAFE_INTEGER))return reject('Unexpected forge level.');
      try { if (plan.kind === 'timer') {
        if (!(s.forge.last > 0)) { delete record.pending; message='No active forge deadline in the loaded save; nothing changed.'; persist(); return text; }
        change(['forge','last'], Math.floor(typeof body.time === 'number' ? body.time : Date.now()/1000) - 1);
      } else if (plan.kind === 'coins') {
        const error=increaseResource('soft_currency',100);if(error)return reject(error);
      } else if (plan.kind === 'quality'||plan.kind==='forge_level') {
        const target=plan.kind==='quality'?Math.min(catalog?.forgeMax||5,s.forge.level+1):opts.level;
        if(s.forge.level>=target)return reject('Forge is already at or above the target.');
        change(['forge','level'], target);
        change(['forge','count'],0);change(['forge','upgrade'],0);change(['forge','last'],null);
      } else if(plan.kind==='campaign') {
        if(s.core.last>=314)return reject('Stage 3–15 access is already unlocked.');
        change(['core','age'],3);change(['core','level'],15);change(['core','last'],314);
      } else if(plan.kind==='campaign_level') {
        const target=opts.age*100+opts.level;
        if(!integer(s.core.age,1,catalog.campaignLevels.length)||!integer(s.core.level,1,catalog.campaignLevels[s.core.age-1]))return reject('Unexpected campaign stage.');
        if(target<=Math.max(s.core.last,s.core.age*100+s.core.level))return reject('Campaign is already at or above this target.');
        change(['core','age'],opts.age);change(['core','level'],opts.level);change(['core','last'],Math.max(s.core.last,target-1));
      } else if(plan.kind==='keys') {
        for(const key of resources.filter(k=>/^[abcd]key_currency$/.test(k))){const error=increaseResource(key,5);if(error)return reject(error);}
      } else if(plan.kind==='resource') {
        const error=increaseResource(opts.resource,opts.amount);if(error)return reject(error);
      } else if(plan.kind==='gear_level') {
        if(!s.armory?.equipment)return reject('No equipment state.');
        for(const [slot,item] of Object.entries(s.armory.equipment)) {
          if(!Array.isArray(item)||item.length<3||!integer(item[1],1,catalog.gearLevelMax))return reject('Unexpected equipment format.');
          if(item[1]<opts.level)change(['armory','equipment',slot,1],opts.level);
        }
      } else if(plan.kind==='gear_stash') {
        const stash=s.armory?.stash;
        if(!stash||typeof stash!=='object'||Object.keys(stash).length)return reject('Clear the existing stash first.');
        const items=stashItems(opts).map(v=>[String(v.item),v.level,v.seed]);
        items.sort((a,b)=>catalog.items[a[0]].age-catalog.items[b[0]].age);
        change(['armory','stash'],items);
      } else if(plan.kind==='skill_cards') {
        if(!s.skills?.skills)return reject('No skill state.');
        if(opts.amount>skillCardLimit(s,opts.skill))return reject('The loaded skill counters cannot hold this addition within the exact whole-number limit.');
        const owned=s.skills.skills[opts.skill];
        if(owned){
          if(!Array.isArray(owned)||owned.length!==3)return reject('Unexpected skill-card format.');
          increase(['skills','skills',opts.skill,2],opts.amount);
        }else change(['skills','skills',opts.skill],[0,1,opts.amount-1]);
        for(const k of ['amount','count','upgrade'])increase(['skills',k],opts.amount);
      } else if(plan.kind==='egg_level') {
        const c=s.dungs?.c;
        if(!c||c.age!==1||!integer(c.level,1,catalog.eggDungeonMax+1))return reject('Unexpected egg-adventure state.');
        if(c.level>=opts.level)return reject('Egg adventure is already at or above that level.');
        change(['dungs','c','level'],opts.level);
      } else if(plan.kind==='egg_add') {
        const pets=s.pets;
        if(!pets?.eggs||!pets?.pets||!pets?.processes||!integer(pets.amount,0,Number.MAX_SAFE_INTEGER-1))return reject('Unexpected pet state or no exact identifiers remain.');
        let next=pets.amount+1;
        const ids=new Set([...Object.keys(pets.eggs),...Object.keys(pets.pets),...Object.values(pets.processes).filter(Boolean).map(p=>String(p[0]))]);
        while(next<Number.MAX_SAFE_INTEGER&&ids.has(String(next)))next++;
        if(ids.has(String(next)))return reject('Pet identifier limit reached.');
        change(['pets','amount'],next);change(['pets','eggs',String(next)],[String(next),String(opts.pet),opts.seed]);
      } else if(plan.kind==='egg_timers'||plan.kind==='egg_start_finish') {
        eggResult=eggTools.plan(s.pets,plan.kind==='egg_start_finish');
        if(eggResult.error)return reject(eggResult.error);
        for(const c of eggResult.changes)change(c.path,c.after);
      } else if(plan.kind==='research_timers') {
        for(const tree of ['forge','power','skills','pets'])for(const [key,node]of Object.entries(s.technos?.[tree]?.nodes||{}))if(Array.isArray(node)&&node[1]>0)change(['technos',tree,'nodes',key,1],Math.floor(body.time||Date.now()/1000)-1);
      } else if(plan.kind==='pet_level'||plan.kind==='mount_level') {
        creatureResult=creatureLevels.plan(s,plan.kind==='pet_level'?'pets':'mounts',opts.level);
        if(creatureResult.error)return reject(creatureResult.error);
        for(const c of creatureResult.changes)change(c.path,c.after);
      } else if(plan.kind==='mount_add') {
        const mounts=s.mounts;
        if(!mounts?.mounts||!integer(mounts.amount,0,Number.MAX_SAFE_INTEGER-1))return reject('Unexpected mount state or no exact identifiers remain.');
        let next=mounts.amount+1;
        while(next<Number.MAX_SAFE_INTEGER&&Object.hasOwn(mounts.mounts,String(next)))next++;
        if(Object.hasOwn(mounts.mounts,String(next)))return reject('Mount identifier limit reached.');
        change(['mounts','amount'],next);
        change(['mounts','mounts',String(next)],[String(next),String(opts.mount),1,1,0]);
        increase(['mounts','count'],1);increase(['mounts','upgrade'],1);
      } else if(plan.kind==='mount_summon_level'||plan.kind==='skill_summon_level') {
        const group=plan.kind==='mount_summon_level'?'mounts':'skills',current=s[group],cap=group==='mounts'?catalog.mountSummonMax:catalog.skillSummonMax;
        const progressionCap=group==='mounts'?catalog.mountProgressionMax:cap;
        if(!current||!integer(current.level,1,progressionCap)||!integer(current.count,0,Number.MAX_SAFE_INTEGER)||!integer(current.upgrade,0,Number.MAX_SAFE_INTEGER))return reject('Unexpected summon state.');
        const repair=group==='mounts'&&current.level>cap&&opts.level===cap;
        if(current.level>cap&&!repair)return reject(`Mount odds are missing above level ${cap}; use Restore mount summon odds.`);
        if(current.level>=opts.level&&!repair)return reject('Summon level is already at or above the target.');
        change([group,'level'],opts.level);change([group,'count'],0);change([group,'upgrade'],0);
      } else if(plan.kind==='skins_unlock') {
        skinResult=window.__autoForgeSkins.plan(s);
        if(skinResult.error)return reject(skinResult.error);
        if(!newerLoad&&guard?.skinItems?.some(id=>!skinResult.ids.includes(id)))return stale('The loaded skin collection is older than your current collection.');
        if(!skinResult.added)return reject('All available skin pieces are already unlocked.');
        for(const c of skinResult.changes)change(c.path,c.after);
      } else if(plan.kind==='arena_rank') {
        const current=s.arena;
        if(!current||!integer(current.league,1,catalog.arenaLeagues.length)||!integer(current.points,0,Number.MAX_SAFE_INTEGER))return reject('Unexpected Arena rank.');
        if(current.league>opts.league||current.league===opts.league&&current.points>=opts.points)return reject('Arena rank is already at or above the target.');
        change(['arena','league'],opts.league);change(['arena','points'],opts.points);
      } else if(plan.kind==='research_nodes') {
        const checked=window.__autoForgeResearch.validate(s,opts);
        if(checked.error)return reject(checked.error);
        for(const c of checked.changes)change(c.path,c.after);
      } else if(plan.kind==='research_tree') {
        const current=s.technos?.[opts.tree],definition=catalog.research[opts.tree];
        if(!current?.nodes||!integer(current.layers,0,Math.max(...Object.values(definition).map(n=>n.layer))+1))return reject('Unexpected research state.');
        for(const [id,node]of Object.entries(current.nodes))if(!Object.hasOwn(definition,id)||!Array.isArray(node)||node.length!==2||!integer(node[0],0,definition[id].levels)||node[1]!==0)return reject('Finish active research before raising this tree.');
        for(const [id,node]of Object.entries(definition)) {
          const before=node.layer<current.layers?node.levels:current.nodes[id]?.[0]||0;
          const after=Math.min(opts.level,node.levels);
          if(before<after)change(['technos',opts.tree,'nodes',id],[after,0]);
        }
      } else if(plan.kind==='dungeon_level') {
        const current=s.dungs?.[opts.dungeon],limits=catalog.dungeons[opts.dungeon];
        if(!current||!integer(current.age,1,limits.length)||!integer(current.level,1,limits[current.age-1]+1))return reject('Unexpected adventure state.');
        if(current.age>opts.age||current.age===opts.age&&current.level>=opts.level)return reject('Adventure is already at or above the target.');
        change(['dungs',opts.dungeon,'age'],opts.age);change(['dungs',opts.dungeon,'level'],opts.level);
      } else if (plan.kind === 'restore' && record.last?.account === id) {
        for (const c of record.last.changes) change(c.path,c.before);
      }} catch {return reject('The loaded data did not match the expected field format.');}
      if (!changes.length)return reject('No applicable fields or active timers.');
      for (const c of changes) set(s,c.path,c.after);
      const beforeTime=s.player.ingame_time;
      const elapsed=Math.max(0,Math.ceil((Date.now()-plan.baseline.observedAt)/1000));
      // The game accrues play time in 30-second ticks; a local tick can precede its next server save.
      s.player.ingame_time=Math.max(beforeTime,plan.baseline.gameTime)+elapsed+32;
      const beforeApply=clone(record),previouslyApplied=appliedThisSession;
      record.last={account:id,kind:plan.kind,at:Date.now(),changes,selection:{beforeTime,afterTime:s.player.ingame_time}};
      if(eggResult)record.last.eggIds=eggResult.ids;
      appliedThisSession=true;
      delete record.pending;
      message=`Applied ${plan.kind} to the browser's loaded state. Gameplay and persistence are not yet verified.`;
      if(plan.kind==='resource'){const c=changes[0];message=`Applied ${opts.resource.replaceAll('_',' ')}: ${c.before??0} → ${c.after}.${Number.isFinite(c.before)&&!Number.isInteger(c.before)?' Fractional balance rounded up before adding.':''} Waiting for a game save; server persistence is not yet confirmed.`;}
      if(plan.kind==='research_nodes')message=`Applied upgrades to ${changes.length} research nodes. Waiting for a game save; server persistence is not yet confirmed.`;
      if(eggResult)message=`${eggResult.ready} egg${eggResult.ready===1?'':'s'} ready to collect in the game. ${eggResult.waiting} waiting in inventory${eggResult.waiting?'; collect ready eggs to free slots, then start the next batch':''}. Server persistence is not yet confirmed.`;
      if(creatureResult)message=`Edited incoming data for ${creatureResult.raised} ${creatureResult.raised===1?creatureResult.group.slice(0,-1):creatureResult.group} to level ${creatureResult.target}; ${creatureResult.skipped} already at or above target. Waiting for the game to use and save these levels.`;
      if(skinResult)message=`Added ${skinResult.added} skin pieces to the loaded collection. Choose skins in the game’s Skins screen. Server persistence is not yet confirmed.`;
      if(plan.kind==='gear_stash')message=`Created ${stashItems(opts).length} item(s) in the stash. Use Equip/Sell in the game. Server persistence is not yet confirmed.`;
      record.outcome={account:id,text:message,type:'applied',at:Date.now()};
      retain(s);
      try{persist();}catch{
        record=beforeApply;delete record.pending;appliedThisSession=previouslyApplied;
        report('Browser storage could not retain the changed save. No new change applied; free browser storage and try again.');
        return text;
      }
      return JSON.stringify(body);
    }
    return { identity, bind, observe, arm, cancel, transform,
      skillCardLimit:id=>skillCardLimit(state,id),
      resourcePreview:(key,amount)=>resourceTools.plan(state,key,amount),
      gearState:()=>({stash:clone(state?.armory?.stash??null),equipment:clone(state?.armory?.equipment??{}),age:state?.core?.age}),
      skinSummary:()=>{const p=window.__autoForgeSkins.plan(state);return {error:p.error,owned:p.owned,total:p.total,added:p.added};},
      previewCreatureLevels:(group,target)=>{const p=creatureLevels.plan(state,group,target);return {error:p.error,raised:p.raised,skipped:p.skipped,target:p.target};},
      summary: () => ({ identified:!!account, accountTag:account, eligible:eligible(), appliedThisSession, recoveredThisSession, message, outcome:record.outcome?.account===account?record.outcome:null, pending:record.pending ? {kind:record.pending.kind,options:record.pending.options,expires:record.pending.expires} : null,
        last:record.last?.account===account ? {kind:record.last.kind,at:record.last.at,changes:record.last.changes,selection:record.last.selection} : null }) };
  };
})();

(() => {
  'use strict';
  // Inspect descriptors only: do not invoke getters, engine callbacks or read memory contents.
  window.__autoForgeRuntimeDiagnostic = function () {
    function own(obj, key) {
      if (!obj || !['object','function'].includes(typeof obj)) return undefined;
      const d=Object.getOwnPropertyDescriptor(obj,key);
      return d && 'value' in d ? d.value : undefined;
    }
    function describe(name) {
      const value=own(window,name);
      if (!value) return {name,available:false};
      const descriptors=Object.getOwnPropertyDescriptors(value);
      const functions=Object.entries(descriptors).filter(([,d])=>'value' in d && typeof d.value==='function').map(([k])=>k).sort();
      const objects=Object.entries(descriptors).filter(([,d])=>'value' in d && d.value && typeof d.value==='object').map(([k])=>k).sort();
      return {name,available:true,functions,objects,accessorsSkipped:Object.values(descriptors).filter(d=>!('value' in d)).length};
    }
    const mod=own(window,'Module');
    const heap=own(mod,'HEAPU8');
    const memory=own(mod,'wasmMemory');
    return {at:new Date().toISOString(),mode:'Read-only descriptors; no engine calls or memory contents',
      engineStarted:own(mod,'calledRun')===true,
      byteHeapExposed:typeof Uint8Array!=='undefined' && heap instanceof Uint8Array,
      wasmMemoryExposed:typeof WebAssembly!=='undefined' && memory instanceof WebAssembly.Memory,
      surfaces:['Module','JsToDef','wasmExports','Lua','lua','Defold'].map(describe)};
  };
})();

(() => {
  'use strict';
  const KEY = '__autoForgeReadOnlyInspector_v1';
  if (window[KEY]) return;
  const model = { version: '1.0.0', started: Date.now(), source: null, capturedAt: null,
    snapshot: null, previous: null, loads:[], serverOffset: null, events: [], totals: {}, errors: 0 };
  const MAX_BODY = 2 * 1024 * 1024;
  let host, panel, interval, stopped = false, activeView = 'Overview';
  const trainerViews=['Progress','Combat','PvP','Resources','Gear','Skills','Eggs','Mounts','Research','Adventures'];
  const PREFS='af-trainer-ui-v1';
  let preferences={};try{preferences=JSON.parse(localStorage.getItem(PREFS)||'{}')||{};}catch{}
  let advanced=preferences.advanced===true;
  const savePreferences=()=>{try{localStorage.setItem(PREFS,JSON.stringify({advanced,view:activeView,researchTree:preferences.researchTree}));}catch{}};
  const isTrainerView=()=>!!lab&&trainerViews.includes(activeView);
  const trainerForm={};
  let readouts=[];
  function liveText(parent,read,className='current-value'){const e=node('p',read(),parent);e.className=className;readouts.push(()=>{e.textContent=read();});return e;}
  function refreshReadouts(){for(const update of readouts)update();}
  const native=window.__autoForgeNativePatchFactory?.(()=>safeRun(render));
  const originalFetch = window.fetch;
  const xp = window.XMLHttpRequest.prototype;
  const originalOpen = xp.open, originalSend = xp.send;
  const requests = new WeakMap();
  const lab = window.__autoForgeTestLabFactory?.(() => safeRun(render));
  const gearEditor=window.__autoForgeGear?.createEditor({getSnapshot:()=>lab?.gearState(),getAccount:()=>lab?.summary().accountTag,isEligible:()=>lab?.summary().eligible,apply:applyChange});
  const researchEditor=window.__autoForgeResearch?.createEditor({getSnapshot:()=>model.snapshot,getAccount:()=>lab?.summary().accountTag,apply:applyChange,initialTree:preferences.researchTree,onSelect:tree=>{preferences.researchTree=tree;savePreferences();}});
  if(lab)activeView=trainerViews.includes(preferences.view)?preferences.view:'Progress';
  const originalHeader = xp.setRequestHeader, originalResponseHeader = xp.getResponseHeader;
  const responseTextDescriptor = Object.getOwnPropertyDescriptor(xp,'responseText');
  const responseDescriptor = Object.getOwnPropertyDescriptor(xp,'response');
  function accountFrom(headers) {
    try { return lab?.identity(new Headers(headers).get('X-Auth-Uid')); } catch { return null; }
  }
  const allowed = {
    inventory: ['items', 'charges', 'charge_cap', 'd'],
    forge: ['level', 'count', 'upgrade', 'last'], core: ['age', 'level', 'last'],
    arena: ['league', 'points', 'strikes', 'history'],
    skills: ['level', 'count', 'upgrade', 'amount', 'active_skills', 'skills'],
    armory: ['total', 'amount', 'equipment', 'stash'],
    pets: ['pets', 'eggs', 'processes', 'active_pets', 'add_slot'],
    mounts: ['level', 'count', 'upgrade', 'mounts', 'active_mounts'],
    technos: null, liveops: null, dungs:['a','b','c','d']
  };
  // Only numeric/boolean values from explicit game subsystems survive. No player profile, tokens or strings.
  function numericTree(value, depth = 0) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
    if (typeof value === 'boolean' || value === null) return value;
    if (!value || typeof value !== 'object' || depth > 12) return undefined;
    const out = Array.isArray(value) ? [] : Object.create(null);
    for (const [k, v] of Object.entries(value).slice(0, 5000)) {
      if (!/^[a-zA-Z0-9_.-]{1,80}$/.test(k) || ['__proto__','constructor','prototype'].includes(k) || /token|secret|auth|session|user|name|email|avatar|profile|signature|password/i.test(k)) continue;
      const safe = numericTree(v, depth + 1);
      if (safe !== undefined) out[k] = safe;
    }
    return out;
  }
  function sanitize(state) {
    if (!state || typeof state !== 'object' || !state.inventory?.items || !state.forge) return null;
    const out = Object.create(null);
    for (const [section, keys] of Object.entries(allowed)) {
      if (!state[section]) continue;
      if (!keys) out[section] = numericTree(state[section]);
      else {
        out[section] = Object.create(null);
        for (const key of keys) {
          const v = numericTree(state[section][key]);
          if (v !== undefined) out[section][key] = v;
        }
      }
    }
    return out;
  }
  function category(input) {
    try {
      const pathname = new URL(typeof input === 'string' ? input : input.url, location.href).pathname;
      if (/\/users\/publish\/?$/.test(pathname)) return 'Save';
      if (/\/users\/fetch\/?$/.test(pathname)) return 'Load';
      if (/\/events\/publish\/?$/.test(pathname)) return 'Telemetry';
      if (pathname.includes('/api/energy-help/')) return 'Hammer help';
      if (/\/api\/(products|orders|payments)/.test(pathname)) return 'Store';
      return null;
    } catch { return null; }
  }
  function safeRun(fn) { try { return fn(); } catch { model.errors++; } }
  async function bodyText(body) {
    if (typeof body === 'string') return body.length <= MAX_BODY ? body : '';
    if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
      if (body.byteLength > MAX_BODY) return '';
      return new TextDecoder().decode(body);
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob && body.size <= MAX_BODY) return body.text();
    return '';
  }
  function isPlayerLoad(text) {
    try { const body=JSON.parse(text); return body && typeof body==='object' && body.without_data !== true; }
    catch { return false; }
  }
  function inspect(text, kind, direction) {
    if (stopped || !text || text.length > MAX_BODY) return;
    let body;
    try { body = JSON.parse(text); } catch { return; }
    if (direction === 'response' && typeof body.time === 'number') model.serverOffset = body.time * 1000 - Date.now();
    const raw = kind === 'Save' && direction === 'request' ? body.data
      : kind === 'Load' && direction === 'response' ? body.data?.data : null;
    const snapshot = sanitize(raw);
    if (!snapshot) return;
    model.previous = model.snapshot;
    model.snapshot = snapshot;
    lab?.observe(raw,{progress:raw.core?.last,gameTime:raw.player?.ingame_time,source:kind});
    model.source = kind === 'Save' ? 'Outgoing save (not proof of server acceptance)' : lab ? 'Loaded response (may include an armed local test)' : 'Server load';
    model.capturedAt = Date.now();
    if(kind==='Load') {
      const status=lab?.summary();
      model.loads.unshift({at:model.capturedAt,modified:!!(status?.appliedThisSession||status?.recoveredThisSession),snapshot});
      model.loads.length=Math.min(4,model.loads.length);
    }
    render();
  }
  function start(kind) {
    const event = { kind, at: Date.now(), httpStatus: null, appStatus: null, durationMs: null };
    model.totals[kind] = (model.totals[kind] || 0) + 1;
    model.events.unshift(event); model.events.length = Math.min(100, model.events.length);
    return event;
  }
  function finish(event, status, text = '') {
    if (stopped) return;
    event.httpStatus = status;
    event.durationMs = Date.now() - event.at;
    if (text && text.length <= MAX_BODY) {
      try { const obj = JSON.parse(text); if (typeof obj.status === 'number') event.appStatus = obj.status; } catch {}
      inspect(text, event.kind, 'response');
    }
    render();
  }
  function fetchWrapper(input, init) {
    const result = Reflect.apply(originalFetch, this, arguments);
    const kind = category(input);
    const id = accountFrom(init?.headers || (typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined));
    if (kind === 'Save' || kind === 'Load') lab?.bind(id);
    let delivered = result;
    if (kind === 'Load' && lab && !stopped) {
      const requestBody = init && 'body' in init ? bodyText(init.body)
        : typeof Request !== 'undefined' && input instanceof Request ? input.clone().text() : Promise.resolve('');
      delivered = result.then(async response => {
        try {
          if (!isPlayerLoad(await requestBody)) return response;
          const text = await response.clone().text();
          if (stopped || text.length > MAX_BODY) return response;
          const modified = lab.transform(text,id);
          if (modified === text) return response;
          const headers = new Headers(response.headers);
          headers.delete('Content-Encoding');
          headers.set('Content-Length',String(new TextEncoder().encode(modified).length));
          const replacement = new Response(modified,{status:response.status,statusText:response.statusText,headers});
          return replacement;
        } catch { model.errors++; return response; }
      });
    }
    safeRun(() => {
      if (!kind || stopped) return;
      const event = start(kind);
      if (kind === 'Save') {
        if (init && 'body' in init) bodyText(init.body).then(t => safeRun(() => inspect(t, kind, 'request'))).catch(() => {});
        else if (typeof Request !== 'undefined' && input instanceof Request) input.clone().text().then(t => safeRun(() => inspect(t, kind, 'request'))).catch(() => {});
      }
      delivered.then(response => {
        safeRun(() => finish(event, response.status));
        if (kind === 'Load' || kind === 'Save') {
          safeRun(() => response.clone().text().then(t => safeRun(() => finish(event, response.status, t))).catch(() => {}));
        }
      }, () => safeRun(() => finish(event, 0)));
    });
    return delivered;
  }
  function openWrapper(method, url) {
    const previous = requests.get(this);
    for (const key of ['response','responseText']) {
      if (previous?.getters?.[key] === Object.getOwnPropertyDescriptor(this,key)?.get && previous?.getters?.[key]) delete this[key];
    }
    const result = Reflect.apply(originalOpen, this, arguments);
    safeRun(() => requests.set(this, { kind: category(String(url)) }));
    safeRun(() => {
      const info=requests.get(this);
      if (info.kind !== 'Load' || !lab || !responseDescriptor?.get || !responseTextDescriptor?.get) return;
      const xhr=this;
      function transformed() {
        if (stopped) return undefined;
        if (!info.playerLoad) return undefined;
        if (info.readDone) return info.value;
        const type=xhr.responseType;
        if (xhr.readyState !== 4) return undefined;
        let raw=type && type!=='text' ? responseDescriptor.get.call(xhr) : responseTextDescriptor.get.call(xhr);
        let text=type==='json'?JSON.stringify(raw):type==='arraybuffer'?new TextDecoder().decode(raw):raw;
        if (typeof text!=='string' || text.length>MAX_BODY) return undefined;
        const mod=lab.transform(text,info.account);
        info.readDone=true;info.modified=mod!==text;info.text=mod;
        info.value=type==='json'?JSON.parse(mod):type==='arraybuffer'?new TextEncoder().encode(mod).buffer:mod;
        return info.value;
      }
      info.getters = {response(){return transformed() ?? responseDescriptor.get.call(xhr);},responseText(){
        if (xhr.responseType && xhr.responseType!=='text') return responseTextDescriptor.get.call(xhr);
        return transformed() ?? responseTextDescriptor.get.call(xhr);
      }};
      for (const key of ['response','responseText']) Object.defineProperty(xhr,key,{configurable:true,get:info.getters[key]});
    });
    return result;
  }
  function headerWrapper(name,value) {
    const result=Reflect.apply(originalHeader,this,arguments);
    safeRun(()=>{const info=requests.get(this);if(info && /^x-auth-uid$/i.test(name)){info.account=lab?.identity(String(value));lab?.bind(info.account);}});
    return result;
  }
  function responseHeaderWrapper(name) {
    if (/^content-length$/i.test(name)) {
      safeRun(()=>{if(requests.get(this)?.kind==='Load') void this.response;});
      const info=requests.get(this);
      if (info?.modified) return String(new TextEncoder().encode(info.text).length);
    }
    return Reflect.apply(originalResponseHeader,this,arguments);
  }
  function sendWrapper(body) {
    const requestInfo=requests.get(this);
    if(requestInfo?.kind==='Load') {
      try { requestInfo.playerLoad=isPlayerLoad(typeof body==='string'?body:new TextDecoder().decode(body)); } catch { requestInfo.playerLoad=false; }
    }
    safeRun(() => {
      const info = requests.get(this); if (!info?.kind || stopped) return;
      const event = start(info.kind);
      if (info.kind === 'Save') bodyText(body).then(t => safeRun(() => inspect(t, info.kind, 'request'))).catch(() => {});
      this.addEventListener('loadend', () => safeRun(() => {
        let text = '';
        if (info.kind === 'Save' || info.kind === 'Load') {
          if (!this.responseType || this.responseType === 'text') text = this.responseText;
          else if (this.responseType === 'json') text = JSON.stringify(this.response);
          else if (this.responseType === 'arraybuffer') text = new TextDecoder().decode(this.response);
        }
        finish(event, this.status, text);
      }), { once: true });
    });
    return Reflect.apply(originalSend, this, arguments);
  }
  function stop() {
    stopped = true; clearInterval(interval);
    lab?.cancel();
    if (window.fetch === fetchWrapper) window.fetch = originalFetch;
    if (xp.open === openWrapper) xp.open = originalOpen;
    if (xp.send === sendWrapper) xp.send = originalSend;
    if (xp.setRequestHeader === headerWrapper) xp.setRequestHeader = originalHeader;
    if (xp.getResponseHeader === responseHeaderWrapper) xp.getResponseHeader = originalResponseHeader;
    native?.stop();
    host?.remove(); delete window[KEY];
  }
  function node(tag, text, parent) {
    const e = document.createElement(tag); if (text !== undefined) e.textContent = text;
    parent?.appendChild(e); return e;
  }
  const fmt = v => typeof v === 'number' ? v.toLocaleString() : '—';
  function duration(seconds) {
    if (!Number.isFinite(seconds)) return 'Unknown';
    const s = Math.max(0, Math.ceil(seconds));
    return `${Math.floor(s / 3600)}h ${Math.floor(s % 3600 / 60)}m ${s % 60}s`;
  }
  function table(parent, rows) {
    const t = node('table', undefined, parent);
    rows.forEach(([a,b]) => { const tr=node('tr',undefined,t); node('td',a,tr); node('td',String(b),tr); });
  }
  function applyChange(kind, options) {
    // Persist the validated one-shot plan before restarting this game frame.
    if (lab?.arm(kind, options) === true) location.reload();
  }
  function render(force = false) {
    if (!panel || stopped) return;
    const focused=panel.getRootNode().activeElement;
    if (!force && isTrainerView() && panel.contains(focused) && ['INPUT','SELECT','BUTTON'].includes(focused?.tagName)){refreshReadouts();return;}
    readouts=[];
    panel.classList.toggle('research-view',activeView==='Research');
    panel.replaceChildren();
    const s = model.snapshot;
    if(advanced||!lab)liveText(panel,()=>model.snapshot ? `${model.source} · ${Math.floor((Date.now()-model.capturedAt)/1000)}s ago` : 'Waiting for the game’s next save. Play normally; no extra request is sent.','snapshot-meta');
    if(isTrainerView()){
      const status=lab.summary(),cat=window.__autoForgeCatalog;
      const statusBox=liveText(panel,()=>lab.summary().message,'status-banner');
      readouts.push(()=>{const current=lab.summary(),kind=current.outcome?.type||'info';statusBox.dataset.kind=kind;statusBox.hidden=['Research','Gear'].includes(activeView)&&!(kind==='error'||kind==='pending'||kind==='applied'&&(activeView==='Research'?current.last?.kind?.startsWith('research'):['gear_stash','gear_level','skins_unlock'].includes(current.last?.kind)));});refreshReadouts();
      if(!['Research','Gear'].includes(activeView))liveText(panel,()=>{const v=model.snapshot;return v?`Current: stage ${v.core?.age??'—'}–${v.core?.level??'—'} · Forge ${fmt(v.forge?.level)} · Coins ${fmt(v.inventory?.items?.soft_currency)} · Hammers ${fmt(v.inventory?.items?.forge_currency)} · Arena ${window.__autoForgeCatalog?.arenaLeagues?.[v.arena?.league-1]?.name||v.arena?.league||'—'}, ${fmt(v.arena?.points)} points`:'Waiting for your current account data…';},'current-account');
      const button=(label,action)=>{const b=node('button',label,panel);b.onclick=()=>{action();render(true);panel.scrollTop=0;};return b;};
      if(status.pending)button('Cancel pending operation',()=>lab.cancel()).className='secondary-action';
      const select=(label,entries,current)=>{const l=node('label',label,panel),e=node('select',undefined,l);e.setAttribute('aria-label',label);for(const [value,text]of entries){const o=node('option',text,e);o.value=value;}if(trainerForm[label]!==undefined)e.value=trainerForm[label];else if(current!==undefined)e.value=String(current);e.onchange=()=>{trainerForm[label]=e.value;refreshReadouts();};return e;};
      const number=(label,value,min,max)=>{const l=node('label',label,panel),e=node('input',undefined,l);e.type='number';e.value=trainerForm[label]??value;e.min=min;e.max=max;e.setAttribute('aria-label',label);e.oninput=()=>{trainerForm[label]=e.value;refreshReadouts();};return e;};
      const levelRange=(section,index)=>{const values=Object.values(model.snapshot?.[section]?.[section]||{}).map(v=>v[index]).filter(Number.isFinite);return values.length?`${Math.min(...values)}–${Math.max(...values)}`:'none owned';};
      const ns=native?.summary();model.native=ns;
      if(activeView==='Combat'){
      node('h3','Live combat',panel);
      liveText(panel,()=>native?.status?.()||native?.summary().error||(!native?.summary().served?'Waiting for the game archive. Reload after installing the script.':`Native modules: HP ${native.summary().ready.hp?'ready':'waiting'}, skills ${native.summary().ready.cd?'ready':'waiting'}, Arena ${native.summary().ready.arena?'ready':'waiting'}.`));
      if(!status.eligible)node('p',status.identified?'Waiting for a complete account snapshot.':'Waiting for account identification. Open the game and let it finish loading.',panel);
      if(advanced)button('Refresh native status',render).className='secondary-action';
      if(!ns?.ready.hp||!ns?.ready.cd||!ns?.ready.arena||!ns?.ready.speed)button('Reload game to initialize combat',()=>location.reload()).className='secondary-action';
      const speed=select('Combat speed',[[1,'1× · Normal'],[2,'2×'],[3,'3×'],[5,'5×']],ns?.speed||1);
      speed.onchange=()=>{if(lab.summary().eligible)native?.set('speed',Number(speed.value));refreshReadouts();};
      const updateSpeed=()=>{const n=native?.summary();speed.value=String(n?.speed||1);speed.disabled=!n?.ready.speed||!lab.summary().eligible;speed.title=n?.ready.speed?'Changes immediately; resets to 1× on reload':native?.status?.()||'Waiting for the combat module';};readouts.push(updateSpeed);updateSpeed();
      node('p','Speeds up both sides, skills, waves, and the battle countdown. Changes immediately; resets to 1× on reload. Try 2× first; higher speeds use more CPU. Reward screens and menus keep their normal timing.',panel);
      for(const [key,label]of [['hp','Prevent player HP loss'],['cd','Reuse skills when inactive']]) {
        const b=button(`${label}: ${ns?.[key]?'ON':'OFF'}`,()=>{if(lab.summary().eligible)native?.set(key,!native.summary()[key]);});
        b.className='combat-toggle'; b.setAttribute('aria-pressed',String(!!ns?.[key]));
        const update=()=>{const n=native?.summary();b.disabled=!n?.ready[key]||!lab.summary().eligible;b.title=!lab.summary().eligible?'Waiting for current account data':n?.ready[key]?'':native?.status?.()||'Game module is not ready';};readouts.push(update);update();
      }
      node('p','Combat switches reset to OFF on reload. They do not block saving of rewards or progression. Cooldown mode retains the active-skill guard.',panel);
      }
      if(activeView==='Progress'){
      node('h3','Campaign',panel);
      if(cat?.campaignLevels){
        const age=select('Campaign age',cat.campaignLevels.map((n,i)=>[String(i+1),`Age ${i+1} · ${n} levels`]),s?.core?.age||1);
        const stage=number('Campaign level',s?.core?.level||1,1,cat.campaignLevels[Number(age.value)-1]);
        age.onchange=()=>{trainerForm['Campaign age']=age.value;stage.max=cat.campaignLevels[Number(age.value)-1];stage.value=Math.min(Number(stage.value),Number(stage.max));trainerForm['Campaign level']=stage.value;refreshReadouts();};
        liveText(panel,()=>`Current ${model.snapshot?.core?.age??'—'}–${model.snapshot?.core?.level??'—'} · Maximum ${cat.campaignLevels.length}–${cat.campaignLevels.at(-1)}. Only forward progress is allowed.`);
        button('Raise campaign stage',()=>applyChange('campaign_level',{age:Number(age.value),level:Number(stage.value)}));
      }
      node('h3','Forge',panel);
      if(cat?.forgeMax){const forgeLevel=number('Forge level',s?.forge?.level||1,1,cat.forgeMax);liveText(panel,()=>`Current forge ${fmt(model.snapshot?.forge?.level)} · Maximum ${cat.forgeMax}`);button('Raise forge level',()=>applyChange('forge_level',{level:Number(forgeLevel.value)}));}
      button('Finish active forge deadline',()=>applyChange('timer'));
      }
      if(activeView==='Adventures'){
      button('Add 5 of each adventure key',()=>applyChange('keys'));
      liveText(panel,()=>`Current keys: ${[['a','Portal'],['b','Horde'],['c','Nest'],['d','Lab']].map(([k,name])=>`${name} ${fmt(model.snapshot?.inventory?.items?.[k+'key_currency'])}`).join(' · ')}`);
      }
      if(activeView==='Resources'){
      node('h3','Resources',panel);
      const resource=select('Resource',[['soft_currency','Coins'],['forge_currency','Hammers'],['skills_currency','Skill summon currency'],['tech_currency','Technology points'],['pet_currency','Pet drop currency'],['mount_currency','Horseshoes (mount currency)'],['arena_currency','Arena tickets']]);
      const amount=number('Resource amount',100,1,Number.MAX_SAFE_INTEGER);
      liveText(panel,()=>{const p=lab.resourcePreview(resource.value,Number(amount.value));amount.max=p.max??Number.MAX_SAFE_INTEGER;return `Current ${fmt(p.current)}${p.rounded?` (rounded up to ${fmt(p.balance)})`:''} → after addition ${fmt(p.after)}`;});
      liveText(panel,()=>{const p=lab.resourcePreview(resource.value,Number(amount.value));return p.error||`Maximum addition ${fmt(p.max)} · numeric precision limit`;});
      button('Apply resource addition',()=>applyChange('resource',{resource:resource.value,amount:Number(amount.value)}));
      }
      if(activeView==='PvP'){
      node('h3','Arena',panel);
      liveText(panel,()=>native?.summary().ready.arena?'Opponent controls ready.':native?.status?.()||'Waiting for the Arena module.');
      if(!ns?.ready.arena)button('Reload game to initialize combat',()=>location.reload()).className='secondary-action';
      const weak=button(`Weaker Arena opponents: ${ns?.arena?'ON':'OFF'}`,()=>{if(lab.summary().eligible)native?.set('arena',!native.summary().arena);});
      weak.className='combat-toggle';weak.setAttribute('aria-pressed',String(!!ns?.arena));const updateWeak=()=>{weak.disabled=!native?.summary().ready.arena||!lab.summary().eligible;weak.title=!lab.summary().eligible?'Waiting for current account data':native?.summary().ready.arena?'':native?.status?.()||'';};readouts.push(updateWeak);updateWeak();
      node('p','Turn ON before Challenge. Newly generated opponents have at most 10% of your HP and damage, with no active skills, pets or mounts. Existing opponents are unchanged. Resets to OFF on reload.',panel);
      if(cat?.arenaLeagues){
        const leagues=cat.arenaLeagues;
        const rankLeague=select('Arena league',leagues.map((v,i)=>[String(i+1),v.name]),s?.arena?.league||1);
        const rankPoints=number('Points in selected league',s?.arena?.points||0,0,leagues[Number(rankLeague.value)-1].points-1);
        rankLeague.onchange=()=>{trainerForm['Arena league']=rankLeague.value;rankPoints.max=leagues[Number(rankLeague.value)-1].points-1;if(Number(rankPoints.value)>Number(rankPoints.max))rankPoints.value=rankPoints.max;trainerForm['Points in selected league']=rankPoints.value;};
        button('Raise Arena rank',()=>applyChange('arena_rank',{league:Number(rankLeague.value),points:Number(rankPoints.value)}));
        liveText(panel,()=>`Current ${leagues[model.snapshot?.arena?.league-1]?.name||'—'} · ${fmt(model.snapshot?.arena?.points)} points · ${fmt(model.snapshot?.inventory?.items?.arena_currency)} tickets`);
        node('p','Choose a higher league or more points within your current league. This reloads the game. Match history, tickets and rewards stay unchanged.',panel);
      }
      }
      if(activeView==='Gear'){
      gearEditor?.mount(panel);if(gearEditor)readouts.push(()=>gearEditor.refresh());
      const upgrade=node('details',undefined,panel);upgrade.className='gear-upgrade';node('summary','Raise equipped gear levels',upgrade);
      upgrade.open=!!trainerForm.gearUpgradeOpen;upgrade.ontoggle=()=>{trainerForm.gearUpgradeOpen=upgrade.open;};
      const gearLevel=number('Gear level',Math.max(1,...Object.values(s?.armory?.equipment||{}).map(v=>v[1]).filter(Number.isFinite)),1,cat.gearLevelMax);
      upgrade.appendChild(gearLevel.parentElement);
      liveText(upgrade,()=>`Equipped levels: ${Object.values(model.snapshot?.armory?.equipment||{}).map(v=>v[1]).filter(Number.isFinite).join(', ')||'—'}. Only lower-level items are raised.`);
      upgrade.appendChild(button('Raise equipped gear to this level',()=>applyChange('gear_level',{level:Number(gearLevel.value)})));
      if(cat){
        node('h3','Skins',panel);
        liveText(panel,()=>{const p=lab.skinSummary();return p.error||`${p.owned}/${p.total} skin pieces unlocked · ${p.added} available to add`;});
        button('Unlock all skin pieces',()=>applyChange('skins_unlock'));
        node('p','Unlocks the four skin sets in this game build. Choose pieces in the game’s Skins screen. Equipping pieces can also grant their normal stat bonuses.',panel);
      }
      }
      if(cat&&activeView==='Skills'){
        node('h3','Skill cards',panel);
        const skill=select('Skill card',Object.entries(cat.skills).map(([id,v])=>[id,`${v.name} · grade ${v.grade} · ${id}`]));
        const cards=number('Card count',10,1,Number.MAX_SAFE_INTEGER);
        liveText(panel,()=>{cards.max=lab.skillCardLimit(skill.value);return `Maximum addition ${fmt(Number(cards.max))} · whole-number precision limit`;});
        liveText(panel,()=>{const v=model.snapshot?.skills?.skills?.[skill.value];return v?`Owned: level ${v[1]}, ${v[2]} duplicate cards`:'Not owned yet';});
        button('Add selected skill cards',()=>applyChange('skill_cards',{skill:skill.value,amount:Number(cards.value)}));
        node('p','Use the native Upgrade and Equip buttons afterward. Missing cards are added at their normal initial level.',panel);
        const skillSummon=number('Skill summon level',s?.skills?.level||1,1,cat.skillSummonMax);
        liveText(panel,()=>`Current summon level ${fmt(model.snapshot?.skills?.level)} · Maximum ${cat.skillSummonMax}`);
        button('Raise skill summon level',()=>applyChange('skill_summon_level',{level:Number(skillSummon.value)}));
      }
      if(cat&&activeView==='Eggs'){
        node('h3','Level up all hatched pets',panel);
        const petLevel=number('Target pet level',Math.min(cat.petLevelMax,Math.max(0,...Object.values(s?.pets?.pets||{}).map(v=>v[3]).filter(Number.isFinite))+1),1,cat.petLevelMax);
        liveText(panel,()=>`Current pet levels ${levelRange('pets',3)} · Maximum ${cat.petLevelMax}`);
        liveText(panel,()=>{const p=lab.previewCreatureLevels('pets',Number(petLevel.value));return p.error||`${p.raised} pet${p.raised===1?'':'s'} will rise to ${p.target} · ${p.skipped} already at or above target`;});
        button('Raise all hatched pets',()=>applyChange('pet_level',{level:Number(petLevel.value)}));
        node('p','Raises the level of every collected pet below your target. Higher-level pets keep their levels. Starts one level above your strongest pet.',panel);
        node('h3','Eggs and hatching',panel);
        const pet=select('Pet egg',Object.entries(cat.pets).map(([id,v])=>[id,`${v.name} · grade ${v.grade} · ${id}`]));
        button('Add selected pet egg',()=>applyChange('egg_add',{pet:pet.value,seed:0}));
        liveText(panel,()=>{const p=model.snapshot?.pets;if(!p)return 'Waiting for egg data…';const e=window.__autoForgeEggs.inspect(p,(Date.now()+(model.serverOffset||0))/1000);return `${e.waiting} in inventory · ${e.incubating} incubating · ${e.ready} ready to collect · ${e.free}/${e.slots} slots free`;});
        node('p','Added eggs start in inventory. Start and finish moves waiting eggs into free incubation slots and skips their timers. Collect ready eggs in the game to free slots for the next batch.',panel);
        button('Start and finish waiting eggs',()=>applyChange('egg_start_finish'));
        button('Finish incubating eggs',()=>applyChange('egg_timers'));
      }
      if(cat&&activeView==='Mounts'){
        node('h3','Mounts',panel);
        const mountSummon=number('Mount summon level',Math.min(cat.mountSummonMax,s?.mounts?.level||1),1,cat.mountSummonMax);
        liveText(panel,()=>`Current summon level ${fmt(model.snapshot?.mounts?.level)} · Highest defined odds ${cat.mountSummonMax}`);
        button('Raise mount summon level',()=>applyChange('mount_summon_level',{level:Number(mountSummon.value)}));
        button('Restore mount summon odds',()=>applyChange('mount_summon_level',{level:cat.mountSummonMax}));
        node('p',`Mount odds stop at level ${cat.mountSummonMax}. If normal summoning advances beyond it, Restore returns to that level. It also raises lower summon levels to ${cat.mountSummonMax}.`,panel);
        const mount=select('Mount type',Object.entries(cat.mounts).map(([id,v])=>[id,`${v.name} · grade ${v.grade}`]));
        button('Add selected mount',()=>applyChange('mount_add',{mount:mount.value}));
        const mountLevel=number('Owned mount level',Math.max(1,...Object.values(s?.mounts?.mounts||{}).map(v=>v[3]).filter(Number.isFinite)),1,cat.mountLevelMax);
        liveText(panel,()=>`Owned mount levels ${levelRange('mounts',3)} · Maximum ${cat.mountLevelMax}`);
        button('Raise owned mounts to this level',()=>applyChange('mount_level',{level:Number(mountLevel.value)}));
        node('p','Add horseshoes in Resources. Summon level changes rarity odds; owned mount level changes its stats.',panel);
      }
      if(cat&&activeView==='Research'){
        researchEditor?.mount(panel);readouts.push(()=>researchEditor?.refresh());
      }
      if(cat&&activeView==='Adventures'){
        node('h3','Adventure progression',panel);
        const dungeon=select('Adventure',[['a','Portal of Ages'],['b','Undead Horde'],['c','Creature Nest (egg rewards)'],['d','Mutant Lab']]);
        const limits=()=>cat.dungeons[dungeon.value];
        const dungeonAge=select('Adventure age',limits().map((n,i)=>[i+1,`Age ${i+1} · ${n} levels`]),s?.dungs?.[dungeon.value]?.age||1),dungeonLevel=number('Adventure level',s?.dungs?.[dungeon.value]?.level||1,1,limits()[Number(dungeonAge.value)-1]||limits()[0]);
        const constrainDungeon=()=>{if(!dungeonAge.value)dungeonAge.value='1';dungeonAge.disabled=limits().length===1;dungeonLevel.max=limits()[Number(dungeonAge.value)-1];dungeonLevel.value=Math.min(Math.max(1,Number(dungeonLevel.value)||1),Number(dungeonLevel.max));trainerForm['Adventure age']=dungeonAge.value;trainerForm['Adventure level']=dungeonLevel.value;};
        const syncDungeon=()=>{const v=model.snapshot?.dungs?.[dungeon.value];dungeonAge.replaceChildren();limits().forEach((n,i)=>{const o=node('option',`Age ${i+1} · ${n} levels`,dungeonAge);o.value=i+1;});dungeonAge.value=String(v?.age||1);dungeonLevel.value=v?.level||1;constrainDungeon();refreshReadouts();};
        constrainDungeon();dungeon.onchange=()=>{trainerForm['Adventure']=dungeon.value;syncDungeon();};dungeonAge.onchange=()=>{constrainDungeon();refreshReadouts();};
        liveText(panel,()=>{const v=model.snapshot?.dungs?.[dungeon.value];return `Current adventure ${v?.age??'—'}–${v?.level??'—'} · Target age ${dungeonAge.value}: levels 1–${dungeonLevel.max}. Lower targets are blocked.`;});
        button('Raise selected adventure',()=>applyChange('dungeon_level',{dungeon:dungeon.value,age:Number(dungeonAge.value),level:Number(dungeonLevel.value)}));
        node('p','Creature Nest is the dungeon that drops eggs. Raising its stage changes egg rewards and enemy difficulty. To level up your pets, use Eggs → Raise all hatched pets. Nest has age 1 and stages 1–130; other adventures have ages 1–5 and stages 1–10.',panel);
      }
      if(!['Combat','PvP','Research'].includes(activeView))node('p','Applying changes reloads the game and may autosave. Values reflect the latest observed save or load.',panel);
    }else if (activeView === 'Runtime') {
      node('p','Reads exposed engine names and types only. Does not call game functions or inspect memory contents.',panel);
      node('button','Inspect runtime',panel).onclick=()=>{model.runtime=window.__autoForgeRuntimeDiagnostic?.();render();};
      node('pre',JSON.stringify(model.runtime || {status:'Press Inspect runtime after the game loads.'},null,2),panel);
    } else if (activeView === 'Tests' && lab) {
      const status=lab.summary();
      node('p','Applying a test automatically reloads the game. Changes may be saved automatically. Current account data must be loaded first.',panel);
      node('p','Tests also advance the loaded play-time marker enough to test local-save selection. Older campaign progress is rejected. This is not a save-isolated preview.',panel);
      node('p',status.message,panel).className='status-banner';
      for (const [name,kind] of [['1. Finish active forge deadline','timer'],['3. Add 100 coins','coins'],['4. Raise forge one level','quality'],['Restore last test fields','restore']]) {
        node('button',name,panel).onclick=()=>applyChange(kind);
      }
      node('button','Cancel pending test',panel).onclick=()=>lab.cancel();
      node('p','Skill cooldown controls are in Combat. They require the patched module to report loaded.',panel);
      node('p','Restoring fields replaces them with pre-test values, not an entire account backup. A completed forge may have further effects that are not undone.',panel);
      node('pre',JSON.stringify({pending:status.pending,last:status.last},null,2),panel);
    } else if (activeView === 'Network') {
      node('p','HTTP success alone does not prove game-state validation. Status 0 indicates a network failure.',panel);
      table(panel, model.events.slice(0,20).map(e=>[`${new Date(e.at).toLocaleTimeString()} ${e.kind}`, `${e.httpStatus ?? 'pending'} · app ${e.appStatus ?? '—'} · ${e.durationMs ?? '—'}ms`]));
    }else if(activeView==='Loads'){
      node('p','Recent loaded responses are retained separately from outgoing saves. Modified means a one-shot operation ran in this session.',panel);
      node('pre',JSON.stringify(model.loads,null,2),panel);
    } else if (activeView === 'Snapshot') {
      node('pre', JSON.stringify(s, null, 2) || 'No snapshot yet', panel);
    } else if (s && activeView === 'Skill data') {
      node('p','Saved stars / level / duplicate progress. Active battle cooldowns are not present in saves.',panel);
      table(panel,Object.entries(s.skills?.skills || {}).map(([id,v])=>[`Skill ${id}`,`${fmt(v[0] ?? v[1])} / ${fmt(Array.isArray(v)?v[1]:v[2])} / ${fmt(Array.isArray(v)?v[2]:v[3])}`]));
    } else if (s && activeView === 'Timers') {
      const now=(Date.now()+(model.serverOffset || 0))/1000;
      node('p',model.serverOffset === null ? 'Estimates use your clock until a server time is observed.' : 'Estimates use the latest observed server-time offset; they do not change the game clock.',panel);
      table(panel,[['Forge upgrade', s.forge?.last ? duration(s.forge.last-now) : 'No saved deadline'],['Last offline collection',s.inventory?.charges ? new Date(s.inventory.charges*1000).toLocaleString() : 'Unknown']]);
      node('p','Research and hatch records (saved timestamps):',panel);
      node('pre',JSON.stringify({research:s.technos,hatching:s.pets?.processes},null,2),panel);
    } else if (s) {
      table(panel,[['Forge level',fmt(s.forge?.level)],['Campaign',`${s.core?.age ?? '—'}–${s.core?.level ?? '—'}`],['Arena league / points',`${fmt(s.arena?.league)} / ${fmt(s.arena?.points)}`],['Observed saves',fmt(model.totals.Save || 0)]]);
      node('h3','Balances',panel);
      table(panel,Object.entries(s.inventory?.items || {}).map(([k,v])=>{
        const old=model.previous?.inventory?.items?.[k]; const d=typeof old==='number'?v-old:0;
        return [k.replaceAll('_',' '),`${fmt(v)}${d ? ` (${d>0?'+':''}${fmt(d)})` : ''}`];
      }));
    }
  }
  function mount() {
    if (stopped || !document.documentElement) return;
    host=document.createElement('div'); host.id='autoforge-readonly-inspector';
    const root=host.attachShadow({mode:'open'});
    node('style',window.__autoForgeTheme,root);
    const details=node('details',undefined,root); details.open=false; details.className='trainer-shell';
    const title=node('summary',undefined,details); title.className='trainer-title';
    node('span','⚒',title).className='forge-emblem';
    node('span','AutoForge',title).className='brand-name';
    node('span',lab?'TRAINER':'INSPECTOR',title).className='brand-tag';
    const nav=node('nav',undefined,details);nav.setAttribute('aria-label','Trainer sections');
    const diagnostics=node('nav',undefined,details);diagnostics.className='diagnostic-nav';diagnostics.setAttribute('aria-label','Advanced diagnostics');
    panel=node('section',undefined,details);
    const foot=node('footer',undefined,details);
    const exportSnapshot=()=>{
      const report={...model,native:native?.summary(),previous:undefined};
      const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));
      const a=node('a',undefined,root);a.href=url;a.download='autoforge-inspection.json';a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    };
    function navigation(){
      nav.replaceChildren();diagnostics.replaceChildren();foot.replaceChildren();
      diagnostics.hidden=!advanced&&!!lab;
      const addTab=(name,parent)=>{
        const b=node('button',name,parent);b.setAttribute('aria-pressed',String(name===activeView));
        b.onclick=()=>{activeView=name;savePreferences();navigation();render(true);panel.scrollTop=0;};
      };
      if(lab)trainerViews.forEach(name=>addTab(name,nav));else nav.hidden=true;
      if(advanced||!lab)['Overview','Skill data','Timers','Network','Snapshot','Loads',...(window.__autoForgeRuntimeDiagnostic?['Runtime']:[]),...(lab?['Tests']:[])].forEach(name=>addTab(name,diagnostics));
      const toggle=node('button',advanced?'Advanced: ON':'Advanced',foot);toggle.setAttribute('aria-pressed',String(advanced));
      toggle.onclick=()=>{advanced=!advanced;if(!advanced&&!trainerViews.includes(activeView)&&lab)activeView='Progress';savePreferences();navigation();render(true);panel.scrollTop=0;};
      if(advanced||!lab){node('button','Export snapshot',foot).onclick=exportSnapshot;node('button','Stop inspector',foot).onclick=stop;}
      node('span','v'+model.version,foot).className='version';
      details.classList.toggle('advanced',advanced);
    }
    navigation();
    document.documentElement.appendChild(host);render();
    interval=setInterval(()=>{if(isTrainerView())safeRun(refreshReadouts);else if(!['Tests','Runtime'].includes(activeView))safeRun(render);},1000);
  }
  window.fetch=fetchWrapper; xp.open=openWrapper; xp.send=sendWrapper;
  if(lab && originalHeader) xp.setRequestHeader=headerWrapper;
  if(lab && originalResponseHeader) xp.getResponseHeader=responseHeaderWrapper;
  window[KEY]={stop, getReport: () => JSON.parse(JSON.stringify({...model,native:native?.summary(),previous:undefined}))};
  if (document.documentElement) mount(); else document.addEventListener('DOMContentLoaded',mount,{once:true});
})();
