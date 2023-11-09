# Battle

> Last Update: 29 Oct, 2023

## Damage Formula (except Simple Attack)

### Melee skills (Sword Icon)

( ATT x M1 - DEF x DEF.buffs&debuffs / 2 ) x M2 x floating x ATT.buff&debuff x faction x element

### Magic skills (Staff Icon)

( MAG x M1 - RES x RES.buffs&debuffs / 2 ) x M2 x floating x MAG.buff&debuff x faction x element

## Damage Formula (Simple Attack)

### Melee Class

( ATT x ATT.buff&debuff - DEF x DEF.buffs&debuffs / 2 ) x floating x faction x element

### Magic Class

( MAG x MAG.buff&debuff - RES x RES.buffs&debuffs / 2 ) x floating x faction x element

## M1 & M2

- Every skill has different M1 and M2.
- M1 = Penetration Multiplier. Works directly on ATT/MAG. High M1 skills are less likely to deal 0 damage.
- M2 = Damage Multiplier. Works on the damage after penetration. Can be a range like 1 - 2, means that the multiplier will float from 1x - 2x.

## Buff & Debuff

- All the Buff & Debuff are multiplicative. E.g. Att↑ + Att↑↑ = 1.25 x 1.5 = 1.875x, Def↓ + Def↓↓ = 0.8 x 0.2 = 0.16x.
- ATT/MAG buff & debuff does not affect penetration, except simple attack.
- DEF/RES buff & debuff affects penetration.

## Floating

- Ranged from 0.925x - 1.075x.

## Faction

- 1.25x damage using faction element
- 0.8x damage against faction element

## Element

- Default
  - 1.5x damage against weakness element
  - 0.5x damage against resistance element
  - 0x damage against immune element
- Omnimancy skills
  - 2x damage against weakness element
  - 0.5x damage against resistance element
  - 0.125x damage against immune element
- Ultima
  - 2.4x damage against weakness element
  - 1x damage against resistance element
  - 1x damage against immune element

## Hybrid

Orna has three definitions of Hybrid:

1. 'All skills and spells cast will use both your Attack and Magic stats'
- All skills and spells will use ( Att + Mag) / 1.66 instead of just Att or Mag
- This is roughly a 21% damage increase if your attack and magic are equal
- This has no effect at all on skills that are already hybrid, like Beaststrike or Verse
- This is not visible on the stats screen
2. 'Hybrid damage will be increased by %', Selene Hands/Arms, Hybrid Monster
- Your attack will be increased by % of your magic, and your magic will be increased by % of your attack
- This stacks additively
- This effects all skills and spells, since it increases your raw stats and is visible on the stats screen.
3. Hybrid Skills
- Hybrid skills use 65% of your attack and 65% of your magic stat. Written as a formula, ( att * 0.65 ) + ( mag * 0.65 )

---

*Remark:*

*Take it easy. Orna is a GPS social game. You don't need to know too much about battle if you don't want to.*

*by SzHb*
