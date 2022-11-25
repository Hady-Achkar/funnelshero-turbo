import { IRGB, IHSV } from "interfaces";

export class ColorConverter {
    static RGB_MAX: number = 255;
    static HUE_MAX: number = 360;
    static SV_MAX: number = 100;

    static rgbToHsv(r: number, g: number, b: number): IHSV {
        // It converts [0,255] format, to [0,1]
        r = (r % this.RGB_MAX) / parseFloat(this.RGB_MAX.toString());
        g = (g % this.RGB_MAX) / parseFloat(this.RGB_MAX.toString());
        b = (b % this.RGB_MAX) / parseFloat(this.RGB_MAX.toString());

        let max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h = 0,
            s,
            v = max,
            d = max - min;

        s = max === 0 ? 0 : d / max;

        if (max === min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {
            h: Math.floor(h * this.HUE_MAX),
            s: Math.floor(s * this.SV_MAX),
            v: Math.floor(v * this.SV_MAX),
        };
    }

    static hexToHsv(hex: string): IHSV | null {
        const rgb: IRGB | null = this.hexToRgb(hex);
        if (rgb?.r) {
            console.log({ rgb, hsv: this.rgbToHsv(rgb.r, rgb.g, rgb.b) });

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
    static hsvToHex(h: number, s: number, v: number) {
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
