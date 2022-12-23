import { IRGB, IHSV } from "interfaces";

export class ColorConverter {
    static RGB_MAX: number = 255;
    static HUE_MAX: number = 360;
    static SV_MAX: number = 100;

    static rgbToHsv(r: number, g: number, b: number) {
        let rabs: number,
            gabs: number,
            babs: number,
            rr: number,
            gg: number,
            bb: number,
            h: number = 0,
            s: number,
            v: number,
            diff: number;
        rabs = r / 255;
        gabs = g / 255;
        babs = b / 255;
        (v = Math.max(rabs, gabs, babs)),
            (diff = v - Math.min(rabs, gabs, babs));

        const diffc = (c: number): number => (v - c) / 6 / diff + 1 / 2;
        const percentRoundFn = (num: number) => Math.round(num * 100) / 100;

        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(rabs);
            gg = diffc(gabs);
            bb = diffc(babs);

            if (rabs === v) {
                h = bb - gg;
            } else if (gabs === v) {
                h = 1 / 3 + rr - bb;
            } else if (babs === v) {
                h = 2 / 3 + gg - rr;
            }
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }
        return {
            h: Math.round(h * 360),
            s: percentRoundFn(s * 100),
            v: percentRoundFn(v * 100),
        };
    }

    static hexToHsv(hex: string): IHSV | null {
        const rgb: IRGB | null = this.hexToRgb(hex);
        if (rgb?.r) {
            return this.rgbToHsv(rgb.r, rgb.g, rgb.b);
        }
        return null;
    }

    static hexToRgb(hex: string): IRGB | null {
        const result: string[] | null =
            /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                  r: parseInt(result[1], 16),
                  g: parseInt(result[2], 16),
                  b: parseInt(result[3], 16),
              }
            : null;
    }

    static hsvToHex(h: number, s: number, v: number): string {
        var rgb = this.hsvToRgb(h, s, v);
        return this.rgb2Hex(rgb.r, rgb.g, rgb.b);
    }

    static hsvToRgb(h: number, s: number, v: number): IRGB {
        h =
            h === this.HUE_MAX
                ? 1
                : ((h % this.HUE_MAX) / parseFloat(this.HUE_MAX.toString())) *
                  6;
        s =
            s === this.SV_MAX
                ? 1
                : (s % this.SV_MAX) / parseFloat(this.SV_MAX.toString());
        v =
            v === this.SV_MAX
                ? 1
                : (v % this.SV_MAX) / parseFloat(this.SV_MAX.toString());

        let i: number = Math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return {
            r: Math.round(r * this.RGB_MAX),
            g: Math.round(g * this.RGB_MAX),
            b: Math.round(b * this.RGB_MAX),
        };
    }

    static rgb2Hex(r: number | string, g: number | string, b: number | string) {
        r = Math.round(+r).toString(16);
        g = Math.round(+g).toString(16);
        b = Math.round(+b).toString(16);

        r = r.length === 1 ? "0" + r : r;
        g = g.length === 1 ? "0" + g : g;
        b = b.length === 1 ? "0" + b : b;

        return "#" + r + g + b;
    }
}
