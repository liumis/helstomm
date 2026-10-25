import { GAMYBOS_PROCESAS_SEED } from '../../cms/src/seeds/gamybos-procesas';
import type { ManufacturingBlock } from '../types';

export const FALLBACK_MANUFACTURING_BLOCK: ManufacturingBlock = {
  ...GAMYBOS_PROCESAS_SEED,
  certificates: GAMYBOS_PROCESAS_SEED.certificates
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean),
};
