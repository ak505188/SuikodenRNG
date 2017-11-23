import Area from './Area';
import { IDs } from './constants';
import { enemies } from './enemies';
import { IAreas } from './interfaces';

export function mult32ulo(n: number, m: number): number {
  n >>>= 0;
  m >>>= 0;
  const nlo = n & 0xffff;
  const nhi = n - nlo;
  return (((nhi * m >>> 0) + (nlo * m)) & 0xFFFFFFFF) >>> 0;
}

export function mult32uhi(n: number, m: number): number {
  n >>>= 0;
  m >>>= 0;

  return ((n * m) - this.mult32ulo(n, m)) / Math.pow(2, 32);
}

export function div32ulo(n: number, m: number): number {
  return Math.floor(n / m) >>> 0;
}

export function initAreas(): IAreas {
  const areas = {};
  for (const area in enemies) {
    if (enemies.hasOwnProperty(area)) {
      areas[area] = new Area(area, enemies[area]);
    }
  }
  return areas;
}

export function fillAreaSelect(Areas: IAreas): void {
  const areaSelect = $(`#${IDs.AreaSelect}`);

  for (const area in Areas) {
    if (Areas[area].areaType !== null) {
      areaSelect.append($('<option>', {
        text: area,
        value: area
      }));
    }
  }
}

export function download(item, filename) {
  // http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(item));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
