// News-image entry for 24 November 2026 (Node 22, standard library only):
// the image is the entry.png beside this file, and the program copies it
// to /output/entry.png. Deterministic: a plain byte copy, no network,
// no randomness, no timestamps. The gate takes a whole PNG or JPEG of
// at most 1 MiB and 1024 by 1024 pixels, and the judge sees exactly
// the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const destination = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(source, destination);

// Verify the copy landed whole: a truncated output would silently
// hand the judge a corrupt image, so fail loudly instead of exiting 0.
const sourceBytes = statSync(source).size;
const copiedBytes = statSync(destination).size;
if (copiedBytes !== sourceBytes) {
  console.error(`entry.png copy incomplete: ${copiedBytes} of ${sourceBytes} bytes written`);
  process.exit(1);
}
