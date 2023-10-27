# Base

> Upteted: 27 Oct, 2023

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
- M2 = Damage Multiplier. Works on the damage after penetration. Can be a range like 1~2, means that the multiplier will float from 1x~2x.

## Buff & Debuff

- All the Buff & Debuff are multiplicative. E.g. Att↑ + Att↑↑ = 1.25 x 1.5 = 1.875x, Def↓ + Def↓↓ = 0.2 x 0.8 = 0.16x.
- ATT/MAG buff & debuff does not affect penetration, except simple attack.
- DEF/RES buff & debuff affects penetration.

## Floating

- Ranged from 0.925x~1.075x.

## Faction

- 1.25x damage for faction element
- 0.8x damage against faction element

## Element

- 1.5x damage against weakless element
- 0.5x damage against resistance element
- 0x damage against immune element
